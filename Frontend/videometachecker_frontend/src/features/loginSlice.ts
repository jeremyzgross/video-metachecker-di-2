import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface UserLoginState {
  username: string;
  isLoading: boolean;
  error: string | null;
  first_name: string;
  user_id: number | null;
}

const initialState: UserLoginState = {
  username: '',
  isLoading: false,
  error: null,
  first_name: '',
  user_id: null,
};

export const login = createAsyncThunk(
  'login/userLogin',
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3000/api/login/', {
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
      console.error('Login error:', error);
      return thunkAPI.rejectWithValue('Login failed');
    }
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout(state) {
      // Reset the state to initial values
      Object.assign(state, initialState);
    },
    resetState(state) {
      // Reset the state to initial values
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<{ username: string; first_name: string; id: number }>) => {
      state.isLoading = false;
      state.username = action.payload.username;
      state.first_name = action.payload.first_name;
      state.user_id = action.payload.id;
    });
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
      // Check if the error is due to server error (status code 500)
      if (action.payload && action.payload.status === 500) {
        // Handle the server error, you can set error message or log error
        console.error('Server error:', action.payload);
        // You can optionally dispatch an action to update the state or show an error message
        // dispatch(someErrorAction());
      }
    });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
