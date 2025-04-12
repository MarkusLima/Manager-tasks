# API de Gerenciador de Tarefas

Um gerenciador de tarefas simples construído com Node.js, Fastify, Prisma e TypeScript. Esta API permite que os usuários gerenciem tarefas, incluindo autenticação com JWT.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Fastify.js**: Framework web para construção de APIs REST.
- **Prisma**: ORM para interagir com o banco de dados.
- **Zod**: Biblioteca para validação de dados.
- **JWT (JSON Web Token)**: Autenticação baseada em tokens.
- **Bcrypt**: Biblioteca para hash de senhas.
- **TypeScript**: Superset do JavaScript que melhora a confiabilidade e legibilidade do código.

## Executando o Projeto

### Pré-requisitos

Antes de começar, você precisa ter o Node.js e o Prisma instalados. Se não os tiver, siga os passos abaixo.

1. **Instalar o Node.js**:

   - [Baixar Node.js](https://nodejs.org/)

2. **Instalar o Prisma**:

   - Após clonar o repositório, instale as dependências com o comando:

     ```bash
     npm install
     ```

3. **Configurar o banco de dados**:

   - Configure seu banco de dados no arquivo `.env`. Uma configuração de exemplo é fornecida no arquivo `.env.example`. Copie este arquivo para `.env` e ajuste os valores conforme necessário.
   - Execute a migração para configurar o banco de dados:

     ```bash
     npx prisma migrate dev
     ```

4. **Executar o projeto**:

   - Para rodar o servidor em modo de desenvolvimento com recarregamento automático:

     ```bash
     npm run dev
     ```

   - Para compilar o projeto e executá-lo em modo de produção:

     ```bash
     npm run build
     npm start
     ```

### Scripts Disponíveis

- **`dev`**: Inicia o servidor em modo de desenvolvimento com recarregamento automático.
- **`test:dev`**: Executa os testes em modo de desenvolvimento.
- **`build`**: Compila o projeto para produção.
- **`start`**: Inicia o servidor com os arquivos compilados para produção.

### Rotas

Algumas das rotas disponíveis no projeto:

#### 1. **Usuários**

- **POST /users**: Registra um novo usuário.

#### 2. **Sessões**

- **POST /auth**: Autentica o usuário e retorna um JWT.

#### 3. **Tarefas**

- **GET /tasks**: Retorna a lista de todas as tarefas.
- **POST /tasks**: Cria uma nova tarefa.
- **PATCH /tasks/:id**: Atualiza uma tarefa.
- **DELETE /tasks/:id**: Remove uma tarefa.

## Dependências

### Dependências

- **@prisma/client**: Cliente Prisma para interação com o banco de dados.
- **bcrypt**: Biblioteca para hash de senhas.
- **cors**: Middleware para habilitar CORS.
- **fastify**: Framework web para Node.js.
- **jsonwebtoken**: Biblioteca para geração e verificação de tokens JWT.
- **supertest**: Biblioteca para testes de APIs.
- **tsup**: Empacotador TypeScript para produção.
- **zod**: Biblioteca para validação de dados.

### Dependências de Desenvolvimento

- **jest**: Framework de testes.
- **prisma**: Ferramenta de migração e cliente do banco de dados.
- **ts-jest**: Suporte TypeScript para o Jest.
- **ts-node**: Executa código TypeScript no Node.js.
- **tsx**: Executa arquivos TypeScript diretamente no Node.js.
- **typescript**: Superset do JavaScript usado no desenvolvimento.


-------------------------------------------------------------------------------------------------------------------------------


# Task Manager API

A simple task manager built with Node.js, Fastify, Prisma, and TypeScript. This API allows users to manage tasks, including authentication jwt.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Fastify.js**: Web framework for building REST APIs.
- **Prisma**: ORM for interacting with the database.
- **Zod**: Data validation library.
- **JWT (JSON Web Token)**: Token-based authentication.
- **Bcrypt**: Library for hashing passwords.
- **TypeScript**: Superset of JavaScript used to improve code reliability and readability.

## Running the Project

### Prerequisites

Before getting started, you need to have Node.js and Prisma installed. If you don't have them, follow the steps below.

1. **Install Node.js**:

   - [Download Node.js](https://nodejs.org/)

2. **Install Prisma**:

   - After cloning the repository, install the dependencies by running the command:

     ```bash
     npm install
     ```

3. **Set up the database**:

   - Configure your database in the `.env` file. A sample configuration is provided in the `.env.example` file. Copy this file to `.env` and adjust the values as needed.
   - Run the migration to set up the database:

     ```bash
     npx prisma migrate dev
     ```

4. **Run the project**:

   - To run the server in development mode with hot reloading:

     ```bash
     npm run dev
     ```

   - To build the project and run it in production mode:

     ```bash
     npm run build
     npm start
     ```

### Available Scripts

- **`dev`**: Starts the server in development mode with automatic reloading.
- **`test:dev`**: Runs the tests in development mode.
- **`build`**: Builds the project for production.
- **`start`**: Starts the server with the built files for production.

### Routes

Here are some of the available routes in the project:

#### 1. **Users**

- **POST /users**: Registers a new user.


#### 2. **Sessions**

- **POST /auth**: Authenticates the user and returns a JWT.


#### 4. **Tasks**

- **GET /tasks**: Returns a list of all tasks.
- **POST /tasks**: Creates a new task.
- **PATCH /tasks/:id**: Updates a task.
- **DELETE /tasks/:id**: Deletes a task.

## Dependencies

### Dependencies

- **@prisma/client**: Prisma client for database interaction.
- **bcrypt**: Library for password hashing.
- **cors**: Middleware for enabling CORS.
- **fastfy**: Web framework for Node.js.
- **jsonwebtoken**: Library for generating and verifying JWT tokens.
- **supertest**: Library for testing APIs.
- **tsup**: TypeScript bundler for production.
- **zod**: Data validation library.

### Development Dependencies

- **jest**: Testing framework.
- **prisma**: Database migration and client tool.
- **ts-jest**: TypeScript support for Jest.
- **ts-node**: Runs TypeScript code in Node.js.
- **tsx**: Runs TypeScript files directly in Node.js.
- **typescript**: Superset of JavaScript used for development.
