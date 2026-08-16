import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endpoints";
import type{
    UploadFileResponse,
} from "../types/file";
type FileService = {
    uploadFile(file: File): Promise<UploadFileResponse>;
    uploadImage(file: File): Promise<string>;
};
export const fileService={
    async uploadFile(file:File):
    Promise<UploadFileResponse>{
        const formData= new FormData();
        formData.append("file",file);
        const response=await axiosClient.post<UploadFileResponse>(
            API_ENDPOINTS.UPLOAD_FILES, formData
        );
        return response.data;
    },
    async uploadImage(file: File): Promise<string> {
        const response = await this.uploadFile(file);
        // Trả về URL từ response (tùy theo cấu trúc response của bạn)
        return (response as any).url || (response as any).data?.url || '';
    }
};
export default fileService;