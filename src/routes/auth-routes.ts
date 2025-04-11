import { AuthController } from "@/controllers/auth-controller";
import { FastifyInstance } from "fastify";

const authController = new AuthController();

async function authRoutes(app: FastifyInstance) {
  app.post("/", authController.create);
}

export { authRoutes };
