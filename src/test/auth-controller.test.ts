import request from "supertest";
import { prisma } from "@/database/prisma";

import { app } from "@/app";

let server: any;

beforeAll(async () => {
  await app.ready();
  server = app.server;
});

describe("AuthController", () => {
  let user_id: string;

  afterAll(async () => {
    await prisma.user.delete({ where: { id: user_id } });
    await app.close();
  });

  it("Get access token success", async () => {
    const userResponse = await request(server).post("/users").send({
      name: "Auth Test User",
      email: "auth_test_user@example.com",
      password: "password123",
    });

    user_id = userResponse.body.id;

    const sessionResponse = await request(server).post("/auth").send({
      email: "auth_test_user@example.com",
      password: "password123",
    });

    expect(sessionResponse.status).toBe(200);
    expect(sessionResponse.body.token).toEqual(expect.any(String));
  });

  it("Get access token email invalid", async () => {

    const sessionResponse = await request(server).post("/auth").send({
      email: "auth_test_user1@example.com",
      password: "password123",
    });

    expect(sessionResponse.status).toBe(401);
  });

  it("Get access token password invalid", async () => {

    const sessionResponse = await request(server).post("/auth").send({
      email: "auth_test_user@example.com",
      password: "password1234",
    });

    expect(sessionResponse.status).toBe(401);
  });
});
