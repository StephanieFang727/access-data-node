import Koa from "koa";
import cors from "koa2-cors";
import bodyParser from "koa-body";
import mongoose from "mongoose";
import config from "./config/mongodb";
import index from "./router/index";
import upload from "./router/upload";
import user from "./router/user";
import chatbot from "./router/chatbot";
import dataSet from "./router/dataset";
import dataQuery from "./router/dataQuery";
import serve from "koa-static";
import path from "path";
import mysql from "mysql2";

// const connection = mysql.createConnection({
//   host: "1.94.138.172",
//   user: "fang",
//   password: "12345678",
//   database: "mydb",
// });
// connection.connect((err) => {
//   if (err) {
//     console.error("连接到数据库时发生错误:", err.stack);
//     return;
//   }
//   console.log("已连接到数据库，连接ID:", connection.threadId);
// });

// // 执行查询
// connection.query("SELECT * FROM test_user_app_01", (err, results, fields) => {
//   if (err) {
//     console.error("查询时发生错误:", err.stack);
//     return;
//   }
//   console.log("查询结果:", results);
// });

// 关闭连接
// connection.end();

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

app.use(dataQuery.routes());
app.use(dataQuery.allowedMethods());

app.use(serve(path.join(__dirname, "../uploads")));

// mongoose.disconnect();

export default app;
