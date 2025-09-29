"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  email: string;
  password: string;
  city?: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (user: User) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (email: string, password: string) => {
    const stored = localStorage.getItem("user");
    if (!stored) return false;

    const parsed: User = JSON.parse(stored);
    if (parsed.email === email && parsed.password === password) {
      setUser(parsed);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const register = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};