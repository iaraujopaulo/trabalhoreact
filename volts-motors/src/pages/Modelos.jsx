// Modelos (rota "/modelos"): mostra um card para cada carro do catálogo MODELOS (constants.js),
// com um botão "Fazer pedido" que leva à página de Pedido (e, sem login, ao Login).
import { Link } from "react-router-dom";
import PaginaInterna from "../components/PaginaInterna.jsx";
import { LARANJA, MODELOS } from "../constants.js";
import { cartao } from "../estilos.js";

export default function Modelos() {
  return (
    <PaginaInterna titulo="Nossos modelos" subtitulo="Três carros elétricos para três estilos de vida.">
      <div className="row g-4">
        {/* Object.entries transforma o catálogo (objeto) em uma lista de [nome, dados] */}
        {Object.entries(MODELOS).map(([nome, m]) => (
          <div className="col-md-6 col-lg-4" key={nome}>
            <article className="card h-100" style={cartao}>
              {/* d-flex + flex-column: o botão fica sempre no fim do card, mesmo com textos de tamanhos diferentes */}
              <div className="card-body p-4 d-flex flex-column">
                {/* Foto do carro */}
                <img className="img-fluid rounded mb-3" src={m.img} alt={nome} />
                {/* Tipo do carro (ex.: SUV elétrico) em laranja */}
                <p className="small text-uppercase mb-2" style={{ color: LARANJA, letterSpacing: 2 }}>{m.tipo}</p>
                <h2 className="h5 fw-semibold">{nome}</h2>
                {/* flex-grow-1: o texto ocupa o espaço livre e empurra o botão para baixo */}
                <p className="card-text text-secondary-emphasis fw-light flex-grow-1">{m.texto}</p>
                {/* Leva para o Pedido. Quem não está logado é redirecionado automaticamente ao Login
                    (a RotaProtegida do App.jsx faz esse desvio); depois do login, o site abre o Pedido */}
                <Link className="btn btn-light fw-semibold align-self-start" to="/pedido">Fazer pedido</Link>
              </div>
            </article>
          </div>
        ))}
      </div>
    </PaginaInterna>
  );
}
