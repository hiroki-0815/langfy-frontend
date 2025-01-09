import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";
import { SocketProvider } from "@/context/SocketContext";
import { useGetMyUser } from "@/api/MyUserApi";
import Loading from "@/skeletons/Loading";

type Props = {
  needCurrentUser?: boolean;
};

const ProtectedRoute = ({ needCurrentUser = false }: Props) => {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth0();

  // Fetch currentUser only when needed
  const { currentUser, isLoading: isCurrentUserLoading } = needCurrentUser
    ? useGetMyUser()
    : { currentUser: null, isLoading: false };

  // Show a loading indicator while authentication is loading
  if (isAuthLoading || (needCurrentUser && isCurrentUserLoading)) {
    return <Loading />;
  }

  // Redirect to the homepage if the user is not authenticated or if currentUser is required but missing
  if (!isAuthenticated || (needCurrentUser && !currentUser)) {
    return <Navigate to="/" replace />;
  }

  // Conditionally wrap the outlet with a SocketProvider if needed
  return needCurrentUser ? (
    <SocketProvider currentUser={currentUser || null}>
      <Outlet />
    </SocketProvider>
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
