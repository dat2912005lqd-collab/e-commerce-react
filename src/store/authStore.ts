import { create } from "zustand";
import type {User } from "../types/user";
import {
    getStorageItem,
    setStorageItem,
    removeStorageItem,
} from "../utils/storage";
import { STORAGE_KEYS } from "../constants/storageKeys";
interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
    setSession: (
        accessToken: string,
        refreshToken: string,
        user: User
    ) => void;
    clearSession: () => void;
}
export const useAuthStore = create<AuthState>((set) => ({
    accessToken:
        getStorageItem<string>(STORAGE_KEYS.ACCESS_TOKEN),
    refreshToken:
        getStorageItem<string>(STORAGE_KEYS.REFRESH_TOKEN),
    user: getStorageItem<User>("user"),
    setSession: (accessToken, refreshToken, user) => {
        setStorageItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        setStorageItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
        setStorageItem("user", user);
        set({
            accessToken,
            refreshToken,
            user,
        });
    },
    clearSession: () => {
        removeStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
        removeStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
        removeStorageItem("user");
        set({
            accessToken: null,
            refreshToken: null,
            user: null,
        });
    },
}));