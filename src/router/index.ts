import { Context } from "koa";
import Router from "koa-router";
// import { SuccessModel, ErrorModel } from "../model/resModel";
const router = new Router();

router.prefix("/api/v1");

router.get("/test", async (ctx: Context) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.body = ctx.request;
});

export default router;
