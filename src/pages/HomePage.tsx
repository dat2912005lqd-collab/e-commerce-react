import React from 'react';

const HomePage = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🛍️ E-Commerce Store</h1>
      <p>Chào mừng đến với cửa hàng của chúng tôi!</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px',
        marginTop: '30px'
      }}>
        <div style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>📦 Sản phẩm</h3>
          <p>Xem danh sách sản phẩm</p>
        </div>
        <div style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>🛒 Giỏ hàng</h3>
          <p>Quản lý giỏ hàng của bạn</p>
        </div>
        <div style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>👤 Tài khoản</h3>
          <p>Quản lý thông tin cá nhân</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;