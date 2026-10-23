// Menu superior do site (navbar do Bootstrap) com links de rota do React Router.
// Propriedade "claro": true na Home (fundo claro, menu transparente); false nas outras páginas (fundo preto).
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { LARANJA } from "../constants.js";
import { useAuth } from "../context/AuthContext.jsx";

// Itens do menu, na ordem em que aparecem: [rota, texto]
const LINKS = [
  ["/", "Home"],
  ["/tecnologia", "Tecnologia"],
  ["/modelos", "Modelos"],
  ["/sobre", "Sobre"],
  ["/contato", "Contato"],
  ["/login", "Login"],
  ["/cadastro", "Cadastro"],
];
// Obs.: as rotas "/senha" e "/pedido" não ficam no menu. A Senha abre pelo link "Esqueceu a senha?" da tela de Login
// e o Pedido abre pelos botões "Fazer pedido" da página Modelos.

export default function Menu({ claro = false }) {
  // Controla se o menu está aberto no celular (botão "hambúrguer")
  const [aberto, setAberto] = useState(false);
  // Rota atual (ex.: "/modelos"); muda a cada navegação
  const { pathname } = useLocation();
  // Função para trocar de rota pelo código (usada no botão Sair)
  const navigate = useNavigate();
  // sessao = e-mail de quem está logado (ou null); sair = encerra a sessão
  const { sessao, sair } = useAuth();

  // Fecha o menu do celular sempre que a rota mudar
  useEffect(() => { setAberto(false); }, [pathname]);

  // Botão Sair: encerra a sessão e volta para a Home (replace: o botão voltar não retorna à página anterior)
  const aoSair = () => { sair(); navigate("/", { replace: true }); };

  // O NavLink diz se o item é a rota atual (isActive); o item ativo fica laranja
  const estiloAtivo = ({ isActive }) => (isActive ? { color: LARANJA } : undefined);

  return (
    // navbar-expand-xl: o menu aparece completo a partir de 1200px; abaixo disso vira "hambúrguer"
    <nav
      className={"navbar navbar-expand-xl " + (claro ? "navbar-light" : "border-bottom border-secondary-subtle")}
      data-bs-theme={claro ? "light" : "dark"}
      style={{ minHeight: 90, background: claro ? "transparent" : "#000", position: "relative", zIndex: 10 }}
    >
      <div className="container-fluid px-4 px-xl-5">
        {/* Nome da marca (leva à Home) */}
        <Link className="navbar-brand fw-semibold" to="/" style={{ letterSpacing: "0.45rem" }}>
          VOLTS MOTORS
        </Link>

        {/* Botão "hambúrguer" que abre/fecha o menu no celular */}
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={aberto}
          onClick={() => setAberto(!aberto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Área do menu que aparece/esconde (a classe "show" é adicionada quando aberto) */}
        <div className={"collapse navbar-collapse justify-content-end" + (aberto ? " show" : "")}>
          <ul className="navbar-nav align-items-xl-center">
            {/* Cria um link para cada item da lista; "end" na Home evita que ela fique ativa em todas as rotas */}
            {LINKS.map(([caminho, nome]) => (
              <li className="nav-item" key={caminho}>
                <NavLink className="nav-link" to={caminho} end={caminho === "/"} style={estiloAtivo}>
                  {nome}
                </NavLink>
              </li>
            ))}

            {/* Só aparece quando há alguém logado: botão para encerrar a sessão */}
            {sessao && (
              <li className="nav-item ms-xl-2 my-1 my-xl-0">
                <button className={claro ? "btn btn-dark" : "btn btn-light"} type="button" onClick={aoSair}>
                  Sair
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
