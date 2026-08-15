import { useParams } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/product/ProductCard';
import { useCategories } from '../../hooks/useCategories'; 

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useProducts();
  const { categories } = useCategories();
  const category = categories.find(c => c.slug === slug);
  const categoryProducts = category 
    ? products.filter(p => p.category?.id === category.id)
    : [];
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Danh mục: {slug}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoryProducts.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
};

export default CategoryPage;