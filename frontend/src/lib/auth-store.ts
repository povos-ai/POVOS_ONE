import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  login: (token: string, refreshToken: string, user: User) => void;
  logout: () => void;
  updateToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  refreshToken: null,
  isLoading: true,
  login: (token, refreshToken, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    set({ token, refreshToken, user, isLoading: false });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    set({ user: null, token: null, refreshToken: null, isLoading: false });
  },
  updateToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
}));

// Initialize from localStorage
export const initializeAuth = () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  if (token) {
    try {
      const decoded = jwtDecode<any>(token);
      const user: User = {
        id: decoded.sub,
        email: decoded.email,
        firstName: decoded.firstName || "",
        lastName: decoded.lastName || "",
        role: decoded.role || "USER",
      };
      useAuthStore.setState({ user, token, refreshToken, isLoading: false });
    } catch {
      useAuthStore.setState({ isLoading: false });
    }
  } else {
    useAuthStore.setState({ isLoading: false });
  }
};

