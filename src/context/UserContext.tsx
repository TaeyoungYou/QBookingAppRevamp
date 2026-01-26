import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type UserRole = "admin" | "employee";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  availability?: string;
  profileStatus?: string;
  roleTitle?: string;
  memberSince?: string;
  notes?: string;
}

interface UserContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
  isAdmin: boolean;
  isEmployee: boolean;
}

const UserContext = createContext<UserContextValue | null>(null);

const defaultUser: User = {
  id: "1",
  name: "Admin User",
  email: "admin@example.com",
  role: "admin", // Change to "employee" to test employee view
  phone: "",
  avatar: "",
  availability: "Full-time",
  profileStatus: "Active",
  roleTitle: "Team member",
  memberSince: "N/A",
};


export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(() => {
    const stored = localStorage.getItem("salon-user");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultUser;
      }
    }
    return defaultUser;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("salon-user", JSON.stringify(user));
    }
  }, [user]);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
  };

  const value: UserContextValue = {
    user,
    setUser,
    isAdmin: user?.role === "admin",
    isEmployee: user?.role === "employee",
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
