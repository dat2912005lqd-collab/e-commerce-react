import type{
    CreateProductRequest,
    Product,
} from "../types/products";
export function productToCreatePayload(product: Product): CreateProductRequest {
    return {
        title: product.title,
        price: product.price,
        description: product.description,
        images: product.images,
        categoryId: product.categoryId??1,
    };
    }