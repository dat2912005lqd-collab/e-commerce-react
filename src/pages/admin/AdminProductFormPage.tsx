import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { productService } from "../../services/productService";
import ProductTable from "../../components/admin/ProductTable";

import type { Product } from "../../types/product";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productService.getProducts({
        limit: 20,
        offset: 0,
      });
      setProducts(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDelete = async (product: Product) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa sản phẩm này?");
    if (!confirmed) return;
    await productService.deleteProduct(product.id);
    await loadProducts();
  };

  const handleEdit = (product: Product) => {
    // Navigate to edit page
    console.log("Edit:", product);
  };

  return (
    <main>
      <h1>Quản lý sản phẩm</h1>
      <Link to="/admin/products/new">Thêm sản phẩm</Link>
      <ProductTable
        products={products}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
}