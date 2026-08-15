import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { authService } from "../../services/authService";
import { useAuthStore } from "../../store/authStore";

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const setSession = useAuthStore((state) => state.setSession);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Vui lòng nhập email.");
      return;
    }

    if (!password) {
      setError("Vui lòng nhập mật khẩu.");
      return;
    }

    try {
      setLoading(true);

      const loginResponse = await authService.login({
        email: email.trim(),
        password,
      });

      const user = await authService.getProfile();

      setSession(
        loginResponse.accessToken,
        loginResponse.refreshToken,
        user
      );

      const from =
        (location.state as { from?: string } | null)?.from ?? "/";

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError("Email hoặc mật khẩu không chính xác.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Đăng nhập</h1>

      {error && (
        <p role="alert">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="email">Email</label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Nhập email"
          autoComplete="email"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="password">Mật khẩu</label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Nhập mật khẩu"
          autoComplete="current-password"
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
      >
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>

      <p>
        Chưa có tài khoản?{" "}
        <Link to="/register">
          Đăng ký
        </Link>
      </p>
    </form>
  );
}