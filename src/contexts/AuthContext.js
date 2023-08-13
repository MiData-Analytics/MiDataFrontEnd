import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    const login = () =>{
        setIsLoggedIn(true)
    }

    const logout = () =>{
        setIsLoggedIn(false);
    }

    return(
        <AuthContext.Provider value={{
            isLoggedIn,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
};
