import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/home/Home";
import Lists from "@/pages/list/Lists";
import Categorys from "@/pages/category/Categorys";
import CategoryDetail from "@/pages/category/CategoryDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/categories" element={<Categorys />} />
        <Route path="/categories/:id" element={<CategoryDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
