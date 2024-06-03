// uploadSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface QCResults {
  codec_name: boolean;
  profile: boolean;
  width: boolean;
  height: boolean;
  field_order: boolean;
  r_frame_rate: boolean;
  duration: boolean;
  bitrate: boolean;
  audio_codec_name: boolean;
  sample_rate: boolean;
  channels: boolean;
  channel_layout: boolean;
  audio_bitrate: boolean;
}

export interface UploadState {
  file: File | null;
  isLoading: boolean;
  error: string | null;
  qcResults: QCResults | null;
}

export interface ProfileState {
  profiles: any[];
  loading: boolean;
  error: string | null;
}



const initialUploadState: UploadState = {
  file: null,
  isLoading: false,
  error: null,
  qcResults: null,
};

const initialProfileState: ProfileState = {
  profiles: [],
  loading: false,
  error: null,
};
//change interface to "readable names" for user from "metadata"
export const propertyNamesMap: { [key in keyof QCResults]: string } = {
  codec_name: 'Video Codec',
  profile: 'Video Profile',
  width: 'Width',
  height: 'Height',
  field_order: 'Field Order',
  r_frame_rate: 'Frame Rate',
  duration: 'Video Duration',
  bitrate: 'Video Bitrate',
  audio_codec_name: 'Audio Codec',
  sample_rate: 'Audio Sample Rate',
  channels: 'Audio Channels Number',
  channel_layout: 'Audio Channels Layout',
  audio_bitrate: 'Audio Bitrate',
};



export const uploadFile = createAsyncThunk(
  'upload/uploadFile',
  async (fileInfo: { video: File; user_id: number; profile_id: number }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('filename', fileInfo.video);
      formData.append('user_id', fileInfo.user_id.toString());
      formData.append('profile_id', fileInfo.profile_id.toString());
      const response = await fetch(`http://localhost:3000/api/upload`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Upload error:', error);
      return thunkAPI.rejectWithValue('Upload failed');
    }
  }
);

export const getProfiles = createAsyncThunk(
  'profiles/getProfiles',
  async (profileInfo: { user_id: number }, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/${profileInfo.user_id}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Profile get error:', error);
      return thunkAPI.rejectWithValue('Profile fetch failed');
    }
  }
);

const uploadSlice = createSlice({
  name: 'upload',
  initialState: initialUploadState,
  reducers: {
    resetQCResults: (state) => {
      state.qcResults = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action: PayloadAction<{ QCResults: QCResults }>) => {
        state.isLoading = false;
        state.qcResults = action.payload.QCResults;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

const profileSlice = createSlice({
  name: 'profiles',
  initialState: initialProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfiles.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.profiles = action.payload;
      })
      .addCase(getProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetQCResults } = uploadSlice.actions;
export const uploadReducer = uploadSlice.reducer;
export const profileReducer = profileSlice.reducer;
