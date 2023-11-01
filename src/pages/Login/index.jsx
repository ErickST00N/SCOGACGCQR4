import MapsSchool from "../../components/MapsSchool"
import Sign from "../../components/SignIn"
import "./Login.css"
import React, { useState } from 'react'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import Credenciales from "../../firebaseConfig"


const Loginn = () => {
    // ... (código anterior)
  
    // const handleLogin = async (e) => {
    //   e.preventDefault();
    //   const correo = e.target.email.value;
    //   const contraseña = e.target.contraseña.value;
    // //   await signInWithEmailAndPassword(auth, correo, contraseña);
    // };
    return <Sign/> 

}

function Login (){
    return(
        <div className=" fondoC px-4 px-lg-5 container-fluid" ><Loginn/><MapsSchool /></div>
    )
}

export default Login