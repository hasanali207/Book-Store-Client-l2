import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function UserRoute() {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  return user?.role === "user" ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
}
