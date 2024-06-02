// src/components/Dashboard.tsx

import React from 'react';
import Upload from '../features/Upload';
import { useSelector } from 'react-redux';
import { RootState } from '../App/store';

const Dashboard: React.FC = () => {
  const { first_name } = useSelector((state: RootState) => state.login);

  return (
    <div>
      <h1>Welcome to the Dashboard, {first_name}!</h1>
      <Upload />
    </div>
  );
};

export default Dashboard;
