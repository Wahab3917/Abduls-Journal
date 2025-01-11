import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../store/authSlice'

function Login() {
  // const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    // setError("");
    try {
      const session = await authService.loginWithGoogle()
      if (session) {
        const userData = await authService.getUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      // setError(error.message);
      console.log("OAuth Error Trying to Authenticate: ", error)
    }
  }

  return <button className='inline-bock px-6 py-2 duration-200 hover:text-white' onClick={login}>
    Login</button>;

  // return (
  //   <>
  //     <button onClick={login}>Login</button>
  //     {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
  //   </>
  // )
}

export default Login
