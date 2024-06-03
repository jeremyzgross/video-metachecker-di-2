import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../App/store';
import { addProfile } from './AddProfileSlice';
import { VideoProfileFormData } from './AddProfileSlice';

const AddProfile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { status, error } = useSelector((state: RootState) => state.addProfile);

  const [formData, setFormData] = useState<VideoProfileFormData>({
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
    dispatch(addProfile(formDataToSend));
  };

  return (
    <>
      <h3>Profile Form:</h3>
      <form onSubmit={handleSubmit}>
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
        </label>
        <br />
        <label>
          Height:
          <input type="number" name="height" value={formData.height ?? ''} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Field Order:
          <input type="text" name="field_order" value={formData.field_order ?? ''} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Frame Rate:
          <input type="text" name="r_frame_rate" value={formData.r_frame_rate ?? ''} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Duration:
          <input type="number" name="duration" value={formData.duration ?? ''} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Bitrate (Min):
          <input type="number" name="bitrate_min" value={formData.bitrate_min ?? ''} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Bitrate (Max):
          <input type="number" name="bitrate_max" value={formData.bitrate_max ?? ''} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Audio Codec Name:
          <input type="text" name="audio_codec_name" value={formData.audio_codec_name ?? ''} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Sample Rate:
          <input type="number" name="sample_rate" value={formData.sample_rate ?? ''} onChange={handleInputChange} />
        </label>
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
        </label>
        <br />
        <label>
          Audio Bitrate (Max):
          <input type="number" name="audio_bitrate_max" value={formData.audio_bitrate_max ?? ''} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Submit Profile</button>
      </form>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && <p>Profile added successfully!</p>}
      {status === 'failed' && <p>Error: {error}</p>}
    </>
  );
};

export default AddProfile;
