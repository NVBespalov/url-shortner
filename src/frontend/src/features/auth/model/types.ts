export interface RegistrationResponse {
  userId: string;
  token: string;
}

export interface RegistrationState {
  loading: boolean;
  error: string | null | unknown;
  data: RegistrationResponse | null;
}
