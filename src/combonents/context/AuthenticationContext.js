import React, { useEffect, useState } from 'react'
const { createContext } = require("react");

export const authContext = createContext();



export default function AuthenticationContextProvider({ children }) {

  let [token, settoken] = useState(null);

  useEffect(function () {
    if (localStorage.getItem('tkn') !== null) {
      settoken(localStorage.getItem('tkn'));
    }
  }, [])


if (localStorage.getItem('tkn')!==null) {
  token=localStorage.getItem('tkn');
}

  return <authContext.Provider value={{ token, settoken }} >
    <div>

      {children}
    </div>
  </authContext.Provider>
}
