import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="card">
      <h1 className="card-title mb-2">404</h1>
      <p className="text-sm text-muted">
        Сторінку не знайдено. Повернутися на{" "}
        <Link to="/" className="link">
          головну
        </Link>
        .
      </p>
    </div>
  );
}
