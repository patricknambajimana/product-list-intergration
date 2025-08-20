import React, {
  createContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";

interface User {
  id: number;
  username: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ✅ Hardcoded credentials
  const VALID_USERNAME = "emilys";
  const VALID_PASSWORD = "emilyspass";

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // Validate against credentials
      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        const userData: User = { id: 1, username, email: "emily@example.com" };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      throw err; // let UI handle error
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
