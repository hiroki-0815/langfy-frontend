import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";
import { SocketProvider } from "@/context/SocketContext";
import { useGetMyUser } from "@/api/MyUserApi";
import Loading from "@/Loading/Loading";

type Props = {
  needCurrentUser?: boolean;
};

const ProtectedRoute = ({ needCurrentUser = false }: Props) => {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth0();

  const { currentUser, isLoading: isCurrentUserLoading } = useGetMyUser();

  if (isAuthLoading || (needCurrentUser && isCurrentUserLoading)) {
    return <Loading />;
  }

  if (!isAuthenticated || (needCurrentUser && !currentUser)) {
    return <Navigate to="/" replace />;
  }

  return needCurrentUser ? (
    <SocketProvider currentUser={currentUser || null}>
      <Outlet />
    </SocketProvider>
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
