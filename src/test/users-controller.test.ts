import request from "supertest";
import { prisma } from "@/database/prisma";

import { app } from "@/app";

let server: any;

beforeAll(async () => {
  await app.ready();
  server = app.server;
});

describe("UserController", () => {
  let user_id: string;

  afterAll(async () => {
    await prisma.user.delete({ where: { id: user_id } });
    await app.close();
  });

  it("create user success", async () => {
    const userResponse = await request(server).post("/users").send({
      name: "Auth Test User",
      email: "auth_test_user@example.com",
      password: "password123",
    });

    user_id = userResponse.body.id;

    expect(userResponse.status).toBe(201);

  });

  it("create user fail duplicated", async () => {
    const userResponse = await request(server).post("/users").send({
      name: "Auth Test User",
      email: "auth_test_user@example.com",
      password: "password123",
    });

    expect(userResponse.status).toBe(400);

  });
});