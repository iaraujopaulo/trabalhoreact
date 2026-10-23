// Sobre (rota "/sobre"): textos institucionais (quem somos, missão, visão e valores).
import PaginaInterna from "../components/PaginaInterna.jsx";

// Cada bloco de texto é [título, texto]. Para mudar ou acrescentar um bloco, basta editar esta lista
const BLOCOS = [
  ["Quem somos", "A VOLTS MOTORS é uma fabricante de automóveis elétricos criada para tornar a mobilidade limpa acessível, confortável e divertida. Projetamos carros do compacto urbano ao esportivo de luxo."],
  ["Missão", "Oferecer veículos elétricos confiáveis e tecnológicos que reduzam o custo e o impacto ambiental de se locomover."],
  ["Visão", "Ser referência em mobilidade elétrica, com uma abordagem diferente de produção, direção assistida e informações ao vivo."],
  ["Valores", "Sustentabilidade, segurança, transparência com o cliente e inovação contínua."],
];

export default function Sobre() {
  return (
    <PaginaInterna titulo="Sobre a VOLTS MOTORS" subtitulo="Uma nova forma de pensar sobre carros.">
      {/* Limita a largura do texto para facilitar a leitura */}
      <div style={{ maxWidth: 760 }}>
        {/* Uma seção (título + parágrafo) para cada bloco da lista */}
        {BLOCOS.map(([titulo, texto]) => (
          <section key={titulo}>
            <h2 className="h4 fw-semibold mt-4 mb-2">{titulo}</h2>
            <p className="text-secondary-emphasis fw-light" style={{ lineHeight: 1.8 }}>{texto}</p>
          </section>
        ))}
      </div>
    </PaginaInterna>
  );
}
