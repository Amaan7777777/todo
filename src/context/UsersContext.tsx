// src/context/UsersContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types";
import { demoUsers } from "../data/demoUsers";

interface UsersContextValue {
  users: User[];
  currentUser: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addUser: (username: string, password: string, role: User["role"]) => void;
  deleteUser: (userId: string) => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
  setCurrentUser: (user: User | null) => void;
}

const UsersContext = createContext<UsersContextValue | undefined>(undefined);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => {
    // Load users from localStorage, or use demoUsers
    const stored = localStorage.getItem("aura_users");
    return stored ? JSON.parse(stored) : demoUsers;
  });
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("aura_current_user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    localStorage.setItem("aura_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("aura_current_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("aura_current_user");
    }
  }, [currentUser]);

  // The function you need:
  const addUser = (username: string, password: string, role: User["role"]) => {
    const newUser: User = {
      id: Date.now().toString(),
      username,
      password,
      role,
    };
    setUsers((prev) => [...prev, newUser]);
  };

  const deleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(null);
    }
  };

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...updates } : u))
    );
    if (currentUser && currentUser.id === userId) {
      setCurrentUser({ ...currentUser, ...updates });
    }
  };

  const login = (username: string, password: string) => {
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setCurrentUser(found);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        currentUser,
        login,
        logout,
        addUser,
        deleteUser,
        updateUser,
        setCurrentUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error("useUsers must be used within UsersProvider");
  return ctx;
}
