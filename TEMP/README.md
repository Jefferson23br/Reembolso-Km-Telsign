Meu Projeto Pessoal: ERP de Reembolso de Km 🚧

Olá! Seja muito bem-vindo ao repositório de um projeto que me enche de orgulho. O que você vê aqui é o resultado de quatro dias intensos de desenvolvimento, onde transformei uma necessidade prática em uma solução web completa e funcional.

📖 A História por Trás do Projeto
Tudo começou com um desafio do dia a dia: gerenciar de forma eficiente o reembolso de quilometragem de veículos alugados. Eu precisava de algo simples, seguro e que centralizasse todas as informações, desde o cadastro do veículo até o relatório final de despesas e pagamentos. Em vez de procurar uma ferramenta pronta, decidi construir a minha própria.

O que era para ser um pequeno sistema se tornou um verdadeiro ERP (Enterprise Resource Planning) Full Stack. Hoje, ele não está apenas no meu computador; o backend está rodando em uma VPS e o frontend está integrado e acessível online.

[www.auctusconsultoria.com.br/](https://www.auctusconsultoria.com.br/Reembolso-Km/frontend/index.html)

✨ O Que Construímos Juntos
Ao longo desta jornada, desenvolvi um sistema robusto com um ciclo de vida completo para o gerenciamento de reembolsos. Estas são as funcionalidades que implementei:

Módulo de Autenticação Segura
Sistema completo de Registro e Login de usuários, com criptografia de senhas para garantir a segurança.

Autenticação via JSON Web Tokens (JWT), protegendo todas as rotas e garantindo que cada usuário só acesse suas próprias informações.

Gerenciamento Completo de Veículos, Viagens e Despesas
CRUD de Veículos: Cadastro, listagem, edição e finalização de contratos de aluguel.

Lançamento de Viagens (KM): Registro detalhado de cada viagem, com cálculo automático do valor de reembolso baseado em uma taxa por KM.

Lançamento de Despesas: Permite registrar outros custos associados, como manutenção e combustível, com a opção de anexar comprovantes.

Módulo Financeiro Inteligente
Lançamento de Pagamentos: Uma interface inteligente que lista apenas as viagens pendentes, permite a seleção múltipla (ou "Selecionar Todas") e atualiza o status de cada viagem para "Pago" após a confirmação.

Dashboard com Indicadores Chave: A tela inicial apresenta um resumo dinâmico com filtros por mês e ano, mostrando:

Total de KM rodado no período.

Valor total a receber.

Total de despesas lançadas.

Valor total que já foi reembolsado.

Um alerta importante sobre pagamentos pendentes de meses anteriores.

Relatórios Detalhados e Prontos para Impressão
Geração de Relatórios por Período: Criei uma seção onde é possível filtrar todas as viagens por um intervalo de datas específico.

Visualização e Impressão: O relatório é exibido em uma tabela clara e organizada na tela e, com um clique, gera uma versão otimizada para impressão em formato paisagem, perfeita para ser anexada a documentos.

🛠️ As Tecnologias que Usei
Para dar vida a este projeto, escolhi uma stack tecnológica moderna e eficiente:

Backend: Node.js com Express.js para a API RESTful.

Banco de Dados: PostgreSQL, utilizando schemas para uma melhor organização dos dados.

Frontend: HTML5, CSS3 e JavaScript puro (Vanilla JS), consumindo a API com a Fetch API.

Hospedagem: O backend está em uma VPS e o frontend integrado a um site, tornando a aplicação acessível de qualquer lugar.

👨‍💻 Uma Jornada de Aprendizado
Este projeto foi uma incrível experiência de desenvolvimento. Em apenas quatro dias, consegui planejar, executar e implantar uma solução completa que resolve um problema real. Fico muito feliz em compartilhar o resultado final aqui.

Jefferson Lima

GitHub: @Jefferson23br