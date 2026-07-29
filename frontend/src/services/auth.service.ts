import type {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AuthResponse,
} from "@/types/auth";

class AuthService {
  async login(data: LoginRequest): Promise<AuthResponse> {
    console.log("Login Request:", data);

    return {
      success: true,
      message: "Login successful",
      token: "demo-access-token",
      refreshToken: "demo-refresh-token",
      user: {
        id: "1",
        firstName: "Kishore",
        lastName: "Kunal",
        email: data.email,
        role: "admin",
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    console.log("Register Request:", data);

    return {
      success: true,
      message: "Registration successful",
      token: "demo-access-token",
      refreshToken: "demo-refresh-token",
      user: {
        id: "2",
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: "user",
        isVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  }

  async forgotPassword(
    data: ForgotPasswordRequest
  ): Promise<boolean> {
    console.log("Forgot Password:", data);

    return true;
  }

  async resetPassword(
    data: ResetPasswordRequest
  ): Promise<boolean> {
    console.log("Reset Password:", data);

    return true;
  }

  logout() {
    console.log("User Logged Out");
  }
}

const authService = new AuthService();

export default authService;