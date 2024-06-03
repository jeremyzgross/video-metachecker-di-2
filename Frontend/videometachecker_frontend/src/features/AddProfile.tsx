import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../App/store';
import { addProfile } from './AddProfileSlice';
import { VideoProfileFormData } from './AddProfileSlice';

const AddProfile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { status, error } = useSelector((state: RootState) => state.addProfile);
  const { user_id } = useSelector((state: RootState) => state.login);

  const [formData, setFormData] = useState<VideoProfileFormData>({
    user_id: null,
    profile_name: '',
    codec_name: 'h264',
    profile: 'main',
    width: 1920,
    height: 1080,
    field_order: 'progressive',
    r_frame_rate: '30/1',
    duration: 600,
    bitrate_min: 1900,
    bitrate_max: 3000,
    audio_codec_name: 'aac',
    sample_rate: 48000,
    channels: 2,
    channel_layout: 'stereo',
    audio_bitrate_min: 128,
    audio_bitrate_max: 192,
    bitrate: [1900, 3000],
    audio_bitrate: [128, 192],
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // sets user_id from state of login
  useEffect(() => {
    if (user_id) {
      setFormData((prevData) => ({ ...prevData, user_id }));
    }
  }, [user_id]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formDataToSend: VideoProfileFormData = {
      ...formData,
      bitrate: [formData.bitrate_min, formData.bitrate_max],
      audio_bitrate: [formData.audio_bitrate_min, formData.audio_bitrate_max],
    };
    dispatch(addProfile(formDataToSend)).then((result) => {
      if (addProfile.fulfilled.match(result)) {
        setSuccessMessage(`Profile '${formData.profile_name}' added successfully!`);
        setFormData({
          user_id: user_id,
          profile_name: '',
          codec_name: 'h264',
          profile: 'main',
          width: 1920,
          height: 1080,
          field_order: 'progressive',
          r_frame_rate: '30/1',
          duration: 600,
          bitrate_min: 1900,
          bitrate_max: 3000,
          audio_codec_name: 'aac',
          sample_rate: 48000,
          channels: 2,
          channel_layout: 'stereo',
          audio_bitrate_min: 128,
          audio_bitrate_max: 192,
          bitrate: [1900, 3000],
          audio_bitrate: [128, 192],
        });
      }
    });
  };

  return (
    <>
      <h3>Profile Form:</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Profile Name:
          <input type="text" name="profile_name" value={formData.profile_name ?? ''} onChange={handleInputChange} required/>
        </label>
        <br />
        <label>
          Codec Name:
          <input type="text" name="codec_name" value={formData.codec_name ?? ''} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Profile:
          <input type="text" name="profile" value={formData.profile ?? ''} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Width:
          <input type="number" name="width" value={formData.width ?? ''} onChange={handleInputChange} />
        px </label>
        <br />
        <label>
          Height:
          <input type="number" name="height" value={formData.height ?? ''} onChange={handleInputChange} />
        px </label>
        <br />
        <label>
          Field Order:
          <input type="text" name="field_order" value={formData.field_order ?? ''} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Frame Rate:
          <input type="text" name="r_frame_rate" value={formData.r_frame_rate ?? ''} onChange={handleInputChange} /> 
        fps</label>
        <br />
        <label>
          Duration:
          <input type="number" name="duration" value={formData.duration ?? ''} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Video Bitrate (Min):
          <input type="number" name="bitrate_min" value={formData.bitrate_min ?? ''} onChange={handleInputChange} />
        Kbps</label>
        <br />
        <label>
          Video Bitrate (Max):
          <input type="number" name="bitrate_max" value={formData.bitrate_max ?? ''} onChange={handleInputChange} />
        Kbps</label>
        <br />
        <label>
          Audio Codec Name:
          <input type="text" name="audio_codec_name" value={formData.audio_codec_name ?? ''} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Sample Rate:
          <input type="number" name="sample_rate" value={formData.sample_rate ?? ''} onChange={handleInputChange} />
        Hz</label>
        <br />
        <label>
          Channels:
          <input type="number" name="channels" value={formData.channels ?? ''} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Channel Layout:
          <input type="text" name="channel_layout" value={formData.channel_layout ?? ''} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Audio Bitrate (Min):
          <input type="number" name="audio_bitrate_min" value={formData.audio_bitrate_min ?? ''} onChange={handleInputChange} />
        Kbps</label>
        <br />
        <label>
          Audio Bitrate (Max):
          <input type="number" name="audio_bitrate_max" value={formData.audio_bitrate_max ?? ''} onChange={handleInputChange} />
        Kbps</label>
        <br />
        <button type="submit">Submit Profile</button>
      </form>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && successMessage && <p>{successMessage} Go back to dashboard to use</p>}
      {status === 'failed' && <p>Error: {error}</p>}

    </>
  );
};

export default AddProfile;
