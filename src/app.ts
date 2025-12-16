import express from "express";
import newsRoutes from "./routes/news.routes";
import { apiRateLimit } from "./middlewares/rateLimit";

const app = express();

app.use(express.json());

app.use(apiRateLimit);

app.use("/api", newsRoutes);

export default app;