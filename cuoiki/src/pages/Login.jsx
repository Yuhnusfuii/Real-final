import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  // Nếu vừa đăng ký xong, prefill email
  const registeredEmail = location.state?.registeredEmail;

  // Nếu bị ProtectedRoute chặn, đây là nơi muốn quay lại
  const redirectPath = location.state?.from?.pathname || "/dashboard";

  // Load users từ localStorage 1 lần
  const users = useMemo(
    () => JSON.parse(localStorage.getItem("users") || "[]"),
    []
  );

  useEffect(() => {
    if (registeredEmail) {
      setForm((f) => ({ ...f, email: registeredEmail }));
    }
  }, [registeredEmail]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Vui lòng nhập email.";
    if (!form.password) e.password = "Vui lòng nhập mật khẩu.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 250)); // mô phỏng delay

    const user = users.find(
      (u) => u.email.toLowerCase() === form.email.trim().toLowerCase()
    );

    if (!user || user.password !== form.password) {
      setErrors({
        email: "",
        password: "Email hoặc mật khẩu không đúng.",
      });
      setLoading(false);
      return;
    }

    // Đánh dấu đã đăng nhập (demo)
    localStorage.setItem("auth", "true");
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        name: user.name,
        email: user.email,
        loggedInAt: Date.now(),
      })
    );

    setLoading(false);

    // 👉 Điều hướng về trang định vào hoặc /dashboard
    navigate(redirectPath, { replace: true });
  };

  return (
    <div className="login-wrap">
      <form className="card" onSubmit={onSubmit} noValidate>
        <h1>Welcome back</h1>
        <p className="sub">
          Đăng nhập để tiếp tục. {registeredEmail ? "Đã điền sẵn email." : ""}
        </p>

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
          Mật khẩu
          <div className="pwd-row">
            <input
              name="password"
              type={showPwd ? "text" : "password"}
              placeholder="Mật khẩu"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="toggle"
              onClick={() => setShowPwd((v) => !v)}
              aria-label="Toggle password visibility"
            >
              {showPwd ? "Ẩn" : "Hiện"}
            </button>
          </div>
          {errors.password && <span className="err">{errors.password}</span>}
        </label>

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Đang đăng nhập…" : "Đăng nhập"}
        </button>

        <div className="meta-row">
          <span className="muted">Chưa có tài khoản?</span>{" "}
          <Link to="/register">Tạo tài khoản</Link>
        </div>
      </form>
    </div>
  );
}
