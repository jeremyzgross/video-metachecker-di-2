// src/features/Results.tsx

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../App/store';
import { QCResults, propertyNamesMap } from './uploadSlice'; 
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
          <li key={key}>
            <span>{propertyNamesMap[key as keyof QCResults]}:</span>
            <span>{value ? ' Pass' : ' Fail'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
