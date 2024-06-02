import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../App/store';
import { uploadFile, getProfiles } from './uploadSlice';

const Upload: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Extract user_id from login state
  const { user_id } = useSelector((state: RootState) => state.login);

  // State to hold the selected video file
  const [video, setVideo] = useState<File | null>(null);

  // State to hold the selected profile ID
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);

  // Extract profiles, loading and error state from profiles state
  const { profiles, loading, error } = useSelector((state: RootState) => state.profiles);

  // useEffect to fetch profiles when user_id changes
  useEffect(() => {
    if (user_id !== null) {
      dispatch(getProfiles({ user_id }));
    }
  }, [dispatch, user_id]);

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setVideo(selectedFile);
    } else {
      setVideo(null); 
    }
  };

  // Handle profile selection change
  const handleProfileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProfile(Number(event.target.value));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (video && user_id !== null && selectedProfile !== null) {
      const fileInfo = { video, user_id, profile_id: selectedProfile };
      dispatch(uploadFile(fileInfo));
    }
  };

  return (
    <>
      <div>
        <h1>File upload form</h1>
        <form onSubmit={handleSubmit} className="upload-video" encType="multipart/form-data">
          <input onChange={handleFileChange} type="file" name="filename" />
          {profiles && profiles.length > 0 && (
          <select onChange={handleProfileChange} value={selectedProfile ?? ''}>
              <option value="" disabled>Select Profile</option>
              {profiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.profile_name} 
                </option>
              ))}
            </select>
          )}
          <input type="submit" value="Check Metadata" disabled={!profiles || profiles.length === 0} />
        </form>
        {loading && <p>Loading profiles...</p>}
        {error && <p>Error loading profiles: {error}</p>}
        {!loading && profiles.length === 0 && <p>No profiles in your records. Please add a profile to use this feature.</p>}
        {!loading && profiles.length > 0 && <p>Please upload a file and select a profile. </p>}
      </div>
    </>
  );
};

export default Upload;
