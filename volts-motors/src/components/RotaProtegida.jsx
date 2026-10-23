// RotaProtegida: protege uma página. Só mostra o conteúdo (children) se houver alguém logado com conta existente;
// caso contrário, envia para a tela de Login.
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { usuarios } from "../utils/storage.js";

export default function RotaProtegida({ children }) {
  // sessao = e-mail de quem está logado (ou null)
  const { sessao } = useAuth();
  // Logado = existe sessão E esse e-mail ainda está na lista de contas cadastradas
  const logado = sessao && usuarios().some((u) => u.email === sessao);
  // "replace" não deixa a página protegida no histórico, então o botão voltar não fica preso
  return logado ? children : <Navigate to="/login" replace />;
}
