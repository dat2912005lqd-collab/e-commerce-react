import type { Category } from "./category";
export interface Product {
    id: number;
    title: string;
    slug: string;
    price:number;
    description: string;
    image: string[];
    category: Category;
    createdAt: string;
    updatedAt: string;
    discountPercentage?:number;
    categoryId:number;
}
export interface ProductQueryParams {
    offset?: number;
    limit?: number;
    categoryId?: number;
    price?:number;
    minPrice?: number;
    maxPrice?: number;
    title?: string;
    categorySlug?: string;
}
export interface CreateProductRequest{
    title: string;
    price:number;
    description: string;
    images: string[];
    categoryId: number;
}
export type UpdateProductRequest = Partial<CreateProductRequest>;