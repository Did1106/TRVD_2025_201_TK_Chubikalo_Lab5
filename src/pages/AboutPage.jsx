export default function AboutPage() {
  return (
    <div className="card">
      <h1 className="card-title mb-2">Про застосунок</h1>
      <p className="text-sm text-muted">
        Цей SPA побудований на React, використовує React Router для маршрутизації
        та REST API з бекенду Node.js.
      </p>
      <p className="text-sm mt-3">
        Ви можете авторизуватися, переглядати список користувачів, створювати
        нові анкети, редагувати та видаляти існуючі.
      </p>
    </div>
  );
}
