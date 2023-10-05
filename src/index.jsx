import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./components/Menu";
import SignIn from "./components/SignIn";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes, NavLink, Link } from "react-router-dom";

// import appCredenciales from './firebaseConfig.jsx';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';

// const auth = getAuth(appCredenciales);

// function Sing (){
//   const [usuario, setUsuario] = useState(null);

// useEffect(() => {
//   const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
//     if (usuarioFirebase) {
//       setUsuario(usuarioFirebase);
//     } else {
//       setUsuario(null);
//     }
//   });

//   return () => {
//     // Realizar limpieza cuando el componente se desmonta, si es necesario
//     unsubscribe();
//   };
// }, []);

// return (<> {usuario ? <p> Email: {usuario.email}</p> :<p>No Email. </p>}
// </>);
// }

const menuu = ReactDOM.createRoot(document.getElementById("menu"));
menuu.render(
<Router><Menu /></Router>);
const signin = ReactDOM.createRoot(document.getElementById("signin"));
signin.render(<Router><SignIn /></Router>);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Router><App /></Router>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
