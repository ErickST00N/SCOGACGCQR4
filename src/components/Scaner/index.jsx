import QrReader from 'react-qr-scanner';
import React, { Component } from 'react';
class Prueba extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 100,
      resultado: 'Sin resultado',
      escaneando: true, // Inicializamos en true para mostrar "Escaneando..."
    };
    this.handleScan = this.handleScan.bind(this);
  }
  handleScan(data) {
    if (data && data.text) {
      this.setState({
        resultado: data.text,
        escaneando: false,
      });
    }
  }
  
  
  handleError(err) {
    console.error(err);
  }
  render() {
    const contenedorStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    };
    const qrReaderStyle = {
      width: '320px',
      height: '240px',
      border: '2px solid #333',
      marginBottom: '20px',
    };
    const resultadoStyle = {
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
    };
    return (
      <div style={contenedorStyle}>
        <h1>Scanner de QR</h1> {/* Título agregado */}
        {this.state.escaneando && <p>Escaneando...</p>} {/* Etiqueta "Escaneando..." */}
        <QrReader
          delay={this.state.delay}
          style={qrReaderStyle}
          onError={this.handleError}
          onScan={this.handleScan}
        />
        <p style={resultadoStyle}>{this.state.resultado}</p>
      </div>
    );
  }
}
export default Prueba;