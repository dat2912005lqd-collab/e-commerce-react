import fileService  from "../../services/fileService"; // Sửa đường dẫn từ rservices -> services
import { useState } from "react";
interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
}
export default function ImageUpload({ value, onChange }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        try {
            setUploading(true);
            const url = await fileService.uploadImage(file);
            onChange(url);
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setUploading(false);
        }
    };
    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
            />
            {value && <img src={value} alt="Preview" style={{ maxWidth: "200px" }} />}
            {uploading && <p>Đang tải lên...</p>}
        </div>
    );
}