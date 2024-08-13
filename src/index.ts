import app from "./app";
import "dotenv/config";

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
