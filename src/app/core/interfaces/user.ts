export interface User {
  email: string;
  firstname: string;
  phoneNumber: string;
  ID: number;
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
export interface SignUpResponse {
  id: number;
}
// REWRITE WITH TS UTILS
