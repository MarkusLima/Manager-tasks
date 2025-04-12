import { authConfig } from "@/config/auth";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/app-error";
import { hash } from "bcrypt";
import { FastifyRequest, FastifyReply } from "fastify";
import { sign } from "jsonwebtoken";
import { z } from "zod";

class UsersController {
  async index(req: FastifyRequest, reply: FastifyReply): Promise<any> {

    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true },
    });

    return reply.send(users);

  }

  async create(req: FastifyRequest, reply: FastifyReply): Promise<any> {

    const bodySchema = z.object({
      name: z.string().trim().min(2),
      email: z.string().email(),
      password: z.string().trim().min(6).max(32),
    });

    const { name, email, password } = bodySchema.parse(req.body);

    const userWithSameEmail = await prisma.user.findFirst({ where: { email } });

    if (userWithSameEmail) throw new AppError("User with same email already exists", 400);

    const hashedPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { secret, expiresIn } = authConfig.jwt;
  
    if (!secret) throw new AppError("JWT secret is not defined", 500);

    const token = sign({}, secret, {  subject: user.id, expiresIn });

    const { password: _, ...userWithoutPassword } = user;

    return reply.status(201).send({ token, user: userWithoutPassword });

  }

  async update(req: FastifyRequest, reply: FastifyReply): Promise<any> {

    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const bodySchema = z.object({
      name: z.string().trim().min(2),
      email: z.string().email(),
      password: z.string().trim().min(6).max(32).optional(),
    });

    const { id } = paramsSchema.parse(req.params);
    const { name, email, password } = bodySchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({ where: { id } });

    if (!existingUser) throw new AppError("User not found");

    let hashedPassword = undefined;

    if (password) hashedPassword = await hash(password, 8);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, password: hashedPassword || existingUser.password },
    });

    const { password: _, ...updatedUserWithoutPassword } = updatedUser;

    return reply.send(updatedUserWithoutPassword);

  }

  async delete(req: FastifyRequest, reply: FastifyReply): Promise<any> {

    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(req.params);

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) throw new AppError("User not found");

    await prisma.user.delete({ where: { id } });

    return reply.send({ message: "User deleted successfully." });

  }
}

export { UsersController };
