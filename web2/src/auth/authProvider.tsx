import { createContext, useCallback, useEffect, useState } from "react";
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
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") !== null,
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [error, setError] = useState({
    username: false,
    password: false,
  });
  const [timer, setTimer] = useState<number | undefined>();

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const data = await loginService(username, password);
    console.log(data);
    if (data) {
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      setToken(data.token);
      setTimer(
        setTimeout(
          () => {
            setIsAuthenticated(false);
            setToken("");
            localStorage.removeItem("token");
          },
          (data?.expires ?? 3600) * 1000,
        ),
      );
    } else {
      setError({
        username: true,
        password: true,
      });
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setToken("");
    localStorage.removeItem("token");
  }, []);

  const value = { isAuthenticated, token, login, logout, error };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
