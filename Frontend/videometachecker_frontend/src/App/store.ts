// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/loginSlice'
import registerReducer from '../features/registerSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import {uploadReducer} from '../features/uploadSlice'
import { profileReducer } from '../features/uploadSlice';

const persistConfig = {
  key: 'root',
  storage,
};
const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    upload: uploadReducer,
    profiles: profileReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);

// export default store;
//RootState represents the global state of the Redux store
export type RootState = ReturnType<typeof store.getState>;
//AppDispatch ensures that the useDispatch hook knows the type of actions that can be dispatched.
export type AppDispatch = typeof store.dispatch;