import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import LoginForm from './LoginForm';
// import RegisterForm from './RegisterForm';
import Login from '../features/Login';
const WelcomePage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  // const navigate = useNavigate();

  // const handleLoginSubmit = (username: string, password: string) => {
  //   navigate('/dashboard');
  // };

  // const handleRegisterSuccess = () => {
  //   console.log('Register success');
  //   navigate('/dashboard');
  // };

  // const handleRegisterError = (error: string) => {
  //   console.error('Register error:', error);
  // };

  return (
    <div>
      <h1>Welcome to MetaChecker!</h1>
      <p>Please {isRegistering? 'register': 'login'} to continue </p>
      {isRegistering ? <p>Register</p> : <Login />}
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
      </button>
    </div>
  );
};

export default WelcomePage;
