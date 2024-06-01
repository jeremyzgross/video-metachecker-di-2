import React from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { RootState, AppDispatch } from '../App/store'
import { logout, login } from './loginSlice'
const Login: React.FC = ()=>{
  const dispatch: AppDispatch = useDispatch() //dispatch actions
  const { username, isLoading, error } = useSelector((state: RootState) => state.login); //state values

  return(
    <>
    </>
  )
}

export default Login;
