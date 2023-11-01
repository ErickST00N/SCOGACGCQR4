import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import appCredenciales from "../../firebaseConfig";
import Users from "../../pages/User/User";
const auth = getAuth(appCredenciales);



function MenuClass() {
  const [usuario, setUsuario] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase);
      } else {
        setUsuario(null);
      }
    });
  },[])
  const [menuOpen, setMenuOpen] = useState(false);
  const handleCerrarSesion = () =>{
    auth.signOut()
    setUsuario(null)
    const CleanCredencial = "";
    return <Users CleanCredencial= {CleanCredencial} />
    

  }
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuClass = menuOpen ? "collapse navbar-collapse show" : "collapse navbar-collapse";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container px-5">
        <Link className="navbar-brand" to="/">
          QRChecking
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={menuClass} id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/UpdateData" className="nav-link">
                Actualizar datos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/MyPassword" className="nav-link">
                Cambiar contraseña
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/MiCredencial" className="nav-link">
                Mi credencial
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/AccesoSinCredencial" className="nav-link">
                Acceso sin credencial
              </Link>
            </li> */}
            <li className="nav-item">
              {usuario ? (<button
              onClick={handleCerrarSesion} className="btn btn-danger">Cerrar Sesion</button>) :(<Link to="/Login" className="nav-link">
                Login
              </Link>)}
            </li>
            {/* <li className="nav-item">
              <Link to="/Tutorial" className="nav-link">
                Tutorial
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="/AcercaDe" className="nav-link">
                Acerca de
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Scaner" className="nav-link">
                Escenar
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MenuClass;
