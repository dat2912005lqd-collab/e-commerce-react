import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/product/ProductCard';

const HomePage = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 8);

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Shop Demo</h1>
        <Link to="/products" className="bg-white text-blue-600 px-6 py-2 rounded">Xem sản phẩm</Link>
      </section>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Sản phẩm mới nhất</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
};

export default HomePage;