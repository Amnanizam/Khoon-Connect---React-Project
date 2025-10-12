import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Unauthorized from "../../Pages/Unauthorized";

// ✅ Define role-based access permissions
const roleAccess = {
  admin: [
    "/dashboard",
    "/dashboard/manage-requests",
    "/dashboard/manage-users",
    "/dashboard/manage-bloodbanks",
    "/dashboard/analytics",
    "/dashboard/notifications",
  ],
  patient: [
    "/dashboard",
    "/dashboard/request-blood",
    "/dashboard/history",
    "/dashboard/notifications",
    "/dashboard/profile",
  ],
  donor: [
    "/dashboard",
    "/dashboard/find-blood",
    "/dashboard/history",
    "/dashboard/notifications",
    "/dashboard/profile",
  ],
  bloodbank: [
    "/dashboard",
    "/dashboard/manage-requests",
    "/dashboard/manage-bloodbanks",
    "/dashboard/notifications",
  ],
};

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const role = user?.role;

  // 🚫 If not logged in → redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // 🧭 Get current path and check permissions
  const currentPath = location.pathname;
  const allowedPaths = roleAccess[role] || [];
  const isAllowed = allowedPaths.some((path) => currentPath.startsWith(path));

  // ❌ Block if unauthorized
  if (!isAllowed) {
    return <Unauthorized />;
  }

  // ✅ Otherwise → render the protected page
  return children;
};

export default ProtectedRoute;
