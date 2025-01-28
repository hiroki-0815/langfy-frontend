import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./auth/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import Layout from "./layouts/layout";
import SearchLanguagePartners from "./pages/SearchLanguagePartnersPage";
import ChatPage from "./pages/ChatPage";
import VideoCallPage from "./pages/VideoCallPage";
import MainVideoPage from "./pages/MainVideoPage";

const Home = () => {
  return <h1>Home Page</h1>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />

      {/* Protected Routes */}
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

      {/* Chat and Other Features Requiring Current User */}
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
          path="/main-video"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/join-video"
          element={
            <Layout>
              <MainVideoPage />
            </Layout>
          }
        />
      </Route>

      {/* Fallback for Undefined Routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
