import { Router } from "express";
import { getTopHeadlines } from "../controllers/news.controller";

const router = Router();

router.get("/news", getTopHeadlines);

export default router;