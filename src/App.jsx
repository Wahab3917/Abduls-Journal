import React, { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Header, Footer } from "./components"

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getUser().then((userData) => {
      if (userData) {
        dispatch(login({userData}));
      } else {
        dispatch(logout());
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setLoading(false);
    })
  }, [dispatch]);

  const handleLoginWithGoogle = () => {
    authService.loginWithGoogle(dispatch);
  }

  const handleLogout = () => {
    authService.logoutUser(dispatch);
  }

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
        <Header onLogin={handleLoginWithGoogle} onLogout={handleLogout} />
          <main>
            <Outlet />
          </main>
        {/* <Footer /> */}
      </div>
    </div>
  ) : <p>Loading...</p>
}

export default App