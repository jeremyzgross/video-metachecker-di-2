// src/components/Dashboard.tsx

import React from 'react';
import Upload from '../features/Upload';
import { useSelector } from 'react-redux';
import { RootState } from '../App/store';
import { useNavigate } from 'react-router-dom';


const Dashboard: React.FC = () => {
  const navigate = useNavigate()

  const { first_name } = useSelector((state: RootState) => state.login);
  
  const handleProfilesClick = () => {
    navigate('/Profiles');
  };


  return (
    <div>
      <h1>Welcome to the Dashboard, {first_name}!</h1>
      <Upload />
      <button onClick={handleProfilesClick}>Profiles</button>
    </div>
  );
};

export default Dashboard;
