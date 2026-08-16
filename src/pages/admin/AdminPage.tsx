import React, { useState } from 'react'; // <-- Thêm useState vào import
import ImageUpload from '../../components/admin/ImageUpload';

const AdminPage = () => {
  const [imageUrl, setImageUrl] = useState(''); // <-- useState đã được import

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>⚙️ Admin Dashboard</h1>
      
      <div style={{ marginTop: '30px', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
        <h3>Upload ảnh sản phẩm</h3>
        <ImageUpload 
          value={imageUrl} 
          onChange={(url) => {
            setImageUrl(url);
            console.log('Uploaded URL:', url);
          }} 
        />
        {imageUrl && (
          <div style={{ marginTop: '10px' }}>
            <p>✅ Upload thành công!</p>
            <p><small>URL: {imageUrl}</small></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;