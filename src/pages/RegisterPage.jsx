import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import ErrorAlert from "../components/ErrorAlert.jsx";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password) {
      setError("Заповніть всі поля");
      return;
    }
    try {
      await register(form.name, form.email, form.password);
      navigate("/users");
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        (Array.isArray(err.response?.data?.errors)
          ? err.response.data.errors.join(", ")
          : "Помилка реєстрації");
      setError(msg);
    }
  };

  return (
    <div className="card" style={{ maxWidth: "420px", margin: "0 auto" }}>
      <h1 className="card-title mb-2">Реєстрація</h1>
      <p className="text-sm text-muted mb-3">
        Створіть акаунт користувача для доступу до системи.
      </p>
      <ErrorAlert message={error} />
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label className="label" htmlFor="name">
            Імʼя
          </label>
          <input
            className="input"
            id="name"
            name="name"
            value={form.name}
            onChange={onChange}
          />
        </div>
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
          Зареєструватися
        </button>
      </form>
      <p className="text-xs text-muted mt-3">
        Вже маєте акаунт?{" "}
        <Link to="/login" className="link">
          Увійти
        </Link>
      </p>
    </div>
  );
}
