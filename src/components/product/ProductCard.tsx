import type { Product } from "../../types/products"; 
interface ProductCardProps {
    product: Product;
}
export default function ProductCard({ product }: ProductCardProps) {
    return (
        <article className="product-card">
            <img src={product.images?.[0] || ''} alt={product.title} /> {}
           <div className="product-category">{product.category?.name}</div> {}
                <h3>{product.title}</h3>
                <p>${product.price}</p>
                <span>{
                    product.discountPercentage&&product.discountPercentage>0 ? (
                        <>
                            <span className="original-price">${(product.price * 100 / (100 - product.discountPercentage)).toFixed(2)}</span>
                            <span className="discount">{product.discountPercentage}% off</span>
                        </>
                    ) : null
                }</span>
        </article>
    );
}