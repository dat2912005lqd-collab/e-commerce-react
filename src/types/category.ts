export interface Category {
    id: number;
    name: string;
    image: string;
    slug?: string;
    description?:string;
}
export interface CreateCategoryRequest {
    name: string;
    image: string;
}
export type UpdateCategoryRequest=Partial<CreateCategoryRequest>;