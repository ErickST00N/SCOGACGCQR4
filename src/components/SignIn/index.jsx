import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo512.png";
import "./signin.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import appCredenciales from "../../firebaseConfig";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Alert } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

// Inicializa Firebase Authentication
const auth = getAuth(appCredenciales);

function Sign(TipoUser = "Usuarios") {
  const [showAlert, setShowAlert] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaValido, setcaptchaValido] = useState(false);
  const navigate = useNavigate();
  const captcha = useRef(null);

  // Función para manejar el cambio en el reCAPTCHA
  const onChange = async (value) => {
    console.log("Captcha value:", value);
    if (captcha.current.getValue()) {
      console.log("El usuario no es un robot");
      setcaptchaValido(true);
    }
  };

  // Función para manejar el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    setShowAlert(true);

    if (captchaValido) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        //const user = userCredential.user;
        // Accede a Firebase Firestore para obtener los datos del usuario
        const db = getFirestore(appCredenciales);
        const usuariosRef = collection(db, TipoUser);
        const q = query(usuariosRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          const userWithDetails = { email, ...userData };
          setSuccess(false);
          //alert("Inicio de Sesión: " + email);
          console.log("Usuario encontrado:", userWithDetails);
          // Redirige a la página de Perfil de la Dirección con los datos del usuario
          navigate("/MiCredencial", { state: { user: userWithDetails } });
        } else {
        }
      } catch (error) {
        setError("Error de inicio de sesión: " + error.message);
        if (!email) {
          setError("Por favor ingresa el correo");
        }
        if (!password) {
          setError("Por favor ingresa la contraseña");
        }
        if(!email && !password){
          setError("Ingresa el Correo y la Contraseña");
        }
        setSuccess(false);
        console.error("Error de inicio de sesión:", error);
      }
    } else {
      setSuccess(false);
      setError("Por favor completa el Recaptcha");
    }
  };

  return (
    <div
      className="container modal-dialog signing shadow position-absolute"
      role="document"
    >
      <div className="modal-content ">
        <div className="modal-header p-5 pb-4 border-bottom-0">
          <div className="App">
          <Link
          to="/"
          className="btn-close"
          aria-label="Close"
          onClick={() => console.log("Link clicked")}
        />
            <h1 className="display-1">Sign In</h1>
          </div>
        </div>

        <div className="modal-body p-5 pt-0">
          {error && showAlert && (
            <Alert
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {error}
            </Alert>
          )}
          {success && (
            <Alert variant="success">Inicio de sesión exitoso.</Alert>
          )}
          <form onSubmit={handleLogin}>
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
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control rounded-3"
                id="floatingPassword"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Contraseña</label>
            </div>
            <div className="recaptcha">
              <ReCAPTCHA
                sitekey="6LdT7egoAAAAAGxoR9BZsBoj9SKxAEk-2MZS8QPn"
                onChange={onChange}
                ref={captcha}
              />
            </div>
            <button
              className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
              type="submit"
            >
              Sign In
            </button>
            <small className="text-body-secondary left">
              <p className="link-offset-1-hover link-danger">
                ¿Olvidaste tu contraseña?
                <Link to="/reset-password">Restablecerla aquí</Link>
              </p>
            </small>

            <hr className="my-4" />
            <h2 className="fs-5 fw-bold mb-3">
              O utiliza estas otras opciones
            </h2>
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
    </div>
  );
}

export default Sign;
