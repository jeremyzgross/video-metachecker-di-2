import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface RegisterState {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: RegisterState = {
  firstname: '',
  lastname: '',
  username: '',
  password: '',
  email: '',
  isLoading: false,
  error: null,
};

export const register = createAsyncThunk(
  'register/userRegister',
  async (credentials: { firstname: string; lastname: string; username: string; password: string; email: string }, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error('Register error:', error);
      return thunkAPI.rejectWithValue('Register failed');
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    emptyRegister(state) {
      state.firstname = '';
      state.lastname = '';
      state.username = '';
      state.password = '';
      state.email = '';
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action: PayloadAction<{ firstname: string; lastname: string; username: string; email: string; password: string }>) => {
      state.isLoading = false;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.password =  action.payload.password
    });
    builder.addCase(register.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { emptyRegister } = registerSlice.actions;

export default registerSlice.reducer;