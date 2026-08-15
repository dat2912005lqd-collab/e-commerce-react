import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
interface AuthGuardProps {
  children?: React.ReactNode;
}
export default function AuthGuard({ children }: AuthGuardProps) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  if (!accessToken || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }
  if (children) {
    return <>{children}</>;
  }
  return <Outlet />;
}