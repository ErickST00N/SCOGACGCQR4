import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Alert } from "react-bootstrap";
import appCredenciales from "../../firebaseConfig";

const auth = getAuth(appCredenciales);

function Restorepassword() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        setError("Error al enviar el correo de restablecimiento: " + error.message);
      });
  };

  return (
    <div className="container-md modal-dialog bg-light" role="document">
      <div className="modal-content shadow">
        <div className="modal-header p-5 pb-4 border-bottom-0">
          <h1 className="display-1">Restablecer Contraseña</h1>
          <Link to="/" className="btn-close" aria-label="Close" />
        </div>

        <div className="modal-body p-5 pt-0">
          {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}
          {success && (
            <Alert variant="success">
              Se ha enviado un correo de restablecimiento de contraseña.
            </Alert>
          )}
          <form>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control rounded-3"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Correo Electrónico</label>
            </div>
            <button
              className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
              type="button"
              onClick={handleResetPassword}
            >
              Restablecer Contraseña
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Restorepassword;
