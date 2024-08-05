"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _koa = _interopRequireDefault(require("koa"));
var _koaBody = _interopRequireDefault(require("koa-body"));
var _index = _interopRequireDefault(require("./router/index"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const app = new _koa.default();

// 中间件
app.use((0, _koaBody.default)());

// 路由
app.use(_index.default.routes());
app.use(_index.default.allowedMethods());
var _default = exports.default = app;