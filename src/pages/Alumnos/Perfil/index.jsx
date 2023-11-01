import React, { useEffect, useState } from 'react';
import appCredenciales from '../../../firebaseConfig'; // C
import { getAuth } from 'firebase/auth';
function Perfil() {
  const [userData, setUserData] = useState(null);
const auth= getAuth()
  useEffect(() => {
    // Verificar si el usuario está autenticado.
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      // Acceder a los datos del usuario en Firestore.
      const usuarioRef = appCredenciales.collection("usuarios").doc(userId);

      usuarioRef.get()
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            setUserData(userData);
          } else {
            console.log("No se encontraron datos del usuario en Firestore.");
          }
        })
        .catch((error) => {
          console.error("Error al obtener datos del usuario: ", error);
        });
    }
  }, []);

  if (!userData) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Perfil del Usuario</h1>
      <p>Nombre: {userData.nombre}</p>
      <p>Correo: {auth.currentUser.email}</p>
    </div>
  );
} 

export default Perfil;
