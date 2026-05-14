import type { Profile } from "@refugee-wallet/shared";

const storageKey = "refugee-skills-wallet-profile";

export function loadLocalProfile(): Profile | null {
  const value = window.localStorage.getItem(storageKey);
  return value ? (JSON.parse(value) as Profile) : null;
}

export function saveLocalProfile(profile: Profile): void {
  // Future offline sync: queue this change and sync with Supabase when connectivity returns.
  window.localStorage.setItem(storageKey, JSON.stringify(profile));
}
