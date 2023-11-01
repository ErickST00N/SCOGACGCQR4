// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAdffcx2vIxu9F7yON1CVFuJnI_tCXaXv0",
//   authDomain: "scogacgcqr.firebaseapp.com",
//   projectId: "scogacgcqr",
//   storageBucket: "scogacgcqr.appspot.com",
//   messagingSenderId: "56484742234",
//   appId: "1:56484742234:web:30c3fdb1a37bab67e6c463",
//   measurementId: "G-YR7GDTRW47"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDAXFHlkBghg_KQRkiIt9uIThWsTSza_bo",
  authDomain: "qrchecking-71f4d.firebaseapp.com",
  projectId: "qrchecking-71f4d",
  storageBucket: "qrchecking-71f4d.appspot.com",
  messagingSenderId: "163705923009",
  appId: "1:163705923009:web:92825060b261ee7a3a3b40",
  measurementId: "G-4E0FQ81TD5"
};
// Initialize Firebase

const appCredenciales = initializeApp(firebaseConfig);
const Analytics = getAnalytics(appCredenciales);

export default appCredenciales;
