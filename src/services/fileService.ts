import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endpoints";
import type{
    UploadFileResponse,
} from "../types/file";
export const fileService={
    async uploadFile(file:File):
    Promise<UploadFileResponse>{
        const formData= new FormData();
        formData.append("file",file);
        const response=await axiosClient.post<UploadFileResponse>(
            API_ENDPOINTS.UPLOAD_FILES, formData
        );
        return response.data;
    }
}