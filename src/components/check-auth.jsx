import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckAuth({ children, protected: protectedRoute }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (protectedRoute) {
      if (!token || !user) {
        navigate("/login");
        return;
      }
      // Verify token is still valid by checking if user data exists
      try {
        JSON.parse(user);
        setLoading(false);
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    } else {
      if (token && user) {
        navigate("/");
        return;
      }
      setLoading(false);
    }
  }, [navigate, protectedRoute]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  return children;
}

export default CheckAuth;