import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Loader from "./Loader";

export default function AuthLayout({children, authentication = 'true'}) {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)
  const authStatus = useSelector(state => state.auth.status)

  useEffect(() => {
    if(authentication && authStatus !== authentication) {
      navigate('/')
    } else if (!authentication && authStatus !== authentication) {
      setLoader(false)
    }
    setLoader(false);
  }, [authStatus, authentication, navigate])

  return loader ? <Loader /> : <>{children}</>;
}
