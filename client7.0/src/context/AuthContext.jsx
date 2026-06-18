"use client";

import { createContext, useState, useContext } from "react";


export const AuthContext = createContext();

export function AuthProvider({ children , initialUser}) {
  const [user, setUser] = useState(initialUser);
  const [loadingForAuth, setLoadingForAuth] = useState(true);

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingForAuth,
        setUser,
        setLoadingForAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
