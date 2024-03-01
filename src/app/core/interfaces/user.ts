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
  ID: number;
  role_id: number;
}

export interface ShortUser {
  email: string;
  firstname: string;
  phoneNumber: string;
  ID: number;
  role_id: number;
}

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
// REWRITE WITH TS UTILS
