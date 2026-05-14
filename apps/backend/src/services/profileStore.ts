import type { Profile } from "@refugee-wallet/shared";
import { sampleProfiles } from "../data/sampleProfiles.js";

const profiles = new Map<string, Profile>(sampleProfiles.map((profile) => [profile.id, profile]));

export function listProfiles(): Profile[] {
  return Array.from(profiles.values()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getProfile(id: string): Profile | undefined {
  return profiles.get(id);
}

export function upsertProfile(profile: Profile): Profile {
  const savedProfile = {
    ...profile,
    updatedAt: new Date().toISOString()
  };

  // Future Supabase integration: replace this in-memory write with an upsert call.
  profiles.set(savedProfile.id, savedProfile);
  return savedProfile;
}
