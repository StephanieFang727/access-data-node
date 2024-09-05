import Router from "koa-router";
import {
  insertData,
  findByDatasetId,
  deleteByDatasetId,
  findDatasets,
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

router.get("/datasetList", async (ctx) => {
  const res = await findDatasets();
  ctx.body = res;
});

router.post("/dataset", async (ctx) => {
  const data = ctx.request.body;
  const resData = await insertData(data);
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
