/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import axiosInstance from "../../api/axios";

interface User {
  name?: string;
  email?: string;
  token?: string;
  role: 1 | 2; // 1: user, 2: admin
  googleProfilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");

    if (storedToken && storedRole) {
      setUser({
        token: storedToken,
        role: parseInt(storedRole) as 1 | 2,
        name: storedName || undefined,
        email: storedEmail || undefined,
      });
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    localStorage.setItem("token", userData.token || "");
    localStorage.setItem("role", String(userData.role));
    if (userData.name) localStorage.setItem("name", userData.name);
    if (userData.email) localStorage.setItem("email", userData.email);
    if (userData.googleProfilePicture) localStorage.setItem("googleProfilePicture", userData.googleProfilePicture);

    setUser(userData);
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axiosInstance.post(
          "/auth/logout",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
      }
    } catch (err: any) {
      console.warn(err.response?.data || err.message);
    } finally {
      // Clear all localStorage items including Google profile picture
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("googleProfilePicture");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
