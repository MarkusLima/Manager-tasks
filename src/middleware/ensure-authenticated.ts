import { FastifyRequest, FastifyReply } from "fastify";
import { verify } from "jsonwebtoken";
import { AppError } from "@/utils/app-error";
import { authConfig } from "@/config/auth";

interface TokenPayload {
  role: string;
  sub: string;
}

const ensureAuthenticated = async ( request: FastifyRequest, reply: FastifyReply ) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new AppError("Authorization header missing", 401);

    const [ token ] = authHeader.split(" ");

    try {

      if (!authConfig.jwt.secret) throw new AppError("JWT secret is not defined", 500);
    
      const decodedToken = verify(token, authConfig.jwt.secret) as unknown as TokenPayload;

      const { sub: user_id } = decodedToken;

      (request as any).user = { id: user_id, };

    } catch (error) {

      throw new AppError("Token expired or invalid", 401);

    }

  } catch (error) {

    reply.status(401).send({ error: "Invalid token" });

  }
};

export { ensureAuthenticated };
