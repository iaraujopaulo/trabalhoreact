// Mensagem: caixa de aviso usada nos formulários (verde = sucesso, vermelho = erro).
// Recebe "msg" no formato { ok: true/false, texto: "..." } ou null quando não há aviso.
export default function Mensagem({ msg }) {
  // Sem mensagem: reserva só o espaço de uma linha, para o formulário não "pular" quando o aviso aparecer
  if (!msg) return <div style={{ minHeight: "1.5rem" }} />;

  // Com mensagem: alert-success (verde) se ok, alert-danger (vermelho) se erro. Classes do Bootstrap
  return (
    <div className={"alert py-2 mb-3 " + (msg.ok ? "alert-success" : "alert-danger")} role="status">
      {msg.texto}
    </div>
  );
}
