"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _koa = _interopRequireDefault(require("koa"));
var _koa2Cors = _interopRequireDefault(require("koa2-cors"));
var _koaBody = _interopRequireDefault(require("koa-body"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _index = _interopRequireDefault(require("./config/index"));
var _index2 = _interopRequireDefault(require("./router/index"));
var _upload = _interopRequireDefault(require("./router/upload"));
var _user = _interopRequireDefault(require("./router/user"));
var _chatbot = _interopRequireDefault(require("./router/chatbot"));
var _koaStatic = _interopRequireDefault(require("koa-static"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const app = new _koa.default();
_mongoose.default.connect(_index.default.mongoUri).then(() => {
  console.log("MongoDB connected");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

// 中间件
app.use((0, _koa2Cors.default)());
app.use((0, _koaBody.default)());

// 路由
app.use(_index2.default.routes());
app.use(_index2.default.allowedMethods());
app.use(_upload.default.routes());
app.use(_upload.default.allowedMethods());
app.use(_user.default.routes());
app.use(_user.default.allowedMethods());
app.use(_chatbot.default.routes());
app.use(_chatbot.default.allowedMethods());
app.use((0, _koaStatic.default)(_path.default.join(__dirname, "../uploads")));
var _default = exports.default = app;