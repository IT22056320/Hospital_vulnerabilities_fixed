import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { validateName, validateEmail, validatePassword, encodeHtmlEntities } from '../../utils/inputValidation';

interface RegisterProps {
  handleRegister: (username: string, email: string, password: string) => void;
  message: string;
}

const Register: React.FC<RegisterProps> = ({ handleRegister, message }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<{
    username?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = validateName(e.target.value);
    setUsername(result.sanitized);
    
    if (!result.isValid) {
      setValidationErrors(prev => ({ ...prev, username: result.errors }));
    } else {
      setValidationErrors(prev => ({ ...prev, username: undefined }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = validateEmail(e.target.value);
    setEmail(result.sanitized);
    
    if (!result.isValid) {
      setValidationErrors(prev => ({ ...prev, email: result.errors }));
    } else {
      setValidationErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    const result = validatePassword(value);
    if (!result.isValid) {
      setValidationErrors(prev => ({ ...prev, password: result.errors }));
    } else {
      setValidationErrors(prev => ({ ...prev, password: undefined }));
    }
    
    // Also validate confirm password if it's filled
    if (confirmPassword && value !== confirmPassword) {
      setValidationErrors(prev => ({ ...prev, confirmPassword: ['Passwords do not match'] }));
    } else if (confirmPassword) {
      setValidationErrors(prev => ({ ...prev, confirmPassword: undefined }));
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    if (value !== password) {
      setValidationErrors(prev => ({ ...prev, confirmPassword: ['Passwords do not match'] }));
    } else {
      setValidationErrors(prev => ({ ...prev, confirmPassword: undefined }));
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Final validation
    const usernameResult = validateName(username);
    const emailResult = validateEmail(email);
    const passwordResult = validatePassword(password);
    
    const errors: typeof validationErrors = {};
    if (!usernameResult.isValid) errors.username = usernameResult.errors;
    if (!emailResult.isValid) errors.email = emailResult.errors;
    if (!passwordResult.isValid) errors.password = passwordResult.errors;
    if (password !== confirmPassword) errors.confirmPassword = ['Passwords do not match'];
    
    setValidationErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      handleRegister(usernameResult.sanitized, emailResult.sanitized, password);
    }
    
    setIsSubmitting(false);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center">Register</h2>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={handleUsernameChange}
                isInvalid={!!validationErrors.username}
                required
              />
              {validationErrors.username && (
                <Form.Control.Feedback type="invalid">
                  {validationErrors.username.join(', ')}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
                isInvalid={!!validationErrors.email}
                required
              />
              {validationErrors.email && (
                <Form.Control.Feedback type="invalid">
                  {validationErrors.email.join(', ')}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password (min 8 chars, uppercase, lowercase, number, special char)"
                value={password}
                onChange={handlePasswordChange}
                isInvalid={!!validationErrors.password}
                required
              />
              {validationErrors.password && (
                <Form.Control.Feedback type="invalid">
                  {validationErrors.password.join(', ')}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="formConfirmPassword" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                isInvalid={!!validationErrors.confirmPassword}
                required
              />
              {validationErrors.confirmPassword && (
                <Form.Control.Feedback type="invalid">
                  {validationErrors.confirmPassword.join(', ')}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100"
              disabled={isSubmitting || Object.values(validationErrors).some(errors => !!errors)}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
          </Form>
          {message && (
            <div className="text-center mt-3">
              {encodeHtmlEntities(message)}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
