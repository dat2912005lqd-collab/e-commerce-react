import { useEffect, useState } from "react";
import { productService } from "../../services/productService";
import type { Product } from "../../types/product";
import ProductCard from "../../components/product/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await productService.getProducts();

        setProducts(data);
      } catch {
        setError("Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <p>Đang tải sản phẩm...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  if (products.length === 0) {
    return <p>Không có sản phẩm.</p>;
  }

  return (
    <main>
      <h1>Sản phẩm</h1>

      <section>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </section>
    </main>
  );
}