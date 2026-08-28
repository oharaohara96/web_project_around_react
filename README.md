Around The U.S. (Localize-se) — React Application
Uma aplicação web responsiva em React baseada no projeto da TripleTen, permitindo aos usuários compartilhar, curtir e gerenciar cartões de locais turísticos e fotos pessoais.

Funcionalidades Principais
Gerenciamento de Perfil: Exibição dinâmica das informações do usuário e do seu avatar integrados à API.

Galeria Dinâmica: Carregamento inicial de cartões a partir de uma API externa.

Sistema de Curtidas: Funcionalidade de dar e remover likes, sincronizada em tempo real no estado e na API.

Adição e Remoção de Cartões: Possibilidade de adicionar novos cartões com título/imagem e excluir cartões que pertencem ao usuário logado.

Modais e Popups: Visualização de imagens expandidas e edição de perfil por meio de popups interativos.

Tecnologias Utilizadas
React (JSX) — Biblioteca principal para construção da interface baseada em componentes.

Hooks do React: useState, useEffect, useContext.

Context API: Compartilhamento do estado do usuário (CurrentUserContext) entre diferentes componentes.

JavaScript (ES6+): Programação assíncrona com Promise.all e requisições HTTP via fetch.

CSS3: Estilização responsiva seguindo a metodologia BEM.

Estrutura do Projeto
Plaintext
src/
├── components/
│   ├── Footer/
│   │   └── Footer.jsx
│   ├── Header/
│   │   └── Header.jsx
│   ├── Main/
│   │   ├── Card.jsx
│   │   └── Main.jsx
│   └── Popup/
│       └── ImagePopup/
│           └── ImagePopup.jsx
├── contexts/
│   └── CurrentUserContext.js
├── utils/
│   └── api.js
├── App.jsx
└── index.js
