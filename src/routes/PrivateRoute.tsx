import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const PrivateRoute = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const location = useLocation(); // 👈 get location

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
