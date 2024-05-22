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

Com o seguinte conteúdo:

```bash
RECAPTCHA_SITE_KEY="6LefZ-QpAAAAAIOr0T-1JPVyATGGAhPWvJ3_QS1M"
RECAPTCHA_SECRET_KEY="6LefZ-QpAAAAAJESd-NzEznfVWutdyqIVAVYfVBA"
```

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