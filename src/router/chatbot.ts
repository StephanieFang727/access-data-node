import Router from "koa-router";
import { chat } from "../controller/chatbotController";

const router = new Router();
router.prefix("/api/v1");

router.post("/chat", async (ctx) => {
  const { question } = ctx.request.body;
  const resData = await chat(question);
  ctx.body = resData;
});

export default router;
