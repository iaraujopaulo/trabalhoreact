// Tecnologia (rota "/tecnologia"): mostra um card para cada item da lista TECNOLOGIAS (constants.js).
import PaginaInterna from "../components/PaginaInterna.jsx";
import { TECNOLOGIAS } from "../constants.js";
import { cartao } from "../estilos.js";

export default function Tecnologia() {
  return (
    // PaginaInterna já traz menu, título, subtítulo e rodapé; aqui só colocamos o conteúdo
    <PaginaInterna titulo="Tecnologia VOLTS MOTORS" subtitulo="Dirija com mais tranquilidade e conforto: veja o que há por trás dos nossos carros elétricos.">
      {/* Grade do Bootstrap: 1 coluna no celular, 2 em telas médias e 3 em telas grandes; g-4 = espaço entre os cards */}
      <div className="row g-4">
        {/* Para cada [titulo, texto] da lista, cria um card (key ajuda o React a identificar cada item) */}
        {TECNOLOGIAS.map(([titulo, texto]) => (
          <div className="col-md-6 col-lg-4" key={titulo}>
            {/* h-100: todos os cards ficam com a mesma altura */}
            <article className="card h-100" style={cartao}>
              <div className="card-body p-4">
                <h2 className="h5 fw-semibold mb-3">{titulo}</h2>
                <p className="card-text text-secondary-emphasis fw-light">{texto}</p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </PaginaInterna>
  );
}
