// ScanQRCode.js
import React, { useState, useEffect } from 'react';
import { useAuth } from './firebaseConfig'; // Utiliza tu servicio de autenticación
import { db } from '../../firebaseConfig'; // Importa tu configuración de Firebase


function ScanQRCode({ scannedData }) {
  const { currentUser } = useAuth(); // Obtén el usuario autenticado desde tu servicio de autenticación
  const [qrCodeInfo, setQRCodeInfo] = useState(null);

  useEffect(() => {
    if (currentUser) {
      // Consulta Firebase para obtener la información del código QR
      const qrCodeRef = db.collection('qrcodes').doc(currentUser.uid);
      
      qrCodeRef.get().then((doc) => {
        if (doc.exists) {
          setQRCodeInfo(doc.data().data);
          // Realiza aquí la lógica para autenticar o ejecutar acciones con el qrCodeInfo
        }
      });
    }
  }, [currentUser]);

  return (
    <div>
      {qrCodeInfo && (
        <p>Información del código QR: {qrCodeInfo}</p>
        // Puedes realizar aquí más acciones con la información del código QR
      )}
    </div>
  );
}

export default ScanQRCode;
