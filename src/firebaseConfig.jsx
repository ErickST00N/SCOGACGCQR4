// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAdffcx2vIxu9F7yON1CVFuJnI_tCXaXv0",
    authDomain: "scogacgcqr.firebaseapp.com",
    projectId: "scogacgcqr",
    storageBucket: "scogacgcqr.appspot.com",
    messagingSenderId: "56484742234",
    appId: "1:56484742234:web:3df88174821e23dde6c463",
    measurementId: "G-583M7CDSWH"
};

// Initialize Firebase
const appCredenciales = initializeApp(firebaseConfig);
const analytics = getAnalytics(appCredenciales);

export default appCredenciales;