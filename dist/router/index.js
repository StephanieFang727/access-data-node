"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _koaRouter = _interopRequireDefault(require("koa-router"));
var _resModel = require("../model/resModel");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = new _koaRouter.default();
router.prefix("/api/v1");
router.get("/test", async ctx => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.body = new _resModel.SuccessModel(ctx.request);
});
var _default = exports.default = router;