import Router from "koa-router";
import dataQuery from "../controller/dataQueryController";

const router = new Router();
router.prefix("/api/v1");

router.post("/dataQuery", async (ctx) => {
  const data = ctx.request.body;
  const resData = await dataQuery(data);
  ctx.body = resData;
});

export default router;
