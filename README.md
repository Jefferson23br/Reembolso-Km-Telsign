# Reembolso de Km - Telsign

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

> 🚧 **Atenção:** Este é um projeto que estou desenvolvendo ativamente. Novas funcionalidades e melhorias serão adicionadas em breve! 🚧

## 📖 Sobre o Projeto

Olá! Bem-vindo ao repositório do meu projeto **Reembolso de Km - Telsign**.

Iniciei este projeto Full Stack para resolver um problema prático: a necessidade de um sistema simples e eficiente para gerenciar e controlar o reembolso de quilometragem de veículos alugados. A ideia é criar um pequeno ERP web onde eu possa me autenticar de forma segura e gerenciar todo o ciclo de vida dos veículos, desde o início do aluguel até o seu término.

Aqui você encontrará todo o código da API RESTful que construí com Node.js, e também da interface de usuário (frontend) que desenvolvi para interagir com os dados.

## ✨ Funcionalidades Atuais

Até o momento, implementei as seguintes funcionalidades principais:

-   **Autenticação Segura:** Criei um sistema completo de Registro e Login de usuários, com senhas devidamente criptografadas e autenticação via JSON Web Tokens (JWT).
-   **Gerenciamento de Veículos:**
    -   Cadastro de novos veículos alugados, informando placa, descrição e a data de início do aluguel.
    -   Listagem de todos os veículos que cadastrei para meu usuário.
    -   Funcionalidade para registrar o fim de um aluguel, adicionando uma data de término.
-   **Segurança da API:** Desenvolvi um middleware de autenticação para proteger as rotas, garantindo que apenas usuários logados possam gerenciar seus próprios veículos.
-   **Organização do Banco de Dados:** Optei por usar `schemas` no PostgreSQL para manter o banco bem organizado, separando os dados de autenticação (`auth`) dos dados da aplicação (`app`).

## 🛠️ As Tecnologias que Escolhi

Para construir este projeto, optei pelas seguintes tecnologias:

### Backend (API)
-   **Node.js & Express.js:** Para a construção da API e o gerenciamento das rotas.
-   **PostgreSQL:** Como meu banco de dados relacional.
-   **Autenticação:**
    -   `jsonwebtoken` (JWT) para a geração e verificação dos tokens.
    -   `bcryptjs` para garantir a segurança das senhas.
-   **Outros:** `pg` (driver do PostgreSQL), `dotenv` e `cors`.

### Frontend
-   **HTML5, CSS3 & JavaScript (Vanilla JS):** Decidi manter o frontend simples e direto por enquanto, focando na lógica e na interação com a API usando a Fetch API.
-   **VS Code Live Server:** Para servir o frontend no meu ambiente de desenvolvimento.

## 🚀 Como Rodar o Projeto

Para que você possa configurar e rodar este projeto em sua máquina, preparei os seguintes passos:

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (recomendo a versão LTS)
-   [PostgreSQL](https://www.postgresql.org/download/)

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Jefferson23br/Reembolso-Km-Telsign.git](https://github.com/Jefferson23br/Reembolso-Km-Telsign.git)
    cd Reembolso-Km-Telsign
    ```

2.  **Configure o Backend:**
    ```bash
    cd backend
    npm install
    ```

3.  **Configure o Banco de Dados:**
    -   Você precisará criar um banco de dados e um usuário no seu PostgreSQL.
    -   Depois, execute os scripts SQL que utilizei para criar os schemas (`auth`, `app`) e as tabelas (`usuarios`, `veiculos`).

4.  **Variáveis de Ambiente:**
    -   Na pasta `backend`, crie um arquivo `.env`.
    -   Utilize o modelo abaixo para preencher com suas credenciais:
    ```env
    PORT=3000
    DB_HOST=localhost
    DB_USER=seu_usuario_do_banco
    DB_PASSWORD=sua_senha_do_banco
    DB_NAME=reembolso_km_telsign
    JWT_SECRET=SUA_CHAVE_SECRETA_E_LONGA_AQUI
    ```

### Executando a Aplicação

1.  **Inicie o Backend (Terminal 1):**
    ```bash
    # Dentro da pasta /backend
    npm run dev
    ```

2.  **Inicie o Frontend (VS Code):**
    -   Com a extensão **Live Server** instalada, clique com o botão direito no arquivo `frontend/index.html` e selecione "Open with Live Server".

## 🗺️ Endpoints da API (Versão Atual)

-   `POST /api/auth/register`
-   `POST /api/auth/login`
-   `GET /api/veiculos` (Protegido)
-   `POST /api/veiculos` (Protegido)
-   `PATCH /api/veiculos/:id/finalizar` (Protegido)

## 🔮 Próximos Passos

Como o projeto está em desenvolvimento, meus próximos objetivos são:
-   [ ] Implementar o CRUD completo para **Viagens**.
-   [ ] Vincular viagens a um veículo e calcular o valor do reembolso.
-   [ ] Criar um módulo de **Pagamentos** para fechar os ciclos semanais.
-   [ ] Melhorar a interface e a experiência do usuário.

## 👨‍💻 Autor

Olá! Eu sou Jefferson Lima, o desenvolvedor por trás deste projeto.

-   GitHub: [@Jefferson23br](https://github.com/Jefferson23br)

---