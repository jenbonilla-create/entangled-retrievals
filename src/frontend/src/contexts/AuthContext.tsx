import type { Role, UserProfile } from "@/backend";
import { createActorSafe } from "@/lib/createActorSafe";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type UserRole = "customer" | "staff" | "admin";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
}

function mapRole(role: Role): UserRole {
  switch (role) {
    case "admin":
      return "admin";
    case "staff":
      return "staff";
    default:
      return "customer";
  }
}

function profileToUser(profile: UserProfile): User {
  return {
    id: profile.id.toString(),
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    phone: profile.phone,
    role: mapRole(profile.role),
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  isLoading: boolean;
  actorReady: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function loadSession(): User | null {
  try {
    const raw = localStorage.getItem("er_session");
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return null;
}

function saveSession(user: User | null) {
  if (user) {
    localStorage.setItem("er_session", JSON.stringify(user));
  } else {
    localStorage.removeItem("er_session");
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadSession);
  const [isLoading, setIsLoading] = useState(true);
  const [actorReady, setActorReady] = useState(false);

  // Create actor safely — never crash the app
  const actor = useMemo(() => {
    try {
      const a = createActorSafe();
      setActorReady(!!a);
      return a;
    } catch {
      setActorReady(false);
      return null;
    }
  }, []);

  // On mount, verify session with backend if actor is available
  useEffect(() => {
    async function verifySession() {
      if (!actor) {
        setIsLoading(false);
        return;
      }
      try {
        const result = await actor.getUserProfile();
        if (result.__kind__ === "ok") {
          setUser(profileToUser(result.ok));
          saveSession(profileToUser(result.ok));
        } else {
          setUser(null);
          saveSession(null);
        }
      } catch {
        // If backend call fails, keep local session
      } finally {
        setIsLoading(false);
      }
    }
    verifySession();
  }, [actor]);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      if (!actor) return false;
      try {
        const result = await actor.loginUser({ email, password });
        if (result.__kind__ === "ok") {
          const u = profileToUser(result.ok);
          setUser(u);
          saveSession(u);
          return true;
        }
        return false;
      } catch {
        return false;
      }
    },
    [actor],
  );

  const register = useCallback(
    async (userData: RegisterData): Promise<boolean> => {
      if (!actor) return false;
      try {
        const result = await actor.registerUser({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          password: userData.password,
        });
        if (result.__kind__ === "ok") {
          const u = profileToUser(result.ok);
          setUser(u);
          saveSession(u);
          return true;
        }
        return false;
      } catch {
        return false;
      }
    },
    [actor],
  );

  const logout = useCallback(() => {
    setUser(null);
    saveSession(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        userRole: user?.role ?? null,
        isLoading,
        actorReady,
        login,
        register,
        logout,
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
