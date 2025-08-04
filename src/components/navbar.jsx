import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Ticket AI
        </Link>
      </div>
      <div className="flex gap-2">
        {!token ? (
          <>
            <Link to="/signup" className="btn btn-sm">
              Signup
            </Link>
            <Link to="/login" className="btn btn-sm">
              Login
            </Link>
          </>
        ) : (
          <>
            <p className="text-sm">Hi, {user?.email}</p>
            <Link to="/" className="btn btn-sm">
              Tickets
            </Link>
            {user && user?.role === "admin" && (
              <Link to="/admin" className="btn btn-sm btn-primary">
                Admin Panel
              </Link>
            )}
            <button onClick={logout} className="btn btn-sm btn-outline">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}