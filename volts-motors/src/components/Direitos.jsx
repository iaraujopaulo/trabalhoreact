
// "cor" muda a cor do texto; "fixo" prende o texto no rodapé da tela (usado nas telas de login/cadastro/senha).
export default function Direitos({ cor = "rgba(255,255,255,.75)", fixo = true }) {
  return (
    <p
      // fixo = true: posição fixa embaixo da tela e largura total; fixo = false: parágrafo comum
      className={"text-center small mb-0 " + (fixo ? "position-fixed bottom-0 start-0 w-100 pb-3" : "")}
      // pointerEvents "none" evita que o texto atrapalhe cliques nos elementos que estão por baixo
      style={{ color: cor, pointerEvents: "none", zIndex: 1 }}
    >
      &copy; 2026 VOLTS MOTORS. Todos os direitos reservados.
    </p>
  );
}
