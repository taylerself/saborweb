# 🍳 SaborWeb

**Livro de receitas digital e plataforma colaborativa de culinária**

## 1. Sobre o projeto

O **SaborWeb** é um projeto de aplicação web que busca tornar a culinária mais acessível, organizada e colaborativa.

A plataforma pretende funcionar como um livro de receitas digital e interativo, permitindo que os usuários cadastrem, consultem, organizem e compartilhem receitas, além de descobrir novas formas de preparar refeições com os ingredientes disponíveis em casa.

O projeto também propõe a criação de uma comunidade culinária, na qual os usuários poderão compartilhar suas experiências, avaliar receitas e encontrar inspiração para suas preparações.

A interface será desenvolvida com foco na simplicidade, na responsividade e na facilidade de utilização durante o preparo das refeições.

## 2. Objetivo geral

Desenvolver uma aplicação web responsiva que integre um livro de receitas pessoal a uma comunidade culinária, oferecendo ferramentas para organização, consulta, publicação e avaliação de receitas.

## 3. Funcionalidades previstas

### 📖 Livro de receitas

- Cadastro, edição e exclusão de receitas.
- Exibição dos ingredientes e quantidades necessárias.
- Organização do _mise en place_ (organização e pré-preparo).
- Instruções de preparo passo a passo.
- Inclusão de fotografias dos pratos.
- Consulta das receitas salvas pelo usuário.

### 👥 Comunidade culinária

- Publicação de receitas para outros usuários.
- Visualização de receitas compartilhadas.
- Sistema de votação positiva e negativa.
- Destaque para receitas populares.
- Possibilidade de salvar receitas da comunidade no livro pessoal.

### 🗂️ Organização e pesquisa

- Pesquisa de receitas por nome ou ingrediente.
- Criação de listas e categorias personalizadas.
- Marcadores para receitas favoritas.
- Filtros para facilitar a localização de pratos.

### 🔐 Autenticação

- Cadastro de usuários.
- Login por e-mail e senha.
- Gerenciamento básico de perfil.
- Recuperação de acesso, conforme a solução de autenticação adotada.

### 📱 Recursos do dispositivo

- Seleção de imagens armazenadas no dispositivo.
- Captura de fotografias utilizando a câmera.
- Pesquisa por voz utilizando o microfone, quando compatível com o navegador.

## 4. Tecnologias previstas

As tecnologias poderão ser ajustadas conforme as necessidades e a evolução do projeto.

| Tecnologia                 | Aplicação                            |
| -------------------------- | ------------------------------------ |
| HTML5                      | Estrutura das páginas                |
| CSS3                       | Estilização e responsividade         |
| JavaScript                 | Interatividade e lógica da aplicação |
| Banco de dados (a definir) | Armazenamento de usuários e receitas |
| Git e GitHub               | Versionamento e colaboração          |

A definição das tecnologias de backend, banco de dados e autenticação será realizada durante a etapa de planejamento técnico.

## 5. Integrantes

- **Felipe Henrique Mortari Ercolin**
- **Hauan Lins Gonçalves**
- **Pedro Henrique Pereira Guimarães**

## 6. Divisão inicial de responsabilidades

A divisão abaixo é uma proposta inicial para organizar o desenvolvimento. As atribuições poderão ser redistribuídas conforme a complexidade das tarefas e o andamento do projeto.

### Membro 1 — Interface e experiência do usuário (Frontend)

**Responsabilidade principal:** desenvolver a estrutura visual e a navegação da aplicação.

Atividades:

1. Criar a estrutura inicial das páginas em HTML.
2. Desenvolver a estilização e a identidade visual em CSS.
3. Construir os componentes de interface, como botões, menus, formulários e cartões de receitas.
4. Desenvolver as telas de login e cadastro.
5. Criar a interface do livro de receitas e da visualização individual dos pratos.
6. Garantir a responsividade para computadores e dispositivos móveis.

