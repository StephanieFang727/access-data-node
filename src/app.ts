import Koa from "koa";
import cors from "koa2-cors";
import bodyParser from "koa-body";
import index from "./router/index";
import upload from "./router/upload";
import serve from "koa-static";
import path from "path";

const app = new Koa();

// 中间件
app.use(cors());
app.use(bodyParser());

// 路由
app.use(index.routes());
app.use(index.allowedMethods());

app.use(upload.routes());
app.use(upload.allowedMethods());
app.use(serve(path.join(__dirname, "../uploads")));

export default app;
