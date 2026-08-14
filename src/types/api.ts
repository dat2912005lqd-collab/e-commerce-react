export interface ApiError{
    status?:number;
    message?:string;
}
export interface PaginationParams{
    offset?:number;
    limit?:number;
}