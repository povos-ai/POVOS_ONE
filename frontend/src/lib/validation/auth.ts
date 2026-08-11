import type {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "@/types/auth";

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin(
  data: LoginRequest
): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Invalid email address";
  }

  if (!data.password.trim()) {
    errors.password = "Password is required";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateRegister(
  data: RegisterRequest
): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Invalid email address";
  }

  if (data.password.length < 8) {
    errors.password =
      "Password must contain at least 8 characters";
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword =
      "Passwords do not match";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateForgotPassword(
  data: ForgotPasswordRequest
): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Invalid email address";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateResetPassword(
  data: ResetPasswordRequest
): ValidationResult {
  const errors: Record<string, string> = {};

  if (data.password.length < 8) {
    errors.password =
      "Password must contain at least 8 characters";
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword =
      "Passwords do not match";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

