import axios from "axios";
import { createContext, useEffect, useState } from "react"
import { Serverless } from "../config";

export const UserContext = createContext({
  logged: false,
  error: "",
  user: {},
  signIn: () => null,
  signOut: () => null
});

export default function UserProvider({ children }) {

  const [logged, setLogged] = useState(false)
  const [error, setError] = useState("")
  const [user, setUser] = useState({})

  useEffect(() => {
    verifyLogged()
  }, [])

  function verifyLogged() {
    const user = localStorage.getItem("user")
    if (user) {
      setUser(JSON.parse(user))
      setLogged(true)
    }
  }

  async function signIn(username, password) {
    try {
      const result = await axios.post(Serverless.API.handler("/login"), { username, password })

      if(result.data && result.data.body.error) {
        return setError(result.data.body.error)
      }

      localStorage.setItem("user", JSON.stringify(result.data.body))
      setUser(result.data.body)
      setLogged(true)

    } catch (error) {
      console.log(error)
    }
  }

  async function signOut() {
    localStorage.clear("user")
    setLogged(false)
  }

  return (
    <UserContext.Provider value={{
      logged,
      signIn,
      signOut,
      error,
      user
    }}>
      {children}
    </UserContext.Provider>
  )
}