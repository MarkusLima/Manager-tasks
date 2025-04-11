import request from "supertest";
import { prisma } from "@/database/prisma";

import { app } from "@/app";

let server: any;

beforeAll(async () => {
  await app.ready();
  server = app.server;
});

describe("TasksController", () => {
  let user_id: string;
  let token: string;

  afterAll(async () => {
    await prisma.user.delete({ where: { id: user_id } });
    await app.close();
    console.log("Server closed");
  });

  it("create task success", async () => {
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


    const taskResponse = await request(server)
      .post("/tasks")
      .set("Authorization", `Bearer ${sessionResponse.body.token}`)
      .send({
        title: "Test Task",
        description: "Test Task Description"
      });

    console.log(sessionResponse.body.token);

    expect(taskResponse.status).toBe(201);
    expect(taskResponse.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: "Test Task",
        description: "Test Task Description"
      })
    );

    token = sessionResponse.body.token;

  });

  it("create task fail", async () => {

    const taskResponse = await request(server)
    .post("/tasks")
    .send({
      title: "Test Task",
      description: "Test Task Description",
      completed: false,
    });

    expect(taskResponse.status).toBe(401);

  });
});