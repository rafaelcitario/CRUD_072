# Backend Pixit - Sistema de Gerenciamento de Eventos

![Version](https://img.shields.io/badge/version-7.3.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-22.15.1+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3+-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0.0+-orange)
![Docker](https://img.shields.io/badge/Docker-required-blue)

Sistema backend completo com autenticação JWT, gerenciamento de usuários e eventos, confirmação por e-mail e frontend integrado.

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Configuraçao](#-configuração)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Banco de Dados](#-banco-de-dados)
- [Testes](#-testes)
- [Roadmap](#-roadmap)

## 🌟 Visão Geral

O Backend Pixit é um sistema completo que oferece:

- Autenticação segura com JWT e Refresh Tokens
- Gerenciamento de usuários com verificação de e-mail
- CRUD completo para eventos
- Frontend integrado para demonstração
- Arquitetura limpa com separação de concerns

## 🚀 Funcionalidades

- **Autenticação**:
  - Registro com verificação de e-mail
  - Login com JWT
  - Renovação de token
  - Middlewares de validação

- **Usuários**:
  - CRUD básico
  - Validação de e-mail e senha forte

- **Eventos**:
  - Criação, leitura, atualização e exclusão
  - Associação com usuários

- **Frontend**:
  - Páginas Home, Register, Login e Eventos
  - Gerenciamento de tokens

## 💻 Tecnologias

- **Backend**:
  - Node.js
  - TypeScript
  - Express
  - MySQL
  - JWT
  - Zod (validação)
  - Nodemailer (simulado)

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript Vanilla

- **Infra**:
  - Docker
  - Docker Compose

## 📁 Estrutura do Projeto

```bash

.
├── api/                  # Backend principal
│   ├── src/              # Código fonte TypeScript
│   │   ├── @types/       # Tipos customizados
│   │   ├── app/          # Configuração do app Express
│   │   ├── database/     # Conexão com DB
│   │   ├── env/          # Variáveis de ambiente
│   │   ├── http/         # Lógica HTTP
│   │   │   ├── controllers/  # Controladores
│   │   │   ├── middlewares/  # Middlewares
│   │   │   ├── repositories/ # Repositórios DB
│   │   │   ├── routes/       # Rotas
│   │   │   └── services/     # Lógica de negócio
│   │   ├── util/         # Utilitários
│   │   └── server.ts     # Ponto de entrada
│   ├── mysql-init/       # Scripts de inicialização do DB
│   └── dist/             # Código compilado JavaScript
└── client/               # Frontend
    ├── public/           # Assets públicos
    │   ├── pages/        # Páginas HTML
    │   ├── scripts/      # JavaScript do cliente
    │   └── styles/       # Folhas de estilo
    └── index.html        # Página principal

```

## ⚙️ Configuração

### Pré-requisitos

- Docker 20.10+
- Docker Compose 2.0+
- Node.js 22.0.1+
- npm 9.5+

## 🛠️ Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/rafaelcitario/CRUD_072.git
   cd CRUD_072
   ```

2. Inicie os containers Docker:

   ```bash
   docker compose up -d
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente (crie um arquivo `.env` na raiz do projeto seguindo o modelo na seção [Variáveis de Ambiente](#-variáveis-de-ambiente))

5. Execute o seed inicial do banco de dados:

   ```bash
   npm run seed
   ```

6. Inicie o servidor em modo desenvolvimento:

   ```bash
   npm run start:dev
   ```

Ou para produção:

   ```bash
   npm run build
   npm run start
   ```

## 🚦 Uso

### Ambientes disponíveis

- **Frontend**: Acessível em:

  ```bash
  http://127.0.0.1:5500 # rodando no live server / página index ex: http://127.0.0.1:5500/client/index.html
  ```

- **API Backend**: Disponível em:

  ```bash
  http://localhost:3000/
  ```

### Scripts disponíveis

| Comando          | Descrição                                                                 |
|------------------|---------------------------------------------------------------------------|
| `npm run seed`   | Executa os scripts de seed no banco de dados                              |
| `npm run build`  | Compila o projeto TypeScript para JavaScript                              |
| `npm run start`  | Inicia o servidor em produção (requer build prévio)                       |
| `npm run start:dev` | Inicia o servidor em modo desenvolvimento com hot-reload                |
| `npm run lint`   | Executa análise estática do código                                        |
| `npm test`       | Executa testes (atualmente não implementados)                             |

### Portas utilizadas

| Serviço       | Porta  |
|---------------|--------|
| Frontend      | 5500   |
| Backend API   | 3000   |
| MySQL         | 3306   |

Observação: Certifique-se de que estas portas estejam disponíveis em sua máquina antes de iniciar os containers.

## 🌐 API Endpoints

### Autenticação (`/auth`)

| Método | Endpoint                   | Middlewares                        | Descrição                                                                 |
|--------|----------------------------|------------------------------------|---------------------------------------------------------------------------|
| POST   | `/auth/login`              | `emailMiddleware`                  | Realiza login com e-mail e senha, retornando tokens JWT                   |
| POST   | `/auth/register`           | `isValidRegisterPayload`           | Registra um novo usuário com validação de payload                         |
| GET    | `/auth/verify_email/:token` | -                                  | Verifica o e-mail do usuário usando token de confirmação                  |
| POST   | `/auth/renewer_token`      | `tokenMiddlewareVerification`      | Renova o token de acesso usando o refresh token                           |

### Clientes (`/`)

| Método | Endpoint       | Middlewares                        | Descrição                                     |
|--------|----------------|------------------------------------|-----------------------------------------------|
| GET    | `/users`       | `tokenMiddlewareVerification`      | Lista todos os usuários (requer autenticação) |

### Eventos (`/events`)

| Método | Endpoint       | Middlewares                        | Descrição                                                                 |
|--------|----------------|------------------------------------|---------------------------------------------------------------------------|
| POST   | `/events/new`  | `tokenMiddlewareVerification`      | Cria um novo evento associado ao usuário autenticado                      |
| GET    | `/events/all`  | `tokenMiddlewareVerification`      | Lista todos os eventos do usuário autenticado                             |
| GET    | `/events/:id`  | `tokenMiddlewareVerification`      | Obtém detalhes de um evento específico pelo ID                            |
| PUT    | `/events/:id`  | `tokenMiddlewareVerification`      | Atualiza um evento existente                                              |
| DELETE | `/events/:id`  | `tokenMiddlewareVerification`      | Remove um evento                                                          |

### Observações importantes

1. **Padrão de rotas**:
   - Todas as rotas de eventos e clientes requerem autenticação via JWT
   - Parâmetros de rota usam sintaxe `{:param}` (ex: `{:id}`)

2. **Autenticação**:
   - O header `Authorization` deve conter `Bearer <token>` para rotas protegidas
   - O token de renovação deve ser enviado no corpo da requisição para `/auth/renewer_token`

3. **Correções de nomenclatura**:
   - A rota de verificação de e-mail está como `/verify_email{:token}` (notar o padrão {:param})
   - A rota de renovação de token está como `/renewer_token` (não `/renew-token` como mencionado anteriormente)

4. **Estrutura da API**:

   ```plaintext
   /
   ├── /auth
   │   ├── POST /login
   │   ├── POST /register
   │   ├── GET /verify_email{:token}
   │   └── POST /renewer_token
   ├── GET /users
   └── /events
       ├── POST /new
       ├── GET /all
       ├── GET /{:id}
       ├── PUT /{:id}
       └── DELETE /{:id}
   ```

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com:

```ini
# DATABASE
DB_VERSION=mysql:8.0
DB_ROOT_PASSWORD=Av4l1aC40_P1x1t_R00t@2024
DB_NAME=pixit-db
DB_USER=pixit
DB_PASSWORD=S3nh4_S3gur4_P1x1t@2024

# JWT
JWT_SECRET_TOKEN=3x3mpl0_D3_T0k3n_S3cr3t0_P4r4_4v4l1aC40_1234567890abcdef
JWT_SECRET_RF_TOKEN=3x3mpl0_D3_R3fr3sh_T0k3n_S3cr3t0_P4r4_4v4l1aC40_abcdef1234567890
JWT_LIFETIME_TOKEN=900
JWT_LIFETIME_RF_TOKEN=64800

# SMTP (simulado)
SMTP_PASSWRD=YgxYanxEV3bmjj1u3b
```

## 🗃️ Banco de Dados

### Esquema Principal

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
  type ENUM('email_confirmation', 'password_reset', 'refresh') NOT NULL,
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

## 🗺️ Roadmap

- [ ] Implementar testes automatizados
- [ ] Adicionar documentação Swagger/OpenAPI

## ⚠️ Termos de Uso  

Este código foi desenvolvido exclusivamente para processo seletivo.  
O compartilhamento ou reutilização não é autorizado sem consentimento prévio.
