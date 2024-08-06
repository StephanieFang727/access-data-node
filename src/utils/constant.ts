import path from "path";
import fs from "fs";

const uploadDir = path.join(__dirname, "../images/");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

export { uploadDir };
