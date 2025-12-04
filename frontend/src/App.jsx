import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import DashBoardPage from "./pages/Dashboard/DashBoardPage";
import NotFoundPage from "./pages/NotFoundPage";
import DocumentListPage from "./pages/Documents/DocumentListPage";
import DocumentDetailsPage from "./pages/Documents/DocumentDetailsPage";
import FlashcardListPage from "./pages/flashcards/FlashcardListPage";
import QuizTakePage from "./pages/Quizes/QuizTakePage";
import QuizResultPage from "./pages/Quizes/QuizResultPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
const App = () => {
  const isAuthenticated = false;
  const isLoading = false;
  if (isLoading) {
    return (
      <>
        <h1>loading...</h1>
      </>
    );
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          Route
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/NotfoundPage" replace />
              )
            }
          />
          {/*protected Routes*/}
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<DashBoardPage />} />
            <Route path="/documents" element={<DocumentListPage />} />
            <Route path="/documents/:id" element={<DocumentDetailsPage />} />
            <Route
              path="/document/:id/flashcards"
              element={<FlashcardListPage />}
            />
            <Route path="/quizes/:quizId" element={<QuizTakePage />} />
            <Route
              path="/quizes/:quizId/results"
              element={<QuizResultPage />}
            />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
