export interface Category {
    id: number;
    name: string;
    image: string;
    slug?: string;
}
export interface CreateCategoryRequest {
    name: string;
    image: string;
}
export interface UpdateCategoryRequest {
    Partial<CreateCategoryRequest>;
}