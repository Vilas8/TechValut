import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  phone?: string;
  address?: string;
  joinedAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded admin credentials
const ADMIN_EMAIL = "admin@techvault.com";
const ADMIN_PASSWORD = "TechVault@Admin2025";

// Simulated user store (localStorage backed)
function getStoredUsers(): Array<User & { password: string }> {
  try {
    return JSON.parse(localStorage.getItem("tv_users") || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: Array<User & { password: string }>) {
  localStorage.setItem("tv_users", JSON.stringify(users));
}

function getStoredCurrentUser(): User | null {
  try {
    return JSON.parse(localStorage.getItem("tv_current_user") || "null");
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredCurrentUser();
    if (stored) setUser(stored);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // simulate network

    // Admin check
    if (email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser: User = {
        id: "admin-001",
        name: "Admin",
        email: ADMIN_EMAIL,
        role: "admin",
        joinedAt: "2024-01-01",
        avatar: "",
      };
      setUser(adminUser);
      localStorage.setItem("tv_current_user", JSON.stringify(adminUser));
      setIsLoading(false);
      return { success: true };
    }

    // Regular user check
    const users = getStoredUsers();
    const match = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!match) {
      setIsLoading(false);
      return { success: false, error: "Invalid email or password." };
    }
    const { password: _p, ...safeUser } = match;
    setUser(safeUser);
    localStorage.setItem("tv_current_user", JSON.stringify(safeUser));
    setIsLoading(false);
    return { success: true };
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    if (email.toLowerCase() === ADMIN_EMAIL) {
      setIsLoading(false);
      return { success: false, error: "This email is reserved." };
    }

    const users = getStoredUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      setIsLoading(false);
      return { success: false, error: "An account with this email already exists." };
    }

    const newUser: User & { password: string } = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      role: "user",
      joinedAt: new Date().toISOString().split("T")[0],
    };
    saveUsers([...users, newUser]);
    const { password: _p, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem("tv_current_user", JSON.stringify(safeUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("tv_current_user");
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("tv_current_user", JSON.stringify(updated));
    // Also update in users store
    const users = getStoredUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...data };
      saveUsers(users);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
