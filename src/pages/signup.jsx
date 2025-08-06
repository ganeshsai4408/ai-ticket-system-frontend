import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [form, setForm] = useState({ 
    email: "", 
    password: "", 
    role: "user",
    skills: "" 
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const signupData = {
        email: form.email,
        password: form.password,
        role: form.role,
        skills: form.skills ? form.skills.split(',').map(skill => skill.trim()) : []
      };

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (err) {
      alert("Network error. Please check your connection.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100 px-6 py-8">
        <form onSubmit={handleSignup} className="space-y-4">
          <h2 className="card-title justify-center">Signup</h2>

          <div className="form-control">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <select
              name="role"
              className="select select-bordered w-full"
              value={form.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {form.role === "admin" && (
            <div className="form-control">
              <input
                type="text"
                name="skills"
                placeholder="Skills (comma separated)"
                className="input input-bordered w-full"
                value={form.skills}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-control mt-4">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Signup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}