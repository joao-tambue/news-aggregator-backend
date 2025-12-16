import express from "express";
import newsRoutes from "./routes/news.routes";
import { apiRateLimit } from "./middlewares/rateLimit";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(apiRateLimit);

app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://news-aggregator-sigma-sooty.vercel.app/"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use("/api", newsRoutes);

export default app;