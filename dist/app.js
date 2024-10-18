"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _koa = _interopRequireDefault(require("koa"));
var _koa2Cors = _interopRequireDefault(require("koa2-cors"));
var _koaBody = _interopRequireDefault(require("koa-body"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _mongodb = _interopRequireDefault(require("./config/mongodb"));
var _index = _interopRequireDefault(require("./router/index"));
var _upload = _interopRequireDefault(require("./router/upload"));
var _user = _interopRequireDefault(require("./router/user"));
var _chatbot = _interopRequireDefault(require("./router/chatbot"));
var _dataset = _interopRequireDefault(require("./router/dataset"));
var _dataQuery = _interopRequireDefault(require("./router/dataQuery"));
var _koaStatic = _interopRequireDefault(require("koa-static"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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

const app = new _koa.default();
_mongoose.default.connect(_mongodb.default.mongoUri).then(() => {
  console.log("MongoDB connected");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

// 中间件
app.use((0, _koa2Cors.default)());
app.use((0, _koaBody.default)());

// 路由
app.use(_index.default.routes());
app.use(_index.default.allowedMethods());
app.use(_upload.default.routes());
app.use(_upload.default.allowedMethods());
app.use(_user.default.routes());
app.use(_user.default.allowedMethods());
app.use(_chatbot.default.routes());
app.use(_chatbot.default.allowedMethods());
app.use(_dataset.default.routes());
app.use(_dataset.default.allowedMethods());
app.use(_dataQuery.default.routes());
app.use(_dataQuery.default.allowedMethods());
app.use((0, _koaStatic.default)(_path.default.join(__dirname, "../uploads")));

// mongoose.disconnect();
var _default = exports.default = app;