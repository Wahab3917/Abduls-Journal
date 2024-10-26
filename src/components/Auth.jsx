import { useState, useEffect } from 'react'
import authService from '../appwrite/auth'

const Auth = () => {
  const [user, setUser] = useState(null)

  const handleLogout = async () => {
    authService.logoutUser();
  }

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await authService.getUser()
        setUser(userData)
      } catch (error) {
        setUser(null)
      }
    }

    checkUser()
  }, [handleLogout])

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={authService.loginWithGoogle}>Login with Google</button>
      )}
    </div>
  )
}

export default Auth