import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/home/Home";
import Lists from "@/pages/list/Lists";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/lists" element={<Lists />} />
      </Route>
    </Routes>
  );
}

export default App;
