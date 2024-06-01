// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/loginSlice'
import registerReducer from '../features/registerSlice'
const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer
  },
});

export default store;
//RootState represents the global state of the Redux store
export type RootState = ReturnType<typeof store.getState>;
//AppDispatch ensures that the useDispatch hook knows the type of actions that can be dispatched.
export type AppDispatch = typeof store.dispatch;