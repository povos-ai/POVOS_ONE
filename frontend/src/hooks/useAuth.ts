"use client";

import { useState } from "react";

import authService from "@/services/auth.service";

import type {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  user,
} from "@/types/auth";

export default function useAuth() {
  const [user, setuser] = useState<user | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function login(data: LoginRequest): Promise<void> {
    setLoading(true);

    try {
      const response = await authService.login(data);

      setuser(response.user);
      setToken(response.token);

      // Temporary demo storage
      localStorage.setItem("accessToken", response.token);
      localStorage.setItem(
        "refreshToken",
        response.refreshToken
      );
    } finally {
      setLoading(false);
    }
  }

  async function register(
    data: RegisterRequest
  ): Promise<void> {
    setLoading(true);

    try {
      const response = await authService.register(data);

      setuser(response.user);
      setToken(response.token);

      localStorage.setItem("accessToken", response.token);
      localStorage.setItem(
        "refreshToken",
        response.refreshToken
      );
    } finally {
      setLoading(false);
    }
  }

  async function forgotPassword(
    data: ForgotPasswordRequest
  ): Promise<void> {
    setLoading(true);

    try {
      await authService.forgotPassword(data);
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword(
    data: ResetPasswordRequest
  ): Promise<void> {
    setLoading(true);

    try {
      await authService.resetPassword(data);
    } finally {
      setLoading(false);
    }
  }

  function logout(): void {
    authService.logout();

    setuser(null);
    setToken(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  return {
    user,
    token,
    loading,
    login,
    register,
    forgotPassword,
    resetPassword,
    logout,
  };
}



