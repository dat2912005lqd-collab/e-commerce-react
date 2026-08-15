import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/product/ProductCard';
import type { Product } from '../../types/products';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { products } = useProducts();

  useEffect(() => {
    setLoading(true);
    const title = searchParams.get('title') || '';
    const categoryId = searchParams.get('categoryId') || '';
    const priceMin = searchParams.get('price_min') ? Number(searchParams.get('price_min')) : 0;
    const priceMax = searchParams.get('price_max') ? Number(searchParams.get('price_max')) : Infinity;

    let filtered = products;
    if (title) {
      filtered = filtered.filter(p => p.title.toLowerCase().includes(title.toLowerCase()));
    }
    if (categoryId) {
      filtered = filtered.filter(p => p.categoryId === Number(categoryId));
    }
    filtered = filtered.filter(p => p.price >= priceMin && p.price <= priceMax);

    setFilteredProducts(filtered);
    setLoading(false);
  }, [searchParams, products]);

  if (loading) return <div className="text-center py-8">Đang tải...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Tất cả sản phẩm</h2>
      {!filteredProducts.length ? <p className="text-gray-500">Không tìm thấy sản phẩm</p> : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;