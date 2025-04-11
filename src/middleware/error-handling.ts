import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { AppError } from "../utils/app-error";

const errorHandling = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
): any => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error",
      issues: error.format(),
    });
  }

  return reply.status(500).send({
    message: error.message || "Internal Server Error",
  });
};

export { errorHandling };
