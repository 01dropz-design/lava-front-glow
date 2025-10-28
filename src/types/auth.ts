export type UserRole = 'student' | 'counselor' | 'admin';

export interface User {
  id: number;
  username?: string;
  email: string;
  role: UserRole;
  created_at?: string;
  profile?: UserProfile;
}

export interface UserProfile {
  full_name?: string;
  phone?: string;
  grade_level?: string;
  department?: string;
  bio?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  role?: UserRole;
}
