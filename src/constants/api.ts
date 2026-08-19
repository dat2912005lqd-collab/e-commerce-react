export const API_CONFIG = {
    timeout: 15000,
    pageSize: 12,
    BASE_URL: 'https://api.escuelajs.co/api/v1', // Thêm BASE_URL
} as const;
export const API_ENDPOINTS = {
    LOGIN: '/auth/login',
    PROFILE: '/auth/profile',
    REFRESH_TOKEN: '/auth/refresh-token',
    PRODUCTS: '/products',
    CATEGORIES: '/categories',
    USERS: '/users',
    FILES: '/files',
} as const;