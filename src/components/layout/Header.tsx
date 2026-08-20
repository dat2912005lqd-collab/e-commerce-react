import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useCartStore } from "../../store/cartStore"; // ← THÊM DÒNG NÀY
import { useEffect, useState } from "react"; // ← THÊM DÒNG NÀY

interface HeaderProps {
  cartCount?: number;
}

export default function Header({ cartCount: propCartCount }: HeaderProps) {
  const user = useAuthStore((state) => state.user);
  const cartItems = useCartStore((state) => state.items); // ← THÊM DÒNG NÀY
  const [cartCount, setCartCount] = useState(propCartCount || 0); // ← THÊM DÒNG NÀY

  // ← THÊM TOÀN BỘ useEffect NÀY
  useEffect(() => {
    if (cartItems && Array.isArray(cartItems)) {
      const total = cartItems.reduce((sum, item) => {
        // Kiểm tra item có 'qty' hoặc 'quantity'
        const qty = (item as any).qty || (item as any).quantity || 0;
        return sum + qty;
      }, 0);
      setCartCount(total);
    }
  }, [cartItems]);

  return (
    <header>
      <Link to="/">
        <strong>E-Commerce Store</strong>
      </Link>
      <nav>
        <NavLink to="/products">Sản phẩm</NavLink>
        <NavLink to="/categories">Danh mục</NavLink>
        <NavLink to="/cart">Giỏ hàng ({cartCount})</NavLink>
        {user ? (
          <>
            <NavLink to="/profile">{user.name}</NavLink>
            {user.role === "admin" && <NavLink to="/admin">Quản trị</NavLink>}
          </>
        ) : (
          <>
            <NavLink to="/login">Đăng nhập</NavLink>
            <NavLink to="/register">Đăng ký</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}