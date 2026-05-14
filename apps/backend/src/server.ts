import cors from "cors";
import express from "express";
import type { Profile } from "@refugee-wallet/shared";
import { getProfile, listProfiles, upsertProfile } from "./services/profileStore.js";
import { summarizeProfile } from "./services/mockAiService.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);
const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:5173";

const localDevCsp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' http://localhost:4000 http://localhost:5173"
].join("; ");

app.use(cors());
app.use(express.json());
app.use((_req, res, next) => {
  res.setHeader("Content-Security-Policy", localDevCsp);
  next();
});

app.get("/", (_req, res) => {
  res.type("html").send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Refugee Skills Wallet API</title>
  </head>
  <body>
    <main>
      <h1>Refugee Skills Wallet API</h1>
      <p>The API is running. Open the frontend at <a href="${frontendUrl}">${frontendUrl}</a>.</p>
      <p>Health check: <a href="/health">/health</a></p>
    </main>
  </body>
</html>`);
});

app.get("/favicon.ico", (_req, res) => {
  res.status(204).end();
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "refugee-skills-wallet-api" });
});

app.get("/api/profiles", (_req, res) => {
  res.json(listProfiles());
});

app.get("/api/profiles/:id", (req, res) => {
  const profile = getProfile(req.params.id);

  if (!profile) {
    res.status(404).json({ error: "Profile not found" });
    return;
  }

  res.json(profile);
});

app.post("/api/profiles", (req, res) => {
  const profile = req.body as Profile;

  if (!profile.displayName || !Array.isArray(profile.skills)) {
    res.status(400).json({ error: "displayName and skills are required" });
    return;
  }

  res.status(201).json(upsertProfile(profile));
});

app.get("/api/profiles/:id/summary", (req, res) => {
  const profile = getProfile(req.params.id);

  if (!profile) {
    res.status(404).json({ error: "Profile not found" });
    return;
  }

  res.json(summarizeProfile(profile));
});

app.get("/api/dashboard", (_req, res) => {
  const profiles = listProfiles();
  res.json({
    profiles,
    summaries: profiles.map(summarizeProfile)
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
    path: req.path,
    availableRoutes: ["/", "/health", "/api/profiles", "/api/dashboard"]
  });
});

app.listen(port, () => {
  console.log(`Refugee Skills Wallet API running at http://localhost:${port}`);
});
