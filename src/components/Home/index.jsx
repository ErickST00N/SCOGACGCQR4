import React from "react";

import Logo from "./img/logo.jpg";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      {/* Responsive navbar*/}

      <div className="container px-4 px-lg-5 bg-image" />

      {/* Page Content*/}
      <div className="container px-4 px-lg-5 bg-image">
        {/* Heading Row*/}
        <div className="row gx-4 gx-lg-5 align-items-center my-5">
          <p>
            <br />
          </p>
          <div className="col-lg-7 mx-auto text-center">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src={Logo}
              alt="..."
            />
          </div>
          <div className="col-lg-5 text-center">
            <h1 className="font-weight-light mx-auto text-center">
              Controla tu acceso y protege tu identidad{" "}
            </h1>
            <p>
              <br />
            </p>
            <Link className="btn btn-success mx-auto " to="/Login">
              Iniciar Sesion
            </Link>
            <p>
              <br />
            </p>
          </div>
        </div>
      </div>

      <div className="container px-4 px-lg-5 bg-white">
        {/* Heading Row*/}
        <div className="row gx-4 gx-lg-5 align-items-center my-5">
          {/* Contenido actual */}
        </div>

        {/* Nuevo elemento contenedor con fondo verde */}
        <div className="bg-green text-center">
          {/* Call to Action*/}
          <div className=" my-5 py-3 text-center">
            <div>
              <h2 className=" card-title font-weight-bold text-black m-0">
                Con QRChecking podrás:
                <p />
              </h2>
            </div>
          </div>
          {/* Content Row*/}
          <div className="row gx-4 gx-lg-5">
            <div className="col-md-4 mb-5">
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="card-title">Obtener tu credencial digital</h2>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="card-title">
                    Generar código QR para tener acceso a la universidad
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="card-title">Gestionar información personal</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
