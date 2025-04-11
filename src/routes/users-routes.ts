import { FastifyInstance } from "fastify";
import { UsersController } from "../controllers/users-controller";

const usersController = new UsersController();

async function usersRoutes(app: FastifyInstance) {

  app.post("/", usersController.create);
  
}

export { usersRoutes };
