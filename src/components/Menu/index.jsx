import React from "react";
import "./menu.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes, NavLink, Link } from "react-router-dom";
import UpdateData from "../UpdateData";
import MyPasswordComponent from "../MyPassword";
import MiCredencialComponent from "../MiCredencial";
import AccesoSinCredencialComponent from "../AccesoSinCredencial";
import CerrarSesionComponent from "../CerrarSesion";
import TutorialComponent from "../Tutorial";
import AcercaDeComponent from "../AcercaDe";
function Menu() {
  return (
    <>
      <header>
        <div className="collapse bg-dark" id="navbarHeader">
          <div className="container">
            <div className="row">
              <div className="col-sm-8 col-md-7 py-4">
                <h4 className="text-white">About</h4>
                <p className="text-muted">
                  Add some information about the album below, the author, or any
                  other background context. Make it a few sentences long so
                  folks can pick up some informative tidbits. Then, link them
                  off to some social networking sites or contact information.
                </p>
              </div>
              <div className="col-sm-4 offset-md-1 py-4">
                <h4 className="text-white">Contact</h4>
                <ul className="list-unstyled">
                  <li>
                    <NavLink to="/" className="text-with">
                      {" "}
                      Home{" "}
                    </NavLink>{" "}
                    
                  </li>{" "}
                  <li>
                    <NavLink to="./UpdateData" className="text-with">
                      {" "}
                      Actualizar datos{" "}
                    </NavLink>{" "}
                    {/* Agrega la ruta correcta */}{" "}
                  </li>{" "}
                  <li>
                    <NavLink to="/MyPassword" className="text-with">
                      {" "}
                      Cambiar contraseña{" "}
                    </NavLink>{" "}
                    {/* Agrega la ruta correcta */}{" "}
                  </li>{" "}
                  <li>
                    <NavLink to="/MiCredencial" className="text-with">
                      {" "}
                      Mi credencial{" "}
                    </NavLink>{" "}
                    {/* Agrega la ruta correcta */}{" "}
                  </li>{" "}
                  <li>
                    <NavLink to="/AccesoSinCredencial" className="text-with">
                      {" "}
                      Acceso sin credencial{" "}
                    </NavLink>{" "}
                    {/* Agrega la ruta correcta */}{" "}
                  </li>{" "}
                  <li>
                    <NavLink to="/CerrarSesion" className="text-with">
                      {" "}
                      Cerrar Sesión{" "}
                    </NavLink>{" "}
                    {/* Agrega la ruta correcta */}{" "}
                  </li>{" "}
                  <li>
                    <NavLink to="/Tutorial" className="text-with">
                      {" "}
                      Tutorial{" "}
                    </NavLink>{" "}
                    {/* Agrega la ruta correcta */}{" "}
                  </li>{" "}
                  <li>
                    <NavLink to="/AcercaDe" className="text-with">
                      {" "}
                      Acerca de{" "}
                    </NavLink>{" "}
                    {/* Agrega la ruta correcta */}{" "}
                  </li>{" "}
                  {/* <Routes>
      <Route path="/UpdateData" element={<UpdateData />} />{" "}
      <Route path="/MyPassword" element={<MyPasswordComponent />} />{" "}
      <Route path="/MiCredencial" element={<MiCredencialComponent />} />{" "}
      <Route
        path="/AccesoSinCredencial"
        element={<AccesoSinCredencialComponent />}
      />{" "}
      <Route path="/CerrarSesion" element={<CerrarSesionComponent />} />{" "}
      <Route path="/Tutorial" element={<TutorialComponent />} />{" "}
      <Route path="/AcercaDe" element={<AcercaDeComponent />} />{" "}
    </Routes>{" "} */}
                  <Routes>
                    <Route path="/UpdateData" element={<UpdateData />} />
                    <Route
                      path="/MyPassword"
                      element={<MyPasswordComponent />}
                    />
                    <Route
                      path="/MiCredencial"
                      element={<MiCredencialComponent />}
                    />
                    <Route
                      path="/AccesoSinCredencial"
                      element={<AccesoSinCredencialComponent />}
                    />
                    <Route
                      path="/CerrarSesion"
                      element={<CerrarSesionComponent />}
                    />
                    <Route path="/Tutorial" element={<TutorialComponent />} />
                    <Route path="/AcercaDe" element={<AcercaDeComponent />} />
                  </Routes>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar navbar-dark bg-dark shadow-sm">
          <div className="container">
            <NavLink to="/" className="navbar-brand d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                aria-hidden="true"
                className="mr-2"
                viewBox="0 0 24 24"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <strong>Album</strong>
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarHeader"
              aria-controls="navbarHeader"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Menu;
