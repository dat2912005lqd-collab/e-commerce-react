export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image?: string;
    images?: string[];
    categoryId?: number;
    category?: {
        id: number;
        name: string;
    };
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductCreateRequest {
    title: string;
    description: string;
    price: number;
    image?: string;
    categoryId?: number;
}

export interface ProductUpdateRequest {
    title?: string;
    description?: string;
    price?: number;
    image?: string;
    categoryId?: number;
}
