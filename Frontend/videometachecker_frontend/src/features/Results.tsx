import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../App/store';
import { QCResults, propertyNamesMap, ProbedMetadata } from './uploadSlice'; 

const Results: React.FC = () => {
  const qcResults = useSelector((state: RootState) => state.upload.qcResults);
  const probedMetadata = useSelector((state: RootState) => state.upload.probedMetadata);

  if (!qcResults || !probedMetadata) {
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
            {/* Display corresponding metadata */}
            {key in probedMetadata && (
              <span> {probedMetadata[key as keyof ProbedMetadata]}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
