import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const hash = window.location.hash || '';
    const params = new URLSearchParams(hash.replace(/^#/, ''));
    const token = params.get('token');
    const role = params.get('role');
    const userParam = params.get('user');
    
    if (token && role && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        
        // Use the AuthContext login method to properly set the state
        login(user, token);
        
        // Navigate to appropriate dashboard
        if (role === 'DOCTOR') navigate('/doctor-dashboard');
        else if (role === 'ADMIN') navigate('/admin-dashboard');
        else if (role === 'NURSE') navigate('/nurse-dashboard');
        else navigate('/patient-dashboard');
      } catch (error) {
        console.error('Error processing OAuth callback:', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate, login]);

  return <div>Finishing sign-in…</div>;
};

export default OAuthCallback;
