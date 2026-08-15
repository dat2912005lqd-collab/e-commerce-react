import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endpoints";
import type {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../types/category";
import type { Product } from "../types/products";

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    const response =
      await axiosClient.get<Category[]>(
        API_ENDPOINTS.CATEGORIES
      );

    return response.data;
  },

  async getCategoryById(
    id: number
  ): Promise<Category> {
    const response =
      await axiosClient.get<Category>(
        `${API_ENDPOINTS.CATEGORIES}/${id}`
      );

    return response.data;
  },

  async getCategoryBySlug(
    slug: string
  ): Promise<Category> {
    const response =
      await axiosClient.get<Category>(
        `${API_ENDPOINTS.CATEGORIES}/slug/${encodeURIComponent(slug)}`
      );

    return response.data;
  },

  async getProductsByCategory(
    id: number
  ): Promise<Product[]> {
    const response =
      await axiosClient.get<Product[]>(
        `${API_ENDPOINTS.CATEGORIES}/${id}/products`
      );

    return response.data;
  },

  async createCategory(
    data: CreateCategoryRequest
  ): Promise<Category> {
    const response =
      await axiosClient.post<Category>(
        API_ENDPOINTS.CATEGORIES,
        data
      );

    return response.data;
  },

  async updateCategory(
    id: number,
    data: UpdateCategoryRequest
  ): Promise<Category> {
    const response =
      await axiosClient.put<Category>(
        `${API_ENDPOINTS.CATEGORIES}/${id}`,
        data
      );

    return response.data;
  },

  async deleteCategory(
    id: number
  ): Promise<boolean> {
    const response =
      await axiosClient.delete<boolean>(
        `${API_ENDPOINTS.CATEGORIES}/${id}`
      );

    return response.data;
  },
};