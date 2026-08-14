export type UserRole="customer"|"admin";
export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    avatar:string;
}
export interface RegisterRequest{
    name: string;
    email: string;
    password: string;
    avatar?: string;
}
export interface UpdateUserRequest{
    name?: string;
    email?: string;
    password?: string;
    avatar?: string;
}
export interface CheckEmailResponse{
    isAvailable: boolean;
}