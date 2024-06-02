import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface UploadState {
  file: File | null;
  isLoading: boolean;
  error: string | null;
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
};

const initialProfileState: ProfileState = {
  profiles: [],
  loading: false,
  error: null,
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
      console.log(result);
      return result;
      
    } catch (error) {
      console.error('Upload error:', error);
      return thunkAPI.rejectWithValue('Upload failed');
    }
  }
);

export const getProfiles = createAsyncThunk(
  'userProfiles/getProfiles',
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

// Define the slice
const uploadSlice = createSlice({
  name: 'upload',
  initialState: initialUploadState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action: PayloadAction<File>) => {
        state.isLoading = false;
        state.file = action.payload;
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

export const uploadReducer = uploadSlice.reducer;
export const profileReducer = profileSlice.reducer;
