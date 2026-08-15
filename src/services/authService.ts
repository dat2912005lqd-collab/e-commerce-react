import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endpoints";
import type {
    LoginRequest,
    LoginResponse,
} from "../types/auth";
import type { User } from "../types/user";

export const authService = {
    async login(data: LoginRequest): Promise<LoginResponse> {
        const response = await axiosClient.post<LoginResponse>(API_ENDPOINTS.LOGIN, data);
        return response.data;
    },
    async getProfile(): Promise<User> {
        const response = await axiosClient.get<User>(API_ENDPOINTS.PROFILE);
        return response.data;
    },
    async refreshToken(refreshToken: string): Promise<LoginResponse> {
        const response = await axiosClient.post<LoginResponse>(API_ENDPOINTS.REFRESH_TOKEN, { refreshToken });
        return response.data;
    },
};
