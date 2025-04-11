import { FastifyInstance } from "fastify";
import { usersRoutes } from "./users-routes";
import { authRoutes } from "./auth-routes";
import { tasksRoutes } from "./task-routes";

async function routes(app: FastifyInstance) {
  app.register(usersRoutes, { prefix: "/users" });
  app.register(authRoutes, { prefix: "/auth" });
  app.register(tasksRoutes, { prefix: "/tasks" });
}

export { routes };