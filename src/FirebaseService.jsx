// FirebaseService.js
import { appCredenciales } from './firebaseConfig'; // Importa tu configuración de Firebase

export const storeQRCodeInfo = (userId, qrCodeData) => {
  const qrCodeRef = appCredenciales.collection('qrcodes').doc(userId);

  qrCodeRef.set({ data: qrCodeData });
}
