// Salva e lê dados no navegador (não há servidor/banco de dados):
// - localStorage: dura mesmo fechando o navegador (usuários, pedidos, "me lembre o login")
// - sessionStorage: dura só enquanto a aba está aberta (quem está logado)

// Lê um valor do localStorage (texto JSON → objeto/lista). Se não existir ou der erro, devolve null
export const ler = (k) => {
  try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; }
};

// Converte o valor para JSON e salva no localStorage (o try/catch evita quebrar o site se o navegador bloquear)
export const gravar = (k, v) => {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignora */ }
};

// Lista de contas cadastradas (lista vazia se ainda não há nenhuma)
export const usuarios = () => ler("volts_usuarios") || [];

// Pedidos salvos: objeto em que a chave é o e-mail do comprador
export const pedidos = () => ler("volts_pedidos") || {};

// E-mail de quem está logado nesta aba (ou null)
export const lerSessao = () => {
  try { return sessionStorage.getItem("volts_sessao"); } catch (e) { return null; }
};

// Marca quem está logado (passando o e-mail) ou encerra a sessão (passando null)
export const gravarSessao = (email) => {
  try {
    if (email) sessionStorage.setItem("volts_sessao", email);
    else sessionStorage.removeItem("volts_sessao");
  } catch (e) { /* ignora */ }
};
