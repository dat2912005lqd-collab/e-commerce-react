import axioClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endpoints";
import type {
    User, RegisterRequest,
    UpdateUserRequest, CheckEmailResponse
} from "../types/user";

export const userService = {
    async register(data: RegisterRequest): Promise<User> {
        const response = await axioClient.post<User>(API_ENDPOINTS.REGISTER, data);
        return response.data;
    },
    async getUserById(id: number): Promise<User> {
        const response = await axioClient.get<User>(`${API_ENDPOINTS.USER}/${id}`);
        return response.data;
    },
    async updateUser(id: number, data: UpdateUserRequest): Promise<User> {
        const response = await axioClient.put<User>(`${API_ENDPOINTS.USER}/${id}`, data);
        return response.data;
    },
    async checkEmailAvailability(email: string): Promise<CheckEmailResponse> {
        const response = await axioClient.get<CheckEmailResponse>(`${API_ENDPOINTS.CHECK_EMAIL}?email=${encodeURIComponent(email)}`);
        return response.data;
    },
};