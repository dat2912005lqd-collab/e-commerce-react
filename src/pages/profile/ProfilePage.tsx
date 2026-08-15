import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { userService } from '../../services/userService';

const ProfilePage = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.id) {
      setLoading(true);
      try {
        await userService.updateUser(user.id, { name, avatar });
      } catch (err) {
        console.error('Failed to update profile:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!user) return <div className="text-center py-8">Vui lòng đăng nhập</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h2 className="text-2xl font-bold mb-6">Hồ sơ</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <img src={user?.avatar || 'https://placehold.co/200x200'} alt="avatar" className="w-24 h-24 rounded-full mx-auto mb-4" />
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded mb-3" placeholder="Tên" />
        <input value={avatar} onChange={(e) => setAvatar(e.target.value)} className="w-full p-2 border rounded mb-3" placeholder="URL Avatar" />
        <p className="text-sm text-gray-500 mb-3">Email: {user?.email}</p>
        <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded">{loading ? 'Đang cập nhật...' : 'Cập nhật'}</button>
      </form>
    </div>
  );
};

export default ProfilePage;