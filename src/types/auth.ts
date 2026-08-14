import type {User } from "./user";
export interface LoginRequest{
    email:string;
    password:string;
}
export interface LoginResponse{
    accessToken:string;
    refreshToken:string;
}
export interface RefreshTokenResponse{
    refreshToken:string;
}
export interface AuthState {
    accessToken: string|null;
    refreshToken: string|null;
    user: User | null;
}