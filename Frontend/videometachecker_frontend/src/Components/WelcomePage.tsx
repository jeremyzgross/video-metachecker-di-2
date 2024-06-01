import React, { useState } from 'react';
import Login from '../features/Login';
import Register from '../features/Register';
const WelcomePage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  return (
    <div>
      <h1>Welcome to MetaChecker!</h1>
      <p>Please {isRegistering? 'register': 'login'} to continue </p>
      {isRegistering ? <Register /> : <Login />}
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
      </button>
    </div>
  );
};

export default WelcomePage;
