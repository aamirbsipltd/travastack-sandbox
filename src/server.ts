import express from "express";
import { notesRouter } from "./notes.js";
import { rateLimit } from "./rateLimit.js";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json({ limit: "10kb" }));
app.use(rateLimit(Number(process.env.RATE_LIMIT_PER_MINUTE ?? 60)));

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use(notesRouter);

app.listen(port, () => {
  console.log(`ShopNotes API listening on port ${port}`);
});
