import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h3>🛍️ E-Commerce Store</h3>
          <p>
            Website luyện tập sử dụng <strong>Platzi Fake Store API</strong>
          </p>
          <p style={{ fontSize: '14px', color: '#bdc3c7', marginTop: '10px' }}>
            Dữ liệu sản phẩm được lấy từ Platzi API
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Liên kết nhanh</h3>
          <Link to="/products">Sản phẩm</Link>
          <Link to="/categories">Danh mục</Link>
          <Link to="/cart">Giỏ hàng</Link>
          <Link to="/orders">Đơn hàng</Link>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h3>Hỗ trợ</h3>
          <Link to="/">Chính sách bảo mật</Link>
          <Link to="/">Điều khoản sử dụng</Link>
          <Link to="/">Liên hệ</Link>
          <Link to="/">FAQ</Link>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Kết nối</h3>
          <div className="social-links">
            <span>📧 Email: support@estore.com</span>
            <span>📱 Hotline: 1900 1234</span>
            <span>🏠 Địa chỉ: 123 Đường ABC, TP.HCM</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} E-Commerce Store. 
          <small> Website luyện tập sử dụng Platzi Fake Store API</small>
        </p>
      </div>
    </footer>
  );
}