import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import appCredenciales from "../../firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Alert } from "bootstrap";

const auth = getAuth(appCredenciales);
const firestore = getFirestore(appCredenciales);

function QRCodeGenerator() {
  const [data, setData] = useState("");
  const [qrSize, setQrSize] = useState(256);
  const [userLog, setUserLog] = useState(null);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setQrSize(300); // Tamaño en la vista móvil
    } else {
      setQrSize(300); // Tamaño en la vista de escritorio
    }
  };
  useEffect(() => {
    // Escuchar el evento de cambio de tamaño de la ventana
    window.addEventListener("resize", handleResize);

    // Asegurarse de eliminar el oyente del evento al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, async (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUserLog(usuarioFirebase);
        const userDocRef = doc(firestore, "Usuarios", usuarioFirebase.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          // Datos encontrados en Firestore
          const userData = userDocSnapshot.data();
          setData("".concat(userData.Matricula, usuarioFirebase.uid));
        }
      } else {
        setUserLog(null);
        setData("");
      }
    });
  }, [auth, firestore]);

  return (
    <div className="qr-code-container">
      {userLog ? (
        <QRCode
          size={qrSize}
          value={data}
          viewBox={`0 0 256 256`}
          
        />
      ) : null}
    </div>
  );
}

export default QRCodeGenerator;
