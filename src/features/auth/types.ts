export interface AuthState {
  token: string;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface AdminLoginPayload {
  password: string;
}

export interface AdminLoginResponse {
  token: string;
}
