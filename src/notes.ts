import { Router } from "express";
import { db } from "../lib/prisma.js";

export const notesRouter = Router();
const maxLength = Number(process.env.NOTE_MAX_LENGTH ?? 500);

notesRouter.get("/orders/:id/notes", async (req, res) => {
  const notes = await db.note.findMany({ where: { id: req.params.id }, orderBy: { createdAt: "desc" } });
  res.json(notes);
});

notesRouter.post("/orders/:id/notes", async (req, res) => {
  const text = String(req.body?.text ?? "").trim();
  if (!text) return res.status(400).json({ error: "text is required" });
  if (text.length > maxLength) return res.status(400).json({ error: `text must be at most ${maxLength} characters` });
  const note = await db.note.create({ data: { orderId: req.params.id, text } });
  res.status(201).json(note);
});

notesRouter.delete("/notes/:noteId", async (req, res) => {
  if (req.header("X-Admin-Token") !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: "invalid admin token" });
  }
  await db.note.delete({ where: { id: req.params.noteId } });
  res.status(204).end();
});
