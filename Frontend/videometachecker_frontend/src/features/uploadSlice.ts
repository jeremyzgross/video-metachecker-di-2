import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector  } from 'react-redux'
import { RootState, AppDispatch } from '../App/store'

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
  async (fileInfo:{video: File, user_id: Number, profile_id: Number}, thunkAPI) => {
    try {
    const formData = new FormData();
    formData.append('filename', fileInfo.video);
    formData.append('user_id', fileInfo.user_id.toString());
    formData.append('profile_id', fileInfo.profile_id.toString());
      const response = await fetch(`http://localhost:3000/api/upload`,{
        method: 'POST',
        body: formData
      })
      if(!response.ok){
        throw new Error('Network response was not ok')
      }
      const result = await response.json()
      console.log(result);
      return result

      // return file;
    } catch (error) {
      console.error('Upload error:', error);
      // If upload fails, reject the promise with an error message
      return thunkAPI.rejectWithValue('Upload failed');
    }
  }
);
//ADD ANOTHER CREATE ASYNC THUNK FOR GET PROFILES
//MAKE ANOTHER GET ROUTE FOR ALL PROFILES ASSOCIATED WITH USER
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