import { createContext, useEffect, useState } from "react";
import { loginService } from "../services/http/auth";
import { IContext, IAuthProvider, IUser } from "../@types/IAuthContext";
import {
  deleteUserLocalStorage,
  getUserLocalStorage,
  setUserLocalStorage,
} from "../utils/localStorage";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    const user = getUserLocalStorage();

    if (user) {
      setUser(user);
    }
  }, []);

  async function authenticate(email: string, password: string) {
    const response = await loginService(email, password);
    const payload = {
      id: response.data.user.id,
      name: response.data.user.name,
      token: response.data.token,
      isAuthenticated: true,
    };

    setUser(payload);
    setUserLocalStorage(payload);
  }

  async function logout() {
    setUser(null);
    deleteUserLocalStorage();
  }

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
