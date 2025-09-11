# Reembolso de Km - Telsign

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## 📖 Sobre o Projeto

O **Reembolso de Km - Telsign** é uma aplicação Full Stack desenvolvida para gerenciar e controlar o reembolso de quilometragem de veículos alugados. O sistema permite que usuários se cadastrem, façam login de forma segura e gerenciem seus lançamentos e apurem o valor pago ao final de cada periodo, registrando o início e o fim de seus períodos de rodagem.

A aplicação é composta por uma API RESTful robusta no backend e uma interface de usuário simples e reativa no frontend para interagir com os dados.

## ✨ Funcionalidades

-   **Autenticação Segura:** Sistema de Registro e Login de usuários com senhas criptografadas e autenticação baseada em JSON Web Tokens (JWT).
-   **Gerenciamento de Veículos:**
    -   Cadastro de novos veículos alugados, com placa, descrição e data de início do aluguel.
    -   Listagem de todos os veículos associados ao usuário logado.
    -   Funcionalidade para finalizar o aluguel de um veículo, adicionando uma data de término.
-   **Rotas Protegidas:** Uso de middleware para garantir que apenas usuários autenticados possam acessar e gerenciar seus próprios veículos.
-   **Organização de Banco de Dados:** Utilização de `schemas` no PostgreSQL para separar logicamente os dados de autenticação (`auth`) e da aplicação (`app`).

## 🛠️ Tecnologias Utilizadas

A aplicação é dividida em duas partes principais:

### Backend (API)
-   **Node.js:** Ambiente de execução para o JavaScript no servidor.
-   **Express.js:** Framework para a construção da API e gerenciamento de rotas.
-   **PostgreSQL:** Banco de dados relacional para persistência dos dados.
-   **Autenticação:**
    -   `jsonwebtoken` (JWT) para geração e verificação de tokens de acesso.
    -   `bcryptjs` para criptografia (hashing) de senhas.
-   **Outros:** `pg` (driver do PostgreSQL), `dotenv` (gerenciamento de variáveis de ambiente), `cors`.

### Frontend
-   **HTML5:** Estrutura da página web.
-   **CSS3:** Estilização da interface.
-   **JavaScript (Vanilla JS):** Lógica do lado do cliente e interatividade.
-   **Fetch API:** Para realizar as requisições HTTP para o backend.
-   **VS Code Live Server:** Para servir o frontend em ambiente de desenvolvimento.

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente local.

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/)
-   [PostgreSQL](https://www.postgresql.org/download/) instalado e rodando.
-   Um cliente de API como [Thunder Client](https://www.thunderclient.com/) (extensão do VS Code) ou [Postman](https://www.postman.com/).

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Jefferson23br/Reembolso-Km-Telsign.git](https://github.com/Jefferson23br/Reembolso-Km-Telsign.git)
    cd Reembolso-Km-Telsign
    ```

2.  **Configurei o Backend:**
    ```bash
    cd backend
    npm install
    ```

3.  **Configurei o Banco de Dados:**
    -   Acesse seu servidor PostgreSQL.
    -   Criei um banco de dados, um usuário e dei as permissões necessárias.
    -   Executei os scripts SQL para criar os schemas (`auth`, `app`) e as tabelas (`usuarios`, `veiculos`) conforme definido durante o desenvolvimento.

4.  **Variáveis de Ambiente:**
    -   Na pasta `backend`, criado um arquivo chamado `.env`.
    -   usado o modelo abaixo e preenchido com minhas credenciais do PostgreSQL:
    ```env
    # Configuração do Servidor
    PORT=3000

    # Configuração do Banco de Dados PostgreSQL
    DB_HOST=localhost
    DB_USER=seu_usuario_do_banco
    DB_PASSWORD=sua_senha_do_banco
    DB_NAME=reembolso_km_telsign

    # Segredo do JWT
    JWT_SECRET=SUA_CHAVE_SECRETA_E_LONGA_AQUI
    ```

### Executando a Aplicação

Você precisará de dois terminais abertos para rodar o backend e o frontend simultaneamente.

1.  **Inicie o Backend:**
    ```bash
    # No terminal 1, dentro da pasta /backend
    npm run dev
    ```
    O servidor da API estará rodando em `http://localhost:3000`.

2.  **Inicie o Frontend:**
    -   Abra o projeto no VS Code.
    -   Certifique-se de ter a extensão **Live Server** instalada.
    -   Clique com o botão direito no arquivo `frontend/index.html` e selecione "Open with Live Server".
    -   O navegador abrirá a aplicação, geralmente em `http://127.0.0.1:5500`.

##  endpoints da API

-   `POST /api/auth/register` - Registra um novo usuário.
-   `POST /api/auth/login` - Autentica um usuário e retorna um token JWT.
-   `GET /api/veiculos` - **(Protegido)** Lista todos os veículos do usuário autenticado.
-   `POST /api/veiculos` - **(Protegido)** Cadastra um novo veículo para o usuário autenticado.
-   `PATCH /api/veiculos/:id/finalizar` - **(Protegido)** Adiciona uma data de fim para o aluguel de um veículo.

## 👨‍💻 Autor

Em Desenvolvimento por **Jefferson Lima**.

-   GitHub: [@Jefferson23br](https://github.com/Jefferson23br)

---