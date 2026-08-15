import api from './api';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  age?: number | null;
  education?: string | null;
  state?: string | null;
  category?: string | null;
  businessType?: string | null;
  income?: string | null;
  gender?: string | null;
  district?: string | null;
  city?: string | null;
  qualification?: string | null;
  fieldOfStudy?: string | null;
  skills?: string | null;
  experienceYears?: number | null;
  certifications?: string | null;
  userType?: string | null;
  employmentStatus?: string | null;
  industry?: string | null;
  sector?: string | null;
  businessName?: string | null;
  businessSector?: string | null;
  businessStage?: string | null;
  registrationStatus?: string | null;
  turnoverRange?: string | null;
  employeeCount?: number | null;
  interests?: string | null;
  preferredTypes?: string | null;
  geoPreference?: string | null;
  phone?: string | null;
  completion?: number;
}

export async function getProfile(): Promise<UserProfile> {
  return api.get("/profile");
}

export async function updateProfile(data: Partial<UserProfile>) {
  return api.patch("/profile", data);
}
