import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Card, Alert } from "react-bootstrap";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  updateProfile,
} from "firebase/auth";
import appCredenciales from "../../firebaseConfig";

import "./FileUploadCsv.css";

function FileUploadCsv({ onFileUpload }) {
  const [showAlert, setShowAlert] = useState(false);
  const datab = getFirestore(appCredenciales);
  const auth = getAuth(appCredenciales);
  const [userCreated, setUserCreated] = useState(false);

  const handleFileUpload = async (file) => {
    if (!file) {
      console.log("No se ha seleccionado un archivo.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const fileContent = reader.result;
      const lines = fileContent.split("\n");
      const headers = lines[0].split(",");
      const data = lines.slice(1).map((line) => {
        const values = line.split(",");
        const object = {};
        headers.forEach((header, index) => {
          object[header] = values[index];
        });
        return object;
      });

      for (const item of data) {
        if (validateNewAlumno(item)) {
          // Agregar el usuario a la colección "Usuarios" en Firestore
          const alumnosCollection = collection(datab, "Usuarios");
          await addDoc(alumnosCollection, item);
          // Registra al usuario asociado
          await handleUserCreation(item); 
        }
      }

      console.log("Todos los datos se subieron correctamente.");
      setShowAlert(true);
    };
    reader.readAsText(file);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };
 const validateNewAlumno = (alumno) => {
    if (alumno.Matricula && alumno.Nombre && alumno.Correo) {
      return true;
    } else {
      alert("Por favor, complete los campos obligatorios (Matricula, Nombre y Correo).");
      return false;
    }
  }
  const handleUserCreation = async (item) => {
    try {
      // Crea el usuario en Firebase Authentication
      const { Correo, Password } = item;
      const userCredential = await createUserWithEmailAndPassword(auth, Correo, Password);
      const user = userCredential.user;

      if (user) {
        // Agrega los datos del alumno al documento del usuario en Firestore
        const usuariosCollection = collection(getFirestore(appCredenciales), "Usuarios");
        const userDoc = doc(usuariosCollection, user.uid); // Suponiendo que el UID del usuario sea la clave del documento
        await setDoc(userDoc, item, { merge: true });
        setUserCreated(true);
      }
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      setUserCreated(false);
    }
  };

  // Función para validar datos del usuario
  const isValidData = (item) => {
    return (
      item &&
      item.Matricula &&
      item.Nombre &&
      item.Correo &&
      item.Password &&
      item.Grado &&
      item.Grupo &&
      item.Carrera &&
      item.TipoDeSangre &&
      item.NSS &&
      item.NumeroTelefonico &&
      item.TCuenta &&
      item.Estado
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".csv",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      handleFileUpload(file);
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card
        {...getRootProps()}
        className="dropzone"
        style={{ background: "#C1D9CB", width: 500, height: 300 }}
      >
        <Card.Body className="d-flex flex-column align-items-center justify-content-center">
          <input
            {...getInputProps()}
            type="file"
            name="file"
            className="d-none"
          />
          <Button variant="primary" >
            Arrastra y suelta un archivo CSV aquí o haz clic para seleccionar un archivo.
          </Button>
        </Card.Body>
      </Card>

      {showAlert && (
        <Alert variant="success" onClose={handleAlertClose} dismissible>
          El archivo se subió correctamente.
        </Alert>
      )}
    </div>
  );
}

export default FileUploadCsv;
