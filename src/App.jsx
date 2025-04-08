import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Auth from "@/pages/Auth";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import CreateList from "@/pages/CreateList";
import Lists from "@/pages/Lists";
import ListDetail from "@/pages/ListDetail";
import CategoryDetail from "@/pages/CategoryDetail";
import PublicListDetail from "@/pages/PublicListDetail";
import MyLists from "@/pages/MyLists";
import MyListDetail from "@/pages/MyListDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/crear-lista" element={<CreateList />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/lista/:id" element={<ListDetail />} />
        <Route path="/categorias/:nombre" element={<CategoryDetail />} />
        <Route path="/listas-publicas/:id" element={<PublicListDetail />} />
        <Route path="/mis-listas" element={<MyLists />} />
        <Route path="/mis-listas/:id" element={<MyListDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
