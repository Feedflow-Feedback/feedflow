// App.js
import { Routes, Route } from "react-router-dom";
import Products from "./pages/products";
import Projects from "./pages/projects";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/projects" element={<Projects />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
};

export default App;
