import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endpoints";
import type {
  CreateProductRequest,
  Product,
  ProductQueryParams,
  UpdateProductRequest,
} from "../types/products";

export const productService = {
  async getProducts(
    params: ProductQueryParams = {}
  ): Promise<Product[]> {
    const response =
      await axiosClient.get<Product[]>(
        API_ENDPOINTS.PRODUCTS,
        {
          params: {
            offset: params.offset ?? 0,
            limit: params.limit ?? 12,
            title: params.title,
            price: params.price,
            price_min: params.minPrice,
            price_max: params.maxPrice,
            categoryId: params.categoryId,
            categorySlug: params.categorySlug,
          },
        }
      );

    return response.data;
  },

  async getProductById(
    id: number
  ): Promise<Product> {
    const response =
      await axiosClient.get<Product>(
        `${API_ENDPOINTS.PRODUCTS}/${id}`
      );

    return response.data;
  },

  async getProductBySlug(
    slug: string
  ): Promise<Product> {
    const response =
      await axiosClient.get<Product>(
        `${API_ENDPOINTS.PRODUCTS}/slug/${encodeURIComponent(slug)}`
      );

    return response.data;
  },

  async getRelatedProducts(
    id: number
  ): Promise<Product[]> {
    const response =
      await axiosClient.get<Product[]>(
        `${API_ENDPOINTS.PRODUCTS}/${id}/related`
      );

    return response.data;
  },

  async createProduct(
    data: CreateProductRequest
  ): Promise<Product> {
    const response =
      await axiosClient.post<Product>(
        API_ENDPOINTS.PRODUCTS,
        data
      );

    return response.data;
  },

  async updateProduct(
    id: number,
    data: UpdateProductRequest
  ): Promise<Product> {
    const response =
      await axiosClient.put<Product>(
        `${API_ENDPOINTS.PRODUCTS}/${id}`,
        data
      );

    return response.data;
  },

  async deleteProduct(
    id: number
  ): Promise<boolean> {
    const response =
      await axiosClient.delete<boolean>(
        `${API_ENDPOINTS.PRODUCTS}/${id}`
      );

    return response.data;
  },
};