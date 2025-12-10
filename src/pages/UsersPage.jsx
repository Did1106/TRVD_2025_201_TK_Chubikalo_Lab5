import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/client.js";
import ErrorAlert from "../components/ErrorAlert.jsx";
import Loader from "../components/Loader.jsx";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/api/users");
      setUsers(res.data || []);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Сесія завершилась. Увійдіть знову.");
      } else {
        setError("Не вдалося завантажити користувачів.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm("Видалити користувача?")) return;
    try {
      await api.delete(`/api/users/${id}`);
      setUsers((list) => list.filter((u) => u.id !== id));
    } catch (err) {
      setError("Помилка видалення користувача.");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h1 className="card-title">Користувачі</h1>
          <p className="card-subtitle">
            Перегляд, створення, редагування та видалення анкет.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/users/new")}
        >
          Додати користувача
        </button>
      </div>

      <ErrorAlert message={error} />

      {users.length === 0 ? (
        <p className="text-sm text-muted">Немає користувачів.</p>
      ) : (
        <div className="mt-2" style={{ display: "grid", gap: "10px" }}>
          {users.map((u) => (
            <div
              key={u.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #111827",
                background: "#020617"
              }}
            >
              <div>
                <div className="text-sm" style={{ fontWeight: 600 }}>
                  {u.name}{" "}
                  {typeof u.age === "number" && !Number.isNaN(u.age)
                    ? `(${u.age})`
                    : ""}
                </div>
                <div className="text-xs text-muted">
                  {u.city ? u.city : "Місто не вказано"}
                </div>
                {u.bio && (
                  <div className="text-xs mt-1">
                    {u.bio.length > 80 ? u.bio.slice(0, 80) + "..." : u.bio}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate(`/users/${u.id}/edit`)}
                >
                  Редагувати
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(u.id)}
                >
                  Видалити
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
