import React, { useState, useEffect } from 'react';
import { RootState, AppDispatch } from '../App/store';
import { useDispatch, useSelector } from 'react-redux';
import { getProfiles } from './uploadSlice';
import { viewProfile, ViewProfile } from './ViewProfilesSlice'; 

const ViewProfiles: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user_id } = useSelector((state: RootState) => state.login);
  const { profiles, error } = useSelector((state: RootState) => state.profiles);
  const { data, status } = useSelector((state: RootState) => state.viewProfile);

  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);

  useEffect(() => {
    if (user_id !== null) {
      dispatch(getProfiles({ user_id }));
    }
  }, [dispatch, user_id]);

  const handleProfileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProfileId = Number(event.target.value);
    setSelectedProfile(selectedProfileId);
    if (user_id !== null && selectedProfileId !== null) {
      dispatch(viewProfile({ user_id, profile_id: selectedProfileId }));
    }
  };

  // Function to retrieve 'readable' name from metadata name
  const getReadableName = (key: keyof ViewProfile): string => {
    const propertyNamesMap: { [key in keyof ViewProfile]: string } = {
      profile_name: 'Profile Name',
      codec_name: 'Video Codec',
      profile: 'Video Profile',
      width: 'Width',
      height: 'Height',
      field_order: 'Field Order',
      r_frame_rate: 'Frame Rate',
      duration: 'Video Duration',
      bitrate_min: 'Minimum Video Bitrate',
      bitrate_max: 'Maximum Video Bitrate',
      audio_codec_name: 'Audio Codec',
      sample_rate: 'Audio Sample Rate',
      channels: 'Audio Channels',
      channel_layout: 'Audio Channel Layout',
      audio_bitrate_min: 'Minimum Audio Bitrate',
      audio_bitrate_max: 'Maximum Audio Bitrate',
      bitrate: 'Bitrate',
      audio_bitrate: 'Audio Bitrate',
    };
    return propertyNamesMap[key] || key.toString();
  };

  return (
    <>
      <h1>View Profiles</h1>
      <select onChange={handleProfileChange} value={selectedProfile ?? ''}>
        <option value="" disabled>
          Select Profile
        </option>
                {profiles.map((profile) => (
          <option key={profile.id} value={profile.id}>
            {profile.profile_name}
          </option>
        ))}
      </select>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      {status === 'succeeded' && (
        <div>
          <h2>Results:</h2>
          <table>
            <thead>
              <tr>
                <th>Metadata Type</th>
                <th>Metadata</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data).map(([key, value]) => (
                <tr key={key}>
                  <td>{getReadableName(key as keyof ViewProfile)}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ViewProfiles;

