import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface UploadState{
  file: File | null 
  isLoading: boolean
  error: string | null 
}

const initialState: UploadState = {
  file: null,
  isLoading: false,
  error: null,
};
export const uploadFile = createAsyncThunk(
  'upload/uploadFile',
  async (file: File, thunkAPI) => {
    try {
      //ISSUE: Currently API takes user id and profiel id in the params but this is a slice 
      return file;
    } catch (error) {
      console.error('Upload error:', error);
      // If upload fails, reject the promise with an error message
      return thunkAPI.rejectWithValue('Upload failed');
    }
  }
);
const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadFile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(uploadFile.fulfilled, (state, action: PayloadAction<File>) => {
      state.isLoading = false;
      state.file = action.payload;
    });
    builder.addCase(uploadFile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default uploadSlice.reducer;