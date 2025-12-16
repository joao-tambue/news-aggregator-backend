import express from "express";
import newsRoutes from "./routes/news.routes";
import { apiRateLimit } from "./middlewares/rateLimit";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(apiRateLimit);

app.use(cors());

app.use("/api", newsRoutes);

export default app;