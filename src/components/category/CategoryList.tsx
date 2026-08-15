import type {Category} from "../../types/category";
import CategoryCard from "./CategoryCard";
interface CategoryListProps{
    categories:Category[];
    loading?:boolean;
}
export default function CategoryList({
    categories, loading=false,
}:CategoryListProps){
if (loading)
{
    return<p>Đang tải danh mục...</p>
}
if (!categories.length){
    return<p>Chưa có danh mục</p>
}
return (
    <div>
        {Categories.map((category)=>(
            <CategoryCard
            key={category.id}
            category={Category}/>
        )
        )}
    </div>
);
}