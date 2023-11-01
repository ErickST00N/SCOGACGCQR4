import React, { Component } from "react";
import Error404 from "../Error404";
import { Col, Container, Row, Alert } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";

class DeviceInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceName: "N/A",
      ipv4: "N/A",
    };
  }

  componentDidMount() {
    // Obtener el nombre del dispositivo (generalmente no está disponible en la web)
    this.setState({ deviceName: window.navigator.platform });

    // Obtener la dirección IPv4
    fetch("https://api64.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => this.setState({ ipv4: data.ip }))
      .catch((error) =>
        console.error("Error al obtener la dirección IPv4:", error)
      );
  }

  render() {
    const { deviceName, ipv4 } = this.state;
    return (
      <div>
        <h2>Información del Dispositivo:</h2>
        <p>
          <strong>Nombre del Dispositivo:</strong> {deviceName}
        </p>
        <p>
          <strong>Dirección IPv4:</strong> {ipv4}
        </p>
      </div>
    );
  }
}

function DataBaseConfig() {
  const [widthVideo, setWidthVideo] = useState(760);
  const [heightVideo, setHeightVideo] = useState(515);
  const [showAlert, setShowAlert] = useState(true);

  const updateVideoSize = () => {
    if (window.innerWidth <= 1000) {
      setWidthVideo(400);
      setHeightVideo(305);
    } else {
      setWidthVideo(760);
      setHeightVideo(515);
    }
  };

  useEffect(() => {
    updateVideoSize(); // Llama a la función para establecer el tamaño inicial del video.

    // Agrega un event listener para escuchar cambios en el ancho de la ventana.
    window.addEventListener("resize", updateVideoSize);

    return () => {
      // Limpia el event listener cuando el componente se desmonta.
      window.removeEventListener("resize", updateVideoSize);
    };
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <Error404 />

          <Alert
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <h1>¿Nos quieres ver la cara de estupida?</h1>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                width= {widthVideo}
                height= {heightVideo}
                src="https://www.youtube-nocookie.com/embed/VyzgSJWHNL8?si=9gQIx53XE99iwRYr&start=13"
                title="¿Me quieres ver la cara de estupida?"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                autoPlay
              />
            </div>

            <div className="container">
              <DeviceInfo />
            </div>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}

export default DataBaseConfig;
