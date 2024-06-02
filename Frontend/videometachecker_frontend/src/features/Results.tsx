// src/features/Results.tsx

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../App/store';

const Results: React.FC = () => {
  const qcResults = useSelector((state: RootState) => state.upload.qcResults);

  if (!qcResults) {
    return null;
  }

  return (
    <div>
      <h2>Results:</h2>
      <ul>
        {Object.entries(qcResults).map(([key, value]) => (
          <li key={key}>{key}: {value ? 'Pass' : 'Fail'}</li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
