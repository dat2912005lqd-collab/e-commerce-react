import { FormEvent, useEffect, useState } from "react";
import { categoryService } from "../../services/categoryService";
import type { Category, CreateCategoryRequest } from "../../types/category";
import ImageUpload from "./ImageUpload";

interface CategoryFormProps {
  category?: Category | null;
  onSuccess?: (category: Category) => void;
  onCancel?: () => void;
}

export default function CategoryForm({
  category,
  onSuccess,
  onCancel,
}: CategoryFormProps) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(category);

  useEffect(() => {
    setName(category?.name ?? "");
    setImage(category?.image ?? "");
    setError("");
  }, [category]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Tên danh mục không được để trống.");
      return;
    }

    if (!image.trim()) {
      setError("Vui lòng chọn hình ảnh.");
      return;
    }

    const data: CreateCategoryRequest = {
      name: name.trim(),
      image: image.trim(),
    };

    try {
      setLoading(true);
      setError("");

      const result = isEditing
        ? await categoryService.updateCategory(category!.id, data)
        : await categoryService.createCategory(data);

      onSuccess?.(result);

      if (!isEditing) {
        setName("");
        setImage("");
      }
    } catch (err) {
      console.error(err);
      setError(
        isEditing ? "Không thể cập nhật danh mục." : "Không thể tạo danh mục."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? "Chỉnh sửa danh mục" : "Thêm danh mục"}</h2>

      {error && <p role="alert">{error}</p>}

      <div>
        <label htmlFor="category-name">Tên danh mục</label>
        <input
          id="category-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={loading}
        />
      </div>

      <ImageUpload value={image} onChange={setImage} />

      <button type="submit" disabled={loading}>
        {loading ? "Đang lưu..." : isEditing ? "Cập nhật" : "Thêm danh mục"}
      </button>

      {onCancel && (
        <button type="button" onClick={onCancel} disabled={loading}>
          Hủy
        </button>
      )}
    </form>
  );
}
}