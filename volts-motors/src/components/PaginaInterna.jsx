// PaginaInterna: moldura comum das páginas Tecnologia, Modelos, Sobre, Contato e Pedido.
// Monta: menu no topo, título, conteúdo (children) e rodapé. O rodapé fica sempre embaixo da tela.
import Menu from "./Menu.jsx";

export default function PaginaInterna({ titulo, subtitulo, children }) {
  return (
    // d-flex + flex-column + min-vh-100: a página ocupa a tela toda e o <main> cresce, empurrando o rodapé para baixo
    <div className="d-flex flex-column min-vh-100 bg-black text-white">
      <Menu />

      {/* Conteúdo da página: título, subtítulo opcional e o que foi colocado dentro do componente */}
      <main className="container flex-grow-1 py-5" style={{ maxWidth: 1100 }}>
        <h1 className="display-5 fw-normal mb-2">{titulo}</h1>
        {subtitulo && <p className="text-secondary-emphasis fw-light mb-5" style={{ maxWidth: 700 }}>{subtitulo}</p>}
        {children}
      </main>

      {/* Rodapé simples com os direitos autorais */}
      <footer className="text-center text-secondary border-top border-secondary-subtle py-4 small">
        &copy; 2026 VOLTS MOTORS. Todos os direitos reservados.
      </footer>
    </div>
  );
}
