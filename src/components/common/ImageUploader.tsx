import { useState } from "react";
import { fileService } from "../../services/fileService";

interface ImageUploaderProps {
  onUploaded: (url: string) => void;
}

export default function ImageUploader({
  onUploaded,
}: ImageUploaderProps) {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result =
        await fileService.uploadFile(file);

      onUploaded(result.location);
    } catch {
      setError(
        "Upload ảnh thất bại."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={loading}
      />

      {loading && (
        <p>Đang upload...</p>
      )}

      {error && (
        <p role="alert">
          {error}
        </p>
      )}
    </div>
  );
}