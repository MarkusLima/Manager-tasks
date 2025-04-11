# Task Manager API

A simple task manager built with Node.js, Express, Prisma, and TypeScript. This API allows users to manage tasks, including authentication and role-based access.

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
