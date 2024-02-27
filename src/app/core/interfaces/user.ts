export interface User {
  email: string;
  firstname: string;
  phoneNumber: string;
  ID: number;
  role_id: number;
}

export interface Admin {
  email: string;
  firstname: string;
  phoneNumber: string;
  role_id: number;
  ID: number;
}

export interface ShortUser {
  email: string;
  firstname: string;
  phoneNumber: string;
  ID: number;
  role_id: number;
}

export interface UsersResponse {
  data: ShortUser[];
}

export interface AdminResponse {
  data: Admin[];
}

export interface Role {}

export interface SignInData {
  email: string;
  password: string;
}

export interface JWTToken {
  token: string;
}

export interface SignUpData {
  email: string;
  firstname: string;
  phoneNumber: string;
  password: string;
}
export interface SignUpResponse {
  id: number;
}
// REWRITE WITH TS UTILS
