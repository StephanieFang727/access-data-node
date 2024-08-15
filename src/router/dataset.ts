import Router from "koa-router";
import {
  insertData,
  findByDatasetId,
  deleteByDatasetId,
} from "../controller/datasetController";

const router = new Router();
router.prefix("/api/v1");

router.get("/dataset", async (ctx) => {
  const id = ctx.query.id as string;
  if (id) {
    const res = await findByDatasetId(id);
    ctx.body = res;
  }
});
router.post("/dataset", async (ctx) => {
  const data = ctx.request.body;
  const resData = await insertData();
  ctx.body = resData;
});

router.delete("/dataset", async (ctx) => {
  const id = ctx.query.id as string;
  if (id) {
    const res = await deleteByDatasetId(id);
    ctx.body = res;
  }
});

export default router;
