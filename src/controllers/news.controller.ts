import { Request, Response } from "express";
import { fetchTopHeadlines } from "../services/news.service";

export async function getTopHeadlines(req: Request, res: Response) {
  try {
    const { category, search, source, date } = req.query;

    const data = await fetchTopHeadlines({
      category: category as string,
      search: search as string,
      source: source as string,
      date: date as string,
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao buscar notícias",
    });
  }
}
