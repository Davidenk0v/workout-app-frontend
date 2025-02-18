import { useState, useContext, useEffect, createContext } from "react";

import type { AuthProviderProps } from "../utils/types";
import { isValidToken } from "../utils/jwtHelper.ts";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    const tokens = JSON.parse(localStorage?.getItem("token") || "{}");
    const accessToken = tokens.token;
    if (accessToken && isValidToken(accessToken)) {
      setIsLoggedIn(true);
    } else {
      //Si hay accessToken pero no es valido
      logout();
    }
  }, []);

  //Cada 5 minutos se verifica si el token sigue siendo valido
  setTimeout(() => {
    const tokens = JSON.parse(localStorage.getItem("token") || "{}");
    isValidToken(tokens.token);
  }, 1000 * 60 * 5);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
