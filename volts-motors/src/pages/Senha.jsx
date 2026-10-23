// Senha (rota "/senha"): troca a senha de uma conta existente (tela "Esqueceu a senha?").
// Depois de alterar, mostra "Senha alterada" e leva ao Login.
import { useState } from "react";
import { Link } from "react-router-dom";
import LayoutAuth from "../components/LayoutAuth.jsx";
import Campo from "../components/Campo.jsx";
import Mensagem from "../components/Mensagem.jsx";
import useRedirecionar from "../hooks/useRedirecionar.js";
import { IMG } from "../constants.js";
import { vidro } from "../estilos.js";
import { gravar, usuarios } from "../utils/storage.js";

// Valores iniciais do formulário (também usados para limpar os campos depois de alterar)
const VAZIO = { email: "", senha: "", confirmar: "" };

export default function Senha() {
  // f guarda os campos; msg guarda o aviso de erro/sucesso
  const [f, setF] = useState(VAZIO);
  const [msg, setMsg] = useState(null);
  // redirecionar("/login") espera 1,5 s e troca de rota (dá tempo de ler "Senha alterada")
  const redirecionar = useRedirecionar();

  // A cada letra digitada atualiza o campo correspondente (pelo atributo name do <input>)
  const mudar = (e) => setF({ ...f, [e.target.name]: e.target.value });

  // Ao enviar: confere o e-mail e as senhas e grava a nova senha
  const alterar = (e) => {
    e.preventDefault();
    // E-mail em minúsculas e sem espaços, para comparar corretamente
    const em = f.email.trim().toLowerCase();
    const lista = usuarios();
    // Procura a conta com esse e-mail
    const u = lista.find((x) => x.email === em);
    if (!u) return setMsg({ ok: false, texto: "E-mail não cadastrado." });
    if (f.senha !== f.confirmar) return setMsg({ ok: false, texto: "As senhas não conferem." });
    // Atualiza a senha da conta encontrada e salva a lista inteira de volta
    u.senha = f.senha;
    gravar("volts_usuarios", lista);
    // Mostra "Senha alterada", limpa o formulário e vai ao Login
    setMsg({ ok: true, texto: "Senha alterada" });
    setF(VAZIO);
    redirecionar("/login");
  };

  return (
    <LayoutAuth fundo={IMG.fundoSenha} corDireitos="#fff">
      {/* Card de vidro, um pouco mais claro que o do login (sobrescreve fundo e borda do estilo "vidro") */}
      <div className="rounded p-4 text-white" style={{ ...vidro, background: "rgba(72,72,72,.35)", border: "1px solid #ccc" }} data-bs-theme="dark">
        <form onSubmit={alterar}>
          <h1 className="text-center mb-2" style={{ letterSpacing: 6, fontSize: 15, fontWeight: 650 }}>VOLTS MOTORS</h1>
          <h2 className="text-center mb-4 fs-3 fw-semibold">Alteração de senha</h2>
          {/* E-mail da conta, nova senha e confirmação da nova senha */}
          <Campo id="s-email" rotulo="Digite seu email" type="email" name="email" value={f.email} onChange={mudar} required />
          <Campo id="s-senha" rotulo="Nova senha" type="password" name="senha" autoComplete="new-password" value={f.senha} onChange={mudar} required />
          <Campo id="s-confirmar" rotulo="Confirmar nova senha" type="password" name="confirmar" autoComplete="new-password" value={f.confirmar} onChange={mudar} required />
          {/* Aviso de erro ou de sucesso ("Senha alterada") */}
          <Mensagem msg={msg} />
          <Link className="link-light d-block mb-3" to="/login">Voltar para login</Link>
          <button type="submit" className="btn btn-outline-light w-100">Aceitar</button>
        </form>
      </div>
    </LayoutAuth>
  );
}
