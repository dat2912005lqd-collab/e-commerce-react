import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
interface HeaderProps {
  cartCount?: number;
}
export default function Header({
  cartCount = 0,
}: HeaderProps) {
  const user = useAuthStore((state) => state.user);
  return (
    <header>
      <Link to="/">
        <strong>E-Commerce Store</strong>
      </Link>
      <nav>
        <NavLink to="/products">
          Sản phẩm
        </NavLink>
        <NavLink to="/categories">
          Danh mục
        </NavLink>
        <NavLink to="/cart">
          Giỏ hàng ({cartCount})
        </NavLink>
        {user ? (
          <>
            <NavLink to="/profile">
              {user.name}
            </NavLink>

            {user.role === "admin" && (
              <NavLink to="/admin">
                Quản trị
              </NavLink>
            )}
          </>
        ) : (
          <>
            <NavLink to="/login">
              Đăng nhập
            </NavLink>
            <NavLink to="/register">
              Đăng ký
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}