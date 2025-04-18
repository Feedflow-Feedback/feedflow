// App.js
import { Routes, Route } from "react-router-dom";
import Products from "./pages/products";
import Home from "./pages/home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
};

export default App;
