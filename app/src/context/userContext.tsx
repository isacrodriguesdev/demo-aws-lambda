import axios from "axios";
import { createContext, useEffect, useState } from "react"
import { Serverless } from "../config";
import { User } from "../models/User";

export interface IUserContext {
  logged: boolean
  error: string
  user: User,
  signIn: (username: string, password: string) => void,
  signOut: () => void
}

export const UserContext = createContext({} as IUserContext);

export default function UserProvider({ children }) {

  const [logged, setLogged] = useState(false)
  const [error, setError] = useState("")
  const [user, setUser] = useState<User>({} as User)

  useEffect(() => {
    verifyLogged()
  }, [])

  function verifyLogged(): void {
    const user = localStorage.getItem("user")
    if (user) {
      setUser(JSON.parse(user))
      setLogged(true)
    }
  }

  async function signIn(username: string, password: string): Promise<void> {
    try {
      const result = await axios.post(Serverless.API.handler("/login"), { username, password })

      if (result.data && result.data.body.error) {
        return setError(result.data.body.error)
      }

      localStorage.setItem("user", JSON.stringify(result.data.body))
      setUser(result.data.body)
      setLogged(true)

    } catch (error) {
      console.log(error)
    }
  }

  function signOut(): void {
    localStorage.clear()
    setLogged(false)
  }

  return (
    <UserContext.Provider value={{
      logged,
      signIn,
      signOut,
      user,
      error
    }}>
      {children}
    </UserContext.Provider>
  )
}