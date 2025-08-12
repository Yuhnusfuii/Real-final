import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("currentUser");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        setUser(null);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="dash-wrap">
        <div className="card">
          <h1>Dashboard</h1>
          <p>You’re not logged in.</p>
          <p>
            Please <Link to="/login">log in</Link> or <Link to="/register">create an account</Link>.
          </p>
        </div>
      </div>
    );
  }

  const joined = new Date(user.loggedInAt || Date.now()).toLocaleString();

  return (
    <div className="dash-wrap">
      <div className="card">
        <h1>Welcome, {user.name || user.email} 👋</h1>
        <p className="muted">You signed in at: {joined}</p>

        {/* Dynamic content example */}
        <section className="panel">
          <h2>Your quick stats</h2>
          <ul className="stats">
            <li>
              <span className="k">Projects</span>
              <span className="v">{Math.floor(Math.random() * 5) + 1}</span>
            </li>
            <li>
              <span className="k">Tasks</span>
              <span className="v">{Math.floor(Math.random() * 20) + 3}</span>
            </li>
            <li>
              <span className="k">Messages</span>
              <span className="v">{Math.floor(Math.random() * 9)}</span>
            </li>
          </ul>
        </section>

        <section className="panel">
          <h2>Profile</h2>
          <div className="profile">
            <div><b>Name:</b> {user.name || "-"}</div>
            <div><b>Email:</b> {user.email}</div>
          </div>
        </section>
      </div>
    </div>
  );
}
