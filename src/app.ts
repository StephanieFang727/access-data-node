import Koa from "koa";
import bodyParser from "koa-body";
import serve from "koa-static";
const index = require("./router/index");

const app = new Koa();

// 中间件
app.use(bodyParser());
app.use(serve("./uploads"));

// 路由
app.use(index.routes());
app.use(index.allowedMethods());

export default app;
