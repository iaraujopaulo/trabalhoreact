// Login (rota "/login"): confere e-mail e senha com as contas cadastradas.
// Se estiverem corretos, registra a sessão e abre a página de Pedido.
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LayoutAuth from "../components/LayoutAuth.jsx";
import Campo from "../components/Campo.jsx";
import Mensagem from "../components/Mensagem.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { IMG } from "../constants.js";
import { vidro } from "../estilos.js";
import { usuarios } from "../utils/storage.js";

export default function Login() {
  // navigate troca de rota pelo código; registrarSessao guarda quem entrou (vem do AuthContext)
  const navigate = useNavigate();
  const { entrar: registrarSessao } = useAuth();

  // E-mail salvo pela opção "Me lembre o login" (vem preenchido na próxima visita)
  const lembrado = (() => { try { return localStorage.getItem("volts_lembrar") || ""; } catch (e) { return ""; } })();

  // Campos do formulário, caixa "Me lembre o login" e aviso de erro
  const [email, setEmail] = useState(lembrado);
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(!!lembrado);
  const [msg, setMsg] = useState(null);

  // Ao enviar: valida os dados; se estiverem corretos, grava a sessão e vai para o Pedido
  const entrar = (e) => {
    e.preventDefault();
    // E-mail em minúsculas e sem espaços, para comparar corretamente
    const em = email.trim().toLowerCase();
    const lista = usuarios();
    // Não há nenhuma conta cadastrada
    if (!lista.length) return setMsg({ ok: false, texto: "Nenhuma conta cadastrada. Crie sua conta primeiro." });
    // E-mail ou senha não conferem
    if (!lista.find((u) => u.email === em && u.senha === senha)) return setMsg({ ok: false, texto: "E-mail ou senha incorretos." });
    // Guarda ou apaga o e-mail conforme a caixa "Me lembre o login"
    try {
      if (lembrar) localStorage.setItem("volts_lembrar", em);
      else localStorage.removeItem("volts_lembrar");
    } catch (err) { /* ignora */ }
    // Login válido: registra quem está logado e abre o Pedido (replace: o botão voltar não retorna ao login)
    registrarSessao(em);
    navigate("/pedido", { replace: true });
  };

  return (
    <LayoutAuth fundo={IMG.fundoLogin}>
      {/* Card com efeito de vidro (estilo "vidro" do estilos.js) */}
      <div className="rounded p-4 text-center text-white" style={vidro} data-bs-theme="dark">
        <form onSubmit={entrar}>
          <h2 className="h3 mb-4" style={{ letterSpacing: 6 }}>VOLTS MOTORS</h2>
          {/* Campos de e-mail e senha (o rótulo flutua sobre o campo) */}
          <Campo id="l-email" rotulo="Digite seu email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Campo id="l-senha" rotulo="Digite sua senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          {/* Caixa "Me lembre o login" à esquerda e link de recuperação de senha à direita */}
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="form-check mb-0">
              <input className="form-check-input" type="checkbox" id="l-lembrar" checked={lembrar} onChange={(e) => setLembrar(e.target.checked)} />
              <label className="form-check-label" htmlFor="l-lembrar">Me lembre o login</label>
            </div>
            <Link className="link-light" to="/senha">Esqueceu a senha?</Link>
          </div>
          {/* Aviso de erro (conta inexistente ou dados incorretos) */}
          <Mensagem msg={msg} />
          <button type="submit" className="btn btn-light w-100 fw-semibold">Entrar</button>
          {/* Link para criar uma conta nova */}
          <p className="mt-4 mb-0">
            Não tem uma conta? <Link className="link-light" to="/cadastro">Crie sua conta</Link>
          </p>
        </form>
      </div>
    </LayoutAuth>
  );
}
