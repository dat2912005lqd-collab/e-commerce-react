import type {Product} from "../../types/products";
import ProductCard from "./ProductCard";
interface ProductGridProps{
    products:Product[];
    loading?:boolean;
}
export default function ProductGrid({
    products, loading=false,
}:ProductGridProps){
    if(loading){
        return <p>Đang tải sản phẩm</p>
    }
    if(products.length===0){
        return <p>Không tìm thấy sản phẩm.</p>
    }
    return (
        <div>
            {products.map((product)=>
            <ProductCard
            key={product.id}
            product={product}
            />
        ))}
        </div>
    );
}
