import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/client.js";
import ErrorAlert from "../components/ErrorAlert.jsx";
import Loader from "../components/Loader.jsx";

export default function UserFormPage({ mode }) {
  const isEdit = mode === "edit";
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    city: "",
    bio: ""
  });
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/api/users/${id}`);
        const u = res.data;
        setForm({
          name: u.name || "",
          age: u.age || "",
          city: u.city || "",
          bio: u.bio || ""
        });
      } catch (err) {
        setError("Не вдалося завантажити користувача.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, isEdit]);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.age || !form.city) {
      setError("Імʼя, вік та місто є обовʼязковими.");
      return;
    }
    const payload = {
      name: form.name,
      age: Number(form.age),
      city: form.city,
      bio: form.bio
    };
    try {
      if (isEdit) {
        await api.put(`/api/users/${id}`, payload);
      } else {
        await api.post("/api/users", payload);
      }
      navigate("/users");
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        (Array.isArray(err.response?.data?.errors)
          ? err.response.data.errors.join(", ")
          : "Помилка збереження користувача");
      setError(msg);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="card" style={{ maxWidth: "520px", margin: "0 auto" }}>
      <h1 className="card-title mb-2">
        {isEdit ? "Редагування користувача" : "Новий користувач"}
      </h1>
      <p className="text-sm text-muted mb-3">
        Заповніть анкету користувача для збереження в системі.
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
          <label className="label" htmlFor="age">
            Вік
          </label>
          <input
            className="input"
            id="age"
            name="age"
            type="number"
            value={form.age}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="city">
            Місто
          </label>
          <input
            className="input"
            id="city"
            name="city"
            value={form.city}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="bio">
            Про себе
          </label>
          <textarea
            className="input"
            id="bio"
            name="bio"
            rows={4}
            value={form.bio}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Зберегти
        </button>
      </form>
    </div>
  );
}
