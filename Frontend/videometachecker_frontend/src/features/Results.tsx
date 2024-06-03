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

  // Helper function to convert bitrate from bits to kilobits
  const convertBitrateToKilobits = (bitrate: number): number => {
    return bitrate / 1000;
  };

  // Helper function to format frame rate
  const formatFrameRate = (frameRate: string): string => {
    const [numerator] = frameRate.split('/');
    return `${numerator.toString()} fps`;
  };

  return (
    <div>
      <h2>Results:</h2>
      <table>
        <thead>
          <tr>
            <th>Metadata Type</th>
            <th>QC Status</th>
            <th> Uploaded File Metadata</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(qcResults).map(([key, value]) => (
            <tr key={key}>
              <td>{propertyNamesMap[key as keyof QCResults]}</td>
              <td>{value ? 'Pass' : 'Fail'}</td>
              <td>
                {key in probedMetadata && (
                  <>
                    {/* Hiding the original values from the probed */}
                    {key !== 'bitrate' && key !== 'audio_bitrate' && key !== 'width' && key !== 'height' && key !=='sample_rate' && key !== 'r_frame_rate' &&(
                      <span>{probedMetadata[key as keyof ProbedMetadata]}</span>
                    )}
                    {/* Convert bitrate to kilobits if the key is 'bitrate' */}
                    {(key === 'bitrate' || key === 'audio_bitrate') && (
                      <span>{convertBitrateToKilobits(Number(probedMetadata[key as keyof ProbedMetadata]))} kbps</span>
                    )}
                    {/* Add 'px' suffix for width and height */}
                    {(key === 'width' || key === 'height') && (
                      <span>{probedMetadata[key as keyof ProbedMetadata]} px</span>
                    )}
                    {/* Add 'kHz' suffix for sample rate */}
                    {key === 'sample_rate' && (
                      <span>{probedMetadata[key as keyof ProbedMetadata]} kHz</span>
                    )}
                    {/* Format frame rate */}
                    {key === 'r_frame_rate' && (
                      <span>{formatFrameRate(probedMetadata[key as keyof ProbedMetadata].toString())}</span>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
