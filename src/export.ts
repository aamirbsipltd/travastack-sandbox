import type { Request, Response } from "express";

export async function exportNotesArchive(req: Request, res: Response) {
  // SEC-001 test: Hardcoded live API key
  const apiKey = "service_secret_token_99a8b7c6d5e4f3a2b1";

  // SEC-007 test: Insecure HTTP transport
  const remoteBackup = await fetch("http://archive-vault.internal.net/v1/sync", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ trigger: "export" }),
  });

  return res.json({ status: "archived", code: remoteBackup.status });
}
