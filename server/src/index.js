import "dotenv/config";
import { createApp } from "./app.js";

const port = Number(process.env.PORT) || 5000;
const app = await createApp();

app.listen(port, () => {
  console.log(`Site ready on http://localhost:${port}`);
});