**Entrega inicial:** protótipo navegável com as principais telas do SaborWeb, utilizando dados fictícios quando necessário.

### Membro 2 — Lógica da aplicação e gerenciamento de receitas

**Responsabilidade principal:** implementar as funcionalidades que permitem ao usuário cadastrar, consultar e organizar receitas.

Atividades:

1. Desenvolver a lógica de cadastro, edição e exclusão de receitas.
2. Implementar o gerenciamento de ingredientes e etapas de preparo.
3. Criar as funções de pesquisa e filtragem de receitas.
4. Desenvolver o sistema de favoritos e listas personalizadas.
5. Implementar a seleção e a pré-visualização de imagens.
6. Integrar as funcionalidades à interface desenvolvida pelo Membro 1.

**Entrega inicial:** funcionalidades básicas de gerenciamento de receitas operacionais, com armazenamento provisório ou persistente conforme a arquitetura definida.

### Membro 3 — Banco de dados, autenticação e comunidade

**Responsabilidade principal:** desenvolver a estrutura de persistência dos dados e os recursos de interação entre usuários.

Atividades:

1. Planejar e modelar o banco de dados da aplicação.
2. Definir as entidades e os relacionamentos de usuários, receitas, ingredientes, listas e avaliações.
3. Implementar ou integrar o sistema de autenticação.
4. Desenvolver os mecanismos de armazenamento e recuperação dos dados.
5. Implementar a publicação e a consulta de receitas compartilhadas.
6. Desenvolver o sistema de votação e classificação de popularidade.

**Entrega inicial:** modelo de banco de dados documentado e estrutura inicial de autenticação e persistência, com integração progressiva às demais funcionalidades.

## 7. Etapas de desenvolvimento

### Etapa 1 — Planejamento e estruturação

- Definir os requisitos iniciais.
- Elaborar os protótipos das interfaces.
- Escolher as tecnologias e definir a arquitetura.
- Modelar o banco de dados.
- Criar e organizar o repositório no GitHub.

### Etapa 2 — Desenvolvimento da primeira versão (MVP)

- Implementar as páginas principais.
- Desenvolver o cadastro e a visualização de receitas.
- Implementar pesquisa e filtros básicos.
- Integrar a interface aos mecanismos de armazenamento.
- Testar a aplicação em diferentes dispositivos.

### Etapa 3 — Funcionalidades colaborativas

- Integrar a autenticação dos usuários.
- Implementar a publicação de receitas.
- Desenvolver a visualização de receitas da comunidade.
- Adicionar o sistema de votação.
- Implementar favoritos e listas personalizadas.

### Etapa 4 — Melhorias e finalização

- Adicionar recursos complementares, como pesquisa por voz.
- Corrigir falhas identificadas nos testes.
- Melhorar a usabilidade e a responsividade.
- Revisar a segurança e a validação dos dados.
- Finalizar a documentação técnica.
- Preparar a apresentação e a demonstração do projeto.

## 8. Organização e colaboração

O desenvolvimento será realizado de forma colaborativa, utilizando Git e GitHub para o controle de versões.

Cada integrante deverá:

- Trabalhar preferencialmente em uma branch própria para cada funcionalidade.
- Realizar commits com descrições claras das alterações.
- Documentar as principais funções implementadas.
- Testar suas funcionalidades antes de solicitar a integração.
- Participar da revisão de código e da resolução de problemas.
- Comunicar alterações que possam afetar o trabalho dos demais integrantes.

A integração dos módulos e os testes gerais serão responsabilidades compartilhadas por toda a equipe.

## 9. Status do projeto

**Em fase inicial de planejamento e desenvolvimento.**

As funcionalidades, tecnologias e atribuições descritas neste documento representam o escopo inicialmente proposto e poderão sofrer alterações durante o desenvolvimento.

---

**SaborWeb — Organize, descubra e compartilhe sabores.**
