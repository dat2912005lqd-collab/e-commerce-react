import { useState } from "react";
import { userService } from "../../services/userService";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        avatar: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            setLoading(true);
            setError(null);
            await userService.register(formData);
            navigate("/login");
        } catch (err) {
            setError("Đăng ký thất bại. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>Đăng ký</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
            placeholder="Tên người dùng"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
            placeholder="Email" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
            type="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <input
            placeholder="Avatar URL"
            value={formData.avatar}
            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
            />
            <button type="submit" disabled={loading}>
                {loading ? "Đang đăng ký..." : "Đăng ký"}
            </button>
        </form>
    );
}