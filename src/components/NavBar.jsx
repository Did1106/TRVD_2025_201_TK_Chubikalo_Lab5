import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header style={{ background: "#020617", borderBottom: "1px solid #111827" }}>
      <nav
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Link to="/" className="link">
            Головна
          </Link>
          <Link to="/about" className="link">
            Про нас
          </Link>
          <Link to="/users" className="link">
            Користувачі
          </Link>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {user ? (
            <>
              <span className="text-sm text-muted">
                {user.name || user.email}
              </span>
              <button className="btn btn-secondary" onClick={onLogout}>
                Вийти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="link text-sm">
                Вхід
              </Link>
              <Link to="/register" className="link text-sm">
                Реєстрація
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
