import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../store/authSlice'

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
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
      console.log("OAuth Error Trying to Authenticate: ", error)
    }
  }

  return <button className='inline-bock px-6 py-2 duration-200 hover:text-white' onClick={login}>
    Login</button>;
    
}

export default Login
