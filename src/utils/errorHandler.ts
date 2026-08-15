import axios from "axios";
import type {ApiError, ErrorResponse} from "../types/error";
export function handleError(error:unknonwn):ApiError{
    if(axios.isAxiosError<ErrorResponse>(error)){
        return{
            message:
            error.response?.data?.message?? 
            error.response?.data?.error??
            error.message??"Đã xảy ra lỗi.",
            status:error.response?.status,
            code:error.response?.data?.code,
            details:error.response?.data?.details;
        };
    }
    if (error instanceof Error){
        return {message:error.message,};
    }
    return {
        message:"Đã xảy ra lỗi. Vui lòng thử lại.",
    };
}
