import path from "path";
import fs from "fs";

const uploadDir = path.join(__dirname, "../images/");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const DBMAP: Record<string, string> = {
  datasetId_X8dsi13jDqaO: "test_user_app_01",
  datasetId_I0BypRSVX7us: "test_resource_app_01",
};
export { uploadDir, DBMAP };
