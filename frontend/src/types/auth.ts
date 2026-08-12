export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export type userRole = "admin" | "user";

export interface user {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: userRole;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  refreshToken: string;
  user: user;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthContextType {
  user: user | null;
  token: string | null;
  loading: boolean;

  login(data: LoginRequest): Promise<void>;
  register(data: RegisterRequest): Promise<void>;
  logout(): void;

  forgotPassword(
    data: ForgotPasswordRequest
  ): Promise<void>;

  resetPassword(
    data: ResetPasswordRequest
  ): Promise<void>;
}



