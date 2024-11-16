import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthenticationStore } from "../../state/store";
import { toast } from "react-toastify";

interface ProtectedRouteProps {
  requiredRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { user } = useAuthenticationStore();

  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to access this page!");
    } else if (user.role !== requiredRole) {
      toast.error("You do not have the required role to access this page!");
    }
  }, [user, requiredRole]);

 
  return user && user.role === requiredRole ? (
    <Outlet/> 
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
