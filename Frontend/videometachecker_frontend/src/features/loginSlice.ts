import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
export interface UserLoginState {
  username: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserLoginState = {
  username: '',
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk('login/userLogin', 
  async (credentials: {username: string, password: string}, thunkAPI) =>{
    try{
      const response = await fetch('http://localhost:3000/api/login/', {
        method: 'POST', 
        headers: {
         'Content-Type': 'application/json',
        },
           body: JSON.stringify(credentials),
      })
      if(!response.ok){
        throw new Error('Network response was not ok')
      }
      const result = await response.json()
      console.log(result);
      return result
      
    }catch(error){
       console.error('Login error:', error);
      return thunkAPI.rejectWithValue('Login failed');
    }
  }
)
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers:{
    logout(state){
      state.username = ''
    }
  },
  extraReducers: (builder)=>{
    builder.addCase(login.pending, (state)=>{
      state.isLoading = true
      state.error = null 
    })
    builder.addCase(login.fulfilled, (state, action: PayloadAction<{username: string}>)=>{
      state.isLoading = false
      state.username = action.payload.username 
    })
    builder.addCase(login.rejected, (state, action: PayloadAction<any>)=>{
      state.isLoading = false
      state.error = action.payload
    })
  }
})


export const { logout } = loginSlice.actions;

export default loginSlice.reducer;