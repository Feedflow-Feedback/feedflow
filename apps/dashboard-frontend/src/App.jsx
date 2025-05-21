// App.js
import { Routes, Route } from "react-router-dom";
import Products from "./pages/products";
//import Projects from "./pages/projects";
import Register from "./pages/register";
import SignIn from "./pages/signIn";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/register" element={<Register />} />
        {/* <Route path="/projects" element={<Projects />} /> */}
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
};

export default App;
