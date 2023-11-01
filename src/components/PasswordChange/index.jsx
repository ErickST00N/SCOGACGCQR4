import React, { useState } from 'react';
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { Alert, Button, Form } from 'react-bootstrap';
import appCredenciales from '../../firebaseConfig';

const auth = getAuth(appCredenciales);

function PasswordChange() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const user = auth.currentUser;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = () => {
    setError(null);

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('Please complete all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('The new password and confirmation do not match.');
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, oldPassword);

    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, newPassword)
          .then(() => {
            setSuccess(true);
            alert('Password changed successfully');
          })
          .catch((error) => {
            setError('Error changing the password: ' + error.message);
          });
      })
      .catch((error) => {
        setError('Error reauthenticating: ' + error.message);
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '400px' }}>
        <h2>Cambio de Contraseña</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">Contraseña cambiada con éxito.</Alert>}
        <Form onSubmit={handleChangePassword}>
          <Form.Group className="mb-3" controlId="oldPassword">
            <Form.Label>Contraseña Actual</Form.Label>
            <div className="password-input">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña Actual"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <Button className="password-toggle-button" variant="outline-secondary" onClick={togglePasswordVisibility}>
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </Button>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="newPassword">
            <Form.Label>Nueva Contraseña</Form.Label>
            <div className="password-input">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Nueva Contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Button className="password-toggle-button" variant="outline-secondary" onClick={togglePasswordVisibility}>
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </Button>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirmar Nueva Contraseña</Form.Label>
            <div className="password-input">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirmar Nueva Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button className="password-toggle-button" variant="outline-secondary" onClick={togglePasswordVisibility}>
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </Button>
            </div>
          </Form.Group>
          <Button variant="primary" onClick={handleChangePassword}>
            Cambiar Contraseña
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default PasswordChange;
