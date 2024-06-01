import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './Components/WelcomePage';
import Dashboard from './Components/Dashboard';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path= "dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
