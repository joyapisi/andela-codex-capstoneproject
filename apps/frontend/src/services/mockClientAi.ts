import type { AiProfileSummary, LanguageCode, Profile } from "@refugee-wallet/shared";

const languageLabels: Record<LanguageCode, string> = {
  en: "English",
  ar: "Arabic",
  fr: "French",
  sw: "Swahili"
};

export function buildLocalSummary(profile: Profile): AiProfileSummary {
  const skills = profile.skills.filter(Boolean);
  const skillText = skills.length ? skills.join(", ") : "skills still being documented";

  return {
    profileId: profile.id,
    headline: `${profile.displayName || "This person"} can contribute through ${skillText}.`,
    summary: `${profile.displayName || "This profile"} is seeking practical support in ${profile.location || "their current community"} while sharing experience in ${skillText}.`,
    suggestedSupport: profile.supportNeeds.filter(Boolean),
    translatedSummary: mockTranslate(profile.experience || "Experience can be added later.", profile.preferredLanguage),
    language: profile.preferredLanguage
  };
}

export function mockTranslate(text: string, language: LanguageCode): string {
  if (language === "en") {
    return text;
  }

  // Future OpenAI integration: replace this placeholder with real translation.
  return `[Mock ${languageLabels[language]} translation] ${text}`;
}
