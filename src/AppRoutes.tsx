import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./auth/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import Layout from "./layouts/layout";
import SearchLanguagePartners from "./pages/SearchLanguagePartnersPage";
import ChatPage from "./pages/ChatPage";
import VideoCallPage from "./pages/VideoCallPage";
import RoomId from "./pages/RoomId";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path="/search-language-partners"
          element={
            <Layout>
              <SearchLanguagePartners />
            </Layout>
          }
        />
        <Route
          path="/video-call"
          element={
            <Layout>
              <VideoCallPage />
            </Layout>
          }
        />
      </Route>

      <Route element={<ProtectedRoute needCurrentUser />}>
        <Route
          path="/chat/:userId?"
          element={
            <Layout>
              <ChatPage />
            </Layout>
          }
        />
        <Route
          path="/video-call/:roomId"
          element={
            <Layout showFooter={false}>
              <RoomId />
            </Layout>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
