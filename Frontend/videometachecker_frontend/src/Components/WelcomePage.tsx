import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const WelcomePage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = (username: string, password: string) => {
    console.log('Login - Username:', username, 'Password:', password);
    // Handle login logic here
    navigate('/dashboard');
  };

  const handleRegisterSuccess = () => {
    console.log('Register success');
    // Handle registration success logic here
    navigate('/dashboard');
  };

  const handleRegisterError = (error: string) => {
    console.error('Register error:', error);
    // Handle registration error, e.g., display an error message
  };

  return (
    <div>
      <h1>Welcome to MetaChecker!</h1>
      <p>Please {isRegistering ? 'register' : 'login'} to continue.</p>
      {isRegistering ? (
        <RegisterForm onSuccess={handleRegisterSuccess} onError={handleRegisterError} />
      ) : (
        <LoginForm onSubmit={handleLoginSubmit} onSuccess={handleRegisterSuccess} onError={handleRegisterError} />
      )}
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
      </button>
    </div>
  );
};

export default WelcomePage;
