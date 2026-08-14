import { useEffect, useState } from "react";
import {
  productService,
} from "../services/productService";
import type {
  Product,
  ProductQueryParams,
} from "../types/product";
export function useProducts(
  params: ProductQueryParams = {}
) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] =useState(true);
  const [error, setError] =useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data =await productService.getProducts(params);
        if (!cancelled) {
          setProducts(data);
        }
      } catch {
        if (!cancelled) {
          setError("Không thể tải sản phẩm.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {cancelled = true;};
  }, [
    params.offset,
    params.limit,
    params.title,
    params.price,
    params.price_min,
    params.price_max,
    params.categoryId,
    params.categorySlug,
  ]);
  return {
    products,
    loading,
    error,
  };
}