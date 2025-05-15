// App.js
import { Routes, Route } from "react-router-dom";
import Products from "./pages/products";
import Projects from "./pages/projects";
import Register from "./pages/register";
import SignIn from "./pages/signIn";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
};

export default App;
