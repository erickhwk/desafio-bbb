# Desafio BBB

## Descrição

Esta aplicação permite aos usuários votar nos participantes que desejam eliminar em uma votação estilo Big Brother Brasil. Utiliza Ruby on Rails como backend, com processamento assíncrono de votos usando Sidekiq e Redis. A validação de votos é feita através do Google reCAPTCHA para evitar votos de bots. O frontend é servido separadamente usando Node.js e http-server.

## Tecnologias

- **Ruby:** 3.3.0
- **Rails:** 7.1.3
- **Sidekiq:** 7.2.4
- **Redis:** 5.2.0
- **Node.js:** Necessário para servir o frontend
- **http-server:** Para servir o frontend

## Funcionalidades

- Usuários podem votar nos participantes que desejam eliminar
- O voto é validado através do reCAPTCHA do Google para evitar bots
- Processamento assíncrono dos votos via Sidekiq e Redis
- Um painel geral da votação

## Configuração do Ambiente

### Pré-requisitos

- [Ruby 3.3.0](https://www.ruby-lang.org/en/downloads/)
- [Rails 7.1.3](https://guides.rubyonrails.org/v7.1.3/)
- [Redis 5.2.0](https://redis.io/download)
- [Node.js](https://nodejs.org/)
- [http-server](https://www.npmjs.com/package/http-server)

### Clone o Repositório

```bash
git clone https://github.com/erickhwk/desafio-bbb.git
cd desafio-bbb
```

### Instale as Dependências
No diretório /backend:

```bash
bundle install
```

### Configurar Variáveis de Ambiente
Crie um arquivo .env na no diretório /backend:

```bash
touch .env
```
Copie o conteúdo de .env.example para .env

```bash
cp .env.example .env
```
A chave será encaminhada por email.

### Configurar o Banco de Dados
No diretório /backend:

```bash
rails db:create
rails db:migrate
rails db:seed
```

### Inicializar o Redis e o Sidekiq
No diretório /backend, abra um terminal e inicie o Redis:

```bash
redis-server
```

Em outro terminal, inicie o Sidekiq:

```bash
bundle exec sidekiq
```

### Iniciar o Servidor Rails
No diretório /backend:

```bash
rails server
```

### Configurar e Iniciar o Frontend
Instale o http-server globalmente se ainda não tiver:

```bash
npm install -g http-server
```

No diretório /frontend inicie o servidor:

```bash
http-server
```

### Acessar a Aplicação
- **Backend:** Acesse http://localhost:3000
- **Frontend:** Acesse http://127.0.0.1:8080 (ou a porta que o http-server estiver usando)


# Arquitetura
A aplicação segue uma arquitetura de camadas, dividindo as responsabilidades em três camadas principais:

- **Apresentação (Frontend):** Responsável pela interface gráfica com o usuário, exibindo formulários de votação, o painel de resultados e outras informações relevantes.
- **Aplicação (Backend):** Responsável pela lógica de negócio da aplicação, incluindo a validação de votos, processamento de resultados e armazenamento de dados.
- **Dados:** Responsável pelo armazenamento de dados da aplicação, utilizando um banco de dados relacional PostgreSQL.

## Componentes do Sistema

### Frontend:
- **Página de Votação:** Permite que os usuários selecionem um participante para eliminar e enviem seus votos.
- **Página de Confirmação:** Exibe a validação do voto do usuário e exibe o estado atual da votação. 
- **Painel de Resultados:** Exibe os votos em tempo real e o ranking dos participantes.

### Backend:
- **Controladores:** Gerenciam as requisições HTTP da API, validando votos, enfileirando tarefas assíncronas e atualizando os resultados.
- **Modelos:** Representam os dados da aplicação, como participantes, votos e concursos.
- **Jobs:** Processam tarefas assíncronas, como a atualização dos resultados das votações.

### Processamento Assíncrono
O Sidekiq é utilizado para processar tarefas assíncronas de forma eficiente, aproveitando ao máximo os recursos do servidor. O VoteJob é responsável por processar os votos, atualizando o banco de dados e notificando o frontend sobre as mudanças.

## Fluxo de Votação

- **Recebimento de dados:** A página inicial recebe da API os dados dos participantes envolvidos naquela votação(paredão) específico.
- **Usuário Seleciona Participante:** O usuário acessa a página de votação e seleciona o participante que deseja eliminar.
- **Validação do reCAPTCHA:** O formulário de votação é protegido pelo Google reCAPTCHA para evitar bots e votos fraudulentos.
- **Envio do Voto:** O usuário envia o formulário de votação, que é processado pelo controlador Api::V1::VotesController#create.
- **Validação do Voto:** O controlador valida o voto, incluindo a verificação do token do reCAPTCHA e a verificação de regras de negócio.
- **Enfileiramento de Tarefa Assíncrona:** Se o voto for válido, um VoteJob é enfileirado no Sidekiq para processamento assíncrono.
- **Processamento Assíncrono:** O VoteJob processa o voto, atualizando o banco de dados com o novo voto e notificando o frontend sobre a mudança.
- **Atualização do Painel de Resultados:** O frontend pode periodicamente solicitar o status da votação para atualizar o painel de resultados com os votos mais recentes.

### Considerações de Implementação
- **Desempenho:** A aplicação é otimizada para lidar com um grande número de votos simultâneos, utilizando técnicas como cache e processamento assíncrono.
- **Segurança:** A aplicação implementa medidas de segurança para proteger contra ataques cibernéticos de bots, garantindo validação das entradas.