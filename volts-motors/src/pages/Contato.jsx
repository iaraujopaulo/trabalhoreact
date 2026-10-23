// Contato (rota "/contato"): formulário com máscara de telefone e mensagem de confirmação.
// Nada é enviado a servidor: ao enviar, só aparece o aviso e os campos são limpos.
import { useState } from "react";
import PaginaInterna from "../components/PaginaInterna.jsx";
import Mensagem from "../components/Mensagem.jsx";
import { mascaraTelefone } from "../utils/mascaras.js";

// Valores iniciais (campos em branco), também usados para limpar o formulário após o envio
const VAZIO = { nome: "", email: "", telefone: "", mensagem: "" };

export default function Contato() {
  // form guarda o que foi digitado em cada campo; setForm atualiza e redesenha a tela
  const [form, setForm] = useState(VAZIO);
  // msg guarda o aviso exibido abaixo do formulário (null = sem aviso)
  const [msg, setMsg] = useState(null);

  // Chamada a cada letra digitada: atualiza o campo correspondente (name do <input>).
  // O telefone passa pela máscara para ficar no formato (DD) 99999-9999
  const mudar = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "telefone" ? mascaraTelefone(value) : value });
  };

  // Chamada ao enviar: evita recarregar a página, mostra a confirmação e limpa os campos
  const enviar = (e) => {
    e.preventDefault();
    setMsg({ ok: true, texto: "Formulário enviado" });
    setForm(VAZIO);
  };

  return (
    <PaginaInterna titulo="Fale com a VOLTS MOTORS" subtitulo="Dúvidas, reclamações ou elogios: envie sua mensagem.">
      {/* O Bootstrap estiliza os campos (form-control) e o navegador valida os campos "required" */}
      <form onSubmit={enviar} style={{ maxWidth: 600 }}>
        {/* Nome */}
        <div className="mb-3">
          <label className="form-label text-secondary-emphasis" htmlFor="c-nome">Nome completo</label>
          <input id="c-nome" className="form-control" type="text" name="nome" value={form.nome} onChange={mudar} required />
        </div>
        {/* E-mail (type="email" já valida o formato) */}
        <div className="mb-3">
          <label className="form-label text-secondary-emphasis" htmlFor="c-email">E-mail</label>
          <input id="c-email" className="form-control" type="email" name="email" value={form.email} onChange={mudar} required />
        </div>
        {/* Telefone: o pattern só aceita o formato (DD) 9999-9999 ou (DD) 99999-9999 */}
        <div className="mb-3">
          <label className="form-label text-secondary-emphasis" htmlFor="c-tel">Telefone com DDD</label>
          <input
            id="c-tel"
            className="form-control"
            type="tel"
            name="telefone"
            placeholder="(85) 99999-9999"
            pattern={"\\(\\d{2}\\) \\d{4,5}-\\d{4}"}
            title="Use o formato (DD) 99999-9999"
            value={form.telefone}
            onChange={mudar}
            required
          />
        </div>
        {/* Mensagem */}
        <div className="mb-3">
          <label className="form-label text-secondary-emphasis" htmlFor="c-msg">Mensagem</label>
          <textarea
            id="c-msg"
            className="form-control"
            name="mensagem"
            rows="5"
            placeholder="Escreva sua dúvida, reclamação ou elogio"
            value={form.mensagem}
            onChange={mudar}
            required
          />
        </div>
        {/* Aviso "Formulário enviado" */}
        <Mensagem msg={msg} />
        <button type="submit" className="btn btn-light fw-semibold px-4">Enviar</button>
      </form>
    </PaginaInterna>
  );
}
