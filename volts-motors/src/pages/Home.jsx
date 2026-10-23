// Home (rota "/"): página inicial.
// Tem 3 partes: topo com imagem de fundo e menu, seção "Visão" e rodapé com os parceiros.
import Menu from "../components/Menu.jsx";
import Direitos from "../components/Direitos.jsx";
import { IMG, PARCEIROS } from "../constants.js";

export default function Home() {
  return (
    <>
      {/* 1) Topo: imagem de fundo, menu (versão clara) e o título principal */}
      <header
        style={{
          backgroundImage: `url("${IMG.fundoHome}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#8C9CB0", // cor mostrada enquanto a imagem carrega
          minHeight: "90vh", // 90% da altura da tela
        }}
      >
        {/* claro = menu transparente com botões escuros, porque o fundo da Home é claro */}
        <Menu claro />
        <div className="container text-center text-dark pt-4 pb-5">
          <h1 className="display-4 fw-normal mx-auto" style={{ maxWidth: 730 }}>
            FUTURO DOS AUTOMOVEIS ELÉTRICOS
          </h1>
          <p className="fs-4 fw-light mx-auto mt-3" style={{ maxWidth: 730 }}>
            Dirija com mais tranquilidade e conforto.
          </p>
        </div>
      </header>

      {/* 2) Seção "Visão": texto à esquerda e imagem à direita (no celular, uma embaixo da outra).
          O boxShadow cria o degradê preto entre a imagem de fundo e esta seção */}
      <section className="bg-black text-white py-5" style={{ boxShadow: "0 -60px 60px 30px #000" }}>
        <div className="container py-4">
          <div className="row align-items-center justify-content-evenly g-5">
            {/* Coluna do texto */}
            <div className="col-lg-5">
              <h3 className="fw-light mb-4">VISÃO</h3>
              <h2 className="fw-normal mb-4" style={{ fontSize: "2.4rem", lineHeight: 1.2 }}>
                Uma revolução no modo como pensamos sobre carros
              </h2>
              <p className="fs-5 fw-light" style={{ lineHeight: 1.6 }}>
                Uma abordagem diferente, com um novo método de produção, com direção autônoma, informações ao vivo e percepção ativada autônoma em números.
              </p>
            </div>
            {/* Coluna da imagem (img-fluid: acompanha a largura da coluna) */}
            <div className="col-lg-5 text-center">
              <img className="img-fluid" src={IMG.visao} alt="Painel do carro VOLTS MOTORS" />
            </div>
          </div>
        </div>
      </section>

      {/* 3) Rodapé branco com os parceiros e os direitos autorais */}
      <footer className="bg-white text-dark py-5 position-relative">
        <div className="container">
          <div className="row align-items-center g-4 pb-4">
            {/* Coluna da esquerda: nome da marca e legenda */}
            <div className="col-md-6 text-center text-md-start">
              <h1 className="h5 mb-3" style={{ letterSpacing: 7 }}>VOLTS MOTORS</h1>
              <h2 className="h5 fw-normal mb-0">Nossos parceiros.</h2>
            </div>
            {/* Coluna da direita: um nome por linha (lista PARCEIROS do constants.js), sem link */}
            <div className="col-md-6 d-flex flex-column align-items-center align-items-md-start">
              {PARCEIROS.map((nome) => (
                <span key={nome} className="mb-2">&copy;{nome}</span>
              ))}
            </div>
          </div>
          {/* fixo = false: o texto fica dentro do rodapé, e não preso à tela */}
          <Direitos cor="#555" fixo={false} />
        </div>
      </footer>
    </>
  );
}
