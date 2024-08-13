import Koa from "koa";
import cors from "koa2-cors";
import bodyParser from "koa-body";
import mongoose from "mongoose";
import config from "./config/index";
import index from "./router/index";
import upload from "./router/upload";
import user from "./router/user";
import chatbot from "./router/chatbot";
import dataSet from "./router/dataset";
import serve from "koa-static";
import path from "path";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
});
const [rows, fields] = await connection.execute(
  "SELECT * FROM `table` WHERE `name` = ?",
  ["John"]
);
console.log(rows);

const app = new Koa();

mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// 中间件
app.use(cors());
app.use(bodyParser());

// 路由
app.use(index.routes());
app.use(index.allowedMethods());

app.use(upload.routes());
app.use(upload.allowedMethods());

app.use(user.routes());
app.use(user.allowedMethods());

app.use(chatbot.routes());
app.use(chatbot.allowedMethods());

app.use(dataSet.routes());
app.use(dataSet.allowedMethods());

app.use(serve(path.join(__dirname, "../uploads")));

export default app;
