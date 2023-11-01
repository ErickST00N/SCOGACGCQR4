import AlumnosList from "../../../components/AlumnosList";
import FileUploadCsv from "../../../components/FileUploadCsv";
import { Button, Card, Alert, Table } from 'react-bootstrap';
import Users from "../../User/User";

class AgregarAlumnos extends Users {
    constructor(props) {
        super(props);
        
        // Inicializa el estado fileUploaded en MiCredencial
        this.state.fileUploaded = false; // Agrega un estado para controlar si se ha subido un archivo
    }

    handleFileUpload = (file) => {
        // Actualizar el estado para reflejar que se ha subido un archivo
        this.setState({ fileUploaded: true });
    };

    render() {
        return (
            <div> {/* Mostrar una alerta si el archivo se ha subido correctamente */}
                    {this.state.fileUploaded && (
                        <Alert variant="success" onClose={() => this.setState({ fileUploaded: false })} dismissible>
                            El archivo se ha subido correctamente.
                        </Alert>
                    )}
                <AlumnosList>
                   
                </AlumnosList>
                <FileUploadCsv onFileUpload={this.handleFileUpload} />
            </div>
        );
    }
}

export default AgregarAlumnos;
