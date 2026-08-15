import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import ProductForm from "../../components/admin/ProductForm";
import { productService } from "../../services/productService";

import type { Product } from "../../types/product";

export default function AdminProductFormPage() {
  const { id } = useParams<{
    id: string;
  }>();

  const navigate = useNavigate();

  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] =
    useState(Boolean(id));

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const data =
          await productService.getProductById(
            Number(id)
          );

        setProduct(data);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return <p>Đang tải...</p>;
  }

  return (
    <main>
      <h1>
        {id
          ? "Chỉnh sửa sản phẩm"
          : "Thêm sản phẩm"}
      </h1>

      <ProductForm
        product={product}
        onSuccess={() =>
          navigate(
            "/admin/products"
          )
        }
        onCancel={() =>
          navigate(
            "/admin/products"
          )
        }
      />
    </main>
  );
}