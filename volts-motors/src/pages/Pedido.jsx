// Pedido (rota "/pedido"): só para quem fez login (a proteção é feita pela RotaProtegida, no App.jsx).
// Mostra os dados do comprador e permite escolher e salvar o carro.
import { useState } from "react";
import PaginaInterna from "../components/PaginaInterna.jsx";
import Mensagem from "../components/Mensagem.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { LARANJA, MODELOS } from "../constants.js";
import { cartao } from "../estilos.js";
import { gravar, pedidos, usuarios } from "../utils/storage.js";

export default function Pedido() {
  // sessao = e-mail de quem está logado
  const { sessao } = useAuth();
  // Procura na lista de contas o usuário logado (a RotaProtegida garante que ele existe)
  const usuario = usuarios().find((u) => u.email === sessao);
  // Pedido já salvo anteriormente por este usuário (null se ainda não houver)
  const salvo = pedidos()[sessao] || null;

  // Modelo e ano selecionados (começam no pedido salvo, ou no Volts E1 / 2026)
  const [modelo, setModelo] = useState(salvo ? salvo.modelo : "Volts E1");
  const [ano, setAno] = useState(salvo ? salvo.ano : "2026");
  // Pedido mostrado na linha de baixo ("Pedido salvo: ...")
  const [pedidoSalvo, setPedidoSalvo] = useState(salvo);
  // Aviso exibido depois de salvar
  const [msg, setMsg] = useState(null);

  // Ao salvar: grava modelo, ano e data no localStorage, usando o e-mail do usuário como chave
  const salvar = (e) => {
    e.preventDefault();
    const todos = pedidos(); // todos os pedidos de todos os usuários
    const novo = { modelo, ano, data: new Date().toLocaleDateString("pt-BR") };
    todos[sessao] = novo; // substitui (ou cria) o pedido deste usuário
    gravar("volts_pedidos", todos);
    setPedidoSalvo(novo);
    setMsg({ ok: true, texto: "Pedido salvo com sucesso!" });
  };

  return (
    <PaginaInterna titulo="Pedido" subtitulo="Confira seus dados e escolha o carro do seu pedido.">
      {/* Duas colunas: dados do comprador (esquerda) e escolha do carro (direita) */}
      <div className="row g-4">
        {/* Coluna 1: dados do comprador */}
        <div className="col-lg-6">
          <section className="card h-100" style={cartao}>
            <div className="card-body p-4">
              <h2 className="h5 fw-semibold mb-3">Dados do comprador</h2>
              {/* Lista de descrição (dl): cada linha tem um rótulo (dt) e um valor (dd) */}
              <dl className="row mb-0">
                <dt className="col-sm-4 text-secondary">Nome</dt>
                <dd className="col-sm-8">{usuario.nome}</dd>
                <dt className="col-sm-4 text-secondary">Sobrenome</dt>
                {/* O sobrenome é opcional no cadastro: sem ele, mostra um traço */}
                <dd className="col-sm-8">{usuario.sobrenome || "-"}</dd>
                <dt className="col-sm-4 text-secondary">E-mail</dt>
                {/* text-break quebra e-mails muito longos para não estourar o card */}
                <dd className="col-sm-8 text-break">{usuario.email}</dd>
              </dl>
            </div>
          </section>
        </div>

        {/* Coluna 2: escolha do carro */}
        <div className="col-lg-6">
          <section className="card h-100" style={cartao}>
            <div className="card-body p-4">
              <h2 className="h5 fw-semibold mb-3">Escolha do carro</h2>
              <form onSubmit={salvar}>
                {/* Lista de modelos montada a partir do catálogo MODELOS */}
                <div className="mb-3">
                  <label className="form-label text-secondary-emphasis" htmlFor="p-modelo">Modelo</label>
                  <select id="p-modelo" className="form-select" value={modelo} onChange={(e) => setModelo(e.target.value)}>
                    {Object.keys(MODELOS).map((nome) => <option key={nome}>{nome}</option>)}
                  </select>
                </div>
                {/* Ano */}
                <div className="mb-3">
                  <label className="form-label text-secondary-emphasis" htmlFor="p-ano">Ano</label>
                  <select id="p-ano" className="form-select" value={ano} onChange={(e) => setAno(e.target.value)}>
                    <option>2026</option>
                    <option>2027</option>
                  </select>
                </div>
                {/* Prévia do carro escolhido (muda junto com a seleção) */}
                <img className="img-fluid rounded mb-2" src={MODELOS[modelo].img} alt="Modelo escolhido" />
                <p className="small text-uppercase mb-3" style={{ color: LARANJA, letterSpacing: 2 }}>{MODELOS[modelo].tipo}</p>
                {/* Aviso "Pedido salvo com sucesso!" */}
                <Mensagem msg={msg} />
                <button type="submit" className="btn btn-light fw-semibold px-4">Salvar pedido</button>
                {/* Resumo do último pedido salvo */}
                <p className="text-secondary mt-3 mb-0">
                  {pedidoSalvo
                    ? `Pedido salvo: ${pedidoSalvo.modelo} ${pedidoSalvo.ano} em ${pedidoSalvo.data}`
                    : "Nenhum pedido salvo ainda."}
                </p>
              </form>
            </div>
          </section>
        </div>
      </div>
    </PaginaInterna>
  );
}
