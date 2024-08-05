import { Context } from "koa";

const router = require("koa-router")();
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.prefix("/api/v1");

router.get("/test", async (ctx: Context) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.body = ctx.request;
});

module.exports = router;
