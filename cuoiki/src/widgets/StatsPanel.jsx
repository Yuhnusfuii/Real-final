// Component tách riêng để lazy-load trong Dashboard
import { useEffect, useState } from "react";

export default function StatsPanel() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // mô phỏng xử lý nặng + fetch local (không cần API)
    const timeout = setTimeout(() => {
      const saved = JSON.parse(localStorage.getItem("users") || "[]");
      const top = saved.slice(0, 5).map((u, i) => ({
        id: i + 1,
        name: u.name || "User " + (i + 1),
        email: u.email,
      }));
      setItems(top);
    }, 300); // giả lập chậm

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="panel">
      <h2>Top users (localStorage)</h2>
      {items.length === 0 ? (
        <p>Chưa có dữ liệu — hãy thử đăng ký vài tài khoản.</p>
      ) : (
        <ul>
          {items.map((u) => (
            <li key={u.id}>
              <b>{u.name}</b> — {u.email}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
