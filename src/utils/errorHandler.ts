import axios from "axios";
import type {ApiError, ErrorResponse} from "../types/error";
export function handleError(error:unknown):ApiError{
    if(axios.isAxiosError<ErrorResponse>(error)){
        return{
            message:
            error.response?.data?.message?? 
            error.response?.data?.error??
            error.message??"Đã xảy ra lỗi.",
            status:String(error.response?.status??500),
            code:error.response?.data?.code,
            detail:error.response?.data?.detail,
        };
    }
    if (error instanceof Error){
        return {message:error.message,};
    }
    return {
        message:"Đã xảy ra lỗi. Vui lòng thử lại.",
        status:500
    };
}
