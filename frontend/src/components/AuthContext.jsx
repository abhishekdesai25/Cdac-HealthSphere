import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        patient: null,
        doctor: null,
        admin: null
    });

  return (
    <AuthContext.Provider value={{authState, setAuthState}}>
        {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);