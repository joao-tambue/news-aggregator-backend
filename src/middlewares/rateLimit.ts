import rateLimit from "express-rate-limit";

export const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "production" ? 100 : 1000,
  handler: (_req, res) => {
    res.status(429).json({
      message: "Muitas requisições. Tenta novamente em alguns minutos.",
    });
  },
});