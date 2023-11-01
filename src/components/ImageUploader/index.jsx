/**
 *
 * @import
 * En esta sección, se importan los módulos necesarios de React y
 * Firebase para crear un componente. Luego, se define el componente
 * llamado ImageUploader. Se utilizan estados (useState) para almacenar
 * información sobre la imagen seleccionada, la URL de la imagen y el progreso
 * de carga. También se utilizan referencias (useRef) para acceder a elementos
 *  del DOM, como el elemento de video y el lienzo.
 */
// Importación de módulos necesarios de React y Firebase
import React, { useState, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect } from "react";
import Bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import appCredenciales from "../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { Alert } from "bootstrap";


// Definición del componente ImageUploader
const ImageUploader = () => {
  // Declaración de estados utilizando el hook useState
  const [selectedImage, setSelectedImage] = useState(null); // Para almacenar la imagen seleccionada
  const [imageURL, setImageURL] = useState(""); // Para almacenar la URL de la imagen
  const [uploadProgress, setUploadProgress] = useState(0); // Para el progreso de la carga
  const [cameraDevices, setCameraDevices] = useState([]); // Para almacenar la lista de cámaras disponibles
  const [isCameraPaused, setIsCameraPaused] = useState(false);
  const [isCameraPlaying, setIsCameraPlaying] = useState(true);
  const [pauseButtonText, setPauseButtonText] = useState("Pausar Cámara");
  
  // Refs para acceder a elementos del DOM
  const videoRef = useRef(); // Para acceder al elemento de video
  const canvasRef = useRef(); // Para acceder al elemento de lienzo (canvas)

  /**
   * @function handleCameraStart
   * Es una función asincrónica que intenta acceder a la cámara
   * del dispositivo. Utiliza navigator.mediaDevices.getUserMedia para obtener un
   * flujo de video y lo asigna al elemento de video (videoRef.current).
   * Si no se puede acceder a la cámara, muestra un mensaje de error en la consola.
   */
  // Función para iniciar la cámara
  const handleCameraStart = async (deviceId) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId,
          aspectRatio: 3 / 4, // Establece la relación de aspecto a 16:9
        },
      });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("No se pudo acceder a la cámara: ", error);
    }
  };

  useEffect(() => {
    async function loadCameraDevices() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
        setCameraDevices(videoDevices);
      } catch (error) {
        console.error("Error al obtener la lista de cámaras: ", error);
      }
    }
    

    loadCameraDevices();
  }, []);

  /**
   * @function handleCameraStop
   * Es una función que detiene la cámara al detener todos los
   * tracks del flujo de video (stream) obtenidos del elemento de video.
   */
  // Función para detener la cámara
  const handleCameraStop = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  /**
   * @function handleCapture
   * Es una función que toma una instantánea de la cámara.
   * Captura el fotograma actual del video, lo convierte en un objeto de imagen (blob),
   * lo almacena en selectedImage y muestra la imagen en la página. También
   * detiene la cámara después de tomar la foto.
   */
  // Función para capturar una imagen de la cámara
  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = (video.videoWidth * 4) / 3; // Ajusta la altura al aspecto 16:9
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      setSelectedImage(new File([blob], "FotoPerfil.jpg"));
      setImageURL(URL.createObjectURL(blob));
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }, "image/jpg");
  };

  /**
   * @function handleImageUpload
   * Es una función que carga la imagen capturada en Firebase Storage.
   * Verifica si el usuario está autenticado y luego inicia la carga de la imagen.
   * Muestra el progreso de carga y obtiene la URL de la imagen una vez que la
   * carga está completa.
   */
  // Función para cargar la imagen en Firebase Storage
  const handleImageUpload = async () => {
    if (selectedImage) {
      try {
        const auth = getAuth(appCredenciales);
        const user = await new Promise((resolve) => {
          onAuthStateChanged(auth, (user) => {
            resolve(user);
          });
        });
  
        if (user) {
          const uid = user.uid;
          const storage = getStorage(appCredenciales);
          
          // Genera un nombre de archivo único para la imagen
          const fileName = `${selectedImage.name}`;
          const storageRef = ref(storage, `${uid}/Fotos/${fileName}`);
  
          // Sube la imagen y espera a que se complete
          await uploadBytes(storageRef, selectedImage);
  
          // Obtiene la URL de descarga de la imagen
          const downloadURL = await getDownloadURL(storageRef);
  
          console.log("URL de la imagen: ", downloadURL);
          alert("Foto subida, accede al link con: ", downloadURL)
        } else {
          // El usuario no está autenticado, muestra un mensaje de error o redirige a la página de inicio de sesión.
          alert("El usuario no está autenticado.");
        }
      } catch (error) {
        console.error("Error al subir la imagen: ", error);
      }
    }
  };
  
  


  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <div className="video-container">
                <video ref={videoRef} autoPlay muted style={{width: "-webkit-fill-available"}}></video>
                <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
              </div>

              <div className="btn-group mb-3">
                <select
                  className="form-select"
                  onChange={(e) => handleCameraStart(e.target.value)}
                >
                  <option value="">Selecciona una cámara</option>
                  {cameraDevices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label}
                    </option>
                  ))}
                </select>
              </div>

              {selectedImage ? (
                <div className="preview-container">
                  <img
                    src={imageURL}
                    alt="Imagen capturada"
                    className="img-thumbnail"
                  />
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      onClick={handleImageUpload}
                      className="btn btn-primary me-md-2"
                    >
                      Subir imagen
                    </button>
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        setImageURL("");
                      }}
                      className="btn btn-success"
                    >
                      Tomar Otra Foto
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="btn btn-success btn-block w-100"
                  onClick={handleCapture}
                >
                  Tomar Foto
                </button>
              )}

              <button
                className="btn btn-danger btn-block w-100 mt-3"
                onClick={handleCameraStop}
              >
                Detener Cámara
              </button>
              {uploadProgress > 0 && (
                <p>Progreso de carga: {uploadProgress}%</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
