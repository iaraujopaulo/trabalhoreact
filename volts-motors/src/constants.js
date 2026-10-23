// Dados fixos do site: cores, caminhos de imagens, carros e textos.

// Cor de destaque (laranja): item ativo do menu e rótulos dos carros
export const LARANJA = "#E15F09";

// Monta o caminho de uma imagem da pasta public/imagens/ (encodeURI trata espaços e acentos no nome do arquivo)
const img = (nome) => import.meta.env.BASE_URL + "imagens/" + encodeURI(nome);

// Imagens usadas nas páginas: fundo da Home, imagem da seção Visão e fundos das telas de login/cadastro/senha
export const IMG = {
  fundoHome: img("c837a6_02de7d4c43d44b7b890854049ed75da8f000.webp"),
  visao: img("Captura de tela 2024-04-07 170507.png"),
  fundoLogin: img("carro-eletrico.jpg"),
  fundoSenha: img("closeup-shot-car-wiper-with-sunset-background.jpg"),
};

// Catálogo dos 3 carros (nome → tipo, imagem e descrição). Usado em Modelos e na escolha do pedido
export const MODELOS = {
  "Volts E1": { tipo: "Compacto urbano", img: img("volts-e1.png"), texto: "Pequeno por fora, esperto por dentro. Feito para manobrar fácil na cidade, estacionar em qualquer vaga e gastar pouco." },
  "Volts X": { tipo: "SUV elétrico", img: img("volts-x.png"), texto: "Espaço para a família toda, posição de dirigir elevada e conforto para viagens longas, sem abrir mão da eficiência." },
  "Volts GT": { tipo: "Esportivo de luxo", img: img("volts-gt.png"), texto: "Aceleração forte, acabamento premium e desenho baixo e largo. O elétrico para quem gosta de dirigir." },
};

// Cards da página Tecnologia: cada item é [título, texto]
export const TECNOLOGIAS = [
  ["Bateria e autonomia", "Baterias de íons de lítio com gerenciamento térmico inteligente, que mantêm o desempenho no calor e prolongam a vida útil do conjunto."],
  ["Recarga rápida", "Compatível com carregadores domésticos, públicos e de corrente contínua. Em estações rápidas, a bateria recupera boa parte da carga no tempo de um café."],
  ["Motor elétrico eficiente", "Torque instantâneo, funcionamento silencioso e menos peças móveis, o que significa menos manutenção do que um motor a combustão."],
  ["Frenagem regenerativa", "Ao desacelerar, o carro transforma movimento em energia e devolve à bateria, aumentando a autonomia no trânsito urbano."],
  ["Direção assistida", "Sensores e câmeras ajudam a manter a faixa, evitar colisões e estacionar com mais segurança e tranquilidade."],
  ["Software conectado", "Painel com informações ao vivo, rotas com pontos de recarga e atualizações pelo ar que melhoram o carro com o tempo."],
];

// Parceiros mostrados no rodapé da Home
export const PARCEIROS = ["Adriano", "Bruno", "Igor", "Mateus", "Patricia", "Ronaldo", "Weberth"];

// Localização e contato da empresa (mostrados no rodapé da Home, junto com o mapa)
const ENDERECO = "Av. Humberto Monte, 2929 - Pici, Fortaleza - CE, 60440-593";
export const CONTATO = {
  endereco: ENDERECO,
  telefone: "(85) 3235-5670",
  telefoneLink: "tel:+558532355670", // abre o discador no celular
  whatsapp: "(85) 99241-4532",
  whatsappLink: "https://wa.me/5585992414532", // abre a conversa no WhatsApp (código 55 = Brasil)
  // Horários de funcionamento: cada item é [dias, horário]
  horarios: [
    ["Segunda a sexta-feira", "08:00 às 17:00"],
    ["Sábado", "08:00 às 12:00"],
  ],
  // Mapa do Google Maps (versão para incorporar) com o ponto marcado no endereço; encodeURIComponent trata espaços e acentos
  mapaEmbed: "https://www.google.com/maps?q=" + encodeURIComponent(ENDERECO) + "&output=embed",
  // Link para abrir o endereço no Google Maps (ver rota)
  mapaLink: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ENDERECO),
};

// Título da aba do navegador para cada rota
export const TITULOS = {
  "/": "VOLTS MOTORS",
  "/tecnologia": "Tecnologia | VOLTS MOTORS",
  "/modelos": "Modelos | VOLTS MOTORS",
  "/sobre": "Sobre | VOLTS MOTORS",
  "/contato": "Contato | VOLTS MOTORS",
  "/pedido": "Pedido | VOLTS MOTORS",
  "/cadastro": "Página de Cadastro",
  "/login": "Página de login",
  "/senha": "VOLTS MOTORS - Alteração de senha",
};
