export interface ApiError{
    message:string;
    status?:string;
    code?:string;
    detailt?:string;
}
export interface ErrorResponse{
    message?:string;
    error?:string;
    status?:string;
    code?:string;
    detail?:string;
}