# Documentação do Projeto Backend Pixit

![Version](https://img.shields.io/badge/version_v1.0.0-navy)
![Node.js](https://img.shields.io/badge/Node.js_v22.15.1+-navy)
![TypeScript](https://img.shields.io/badge/TypeScript_v5.8.3+-navy)
![Mysql](https://img.shields.io/badge/MySql_v8.0.0+-navy)

## Visão Geral

Este projeto implementa um sistema backend com autenticação JWT, gerenciamento de usuários e eventos, e confirmação por e-mail, utilizando Node.js, TypeScript e MySQL em containers Docker.

## Estrutura do Projeto

```bash
.
├── README.md
├── compose.yml
├── dist
│   ├── mysql-init
│   │   └── seed.js
│   └── src
│       ├── env
│       │   └── index.js
│       ├── server.js
│       └── util
│           └── generate_binaryId.js
├── eslint.config.mjs
├── mysql-init
│   ├── schema.sql
│   └── seed.ts
├── package-lock.json
├── package.json
├── src
│   ├── @types
│   │   └── express
│   │       └── index.d.ts
│   ├── app
│   │   └── app.ts
│   ├── database
│   │   └── index.ts
│   ├── env
│   │   └── index.ts
│   ├── http
│   │   ├── controllers
│   │   │   ├── auth
│   │   │   │   └── auth.controller.ts
│   │   │   └── events
│   │   │       └── events.controller.ts
│   │   ├── middlewares
│   │   │   ├── email.middleware.ts
│   │   │   ├── registerPayload.middleware.ts
│   │   │   └── verifyEmail.middleware.ts
│   │   ├── repositories
│   │   │   ├── auth
│   │   │   │   └── auth.repository.ts
│   │   │   └── events
│   │   │       └── events.repository.ts
│   │   ├── routes
│   │   │   ├── auth
│   │   │   │   └── auth.routes.ts
│   │   │   ├── events
│   │   │   │   └── events.routes.ts
│   │   │   └── router.routes.ts
│   │   └── services
│   │       ├── auth
│   │       │   └── auth.service.ts
│   │       └── events
│   │           └── events.service.ts
│   ├── server.ts
│   └── util
│       ├── email
│       │   └── send.email.ts
│       ├── generate_binaryId.ts
│       ├── tokens
│       │   ├── createToken.jwt.ts
│       │   └── validateToken.jwt.ts
│       └── validators
│           ├── email.validator.ts
│           └── password.validator.ts
├── tsconfig.json
└── view
```

## Requisitos do Sistema

- Docker
- Node.js 16+
- npm ou yarn

## Configuração do Banco de Dados (MySQL)

### Esquema do Banco

```sql
CREATE TABLE IF NOT EXISTS users (
  id BINARY(16) PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  is_valid_email INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tokens (
  id BINARY(16) PRIMARY KEY,
  user_id BINARY(16) NOT NULL,
  token VARCHAR(255) NOT NULL,
  type ENUM('email_confirmation', 'password_reset') NOT NULL,
  is_used BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS events (
  id BINARY(16) PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  event_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  is_expired INT DEFAULT 0 NOT NULL,
  user_id BINARY(16) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Instalação e Execução

### 1. Iniciar containers Docker

```bash
docker compose up -d
```

### 2. Acessar o banco de dados

```bash
docker exec -it pixit-db mysql -u root -p pixit_db
```

### 3. Instalar dependências do projeto

```bash
npm install
```

### 4. Iniciar servidor de desenvolvimento

```bash
npm run dev
```

## Endpoints da API

### Autenticação

- `POST /auth/register` - Registrar novo usuário
- `POST /auth/login` - Login e obtenção de token JWT
- `POST /auth/verify-email` - Verificar e-mail com token

### Usuários

- `GET /users/me` - Obter informações do usuário logado
- `PATCH /users/me` - Atualizar informações do usuário

### Eventos

- `POST /events` - Criar novo evento
- `GET /events` - Listar eventos do usuário
- `GET /events/:id` - Obter detalhes de um evento
- `PATCH /events/:id` - Atualizar evento
- `DELETE /events/:id` - Remover evento

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com:

```bash
// database
DB_VERSION='mysql:version'
DB_ROOT_PASSWORD='a hex 32 randomic password'
DB_NAME='database name'
DB_USER='database user'
DB_PASSWORD='a hex 32 randomic password'

// jwt token
JWT_SECRET=seu_segredo_jwt
JWT_EXPIRES_IN=1d

// email
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=user@example.com
EMAIL_PASS=password
EMAIL_FROM=noreply@example.com
```

## Versionamento (SemVer)

O projeto segue versionamento semântico (MAJOR.MINOR.PATCH):

- MAJOR: Mudanças incompatíveis
- MINOR: Novas funcionalidades compatíveis
- PATCH: Correções de bugs compatíveis

Exemplo: `1.0.0` para a versão inicial

## Próximos Passos

1. Implementar testes automatizados
2. Configurar CI/CD
3. Adicionar documentação Swagger/OpenAPI
4. Implementar recuperação de senha

## Contato

Para dúvidas ou sugestões, entre em contato com o mantenedor do projeto.
