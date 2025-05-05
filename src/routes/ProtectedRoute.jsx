import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  console.log("ProtectedRoute →", { user, loading });

  if (loading) {
    return <div className="text-center p-4 text-gray-500">Загрузка...</div>;
  }

  return user ? children : <Navigate to="/" replace />;
}
