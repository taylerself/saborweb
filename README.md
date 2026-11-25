# SaborWeb

O SaborWeb é uma aplicação web desenvolvida para facilitar a organização, o armazenamento e a consulta de receitas culinárias. O projeto funciona como um livro de receitas digital e personalizado, permitindo que o usuário organize seu próprio acervo de maneira simples e intuitiva.

## 1. Requisitos

Para executar o projeto, é necessário possuir:

- Visual Studio Code (VS Code);
- Extensão Live Server instalada no VS Code;
- Navegador web, preferencialmente Google Chrome ou Microsoft Edge.

Não é necessário instalar um banco de dados, Node.js ou outras dependências.

## 2. Como baixar o projeto

1. Acesse o repositório do SaborWeb no GitHub.
2. Clique no botão verde **<> Code**.
3. Selecione a opção **Download ZIP**.
4. Extraia o arquivo compactado em uma pasta de sua preferência.

Também é possível clonar o repositório utilizando o Git:

`git clone https://github.com/taylerself/saborweb.git`

## 3. Como executar o SaborWeb

1. Abra o Visual Studio Code.
2. Clique em **File > Open Folder** (Arquivo > Abrir Pasta).
3. Selecione a pasta do SaborWeb.
4. Na aba de extensões do VS Code, procure e instale a extensão **Live Server**, caso ainda não esteja instalada.
5. Localize o arquivo `index.html`.
6. Clique com o botão direito sobre o arquivo.
7. Selecione **Open with Live Server**.

O sistema será aberto automaticamente no navegador.

## 4. Credenciais de acesso

Para acessar a conta demonstrativa, utilize as seguintes credenciais:

| Campo | Informação |
|---|---|
| Usuário | @MestrecucaA |
| Senha | Bomdeprato01 |

As credenciais são destinadas exclusivamente à demonstração do sistema.

## 5. Como utilizar o sistema

### Listas de receitas

Permite criar listas personalizadas para organizar receitas por categorias, como sobremesas, massas, bebidas e refeições principais.

### Cadastro de receitas

O usuário pode cadastrar suas próprias receitas, informando os ingredientes e o modo de preparo.

### Consulta e edição

As receitas cadastradas podem ser consultadas e editadas posteriormente, permitindo atualizar as informações sempre que necessário.

### Lembretes

Permite registrar lembretes relacionados à rotina culinária.

### Perfil

Área destinada à consulta e personalização das informações do usuário.

## 6. Armazenamento de dados

O SaborWeb utiliza o armazenamento local do navegador (`localStorage`) para preservar os dados cadastrados.

Isso significa que:

- Os dados permanecem salvos após fechar ou atualizar a página.
- Não é necessário utilizar um banco de dados externo.
- Os dados não são sincronizados entre diferentes dispositivos.
- Limpar os dados de navegação poderá excluir as informações cadastradas.

Recomenda-se utilizar sempre o mesmo navegador, endereço e porta de acesso para preservar o acervo.

## 7. Funcionamento offline

O SaborWeb utiliza um Service Worker para permitir a utilização de funcionalidades mesmo sem conexão com a internet.

Para testar:

1. Execute o projeto normalmente pelo Live Server.
2. Acesse o sistema enquanto estiver conectado à internet.
3. Aguarde o carregamento completo da aplicação.
4. Desconecte-se da internet.
5. Continue utilizando as funcionalidades disponíveis offline.

## 8. Tecnologias utilizadas

- **HTML5:** estruturação das páginas.
- **CSS3:** estilização e responsividade.
- **JavaScript:** funcionalidades e interatividade.
- **LocalStorage:** armazenamento local de informações.
- **Service Worker:** suporte ao funcionamento offline.

## 9. Funcionalidades em desenvolvimento

O projeto encontra-se em sua versão inicial. Algumas funcionalidades estão previstas para implementação futura:

- Busca avançada de receitas;
- Publicação e compartilhamento de receitas;
- Comunidade de usuários.

## 10. Integrantes

- Felipe Henrique Mortari Ercolin
- Hauan Lins Gonçalves
- Pedro Henrique Pereira Guimarães

## 11. Sobre o projeto

Projeto acadêmico desenvolvido no curso de Ciência da Computação Afya.

O SaborWeb tem como objetivo incentivar o desenvolvimento das habilidades culinárias, oferecendo uma ferramenta acessível, organizada e prática para o cotidiano dos usuários.