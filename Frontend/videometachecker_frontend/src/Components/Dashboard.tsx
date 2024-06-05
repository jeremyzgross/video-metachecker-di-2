import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App/store';
import { logout } from '../features/loginSlice';
import { useNavigate } from 'react-router-dom';
import { persistor } from '../App/store';
import Upload from '../features/Upload';
import NotFound from './NotFound'; 
import ViewProfiles from '../features/ViewProfiles';
import '../styles/dashboard.css'

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { first_name } = useSelector((state: RootState) => state.login);
  
  const handleProfilesClick = () => {
    navigate('/Profiles');
  };

  const handleViewProfilesClick = ()=>{
    navigate('/viewprofiles')
  }
   const isLoggedIn = !!first_name; // Check if first_name is truthy

  if (!isLoggedIn) {
        return <NotFound />; 
  }

  const logOutHandler = () => {
    // Dispatch the logout action
    dispatch(logout());
    // Redirect to the login page or any other page after logout
    persistor.purge();
    dispatch(logout());
    navigate('/');
  }

  return (
    <div className="dashboard-container">
      <button onClick={handleProfilesClick}> Add Profiles</button>
      <button onClick={handleViewProfilesClick}>View Profiles</button>
      <button onClick={logOutHandler}>Logout</button>
      <h1>Welcome to the Dashboard, {first_name}!</h1>
      <Upload />
    </div>
  );
};

export default Dashboard;