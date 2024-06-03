import React from 'react'
import AddProfile from '../features/AddProfile'
import { useNavigate } from 'react-router-dom';



const Profiles : React.FC = ()=>{
  const navigate = useNavigate()

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <>
    <h1>Profiles Page</h1>
    <AddProfile/>
    <button  onClick={handleDashboardClick}>Dashboard</button>
    </>
  )
}

export default Profiles