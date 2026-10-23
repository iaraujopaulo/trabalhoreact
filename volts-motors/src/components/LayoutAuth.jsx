// LayoutAuth: fundo das telas de Login, Cadastro e Senha.
// Mostra uma imagem em tela cheia e centraliza o conteúdo (children = o card do formulário).
import Direitos from "./Direitos.jsx";

// fundo = caminho da imagem; corDireitos = cor do texto de direitos autorais no rodapé
export default function LayoutAuth({ fundo, children, corDireitos }) {
  return (
    <div
      // min-vh-100: ocupa pelo menos a altura da tela; flex centraliza o card na vertical e na horizontal
      className="min-vh-100 d-flex align-items-center justify-content-center p-3"
      style={{
        backgroundColor: "#000",
        backgroundImage: `url("${fundo}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Card do formulário enviado pela página */}
      {children}
      {/* Direitos autorais presos ao rodapé da tela */}
      <Direitos cor={corDireitos} />
    </div>
  );
}
