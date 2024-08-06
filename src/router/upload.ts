import { Context } from "koa";
import Router from "koa-router";
import multer from "@koa/multer";
import serve from "koa-static";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { uploadDir } from "../utils/constant";

import { SuccessModel, ErrorModel } from "../model/resModel";
const router = new Router();

router.prefix("/api/v1");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../uploads");
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileType = file.mimetype.split("/")[1];
    const fileName = `${uuidv4()}`; // Generate a unique filename with the original extension
    cb(null, `${fileName}.${fileType}`); // Save the file with its original name
  },
});
const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (ctx: Context) => {
  ctx.set("Access-Control-Allow-Origin", "*");

  const file = ctx.file;
  if (!file) {
    ctx.status = 400;
    ctx.body = "No file uploaded";
    return;
  }
  const fileType = file.mimetype.split("/")[1];
  ctx.body = new SuccessModel(
    {
      fileName: file.filename,
      filePath: `${ctx.origin}/${file.filename}`, // Return the online URL of the uploaded image
    },
    "File uploaded successfully"
  );
});

export default router;
