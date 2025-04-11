import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/app-error";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

class TaskController {
  async index(req: FastifyRequest, reply: FastifyReply): Promise<any> {

    const userId = (req as any).user?.id;
    
    const tasks = await prisma.task.findMany({
      orderBy: {
        id: "desc",
      },
      where: { userId },
    });

    return reply.send(tasks);
  }

  async create(req: FastifyRequest, reply: FastifyReply): Promise<any> {
    const bodySchema = z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty().optional(),
    });

    const userId = (req as any).user?.id;

    if (!userId) throw new AppError("User not found", 404);

    const { title, description } = bodySchema.parse(req.body);

    const task = await prisma.task.create({
      data: {
        title,
        description,
        done: false,
        userId,
      },
    });

    return reply.status(201).send(task);
  }

  async update(req: FastifyRequest, reply: FastifyReply): Promise<any> {

    const paramsSchema = z.object({ id: z.string().uuid() });

    const userId = (req as any).user?.id;

    if (!userId) throw new AppError("User not found", 404);

    const bodySchema = z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      done: z.boolean(),
    });

    const { id } = paramsSchema.parse(req.params);

    const { title, description, done } = bodySchema.parse(req.body);

    const task = await prisma.task.findUnique({ where: { id, userId } });

    if (!task) throw new AppError("Task not found", 404);

    const taskUpdated = await prisma.task.update({
      where: { id },
      data: { title, description, done },
    });

    return reply.send(taskUpdated);
    
  }

  async delete(req: FastifyRequest, reply: FastifyReply): Promise<any> {

    const paramsSchema = z.object({ id: z.string().uuid(), });

    const userId = (req as any).user?.id;

    if (!userId) throw new AppError("User not found", 404);

    const { id } = paramsSchema.parse(req.params);

    const task = await prisma.task.findUnique({ where: { id, userId }, });

    if (!task) throw new AppError("Task not found");

    await prisma.task.delete({ where: { id, userId }, });

    return reply.send({ message: "Task deleted" });

  }
}

export { TaskController };
