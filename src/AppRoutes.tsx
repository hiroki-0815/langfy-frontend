import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./auth/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import Layout from "./layouts/layout";
import SearchLanguagePartners from "./pages/SearchLanguagePartnersPage";
// import ChatPage from "./pages/ChatPage";
import VideoCallPage from "./pages/VideoCallPage(delete)";
import JoinRoomPage from "./pages/JoinRoomPage";
import RoomPage from "./pages/RoomPage";
import IntroductionPage from "./pages/introductionPage";
// import RoomId from "./pages/RoomId(delete)";

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
        <Route
          path="/join-room"
          element={
            <Layout>
              <JoinRoomPage />
            </Layout>
          }
        />
        <Route
          path="/room"
          element={
            <Layout>
              <RoomPage />
            </Layout>
          }
        />
        <Route
          path="/videocall-introduction"
          element={
            <Layout>
              <IntroductionPage />
            </Layout>
          }
        />
      </Route>

      {/* <Route element={<ProtectedRoute needCurrentUser />}>
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
      </Route> */}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
