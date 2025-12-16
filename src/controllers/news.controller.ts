import { Request, Response } from "express";
import { fetchTopHeadlines } from "../services/news.service";

export async function getTopHeadlines(
  req: Request,
  res: Response
) {
  try {
    const category =
      (req.query.category as string) || "All";

    const data = await fetchTopHeadlines(category);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao buscar notícias",
    });
  }
}
