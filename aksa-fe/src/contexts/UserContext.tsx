import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import type { User } from "../types/user";

type UserContextType = {
  user: User | null;
  update: (updates: Partial<User>) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  // Load from localStorage when authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setUser(null);
      return;
    }

    const allKeys = Object.keys(localStorage);
    const userKey = allKeys.find((key) => key.endsWith("_profile"));

    if (userKey) {
      const raw = localStorage.getItem(userKey);
      if (raw) {
        try {
          const parsed: User = JSON.parse(raw);
          setUser(parsed);
        } catch {
          // fallback if corrupted
          setUser(null);
        }
      }
    }
  }, [isAuthenticated]);

  const update = (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);

    // Remove old key if username changed
    const oldKey = `${user.username}_profile`;
    const newKey = `${updatedUser.username}_profile`;

    if (oldKey !== newKey) {
      localStorage.removeItem(oldKey);
    }

    localStorage.setItem(newKey, JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider value={{ user, update }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside UserProvider");
  return context;
}
