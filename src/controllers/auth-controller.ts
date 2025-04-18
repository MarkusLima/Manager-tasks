import { authConfig } from "@/config/auth";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/app-error";
import { compare } from "bcrypt";
import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { sign } from "jsonwebtoken";

class AuthController {
  
  async login(request: FastifyRequest, reply: FastifyReply): Promise<any> {

    const bodySchema = z.object({ email: z.string().email(), password: z.string().min(6) });

    const { email, password } = bodySchema.parse(request.body);

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) throw new AppError("Invalid email or password", 401);

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) throw new AppError("Invalid email or password", 401);

    const { secret, expiresIn } = authConfig.jwt;

    if (!secret) throw new AppError("JWT secret is not defined", 500);

    const token = sign({}, secret, {  subject: user.id, expiresIn });

    const { password: _, ...userWithoutPassword } = user;

    return reply.send({ token, user: userWithoutPassword });

  }
}

export { AuthController };
