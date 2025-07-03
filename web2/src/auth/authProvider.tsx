import { createContext, useState } from "react";
import { loginService } from "./services/service";

export type AuthContextType = {
  isAuthenticated: boolean;
  token: string;
  error: {
    username: boolean;
    password: boolean;
  };
  login: (username: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: "",
  error: {
    username: false,
    password: false,
  },
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token") !== null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [error, setError] = useState({
    username: false,
    password: false,
  });

  const login = async (username: string, password: string) => {
    const data = await loginService(username, password);
    console.log(data);
    if (data) {
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      setToken(data.token);
    } else {
      setError({
        username: true,
        password: true,
      });
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken("");
  };

  const value = { isAuthenticated, token, login, logout, error };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
