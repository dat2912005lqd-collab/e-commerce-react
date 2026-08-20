import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../constants/api";
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
  async getProductBySlug(slug: string): Promise<Product> {
       const products = await this.getProducts({ title: slug });
    return products[0] || {} as Product;
  },
  async getRelatedProducts(id: number): Promise<Product[]> {
    const product = await this.getProductById(id);
    if (!product || !product.category?.id) return [];
    return this.getProducts({ categoryId: product.category.id });
  },
  async createProduct(data: CreateProductRequest): Promise<Product> {
    const response = await axiosClient.post<Product>(
      API_ENDPOINTS.PRODUCTS,
      data
    );
    return response.data;
  },
  async updateProduct(id: number, data: UpdateProductRequest): Promise<Product> {
    const response = await axiosClient.put<Product>(
      `${API_ENDPOINTS.PRODUCTS}/${id}`,
      data
    );
    return response.data;
  },

  async deleteProduct(id: number): Promise<boolean> {
    const response = await axiosClient.delete<boolean>(
      `${API_ENDPOINTS.PRODUCTS}/${id}`
    );
    return response.data;
  },
};
