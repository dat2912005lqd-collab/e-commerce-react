import type { InternalAxiosRequestConfig, AxiosInstance } from "axios";
export function setupRequestInterceptor(client: AxiosInstance)
{
    client.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const Token = localStorage.getItem("access_token");
            if (Token) {
                config.headers.Authorization = `Bearer ${Token}`;
            }
            return config;
        }
    );
}