import { fetchWithAuth } from "@/lib/api-client";

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  // additional fields from backend
}

export async function getProfile(): Promise<UserProfile> {
  return fetchWithAuth("/profile");
}

export async function updateProfile(data: Partial<UserProfile>) {
  return fetchWithAuth("/profile", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
