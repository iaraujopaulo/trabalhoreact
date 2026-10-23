// Home (rota "/"): página inicial.
// Tem 3 partes: topo com imagem de fundo e menu, seção "Visão" e rodapé com parceiros, localização e contato.
import Menu from "../components/Menu.jsx";
import Direitos from "../components/Direitos.jsx";
import { CONTATO, IMG, PARCEIROS } from "../constants.js";

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

      {/* 3) Rodapé branco com os parceiros, a localização (mapa, telefone, WhatsApp e horários) e os direitos autorais */}
      <footer className="bg-white text-dark py-5 position-relative">
        <div className="container">
          <div className="row align-items-center g-4 pb-4">
            {/* Coluna 1: nome da marca e legenda */}
            <div className="col-lg-3 text-center text-lg-start">
              <h1 className="h5 mb-3" style={{ letterSpacing: 7 }}>VOLTS MOTORS</h1>
              <h2 className="h5 fw-normal mb-0">Nossos parceiros.</h2>
            </div>

            {/* Coluna 2: um nome por linha (lista PARCEIROS do constants.js), sem link */}
            <div className="col-lg-2 d-flex flex-column align-items-center align-items-lg-start">
              {PARCEIROS.map((nome) => (
                <span key={nome} className="mb-2">&copy;{nome}</span>
              ))}
            </div>

            {/* Coluna 3: localização. Texto com os dados de contato à esquerda e o mapa à direita (empilham no celular) */}
            <div className="col-lg-7">
              <div className="row g-3 align-items-start">
                {/* Endereço, telefone, WhatsApp e horários (dados do objeto CONTATO, em constants.js) */}
                <div className="col-md-5">
                  <h2 className="h6 fw-semibold mb-3">Onde estamos</h2>
                  <p className="small mb-2">
                    <strong>Endereço:</strong><br />
                    {CONTATO.endereco}
                    <br />
                    {/* Abre o endereço no Google Maps em outra aba (rel evita que a nova aba controle esta página) */}
                    <a className="link-dark" href={CONTATO.mapaLink} target="_blank" rel="noopener noreferrer">Ver rota no Google Maps</a>
                  </p>
                  {/* tel: abre o discador do celular */}
                  <p className="small mb-2">
                    <strong>Telefone:</strong><br />
                    <a className="link-dark" href={CONTATO.telefoneLink}>{CONTATO.telefone}</a>
                  </p>
                  {/* wa.me abre uma conversa no WhatsApp */}
                  <p className="small mb-2">
                    <strong>WhatsApp:</strong><br />
                    <a className="link-dark" href={CONTATO.whatsappLink} target="_blank" rel="noopener noreferrer">{CONTATO.whatsapp}</a>
                  </p>
                  {/* Um horário por linha (lista CONTATO.horarios) */}
                  <p className="small mb-0">
                    <strong>Horários de funcionamento:</strong>
                    {CONTATO.horarios.map(([dias, horario]) => (
                      <span key={dias} className="d-block">{dias}: {horario}</span>
                    ))}
                  </p>
                </div>

                {/* Mapa do Google Maps com o ponto marcado no endereço (precisa de internet para carregar) */}
                <div className="col-md-7">
                  <iframe
                    title="Mapa com a localização da VOLTS MOTORS"
                    src={CONTATO.mapaEmbed}
                    width="100%"
                    height="280"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* fixo = false: o texto fica dentro do rodapé, e não preso à tela */}
          <Direitos cor="#555" fixo={false} />
        </div>
      </footer>
    </>
  );
}
