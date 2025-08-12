import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const StatsPanel = lazy(() => import("../widgets/StatsPanel"));

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]); // optional demo

  useEffect(() => {
    const raw = localStorage.getItem("currentUser");
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch { setUser(null); }
    }
  }, []);

  if (!user) {
    return (
      <div className="dash-wrap">
        <div className="card">
          <h1>Dashboard</h1>
          <p>Bạn chưa đăng nhập.</p>
          <p>
            <Link to="/login">Đăng nhập</Link> hoặc <Link to="/register">Tạo tài khoản</Link>.
          </p>
        </div>
      </div>
    );
  }

  const joined = new Date(user.loggedInAt || Date.now()).toLocaleString();

  return (
    <div className="dash-wrap">
      <div className="card">
        <h1>Chào, {user.name || user.email} 👋</h1>
        <p className="muted">Bạn đăng nhập lúc: {joined}</p>

        <section className="panel">
          <h2>Quick stats</h2>
          <ul className="stats">
            <li><span className="k">Projects</span><span className="v">{Math.floor(Math.random()*5)+1}</span></li>
            <li><span className="k">Tasks</span><span className="v">{Math.floor(Math.random()*20)+3}</span></li>
            <li><span className="k">Messages</span><span className="v">{Math.floor(Math.random()*9)}</span></li>
          </ul>
        </section>

        {/* Lazy-load phần nặng */}
        <Suspense fallback={<div>Đang tải dữ liệu…</div>}>
          <StatsPanel />
        </Suspense>
      </div>
    </div>
  );
}
