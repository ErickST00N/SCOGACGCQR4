import ImageUploader from "../../../components/ImageUploader"
import UpdateDataComponent from "../../../components/UpdateData"
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Alert } from "bootstrap";
import appCredenciales from "../../../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";

const auth = getAuth(appCredenciales);
const firestore = getFirestore(appCredenciales);


function UpdateData (){
  const [userLog, setUserLog] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, async (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUserLog(usuarioFirebase);
      } else {
        setUserLog(null);
      }
    });
  }, [auth, firestore]);
  return (<><UpdateDataComponent/>{userLog ? <ImageUploader />: null}</>)
  
}

export default UpdateData