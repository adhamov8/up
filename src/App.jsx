import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import MentorsPage from "./pages/MentorsPage";
import MentorDetailPage from "./pages/MentorDetailPage";
import SettingsPage from "./pages/SettingsPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import PlansPage from "./pages/PlansPage";
export default function App() {
  return (
     
    
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/chat"
            element=
              {
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
          />
          <Route
            path="/profile"
            element=
              {
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
          />
          <Route
            path="/mentors"
            element=
              {
                <ProtectedRoute>
                  <MentorsPage />
                </ProtectedRoute>
              }
          />
          <Route
            path="/mentor/:id"
            element=
              {
                <ProtectedRoute>
                  <MentorDetailPage />
                </ProtectedRoute>
              }
          />
          <Route
            path="/settings"
            element=
              {
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
          />
          <Route
            path="/plans"
            element={
              <ProtectedRoute>
                <PlansPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      
  );
}
