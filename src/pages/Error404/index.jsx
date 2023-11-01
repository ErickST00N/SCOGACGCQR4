import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import Logo from "../../assets/logo192.png";

function Error404() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <Alert
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
            style={{display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            alignContent: "center",
            alignItems: "center",}}
          >
            <img
              src={Logo}
              alt="Error 404 - Pagina No Encontrada"
              style={{
                width: "20%",
                height: "20%%",
                objectFit: "cover"
                
              }}
            />
            <div className="container">
              <h1 className="display-4 text-center">Error 404</h1>
              <p className="lead text-center">Página no encontrada</p>
              <Link to="/" className="btn btn-primary">
                Regresar a inicio
              </Link>
            </div>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}

export default Error404;
