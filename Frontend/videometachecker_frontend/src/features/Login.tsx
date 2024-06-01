import React, { useState } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { RootState, AppDispatch } from '../App/store'
import { logout, login } from './loginSlice'
const Login: React.FC = ()=>{
  const dispatch: AppDispatch = useDispatch() //dispatch actions
  const { username, isLoading, error } = useSelector((state: RootState) => state.login); //state values
  const [credentials, setCredentials] = useState({username: '', password: ''})

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };
   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(credentials));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

    return (
    <div>
      <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" name="username" value={credentials.username} onChange={handleChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" value={credentials.password} onChange={handleChange} />
          </div>
          <button type="submit" disabled={isLoading}>Login</button>
        </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};
export default Login;
