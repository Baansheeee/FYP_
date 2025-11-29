import { Navigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/authContext";
import AccessDenied from "../pages/AccessDenied";

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: 1 | 2; // 1: user, 2: admin. If undefined, any authenticated user can access
}

export const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
  const context = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    // Track the last visited page (only non-protected pages for users)
    if (location.pathname && !location.pathname.includes("/auth")) {
      sessionStorage.setItem("lastVisitedPage", location.pathname);
    }
  }, [location.pathname]);

  if (!context) {
    return <Navigate to="/auth/login" replace />;
  }

  const { user, loading } = context;

  // Still loading auth state
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // No user logged in
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Check if user has required role
  if (requiredRole !== undefined && user.role !== requiredRole) {
    // User doesn't have the required role - show access denied
    return <AccessDenied />;
  }

  return <>{children}</>;
};

// User Private Route (role 1 only)
export const UserPrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return <PrivateRoute requiredRole={1}>{children}</PrivateRoute>;
};

// Admin Private Route (role 2 only)
export const AdminPrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return <PrivateRoute requiredRole={2}>{children}</PrivateRoute>;
};

// Any Authenticated User Route
export const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  return <PrivateRoute>{children}</PrivateRoute>;
};
