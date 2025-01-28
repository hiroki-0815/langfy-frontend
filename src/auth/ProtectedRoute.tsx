import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { SocketProvider } from "@/context/SocketContext";
import { useGetMyUser } from "@/api/MyUserApi";
import Loading from "@/skeletons/Loading";

type Props = {
  needCurrentUser?: boolean;
};

const ProtectedRoute = ({ needCurrentUser = false }: Props) => {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth0();
  const { currentUser, isLoading: isCurrentUserLoading } = useGetMyUser();
  const location = useLocation();

  if (isAuthLoading || (needCurrentUser && isCurrentUserLoading)) {
    return <Loading />;
  }

  if (!isAuthenticated || (needCurrentUser && !currentUser)) {
    return <Navigate to="/" replace />;
  }

  const feature = location.pathname.startsWith("/chat")
    ? "chat"
    : location.pathname.startsWith("/main-video") ||
      location.pathname.startsWith("/join-video")
    ? "video"
    : null;

  return needCurrentUser ? (
    <SocketProvider currentUser={currentUser || null} feature={feature}>
      <Outlet />
    </SocketProvider>
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
