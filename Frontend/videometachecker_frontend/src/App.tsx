import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './Components/WelcomePage';
import Dashboard from './Components/Dashboard';
import Profiles from './Components/Profiles';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path= "dashboard" element={<Dashboard/>}/>
        <Route path="profiles" element={<Profiles/>} />
      </Routes>
    </Router>
  );
}

export default App;
