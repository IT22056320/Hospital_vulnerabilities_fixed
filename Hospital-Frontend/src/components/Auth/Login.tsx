// src/pages/Login.tsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { validateEmail, validatePassword, encodeHtmlEntities } from '../../utils/inputValidation';

interface LoginProps {
  handleLogin: (email: string, password: string) => void;
  message: string;
}

const Login: React.FC<LoginProps> = ({ handleLogin, message }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<{ email?: string[]; password?: string[] }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
    
    // Basic validation for login (not as strict as registration)
    if (value.length < 6) {
      setValidationErrors(prev => ({ ...prev, password: ['Password must be at least 6 characters'] }));
    } else {
      setValidationErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Final validation
    const emailResult = validateEmail(email);
    const passwordResult = validatePassword(password);
    
    const errors: { email?: string[]; password?: string[] } = {};
    if (!emailResult.isValid) errors.email = emailResult.errors;
    if (!passwordResult.isValid) errors.password = passwordResult.errors;
    
    setValidationErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      handleLogin(emailResult.sanitized, password);
    }
    
    setIsSubmitting(false);
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <Row className="w-100">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              <Form onSubmit={onSubmit}>
                <Form.Group controlId="formBasicEmail">
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

                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
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

                <div className="d-grid gap-2 mt-4">
                  <Button 
                    variant="primary" 
                    type="submit"
                    disabled={isSubmitting || !!validationErrors.email || !!validationErrors.password}
                  >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => {
                      // Kick off OAuth by navigating to backend; it will set PKCE cookie and redirect to provider
                      window.location.href = 'http://localhost:3000/api/v1/auth/oauth/login';
                    }}
                  >
                    Login with OAuth
                  </Button>
                </div>
              </Form>
              {message && (
                <div className="mt-3 text-center text-danger">
                  {encodeHtmlEntities(message)}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
