import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import ErrorAlert from "../components/ErrorAlert.jsx";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/users";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Заповніть email та пароль");
      return;
    }
    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        (Array.isArray(err.response?.data?.errors)
          ? err.response.data.errors.join(", ")
          : "Помилка входу");
      setError(msg);
    }
  };

  return (
    <div className="card" style={{ maxWidth: "420px", margin: "0 auto" }}>
      <h1 className="card-title mb-2">Вхід</h1>
      <p className="text-sm text-muted mb-3">
        Увійдіть, щоб керувати користувачами.
      </p>
      <ErrorAlert message={error} />
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="input"
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="password">
            Пароль
          </label>
          <input
            className="input"
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Увійти
        </button>
      </form>
      <p className="text-xs text-muted mt-3">
        Немає акаунта?{" "}
        <Link to="/register" className="link">
          Зареєструйтеся
        </Link>
      </p>
    </div>
  );
}
