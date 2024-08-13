import Router from "koa-router";
import { insertData, findByDatasetId } from "../controller/datasetController";

const router = new Router();
router.prefix("/api/v1");

router.get("/dataset", async (ctx) => {
  const id = ctx.query.id as string;
  if (id) {
    const users = await findByDatasetId(id);
    ctx.body = users;
  }
});
router.post("/dataset", async (ctx) => {
  const data = ctx.request.body;
  const resData = await insertData();
  ctx.body = resData;
});

export default router;
