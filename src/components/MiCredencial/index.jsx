import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import React, { Component } from "react";
import { Alert, Card } from "react-bootstrap";
import imagenPredeterminada from "../../assets/UserDefault.png";
import appCredenciales from "../../firebaseConfig";
import Users from "../../pages/User/User";
import QRCodeGenerator from "../QrCodeGenerator";
import "./credencial.css";

class MiCredencial extends Users {
  constructor(props) {
    
    super(props);
    this.state = {
      datab: getFirestore(appCredenciales),
      auth: getAuth(appCredenciales),
      miEstado: "",
      showAlert: false,
      isScreenSmall: window.innerWidth <= 768, // Agregar un estado para rastrear el tamaño de la pantalla
    };
  }

  
  componentDidMount() {
    // Configurar un escuchador de eventos para rastrear el cambio de tamaño de la pantalla
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    // Asegúrate de eliminar el escuchador de eventos al desmontar el componente
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    // Actualizar el estado `isScreenSmall` cuando cambia el tamaño de la pantalla
    this.setState({ isScreenSmall: window.innerWidth <= 768 });
  };

  render() {
    return (
      <div className="container mt-4 fondo">
        <div className="card">
          <div className="card-header text-center bg-success text-white">
            Credencial Escolar
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 text-center">
                {this.state.matricula &&
                this.state.nombre &&
                this.state.Foto ? (
                  <img
                    src={this.state.Foto}
                    alt="Foto del estudiante"
                    className="img-fluid rounded-circle left"
                    style={{
                      width: "260px",
                      height: "380px",
                      borderRadius: "15%",
                      padding: "40px",
                    }}
                  />
                ) : (
                  <img
                    src={imagenPredeterminada}
                    alt="Imagen predeterminada"
                    className="img-fluid rounded-circle left"
                    style={{
                      width: "260px",
                      height: "380px",
                      borderRadius: "15%",
                      padding: "40px",
                    }}
                  />
                )}
              </div>
              <br /> {this.state.isScreenSmall ? <hr /> : null} {/* Mostrar <hr> en función del tamaño de la pantalla */}
              <div className="col-md-6">
                <h5 className="card-title">Información del Estudiante</h5>
                <p>
                  <strong>Matrícula:</strong> {this.state.matricula}
                </p>
                <p>
                  <strong>Nombre:</strong> {this.state.nombre}
                </p>
                <p>
                  <strong>Grado:</strong> {this.state.grado}
                </p>
                <p>
                  <strong>Grupo:</strong> {this.state.grupo}
                </p>
                <p>
                  <strong>Carrera:</strong> {this.state.carrera}
                </p>
                <p>
                  <strong>Tipo de Sangre:</strong> {this.state.tipoDeSangre}
                </p>
                <p>
                  <strong>NSS (Número de Seguro Social):</strong>{" "}
                  {this.state.NSS}
                </p>
                <p>
                  <strong>Número Telefónico:</strong>{" "}
                  {this.state.numeroTelefonico}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card-footer text-center">
            <QRCodeGenerator />
          </div>
        </div>
      </div>
    );
  }
}

export default MiCredencial;
