import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from "./context/userContext";
import Home from "./pages/home/Index";
import Login from "./pages/login/Index";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const { logged } = useContext(UserContext)

  return logged ? <Home /> : <Login />
}

export default App;
