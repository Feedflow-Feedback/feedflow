// App.js
import { Routes, Route } from "react-router-dom";

import Project from "./pages/project/projectId";
import Register from "./pages/register";
import SignIn from "./pages/signIn";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Pricing from "./pages/pricing";
import About from "./pages/about";
import Features from "./pages/features";
import Docs from "./pages/docs";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project/:id" element={<Project />} />
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
