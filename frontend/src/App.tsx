import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import CoursesList from "./components/CoursesList";
import SubjectsList from "./components/SubjectsList";
import AssignmentsList from "./components/AssignmentsList";
import SubmissionsList from "./components/SubmissionsList";
import MessageList from "./components/MessageList";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token")); // Asegura que el estado refleje cambios en localStorage
  }, []);

  const handleLoginSuccess = (receivedToken: string) => {
    localStorage.setItem("token", receivedToken);
    setToken(receivedToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {!token ? (
          <Routes>
            <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <>
            <Navbar onLogout={handleLogout} />
            <div className="flex-grow p-16">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route element={<ProtectedRoute />}> 
                  <Route path="/courses" element={<CoursesList />} />
                  <Route path="/subjects" element={<SubjectsList />} />
                  <Route path="/assignments" element={<AssignmentsList />} />
                  <Route path="/submissions" element={<SubmissionsList />} />
                  <Route path="/messages" element={<MessageList />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}