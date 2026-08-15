import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/product/ProductCard';
import type { Product } from '../../types/products';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const { addItem } = useCart();
  const { products } = useProducts();

  useEffect(() => {
    if (id && products.length > 0) {
      const found = products.find(p => p.id === Number(id));
      setProduct(found || null);
      if (found?.categoryId) {
        const relatedProducts = products.filter(p => p.categoryId === found.categoryId && p.id !== found.id).slice(0, 4);
        setRelated(relatedProducts);
      }
    }
  }, [id, products]);

  if (!product) return <div className="text-center py-8">Đang tải...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <img src={product.image || product.images?.[0] || 'https://placehold.co/400x400'} alt={product.title} className="w-full rounded shadow" />
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl text-red-500 font-bold mt-2">${product.price}</p>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <button onClick={() => addItem({ productId: product.id, title: product.title, price: product.price, qty: 1 })} className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Thêm vào giỏ</button>
        </div>
      </div>
      {related.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-4">Sản phẩm liên quan</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;