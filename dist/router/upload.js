"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _koaRouter = _interopRequireDefault(require("koa-router"));
var _multer = _interopRequireDefault(require("@koa/multer"));
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
var _uuid = require("uuid");
var _resModel = require("../model/resModel");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = new _koaRouter.default();
router.prefix("/api/v1");

// Configure multer for file upload
const storage = _multer.default.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = _path.default.join(__dirname, "../../uploads");
    // Create uploads directory if it doesn't exist
    if (!_fs.default.existsSync(uploadDir)) {
      _fs.default.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileType = file.mimetype.split("/")[1];
    const fileName = `${(0, _uuid.v4)()}`; // Generate a unique filename with the original extension
    cb(null, `${fileName}.${fileType}`); // Save the file with its original name
  }
});
const upload = (0, _multer.default)({
  storage
});
router.post("/upload", upload.single("file"), async ctx => {
  ctx.set("Access-Control-Allow-Origin", "*");
  const file = ctx.file;
  if (!file) {
    ctx.status = 400;
    ctx.body = "No file uploaded";
    return;
  }
  const fileType = file.mimetype.split("/")[1];
  ctx.body = new _resModel.SuccessModel({
    fileName: file.filename,
    filePath: `${ctx.origin}/${file.filename}` // Return the online URL of the uploaded image
  }, "File uploaded successfully");
});
var _default = exports.default = router;