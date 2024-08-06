import Router from "koa-router";
import { getUsers, createUser } from "../controller/userController";

const router = new Router();
router.prefix("/api/v1");

router.get("/users", async (ctx) => {
  const users = await getUsers();
  ctx.body = users;
});
router.post("/users", async (ctx) => {
  const { name, email } = ctx.request.body;
  const insertData = await createUser(name, email);
  ctx.body = insertData;
});

export default router;
