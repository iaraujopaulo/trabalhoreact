# VOLTS MOTORS

Site de carros elétricos feito com React (SPA com rotas), React Router e Bootstrap 5, empacotado com Vite.

## Páginas (rotas)

O site usa `HashRouter`: o endereço fica depois do `#` (ex.: `index.html#/modelos`), o que funciona no GitHub Pages sem configuração extra.

| Rota | Página | Como chegar |
| --- | --- | --- |
| `#/` | Home (topo, seção Visão e parceiros) | Menu Home |
| `#/tecnologia` | Tecnologia (cards) | Menu Tecnologia |
| `#/modelos` | Modelos (catálogo com 3 carros) | Menu Modelos |
| `#/sobre` | Sobre (quem somos, missão, visão e valores) | Menu Sobre |
| `#/contato` | Contato (formulário com máscara de telefone) | Menu Contato |
| `#/login` | Login (com "Me lembre o login") | Menu Login |
| `#/cadastro` | Cadastro (criar conta) | Menu Cadastro |
| `#/senha` | Senha (alterar a senha de uma conta) | Link Esqueceu a senha? na tela de Login |
| `#/pedido` | Pedido (dados do comprador e escolha do carro) | Botões Fazer pedido da página Modelos |

O menu tem 7 itens (Home, Tecnologia, Modelos, Sobre, Contato, Login e Cadastro). Quando há alguém logado, aparece o botão Sair. Rota inexistente volta para a Home.

## Estrutura

```
volts-motors/
├── index.html            # Bootstrap (CSS e JS) e a <div id="root">
├── package.json
├── vite.config.js
├── public/
│   └── imagens/          # todas as imagens do site
└── src/
    ├── main.jsx          # inicia o React (HashRouter + AuthProvider( (Provedor de Autenticação)))
    ├── App.jsx           # tabela de rotas e título da aba
    ├── constants.js      # cores, imagens, modelos, tecnologias, parceiros, títulos
    ├── estilos.js        # estilos reutilizados (cartão e vidro)
    ├── components/       # Menu, PaginaInterna, LayoutAuth, Campo, Mensagem, Direitos, RotaProtegida
    ├── pages/            # Home, Tecnologia, Modelos, Sobre, Contato, Login, Cadastro, Senha, Pedido
    ├── context/          # AuthContext (quem está logado)
    ├── hooks/            # useRedirecionar (vai para outra rota após 1,5 s)
    └── utils/            # storage (localStorage/sessionStorage) e mascaras (telefone)
```

O Bootstrap continua carregado pelo `index.html` (CDN), então não é instalado via npm.

## Como rodar

Requer [Node.js](https://nodejs.org) 18 ou superior.

1. Coloque as imagens em `public/imagens/`.
2. Instale as dependências: `npm install`
3. Inicie o servidor de desenvolvimento: `npm run dev` (abre em `http://localhost:5173`)

Não abra o `index.html` com duplo clique: o Vite precisa compilar o JSX.

## Como publicar (GitHub Pages)

1. `npm run build` gera a pasta `dist/`.
2. Publique o conteúdo de `dist/` no GitHub Pages (por exemplo, com o pacote `gh-pages` ou enviando a pasta para a branch de publicação).

O `base: "./"` do `vite.config.js` deixa os caminhos relativos, então funciona em qualquer subpasta.

## Dados

Não há servidor nem banco de dados. Tudo fica no navegador:

- `localStorage`: contas (`volts_usuarios`), pedidos (`volts_pedidos`) e e-mail lembrado (`volts_lembrar`)
- `sessionStorage`: quem está logado na aba (`volts_sessao`)

As senhas ficam em texto puro no `localStorage`; isso serve só para fins didáticos, não para produção.