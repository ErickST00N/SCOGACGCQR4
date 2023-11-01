import React, { Component, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import appCredenciales from "../../firebaseConfig";
import { useHistory } from "react-router-dom";

const auth = getAuth(appCredenciales);
const firestore = getFirestore(appCredenciales);
// ...

// Dentro de tu componente

class Users extends Component {
  constructor(props) {
    super(props);
    // Datos del estudiante
    this.state = {
      UserID: props.CleanCredencial, 
      matricula: props.CleanCredencial,
      nombre: props.CleanCredencial,
      correo: props.CleanCredencial,
      password: props.CleanCredencial,
      grado: props.CleanCredencial,
      grupo: props.CleanCredencial,
      carrera: props.CleanCredencial,
      tipoDeSangre: props.CleanCredencial,
      NSS: props.CleanCredencial,
      numeroTelefonico: props.CleanCredencial,
      Foto: props.Foto, 
      fileUploaded: null,
      usuariosCollection: collection(getFirestore(appCredenciales), "Usuarios"),
      userStatus: "activo", // Puede ser "activo" o "inactivo"
    };
    onAuthStateChanged(auth, async (usuarioFirebase) => {
      if (usuarioFirebase) {
        // El usuario está autenticado
        const userUID = usuarioFirebase.uid;
        
        const storage = getStorage(appCredenciales);
        const storageRef = ref(storage, `${userUID}/Fotos/FotoPerfil.jpg`);


        // Obtiene la URL de descarga de la imagen
        const downloadURL = await getDownloadURL(storageRef);

        console.log("URL de la imagen: ", downloadURL);
        usuarioFirebase.photoURL=downloadURL
        

        // Realiza una consulta para obtener los datos del usuario en Firestore
        const userDocRef = doc(firestore, "Usuarios", userUID);
        try {
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            // Datos encontrados en Firestore
            const userData = userDocSnapshot.data();
            
            
            this.setState({
              UserID: usuarioFirebase.uid,
              matricula: userData.Matricula,
              nombre: userData.Nombre,
              correo: userData.Correo,
              password: userData.Password,
              grado: userData.Grado,
              grupo: userData.Grupo,
              carrera: userData.Carrera,
              tipoDeSangre: userData.TipoDeSangre,
              NSS: userData.NSS,
              numeroTelefonico: userData.NumeroTelefonico,
              Foto: downloadURL
            });
            
          } else {
            // Datos no encontrados
            console.log("No se encontraron datos del usuario en Firestore.");
          }
        } catch (error) {
          console.error(
            "Error al obtener datos del usuario en Firestore: ",
            error
          );
        }
      } else {
        console.debug("No hay usuario autenticado");
      }
    });
    // Debes crear una función de redirección y pasarla como prop a las clases hijas
    this.redirectToPerfil = this.redirectToPerfil.bind(this);
  }
  redirectToPerfil() {
    const { history } = this.props;
    history.push("/Perfil");
  }

  // Función para iniciar sesión
  async login(email, password) {
    try {
      this.redirectToPerfil();
      await signInWithEmailAndPassword(auth, email, password);
      
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
    }
  }

  // Función para validar los datos de un usuario
  isValidUserData(userData) {
    const {
      Matricula,
      Nombre,
      Correo,
      Password,
      Grado,
      Grupo,
      Carrera,
      TipoDeSangre,
      NSS,
      NumeroTelefonico,
      TCuenta,
    } = userData;

    // Realiza validaciones personalizadas aquí
    if (
      !Matricula ||
      !Nombre ||
      !Correo ||
      !Password ||
      !Grado ||
      !Grupo ||
      !Carrera ||
      !TipoDeSangre ||
      !NSS ||
      !NumeroTelefonico ||
      !TCuenta
    ) {
      return false; // Datos incompletos, no son válidos
    }

    // Puedes agregar más validaciones según tus necesidades

    return true; // Datos válidos
  }
  // Función para registrar un usuario
  async registerUser(userData) {
    if (this.isValidUserData(userData)) {
      try {
        await addDoc(this.state.usuariosCollection, userData);
        
      } catch (error) {
        console.error("Error al registrar usuario:", error);
      }
    } else {
      console.error("Datos de usuario no válidos");
    }
  }
  toggleUserStatus = () => {
    this.setState((prevState) => ({
      userStatus: prevState.userStatus === "activo" ? "inactivo" : "activo",
    }));
  };
  // Función para eliminar datos
  async deleteData(collectionRef, docId) {
    await deleteDoc(doc(collectionRef, docId));
  }
  // Función para iniciar sesión con Facebook
  async loginFacebook() {
    const provider = new appCredenciales.auth.FacebookAuthProvider();
    const auth = getAuth(appCredenciales);
    try {
      const result = await auth.signInWithPopup(provider);
      const user = result.user;
      
    } catch (error) {
      console.error("Facebook login error:", error);
    }
  }

  // Funciones para actualizar y eliminar datos
  updateData() {
    // Implementa lógica para actualizar datos
  }

  readQR() {
    // Implementa lógica para leer un código QR
  }

  deleteInformation() {
    // Implementa lógica para borrar información
  }

  deletePhoto() {
    // Implementa lógica para borrar una foto
  }

  render() {
    const { fileUploaded } = this.state;
    if (fileUploaded) {
      // Procesar los datos y registrar usuarios en Firebase
      const { data } = this.props;
      data.forEach((userData) => {
        // Realiza alguna validación de los datos si es necesario
        this.registerUser(userData);
      });
    }

    return <div></div>;
  }
}

export default Users;
