import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./auth/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import SearchLanguagePartners from "./pages/SearchLanguagePartnersPage";
import ChatPage from "./pages/ChatPage";
import ProMainVideoPage from "./pages/ProMainVideoPage";
import MainVideoPage from "./pages/MainVideoPage";
import Layout from "./layouts/layout";
import MomentsPage from "./pages/MomentsPage";
import UserPage from "./pages/UserPage";

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
            <Layout showNavigation>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path="/search-language-partners"
          element={
            <Layout showNavigation>
              <SearchLanguagePartners />
            </Layout>
          }
        />
        <Route
          path="/moments"
          element={
            <Layout showNavigation>
              <MomentsPage />
            </Layout>
          }
        />
        <Route
          path="/user-page"
          element={
            <Layout showNavigation>
              <UserPage />
            </Layout>
          }
        />
      </Route>

      <Route element={<ProtectedRoute needCurrentUser />}>
        <Route
          path="/chat/:userId?"
          element={
            <Layout showNavigation>
              <ChatPage />
            </Layout>
          }
        />
        <Route
          path="/join-video/:roomId?"
          element={
            <Layout showFooter={false}>
              <MainVideoPage />
            </Layout>
          }
        />
        <Route
          path="/join-video-pro/:roomId?"
          element={
            <Layout showFooter={false}>
              <ProMainVideoPage />
            </Layout>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
