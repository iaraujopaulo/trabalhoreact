// App: define as rotas do site (SPA). Cada <Route> liga um endereço a uma página.
import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { TITULOS } from "./constants.js";
import RotaProtegida from "./components/RotaProtegida.jsx";
import Home from "./pages/Home.jsx";
import Tecnologia from "./pages/Tecnologia.jsx";
import Modelos from "./pages/Modelos.jsx";
import Sobre from "./pages/Sobre.jsx";
import Contato from "./pages/Contato.jsx";
import Pedido from "./pages/Pedido.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Login from "./pages/Login.jsx";
import Senha from "./pages/Senha.jsx";

export default function App() {
  const { pathname } = useLocation();

  // A cada troca de rota: atualiza o título da aba e volta ao topo da página
  useEffect(() => {
    document.title = TITULOS[pathname] || TITULOS["/"];
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tecnologia" element={<Tecnologia />} />
      <Route path="/modelos" element={<Modelos />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/contato" element={<Contato />} />
      {/* Fazer pedido: só para quem fez login (senão vai para /login) */}
      <Route
        path="/pedido"
        element={
          <RotaProtegida>
            <Pedido />
          </RotaProtegida>
        }
      />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/senha" element={<Senha />} />
      {/* Rota que não existe volta para a Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
