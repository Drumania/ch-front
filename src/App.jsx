import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Auth from "@/pages/Auth";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import Lists from "@/pages/Lists";
import ListDetail from "@/pages/ListDetail";
import ListasPorCategoria from "@/pages/ListasPorCategoria";
import PublicListDetail from "@/pages/PublicListDetail";
import MyLists from "@/pages/MyLists";
import MyListDetail from "@/pages/MyListDetail";
import CrearLista from "./pages/CrearLista";
import PrivateRoute from "./routes/PrivateRoute";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/buscar" element={<SearchResults />} />
        <Route path="/categorias" element={<ListasPorCategoria />} />
        <Route path="/categorias/:categoria" element={<ListasPorCategoria />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/lista/:id" element={<ListDetail />} />
        <Route path="/listas-publicas/:id" element={<PublicListDetail />} />
        <Route path="/mis-listas" element={<MyLists />} />
        <Route path="/mis-listas/:id" element={<MyListDetail />} />
        <Route
          path="/crear-lista"
          element={
            <PrivateRoute>
              <CrearLista />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
