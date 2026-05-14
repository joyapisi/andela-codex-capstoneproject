import type { AiProfileSummary, Profile } from "@refugee-wallet/shared";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export interface DashboardResponse {
  profiles: Profile[];
  summaries: AiProfileSummary[];
}

export async function fetchDashboard(): Promise<DashboardResponse> {
  const response = await fetch(`${API_URL}/api/dashboard`);

  if (!response.ok) {
    throw new Error("Could not load dashboard");
  }

  return response.json() as Promise<DashboardResponse>;
}

export async function saveProfile(profile: Profile): Promise<Profile> {
  const response = await fetch(`${API_URL}/api/profiles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(profile)
  });

  if (!response.ok) {
    throw new Error("Could not save profile");
  }

  return response.json() as Promise<Profile>;
}
