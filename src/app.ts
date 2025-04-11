import { routes } from "./routes";
import { errorHandling } from "./middleware/error-handling";
import { corsOptions } from "./utils/cors-options";
import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL environment variable is not defined');
if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET environment variable is not defined');
if (!process.env.SERVER_PORT) throw new Error('SERVER_PORT environment variable is not defined');
if (!process.env.HOST) throw new Error('HOST environment variable is not defined');

const app = Fastify();

app.register(cors, corsOptions);

app.register(jwt, { secret: process.env.JWT_SECRET});

app.register(routes);

app.setErrorHandler(errorHandling);

app.listen({ port: parseInt(process.env.SERVER_PORT) }, () => console.log(`Server is running on port ${process.env.SERVER_PORT}`));

export { app };
