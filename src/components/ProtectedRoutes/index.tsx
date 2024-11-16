import { ReactNode,  } from "react";
import { Navigate } from "react-router-dom";
import { useAuthenticationStore } from "../../state/store";


interface ProtectedRouteProps {
  userRole: string[]; 
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ userRole, children }) => {
  const { user } = useAuthenticationStore();
  
  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!userRole.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
