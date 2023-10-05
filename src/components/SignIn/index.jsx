import React, { useState, useEffect } from "react";
import "./signin.css";
import logo from "./logo512.png";


function SignIn(props) {


 

  return <div className="modal-dialog position-absolute bg-light" role="document">
    <div className="modal-header shadow p-5 pb-4 border-bottom-0" 
    style={{
      width: "100%",
      height: "100%",
      background: "#7BA68A",
      borderRadius: "0 0 0 150px",
      boxShadow: "var(--bs-box-shadow-sm)!important"
      }}>
        <br /><br /><br /><br /><br /><br />
        <img src={logo} alt="QRChecking" 
      style={{
margin: "0",
border: "0",
padding: "0",
color: "#fff",


      }}/>
    
      <br /><br /><br /><br /><br /><br />
      </div>
        <div className="modal-content shadow">
          <div className="modal-header p-5 pb-4 border-bottom-0">
          <div className="App">
     
    </div>
             <h1 className="fw-bold mb-0 fs-2">Iniciar Sesión</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            /> 
            
          </div>

          <div className="modal-body p-5 pt-0">
            <form className="">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Correo Electronico</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control rounded-3"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label htmlFor="floatingPassword">Contraseña</label>
              </div>
              <button
                className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                type="submit"
              >
                Sign up
              </button>
              <small className="text-body-secondary">
                
              </small>
              <hr className="my-4" />
              <h2 className="fs-5 fw-bold mb-3">O utiliza estas otras opciones</h2>
              <button
                className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3"
                type="submit"
              >
                <svg className="bi me-1" width="16" height="16">
                  <use href="#twitter" />
                </svg>
                Iniciar Sesión con Twitter
              </button>
              <button
                className="w-100 py-2 mb-2 btn btn-outline-primary rounded-3"
                type="submit"
              >
                <svg className="bi me-1" width="16" height="16">
                  <use href="#facebook" />
                </svg>
                Iniciar Sesión con Facebook
              </button>
              <button
                className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3"
                type="submit"
              >
                <svg className="bi me-1" width="16" height="16">
                  <use href="#github" />
                </svg>
                Iniciar Sesión con GitHub
              </button>
            </form>
          </div>
        </div>
      </div>;
}

export default SignIn;
