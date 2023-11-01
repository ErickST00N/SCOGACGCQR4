//Cosas de react
import React, { useState, useEffect, Suspense } from "react";
import ReactDOM from "react-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";

//Estilos
import "./index.css";
//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/js/bootstrap.bundle";
//APP
import App from "./App";
//Components
import appCredenciales from "./firebaseConfig";
import MenuLateralDerecho from "./components/Menu/MenuClass"
import { getAuth, onAuthStateChanged, updateCurrentUser } from "firebase/auth";

import QRCode from "react-qr-code";
import Menu from "./components/Menu";
const auth = getAuth(appCredenciales);

 function QrAutenticate() {
   const [matricula, setMatricula] = useState("");
   const [qrCodeValue, setQrCodeValue] = useState("");
   const [usuario, setUsuario] = useState(null);
   useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
       if (usuarioFirebase) {
         setUsuario(usuarioFirebase);
       } else {
         setUsuario(null);
       }
     });
     return () => {
       // Realizar limpieza cuando el componente se desmonta, si es necesario
       unsubscribe();
     };
   }, []);
   const handleChange = (event) => {
     setMatricula(event.target.value);
   };
   const handleSubmit = () => {
     setQrCodeValue(matricula);
   };
   return (
     <>
       <div className="App">
         {/* {usuario ? <Home correoUser={usuario.email} /> : <Loging />} */}
         <header className="App-header">{/* Resto de tu componente */}</header>
       </div>
       <div className="App">
         <header className="App-header">
           <QRCode
             value={qrCodeValue}
             bgColor={"cyan"}
             fgColor={"#000"}
             level={"M"}
             size={"256"}
             viewBox={`0 0 256 256`}
             title={qrCodeValue}
           />
           <input
             type="text"
             name="matricula"
             value={setMatricula}
             onChange={handleChange}
           />
           <button onClick={handleSubmit}>Generar QR</button>
         </header>{" "}
       </div>
     </>
   );
 }

// Componente que muestra el email del usuario si está autenticado
 function Sing() {
   const [usuario, setUsuario] = useState(null);

   useEffect(() => {
     // Configuración para verificar el estado de autenticación
     // Si el usuario está autenticado, muestra su email; de lo contrario, muestra un mensaje
   }, []);

   return (
     <>
       {usuario ? <p> Email: {usuario.email}</p> : <p>No Email. </p>}
     </>
   );
 }



// // Renderiza el componente SignIn en el elemento con id "signin"
// const signin = ReactDOM.createRoot(document.getElementById("signin"));
// signin.render(
//   <Router>
//     <SignIn />
//   </Router>
// );

// Renderiza el componente App en el elemento con id "root"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router><Suspense fallback={'Conectando la app...'}><App /></Suspense></Router>
);


/**
 * nav, es la eitqueta div con el id nav para renderizar todo nuestro codigo
 * 
 * 
 */
const nav = ReactDOM.createRoot(document.getElementById("nav"))
nav.render(
  
  
)
// Desregistra el servicio de trabajador de servicio (service worker) si es necesario
serviceWorkerRegistration.unregister();

// Mide el rendimiento de la aplicación y registra los resultados
reportWebVitals(console.log);
