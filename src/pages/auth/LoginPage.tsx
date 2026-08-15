import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('john@mail.com');
  const [password, setPassword] = useState('changeme');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded mb-3" placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded mb-3" placeholder="Mật khẩu" required />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}</button>
        <p className="text-center text-sm mt-3">Chưa có tài khoản? <Link to="/register" className="text-blue-500">Đăng ký</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;