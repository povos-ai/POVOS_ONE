import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';

// ============================================
// 1. API Client Configuration
// ============================================
const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    // Browser: use localhost
    return 'http://192.168.1.8:3001';
  } else {
    // Server (Node.js): use Docker service name
    return process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.8:3001';
  }
};

const api: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
});

// ============================================
// 2. Request Interceptor (Add Token)
// ============================================
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error('Request Error:', error.message);
    return Promise.reject(error);
  }
);

// ============================================
// 3. Response Interceptor (Token Refresh on 401)
// ============================================
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // If 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Call refresh endpoint
        const response = await axios.post(`${getBaseURL()}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        // Update the Authorization header and retry the original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed – clear tokens and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors (already logged in the interceptor)
    console.error('API Error:', error.message);
    console.error('API Error Details:', {
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
      },
    });

    if (typeof window !== 'undefined' && error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    if (error.response?.status === 403) {
      console.error('Forbidden: You do not have permission to access this resource.');
    }

    if (error.response?.status === 404) {
      console.error('Resource not found:', error.config?.url);
    }

    if (error.response?.status === 500) {
      console.error('Server error. Please try again later.');
    }

    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.error('Request timeout - server is taking too long to respond.');
    }

    if (error.message === 'Network Error') {
      console.error('Network error - please check your internet connection.');
    }

    return Promise.reject(error);
  }
);

// ============================================
// 4. Helper Functions
// ============================================
export const get = async <T>(url: string, params?: any): Promise<T> => {
  const response = await api.get<T>(url, { params });
  return response.data;
};

export const post = async <T>(url: string, data?: any): Promise<T> => {
  const response = await api.post<T>(url, data);
  return response.data;
};

export const put = async <T>(url: string, data?: any): Promise<T> => {
  const response = await api.put<T>(url, data);
  return response.data;
};

export const patch = async <T>(url: string, data?: any): Promise<T> => {
  const response = await api.patch<T>(url, data);
  return response.data;
};

export const del = async <T>(url: string): Promise<T> => {
  const response = await api.delete<T>(url);
  return response.data;
};

export default api;







