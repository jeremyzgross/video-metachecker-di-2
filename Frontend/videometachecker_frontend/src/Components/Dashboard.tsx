import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App/store';
import { logout } from '../features/loginSlice';
import { useNavigate } from 'react-router-dom';
import { persistor } from '../App/store';
import Upload from '../features/Upload';
import NotFound from './NotFound'; 
import '../styles/dashboard.css'

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { first_name } = useSelector((state: RootState) => state.login);
  
  const handleProfilesClick = () => {
    navigate('/Profiles');
  };
   const isLoggedIn = !!first_name; // Check if first_name is truthy

  if (!isLoggedIn) {
    // navigate('/404'); // Redirect to the 404 page if not logged in
    // return null; // Render nothing for this component
        return <NotFound />; // Render the NotFound component if not logged in
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
      <button onClick={logOutHandler}>Logout</button>
      <h1>Welcome to the Dashboard, {first_name}!</h1>
      <Upload />
      <button onClick={handleProfilesClick}>Profiles</button>
    </div>
  );
};

export default Dashboard;