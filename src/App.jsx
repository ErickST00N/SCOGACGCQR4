import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import './App.css';
import appCredenciales from './firebaseConfig';
import { getAuth, onAuthStateChanged, updateCurrentUser } from 'firebase/auth';
import Loging from "./components/Loging";
import Home from './components/Home';


const auth = getAuth(appCredenciales);

function App() {
  const [matricula, setMatricula] = useState("");
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [usuario, setUsuario] = useState(null);

  useEffect(() => { 
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase);
      } else {
        setUsuario(null);
      }
    });

    return () => {
      // Realizar limpieza cuando el componente se desmonta, si es necesario
      unsubscribe();
    };
  }, []);

  const handleChange = (event) => {
    setMatricula(event.target.value);
  };

  const handleSubmit = () => {
    setQrCodeValue(matricula);
  };

  return (
    <>
    <div className="App">
      {usuario ? <Home correoUser={usuario.email} /> : <Loging />}
      <header className="App-header">
        {/* Resto de tu componente */}
      </header>
    </div>
    <div className="App">
        
        <header className="App-header">
          <QRCode
            value={qrCodeValue}
            bgColor={"cyan"}
            fgColor={"#000"}
            level={"M"}
            size={"256"}
            viewBox={`0 0 256 256`}
            title={qrCodeValue}
          />
          <input
          type="text"
          name="matricula"
          value={setMatricula}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Generar QR</button>
        </header>{" "}
      </div>
    </>
  );
}

export default App;
