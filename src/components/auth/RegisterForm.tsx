import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function RegisterForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Vui lòng nhập email.");
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    navigate("/login");
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Đăng ký tài khoản</h1>
      {error && (
        <p role="alert">
          {error}
        </p>
      )}
      <div>
        <label htmlFor="register-email">
          Email
        </label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Nhập email"
        />
      </div>
      <div>
        <label htmlFor="register-password">
          Mật khẩu
        </label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Nhập mật khẩu"
        />
      </div>
      <div>
        <label htmlFor="confirm-password">
          Xác nhận mật khẩu
        </label>
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(event) =>
            setConfirmPassword(event.target.value)
          }
          placeholder="Nhập lại mật khẩu"
        />
      </div>
      <button type="submit">
        Đăng ký
      </button>
      <p>
        Đã có tài khoản?{" "}
        <Link to="/login">
          Đăng nhập
        </Link>
      </p>
    </form>
  );
}