import cors from "cors";
import express from "express";
import type { Profile } from "@refugee-wallet/shared";
import { getProfile, listProfiles, upsertProfile } from "./services/profileStore.js";
import { summarizeProfile } from "./services/mockAiService.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json());

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

app.listen(port, () => {
  console.log(`Refugee Skills Wallet API running at http://localhost:${port}`);
});
