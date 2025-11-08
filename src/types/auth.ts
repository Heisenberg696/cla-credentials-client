export interface LoginRequest {
  email: string;
  password: string;
}

export interface University {
  id: number;
  name: string;
  city: string;
  country: string;
  phone: string;
  website: string;
  avatar: string;
  address: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  user_type: string;
  completed_onboarding: boolean;
  university: University;
}

export interface LoginResponse {
  data: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    user_type: string;
    completed_onboarding: boolean;
    university: University;
    access_token: string;
  };
  message: string;
  status: string;
}
