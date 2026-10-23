// Guarda quem está logado e deixa qualquer componente ler isso com useAuth()
import { createContext, useContext, useState } from "react";
import { gravarSessao, lerSessao } from "../utils/storage.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // sessao = e-mail de quem está logado (lido da sessão ao abrir o site) ou null
  const [sessao, setSessao] = useState(lerSessao());

  // Chamada pelo Login: grava e guarda quem entrou
  const entrar = (email) => { gravarSessao(email); setSessao(email); };
  // Encerra a sessão
  const sair = () => { gravarSessao(null); setSessao(null); };

  return <AuthContext.Provider value={{ sessao, entrar, sair }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
