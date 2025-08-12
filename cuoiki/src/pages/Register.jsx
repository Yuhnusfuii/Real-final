import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);

  // simple password strength (0–3)
  const strength = (() => {
    let s = 0;
    if (form.password.length >= 8) s++;
    if (/[A-Z]/.test(form.password) && /[a-z]/.test(form.password)) s++;
    if (/\d/.test(form.password) || /\W/.test(form.password)) s++;
    return s;
  })();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your full name.";
    if (!emailRegex.test(form.email)) e.email = "Enter a valid email address.";
    if (form.password.length < 8) e.password = "Password must be at least 8 characters.";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match.";
    // check if email already exists
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((u) => u.email.toLowerCase() === form.email.toLowerCase())) {
      e.email = "This email is already registered.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // save user (NOTE: for demo only; do NOT store plain passwords in real apps)
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password, // later we’ll replace with proper auth/ hashing
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("users", JSON.stringify(users));

    // go to login
    navigate("/login", { state: { registeredEmail: form.email } });
  };

  return (
    <div className="register-wrap">
      <form className="card" onSubmit={onSubmit} noValidate>
        <h1>Create an account</h1>

        <label>
          Full name
          <input
            name="name"
            type="text"
            placeholder="Nguyen Van A"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
          />
          {errors.name && <span className="err">{errors.name}</span>}
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />
          {errors.email && <span className="err">{errors.email}</span>}
        </label>

        <label>
          Password
          <div className="pwd-row">
            <input
              name="password"
              type={showPwd ? "text" : "password"}
              placeholder="At least 8 characters"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="toggle"
              onClick={() => setShowPwd((v) => !v)}
              aria-label="Toggle password visibility"
            >
              {showPwd ? "Hide" : "Show"}
            </button>
          </div>
          <div className="strength">
            <div className={`bar ${strength >= 1 ? "on" : ""}`} />
            <div className={`bar ${strength >= 2 ? "on" : ""}`} />
            <div className={`bar ${strength >= 3 ? "on" : ""}`} />
          </div>
          {errors.password && <span className="err">{errors.password}</span>}
        </label>

        <label>
          Confirm password
          <input
            name="confirm"
            type={showPwd ? "text" : "password"}
            placeholder="Re-type password"
            value={form.confirm}
            onChange={handleChange}
            autoComplete="new-password"
          />
          {errors.confirm && <span className="err">{errors.confirm}</span>}
        </label>

        <button className="btn-primary" type="submit">Register</button>

        <p className="meta">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
