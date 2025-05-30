import { Routes, Route } from "react-router-dom";
import { useAuthStore } from "./stores/authStore";
import { Navigate } from "react-router-dom";

import Project from "./pages/project/projectId";
import Register from "./pages/register";
import SignIn from "./pages/signIn";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Pricing from "./pages/pricing";
import About from "./pages/about";
import Features from "./pages/features";
import Docs from "./pages/docs";
import PageNotFound from "./404Page";

const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<PageNotFound />} />{" "}
        {/* Catch-all route for 404 */}
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project/:id"
          element={
            <ProtectedRoute>
              <Project />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/docs" element={<Docs />} />
        {/* <Route path="/projects" element={<Projects />} /> */}
      </Routes>
    </>
  );
};

export default App;
