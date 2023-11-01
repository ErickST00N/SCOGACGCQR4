import { getAuth, updateCurrentUser, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState} from "react";

import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./App.css";
import logo from "../src/assets/logo192.png"
//Components
import Footer from "./components/Footer";

//Pages
import AcceAccesoSinCredencial from "./pages/Alumnos/AccesoSinCredencial";
import CerrarSesion from "./pages/Alumnos/CerrarSesion";
import MiCredencial from "./pages/Alumnos/MiCredencial";
import MyPassword from "./pages/Alumnos/MyPassword";
import Tutorial from "./pages/Alumnos/Tutorial";
import UpdateData from "./pages/Alumnos/UpdateData";
import AcercaDe from "./pages/Alumnos/AcercaDe";
import Home from "./pages/Home/Index";
import Error404 from "./pages/Error404/index";
import Login from "./pages/Login";
import MenuLateralDerecho from "./components/Menu/MenuClass";
import Scaner from "./pages/Alumnos/Scaner";
import Loader from "./pages/Loader";
import AgregarAlumnos from "./pages/Admin/AgregarAlumnos";
import Perfil from "./pages/Alumnos/Perfil";
import appCredenciales from "./firebaseConfig";
import DataBaseConfig from "./pages/DataBaseConfig";
import Restorepassword from "./components/Restorepassword";
const auth = getAuth(appCredenciales);

function App() {
  const [usuario, setUsuario] = useState(null);
  const location = useLocation();
  // Verifica la ruta actual
  const isInvalidPath = location.pathname !== "/Error404";
  const isntRaizPath = location.pathname !== "/";

  useEffect(() => {
    onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase);
      } else {
        setUsuario(null);
      }
    });
    // Actualiza el título de la página en función de la ruta actual
    if (isntRaizPath) {
      document.title = `QRChecking - ${location.pathname}`;
    } else {
      document.title = `QRChecking`;
    }
  }, [location]);
  return (
    <>
      {/* <Menu /> */}
      {isInvalidPath ? <MenuLateralDerecho/> : null}
      <div className="modal-header shadow p-5 pb-4 border-bottom-0 BoxGreen">
      
        <img src={logo} alt="QRChecking" className="imgLogin" />
      </div>
      <Routes>
        <Route exact path="/MyPassword" element={<MyPassword />} />{" "}
        <Route exact path="/UpdateData" element={<UpdateData />} />{" "}
        <Route exact path="/MiCredencial" element={<MiCredencial />} />
        <Route
          exact
          path="/AccesoSinCredencial"
          element={<AcceAccesoSinCredencial />}
        />
        <Route exact path="/CerrarSesion" element={<CerrarSesion />} />{" "}
        <Route exact path="/Tutorial" element={<Tutorial />} />{" "}
        <Route exact path="/AcercaDe" element={<AcercaDe />} />{" "}
        {usuario ? (<Route exact path="/Login" element={<Navigate to="/MiCredencial" />}></Route>): null}
        <Route exact path="/Login" element={<Login />} />{" "}
        <Route exact path="/Scaner" element={<Scaner />} />{" "}
        <Route exact path="/Perfil" element={<Perfil />} />{" "}
        <Route exact path="/Loader" element={<Loader />} /> {/* //Admin */}
        {/* <Route path='/Admin/Login' component={LoginAdmin}/> */}
        <Route path='/reset-password' component={<Restorepassword/>}/>
        
        <Route
          exact
          path="/Admin/AgregarAlumnos"
          element={<AgregarAlumnos />}
        />{" "}
        <Route exact path="/" element={<Home />} />{" "}
        <Route exact path="/Error404" element={<DataBaseConfig />} />{" "}
        
        <Route path="/*" element={<Navigate to="/Error404" />}></Route>
      </Routes>
      {isInvalidPath ? <Footer /> : null}
    </>
  );
}

export default App;
