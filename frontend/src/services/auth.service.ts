import api from './api';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface user {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export const authService = {
  async register(data: RegisterData) {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  },

  async login(data: LoginData) {
    console.log('🔑 Login called with:', data.email);
    const response = await api.post('/api/auth/login', data);
    console.log('📨 Login response:', response.data);
    
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  getCurrentuser(): user | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  },
};

export default authService;