import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  runTransaction,
  onSnapshot,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import appCredenciales from "../../firebaseConfig";
import { Table, InputGroup, FormControl, Button } from "react-bootstrap";
import Users from "../../pages/User/User"; // Importa la clase Users

function AlumnosList() {
  const [editingAlumno, setEditingAlumno] = useState(null);

  const [alumnos, setAlumnos] = useState([]);
  const [newAlumno, setNewAlumno] = useState({
    Matricula: "",
    Nombre: "",
    Correo: "",
    Password: "",
    Grado: "",
    Grupo: "",
    Carrera: "",
    TipoDeSangre: "",
    NSS: "",
    NumeroTelefonico: "",
    TCuenta: "",
    Estado: true,
  });
  const [selectedAlumno, setSelectedAlumno] = useState(null); // Alumno seleccionado en la tabla
  const [userCreated, setUserCreated] = useState(false);

  // Función para actualizar el alumno en tiempo real
  const handleUpdateAlumnoInRealTime = (field, value) => {
    if (selectedAlumno) {
      const updatedAlumno = { ...selectedAlumno, [field]: value };
      setSelectedAlumno(updatedAlumno);
    }
  };
  const [visibleAlumnos, setVisibleAlumnos] = useState(15); // Número de registros iniciales a mostrar


  const [filtro, setFiltro] = useState(""); // Para búsqueda
  const [alumnoEstado, setAlumnoEstado] = useState("todos"); // Para filtrar por estado (activo o inactivo)
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la consulta de búsqueda en tiempo real

  // useEffect para obtener la lista de alumnos desde Firestore
  useEffect(() => {
    const datab = getFirestore(appCredenciales);
    const alumnosCollection = collection(datab, "Usuarios");

    const unsubscribe = onSnapshot(alumnosCollection, (querySnapshot) => {
      const alumnosData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        alumnosData.push(data);
      });
      setAlumnos(alumnosData);
    });

    return () => {
      unsubscribe(); // Limpia el listener cuando el componente se desmonta
    };
  }, []);

  // useEffect para filtrar la lista de alumnos en función de la búsqueda en tiempo real
  useEffect(() => {
    const datab = getFirestore(appCredenciales);
    const alumnosCollection = collection(datab, "Usuarios");

    const unsubscribe = onSnapshot(alumnosCollection, (querySnapshot) => {
      const alumnosData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        alumnosData.push(data);
      });

      const filteredAlumnos = alumnosData.filter((alumno) => {
        const searchString = `${alumno.Matricula} ${alumno.Nombre} ${alumno.Correo} ${alumno.Grado} ${alumno.Grupo} ${alumno.Carrera} ${alumno.TipoDeSangre}`;
        return searchString.toLowerCase().includes(searchQuery.toLowerCase());
      });

      setAlumnos(filteredAlumnos);
    });

    return () => {
      unsubscribe(); // Limpia el listener cuando el componente se desmonta
    };
  }, [searchQuery]);

  // Función para agregar un alumno
  const handleAddAlumno = async () => {
    if (validateNewAlumno(newAlumno)) {
      const datab = getFirestore(appCredenciales);
      const alumnosCollection = collection(datab, "Usuarios");
      await addDoc(alumnosCollection, newAlumno);
      setNewAlumno(initialNewAlumnoState);

      // Registra al usuario asociado
      handleUserCreation(newAlumno);
      setVisibleAlumnos(15); // Restablecer a 15 después de agregar un nuevo alumno

    }
  };

  // Función para actualizar un alumno
  const handleUpdateAlumno = async (alumno) => {
    const datab = getFirestore(appCredenciales);
    const alumnosCollection = collection(datab, "Usuarios");
    await updateDoc(alumnosCollection, alumno.id, { ...alumno });

    // Actualiza el usuario asociado si el correo o contraseña cambian
    const auth = getAuth(appCredenciales);
    const user = await auth.currentUser;
    if (user && (user.email !== alumno.Correo || alumno.Password)) {
      try {
        await updateProfile(user, {
          displayName: alumno.Nombre,
          email: alumno.Correo,
          password: alumno.Password,
        });
      } catch (error) {
        console.error("Error al actualizar el usuario:", error);
      }
    }
  };

  // Función para eliminar un alumno
  const handleDeleteAlumno = async (alumno) => {
    const datab = getFirestore(appCredenciales);
    const alumnosCollection = collection(datab, "Usuarios");

    try {
      const deleteTransaction = (transaction) => {
        const docRef = doc(alumnosCollection, alumno.id);
        transaction.delete(docRef);
        return Promise.resolve("Alumno eliminado");
      };

      await runTransaction(datab, deleteTransaction);

      // Elimina el usuario asociado
      const auth = getAuth(appCredenciales);
      const user = await auth.currentUser;
      if (user) {
        await auth.deleteUser(user.uid);
      }

      setAlumnos(alumnos.filter((a) => a.id !== alumno.id));
    } catch (error) {
      console.error("Error al eliminar el alumno:", error);
    }
  };

  // Función para validar los datos de un nuevo alumno
  const validateNewAlumno = (alumno) => {
    if (alumno.Matricula && alumno.Nombre && alumno.Correo) {
      return true;
    } else {
      alert(
        "Por favor, complete los campos obligatorios (Matricula, Nombre y Correo)."
      );
      return false;
    }
  };

  // Función para crear un usuario en Firebase Authentication y asociarlo al alumno
  const handleUserCreation = async (alumno) => {
    try {
      // Crea el usuario en Firebase Authentication
      const auth = getAuth(appCredenciales);
      const { Correo, Password } = alumno;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        Correo,
        Password
      );
      const user = userCredential.user;

      if (user) {
        // Agrega los datos del alumno al documento del usuario en Firestore
        const usuariosCollection = collection(
          getFirestore(appCredenciales),
          "Usuarios"
        );

        const userDoc = doc(usuariosCollection, user.uid); // Suponiendo que el UID del usuario sea la clave del documento
        await setDoc(userDoc, alumno, { merge: true });
        setUserCreated(true);
      }
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      setUserCreated(false);
    }
  };

  const initialNewAlumnoState = {
    Matricula: "",
    Nombre: "",
    Correo: "",
    Password: "",
    Grado: "",
    Grupo: "",
    Carrera: "",
    TipoDeSangre: "",
    NSS: "",
    NumeroTelefonico: "",
    TCuenta: "",
    Estado: true,
  };

  return (
    <div>
      <h1>Lista de Alumnos</h1>
      {/* Input para búsqueda */}
      <div className="search-bar">
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="primary" onClick={() => setSearchQuery(filtro)}>
            Buscar
          </Button>
        </InputGroup>
      </div>
      {/* Dropdown para filtrar por estado */}
      <div className="filter-bar">
        <InputGroup>
          <InputGroup.Text>Estado:</InputGroup.Text>
          <FormControl
            as="select"
            value={alumnoEstado}
            onChange={(e) => setAlumnoEstado(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </FormControl>
        </InputGroup>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Matricula</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Password</th>
            <th>Grado</th>
            <th>Grupo</th>
            <th>Carrera</th>
            <th>Tipo de Sangre</th>
            <th>NSS</th>
            <th>Numero Telefónico</th>
            <th>Tipo de Cuenta</th>
            <th>Acciones</th>
            <th>Estado</th>
          </tr>
          </thead>
        <tbody>
          {alumnos
            .slice(0, visibleAlumnos) // Mostrar solo los primeros "visibleAlumnos" registros
            .filter((alumno) => {
              // Filtrar por búsqueda (Matricula, Nombre, Correo, Grado, Grupo, Carrera, TipoDeSangre)
              const searchString = `${alumno.Matricula} ${alumno.Nombre} ${alumno.Correo} ${alumno.Grado} ${alumno.Grupo} ${alumno.Carrera} ${alumno.TipoDeSangre}`;
              return searchString.toLowerCase().includes(filtro.toLowerCase());
            })
            .filter((alumno) => {
              // Filtrar por estado
              if (alumnoEstado === "todos") {
                return true;
              }
              return alumnoEstado === "activo" ? alumno.Estado : !alumno.Estado;
            })
            .map((alumno) => (
              <tr key={alumno.id}>
                {/* Filas de la tabla */}
                <td>
                  <FormControl
                    value={editingAlumno === alumno ? editingAlumno.Matricula : alumno.Matricula}
                    onChange={(e) => {
                      if (editingAlumno === alumno) {
                        setEditingAlumno({ ...editingAlumno, Matricula: e.target.value });
                      }
                    }}
                  />
                </td>
                <td>
                  <FormControl
                    value={editingAlumno === alumno ? editingAlumno.Nombre : alumno.Nombre}
                    onChange={(e) => {
                      if (editingAlumno === alumno) {
                        setEditingAlumno({ ...editingAlumno, Nombre: e.target.value });
                      }
                    }}
                  />
                </td>
                <td>
                  <FormControl
                    value={editingAlumno === alumno ? editingAlumno.Correo : alumno.Correo}
                    onChange={(e) => {
                      if (editingAlumno === alumno) {
                        setEditingAlumno({ ...editingAlumno, Correo: e.target.value });
                      }
                    }}
                  />
                </td>
                <td>
                  <FormControl
                    value={editingAlumno === alumno ? editingAlumno.Password : alumno.Password}
                    onChange={(e) => {
                      if (editingAlumno === alumno) {
                        setEditingAlumno({ ...editingAlumno, Password: e.target.value });
                      }
                    }}
                  />
                </td>
                <td>
                  <FormControl
                    value={editingAlumno === alumno ? editingAlumno.Grado : alumno.Grado}
                    onChange={(e) => {
                      if (editingAlumno === alumno) {
                        setEditingAlumno({ ...editingAlumno, Grado: e.target.value });
                      }
                    }}
                  />
                </td>
                <td>
                  <FormControl
                    value={editingAlumno === alumno ? editingAlumno.Grupo : alumno.Grupo}
                    onChange={(e) => {
                      if (editingAlumno === alumno) {
                        setEditingAlumno({ ...editingAlumno, Grupo: e.target.value });
                      }
                    }}
                  />
                </td>
                <td>
                  <FormControl
  as="select"
  value={editingAlumno === alumno ? editingAlumno.Carrera : alumno.Carrera}
  onChange={(e) => {
    setEditingAlumno({ ...editingAlumno, Carrera: e.target.value })
    ;
  }}
>
  <option value="IEVN">IEVN</option>
  <option value="IDGS">IDGS</option>
  <option value="IRDS">IRDS</option>
  <option value="DNAM">DNAM</option>
</FormControl>

                </td>
                <td>
                  <FormControl
                    value={editingAlumno === alumno ? editingAlumno.TipoDeSangre : alumno.TipoDeSangre}
                    onChange={(e) => {
                      if (editingAlumno === alumno) {
                        setEditingAlumno({ ...editingAlumno, TipoDeSangre: e.target.value });
                      }
                    }}
                  />
                </td>
                <td>
                  <FormControl
                    value={editingAlumno === alumno ? editingAlumno.NSS : alumno.NSS}
                    onChange={(e) => {
                      if (editingAlumno === alumno) {
                        setEditingAlumno({ ...editingAlumno, NSS: e.target.value });
                      }
                    }}
                  />
                </td>
                <td>
                  <FormControl
                    value={editingAlumno === alumno ? editingAlumno.NumeroTelefonico : alumno.NumeroTelefonico}
                    onChange={(e) => {
                      if (editingAlumno === alumno) {
                        setEditingAlumno({ ...editingAlumno, NumeroTelefonico: e.target.value });
                      }
                    }}
                  />
                </td>
                <td>
                  <FormControl
                    value={editingAlumno === alumno ? editingAlumno.TCuenta : alumno.TCuenta}
                    onChange={(e) => {
                      if (editingAlumno === alumno) {
                        setEditingAlumno({ ...editingAlumno, TCuenta: e.target.value });
                      }
                    }}
                  />
                </td>
                <td>
                  <FormControl
                    as="select"
                    value={newAlumno.Estado ? "true" : "false"}
                    onChange={(e) => {
                      const newState = e.target.value === "true";
                      setNewAlumno({ ...newAlumno, Estado: newState });
                    }}
                  >
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </FormControl>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteAlumno(alumno)}
                  >
                    Eliminar
                  </Button>
                </td>
                <td>
                  {editingAlumno === alumno ? (
                    <Button variant="success" onClick={() => handleUpdateAlumno(editingAlumno)}>
                      Guardar
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={() => setEditingAlumno(alumno)}>
                      Editar
                    </Button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <FormControl
                placeholder="Matricula"
                value={newAlumno.Matricula}
                onChange={(e) =>
                  setNewAlumno({ ...newAlumno, Matricula: e.target.value })
                }
              />
            </td>
            <td>
              <FormControl
                placeholder="Nombre"
                value={newAlumno.Nombre}
                onChange={(e) =>
                  setNewAlumno({ ...newAlumno, Nombre: e.target.value })
                }
              />
            </td>
            <td>
              <FormControl
                placeholder="Correo"
                value={newAlumno.Correo}
                onChange={(e) =>
                  setNewAlumno({ ...newAlumno, Correo: e.target.value })
                }
              />
            </td>
            <td>
              <FormControl
                placeholder="Password"
                value={newAlumno.Password}
                onChange={(e) =>
                  setNewAlumno({ ...newAlumno, Password: e.target.value })
                }
              />
            </td>
            <td>
              <FormControl
                placeholder="Grado"
                value={newAlumno.Grado}
                onChange={(e) =>
                  setNewAlumno({ ...newAlumno, Grado: e.target.value })
                }
              />
            </td>
            <td>
              <FormControl
                placeholder="Grupo"
                value={newAlumno.Grupo}
                onChange={(e) =>
                  setNewAlumno({ ...newAlumno, Grupo: e.target.value })
                }
              />
            </td>
            <td>
              <FormControl
                as="select"
                value={newAlumno.Carrera}
                onChange={(e) => {
                  setNewAlumno({ ...newAlumno, Carrera: e.target.value });
                }}
              >
                <option value="IEVN">IEVN</option>
                <option value="IDGS">IDGS</option>
                <option value="IRDS">IRDS</option>
                <option value="DNAM">DNAM</option>
              </FormControl>
            </td>
            <td>
              <FormControl
                placeholder="Tipo de Sangre"
                value={newAlumno.TipoDeSangre}
                onChange={(e) =>
                  setNewAlumno({ ...newAlumno, TipoDeSangre: e.target.value })
                }
              />
            </td>
            <td>
              <FormControl
                placeholder="NSS"
                value={newAlumno.NSS}
                onChange={(e) =>
                  setNewAlumno({ ...newAlumno, NSS: e.target.value })
                }
              />
            </td>
            <td>
              <FormControl
                placeholder="Numero Telefónico"
                value={newAlumno.NumeroTelefonico}
                onChange={(e) =>
                  setNewAlumno({
                    ...newAlumno,
                    NumeroTelefonico: e.target.value,
                  })
                }
              />
            </td>
            <td>
              <FormControl
                placeholder="Tipo de Cuenta"
                value={newAlumno.TCuenta}
                onChange={(e) =>
                  setNewAlumno({ ...newAlumno, TCuenta: e.target.value })
                }
              />
            </td>
            {/* Botón para activar/desactivar alumno */}
            <td>
              <FormControl
                as="select"
                value={newAlumno.Estado ? "true" : "false"}
                onChange={(e) => {
                  const newState = e.target.value === "true";
                  setNewAlumno({ ...newAlumno, Estado: newState });
                }}
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </FormControl>
            </td>
            <td>
              <td>
                <Button variant="success" onClick={handleAddAlumno}>
                  Agregar
                </Button>
              </td>
            </td>
          </tr>
        </tfoot>
        </Table>
      {alumnos.length > visibleAlumnos && (
        <div className="text-center">
          <Button variant="primary" onClick={() => setVisibleAlumnos(visibleAlumnos + 15)}>
            Ver Más
          </Button>
        </div>
      )}
      <Users user={newAlumno} />
    </div>
  );
}

export default AlumnosList;
