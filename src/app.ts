import Koa from "koa";
import bodyParser from "koa-body";
import index from "./router/index";

const app = new Koa();

// 中间件
app.use(bodyParser());

// 路由
app.use(index.routes());
app.use(index.allowedMethods());

export default app;
