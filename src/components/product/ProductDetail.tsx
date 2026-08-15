import { useState } from "react";
import type { Product } from "../../types/products";
import ProductGallery from "./ProductGallery";
interface ProductDetailProps {
  product: Product;
  onAddToCart: (
    product: Product,
    quantity: number
  ) => void;
}
export default function ProductDetail({
  product, onAddToCart,
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(1, current - 1)
    );
  };
  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };
  return (
    <section>
      <ProductGallery
        images={product.image ?? []}
        title={product.title}
      />
      <div>
        <h1>{product.title}</h1>
        <p>
          Danh mục:{" "}
          {product.category?.name ?? "-"}
        </p>
        <h2>${product.price.toFixed(2)}</h2>
        <p>{product.description}</p>
        <div>
          <button
            type="button"
            onClick={decreaseQuantity}
          >-
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            onClick={increaseQuantity}
          > +
          </button>
        </div>
        <button
          type="button"
          onClick={() =>
            onAddToCart(product, quantity)
          }>Thêm vào giỏ hàng
        </button>
      </div>
    </section>
  );
}