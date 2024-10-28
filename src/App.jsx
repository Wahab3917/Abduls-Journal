import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Header, Footer } from "./components"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getUser().then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  return !loading ? (
    <>
      <Header />
      <main>
        {/* <Outlet /> */} Hello
      </main>
      <Footer />
    </>
  ) : null
}

export default App