import { FastifyInstance } from "fastify";
import { TaskController } from "@/controllers/task-controller";
import { ensureAuthenticated } from "@/middleware/ensure-authenticated";

const taskController = new TaskController();

async function tasksRoutes(app: FastifyInstance) {
  app.get("/", { preHandler: [ensureAuthenticated] }, taskController.index);
  app.post("/", { preHandler: [ensureAuthenticated] }, taskController.create);
  app.put("/:id", { preHandler: [ensureAuthenticated] }, taskController.update);
  app.delete("/:id", { preHandler: [ensureAuthenticated] }, taskController.delete);
}

export { tasksRoutes };
