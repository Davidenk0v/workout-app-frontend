import React from "react";

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface DecodedToken {
  userId: number;
  authorities: string[];
  exp: number;
  iat: number;
  sub: string;
}

export interface Workout {
  idWorkout: number;
  name: string;
  description: string;
  result: string;
  date: Date;
  user: number;
}

export interface User {
  idUser: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export type UserList = User[];

export interface Register {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface AuthResponseError {
  body: {
    error: string;
  };
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
