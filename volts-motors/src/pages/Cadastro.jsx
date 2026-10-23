// Cadastro (rota "/cadastro"): cria uma conta nova e guarda no localStorage.
// Depois de cadastrar, mostra "Cadastrado!" e leva ao Login.
import { useState } from "react";
import { Link } from "react-router-dom";
import LayoutAuth from "../components/LayoutAuth.jsx";
import Campo from "../components/Campo.jsx";
import Mensagem from "../components/Mensagem.jsx";
import useRedirecionar from "../hooks/useRedirecionar.js";
import { IMG } from "../constants.js";
import { vidro } from "../estilos.js";
import { gravar, usuarios } from "../utils/storage.js";

// Valores iniciais do formulário (também usados para limpar os campos depois de cadastrar)
const VAZIO = { nome: "", sobrenome: "", email: "", senha: "", confirmar: "", termos: false };

export default function Cadastro() {
  // f guarda todos os campos num único objeto; msg guarda o aviso de erro/sucesso
  const [f, setF] = useState(VAZIO);
  const [msg, setMsg] = useState(null);
  // redirecionar("/login") espera 1,5 s e troca de rota (dá tempo de ler "Cadastrado!")
  const redirecionar = useRedirecionar();

  // A cada letra digitada atualiza o campo correspondente (a caixa de termos usa "checked" em vez de "value")
  const mudar = (e) => {
    const { name, value, type, checked } = e.target;
    setF({ ...f, [name]: type === "checkbox" ? checked : value });
  };

  // Ao enviar: valida os dados, salva a conta e leva ao Login
  const cadastrar = (e) => {
    e.preventDefault();
    // E-mail em minúsculas e sem espaços, para comparar corretamente
    const email = f.email.trim().toLowerCase();
    // Validações: nome preenchido, senhas iguais e e-mail ainda não usado
    if (!f.nome.trim()) return setMsg({ ok: false, texto: "Informe seu nome." });
    if (f.senha !== f.confirmar) return setMsg({ ok: false, texto: "As senhas não conferem." });
    const lista = usuarios();
    if (lista.some((u) => u.email === email)) return setMsg({ ok: false, texto: "Este e-mail já está cadastrado." });
    // Tudo certo: adiciona a conta na lista e salva no localStorage
    lista.push({ nome: f.nome.trim(), sobrenome: f.sobrenome.trim(), email, senha: f.senha });
    gravar("volts_usuarios", lista);
    // Mostra "Cadastrado!", limpa o formulário e vai ao Login
    setMsg({ ok: true, texto: "Cadastrado!" });
    setF(VAZIO);
    redirecionar("/login");
  };

  return (
    <LayoutAuth fundo={IMG.fundoLogin}>
      {/* Card com efeito de vidro */}
      <div className="rounded p-4 text-center text-white" style={vidro} data-bs-theme="dark">
        <form onSubmit={cadastrar}>
          <h1 className="fs-6 mb-2" style={{ letterSpacing: 5 }}>VOLTS MOTORS</h1>
          <h2 className="mb-4">Crie sua conta</h2>
          {/* Campos do cadastro (o sobrenome é opcional; os demais são obrigatórios) */}
          <Campo id="c-nome" rotulo="Nome" type="text" name="nome" autoComplete="off" value={f.nome} onChange={mudar} />
          <Campo id="c-sobrenome" rotulo="Sobrenome (opcional)" type="text" name="sobrenome" autoComplete="off" value={f.sobrenome} onChange={mudar} />
          <Campo id="c-email" rotulo="E-mail" type="email" name="email" autoComplete="off" value={f.email} onChange={mudar} required />
          <Campo id="c-senha" rotulo="Nova senha" type="password" name="senha" autoComplete="new-password" value={f.senha} onChange={mudar} required />
          <Campo id="c-confirmar" rotulo="Confirmar senha" type="password" name="confirmar" autoComplete="new-password" value={f.confirmar} onChange={mudar} required />
          {/* Aceite dos termos: o cadastro só é enviado com a caixa marcada */}
          <div className="form-check text-start small mb-3">
            <input className="form-check-input" type="checkbox" id="c-termos" name="termos" checked={f.termos} onChange={mudar} required />
            <label className="form-check-label" htmlFor="c-termos">
              Ao continuar, você aceita nossa <Link className="link-info" to="/sobre">Política de Privacidade</Link> e <Link className="link-info" to="/sobre">Termos de Uso</Link>
            </label>
          </div>
          {/* Aviso de erro ou de sucesso ("Cadastrado!") */}
          <Mensagem msg={msg} />
          <button type="submit" className="btn btn-light w-100 fw-semibold">Cadastrar-se</button>
          {/* Link para quem já tem conta */}
          <p className="mt-4 mb-0">
            <Link className="link-light" to="/login">Fazer login</Link> usando uma conta já cadastrada!
          </p>
        </form>
      </div>
    </LayoutAuth>
  );
}
