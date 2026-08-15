import { FormEvent, useEffect, useState } from "react";

import { categoryService } from "../../services/categoryService";
import { productService } from "../../services/productService";

import type { Category } from "../../types/category";
import type {
  CreateProductRequest,
  Product,
} from "../../types/products";

interface ProductFormProps {
  product?: Product | null;
  onSuccess?: (product: Product) => void;
  onCancel?: () => void;
}

export default function ProductForm({
  product,
  onSuccess,
  onCancel,
}: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>(
    []
  );

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [categoryId, setCategoryId] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] =
    useState(false);

  const [error, setError] = useState("");

  const isEditing = Boolean(product);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true);

        const data =
          await categoryService.getCategories();

        setCategories(data);
      } catch (err) {
        console.error(err);
        setError("Không thể tải danh mục.");
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (!product) {
      setTitle("");
      setPrice("");
      setDescription("");
      setImages([]);
      setCategoryId("");
      return;
    }

    setTitle(product.title);
    setPrice(String(product.price));
    setDescription(product.description);
    setImages(product.image ?? []);
    setCategoryId(String(product.category.id));
  }, [product]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const numericPrice = Number(price);
    const numericCategoryId = Number(categoryId);

    if (!title.trim()) {
      setError("Tên sản phẩm không được để trống.");
      return;
    }

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      setError("Giá sản phẩm không hợp lệ.");
      return;
    }

    if (!description.trim()) {
      setError("Mô tả không được để trống.");
      return;
    }

    if (!numericCategoryId) {
      setError("Vui lòng chọn danh mục.");
      return;
    }

    if (images.length === 0) {
      setError("Vui lòng thêm ít nhất một hình ảnh.");
      return;
    }

    const data: CreateProductRequest = {
      title: title.trim(),
      price: numericPrice,
      description: description.trim(),
      images,
      categoryId: numericCategoryId,
    };

    try {
      setLoading(true);

      const result = isEditing
        ? await productService.updateProduct(
            product!.id,
            data
          )
        : await productService.createProduct(data);

      onSuccess?.(result);

      if (!isEditing) {
        setTitle("");
        setPrice("");
        setDescription("");
        setImages([]);
        setCategoryId("");
      }
    } catch (err) {
      console.error(err);

      setError(
        isEditing
          ? "Không thể cập nhật sản phẩm."
          : "Không thể tạo sản phẩm."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        {isEditing
          ? "Chỉnh sửa sản phẩm"
          : "Thêm sản phẩm"}
      </h2>

      {error && (
        <p role="alert">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="product-title">
          Tên sản phẩm
        </label>

        <input
          id="product-title"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="product-price">
          Giá
        </label>

        <input
          id="product-price"
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(event) =>
            setPrice(event.target.value)
          }
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="product-description">
          Mô tả
        </label>

        <textarea
          id="product-description"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="product-category">
          Danh mục
        </label>

        <select
          id="product-category"
          value={categoryId}
          onChange={(event) =>
            setCategoryId(event.target.value)
          }
          disabled={
            loading || loadingCategories
          }
        >
          <option value="">
            Chọn danh mục
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Hình ảnh</label>

        <input
          type="url"
          placeholder="URL hình ảnh"
          onKeyDown={(event) => {
            if (event.key !== "Enter") {
              return;
            }

            event.preventDefault();

            const input =
              event.currentTarget as HTMLInputElement;

            const url = input.value.trim();

            if (url) {
              setImages((current) => [
                ...current,
                url,
              ]);

              input.value = "";
            }
          }}
        />

        {images.map((image, index) => (
          <div key={`${image}-${index}`}>
            <img
              src={image}
              alt={`Product ${index + 1}`}
              width={80}
            />

            <button
              type="button"
              onClick={() => {
                setImages((current) =>
                  current.filter(
                    (_, imageIndex) =>
                      imageIndex !== index
                  )
                );
              }}
            >
              Xóa
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Đang lưu..."
          : isEditing
          ? "Cập nhật"
          : "Thêm sản phẩm"}
      </button>

      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
        >
          Hủy
        </button>
      )}
    </form>
  );
}