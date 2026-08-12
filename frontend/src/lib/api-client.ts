import { useAuthStore } from "./auth-store";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://192.168.1.8:3001";

export async function apiClient(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Attempt refresh
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });
        if (refreshRes.ok) {
          const data = await refreshRes.json();
          localStorage.setItem("token", data.accessToken);
          useAuthStore.getState().updateToken(data.accessToken);
          // Retry original request
          const retryResponse = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers: {
              ...headers,
              Authorization: `Bearer ${data.accessToken}`,
            },
          });
          return retryResponse;
        } else {
          useAuthStore.getState().logout();
          window.location.href = "/login";
        }
      } catch {
        useAuthStore.getState().logout();
        window.location.href = "/login";
      }
    } else {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }
  }
  return response;
}






