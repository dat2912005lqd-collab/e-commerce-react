import type { Category } from "../../types/category";

interface CategoryCardProps {
    category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
    return (
        <div className="category-card">
            <h3>{category.name}</h3>
            <p>{category.description}</p>
        </div>
    );
}