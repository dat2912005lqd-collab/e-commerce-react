import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
export default function Header() {
  const totalQuantity =
    useCartStore(
      (state) => state.getTotalQuantity()
    );
  return (
    <header>
      <Link to="/">
        Tech Store
      </Link>
      <nav>
        <Link to="/products">
          Sản phẩm
        </Link>
        <Link to="/cart">
          Giỏ hàng ({totalQuantity})
        </Link>
        <Link to="/login">
          Đăng nhập
        </Link>
      </nav>
    </header>
  );
}