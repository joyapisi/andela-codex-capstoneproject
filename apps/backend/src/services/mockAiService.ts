import type { AiProfileSummary, LanguageCode, Profile } from "@refugee-wallet/shared";

const languageLabels: Record<LanguageCode, string> = {
  en: "English",
  ar: "Arabic",
  fr: "French",
  sw: "Swahili"
};

export function summarizeProfile(profile: Profile): AiProfileSummary {
  const topSkills = profile.skills.slice(0, 3).join(", ") || "adaptable skills";
  const support = profile.supportNeeds.length
    ? profile.supportNeeds
    : ["community orientation", "skills validation conversation"];

  return {
    profileId: profile.id,
    headline: `${profile.displayName} brings experience in ${topSkills}.`,
    summary: `${profile.displayName} is based in ${profile.location} and has experience with ${topSkills}. They may benefit from support around ${support.join(", ")}.`,
    suggestedSupport: support,
    translatedSummary: mockTranslate(
      `${profile.displayName} has practical experience and can discuss skills with a trusted organization.`,
      profile.preferredLanguage
    ),
    language: profile.preferredLanguage
  };
}

export function mockTranslate(text: string, language: LanguageCode): string {
  if (language === "en") {
    return text;
  }

  // Future OpenAI integration: replace this placeholder with a translation model call.
  return `[Mock ${languageLabels[language]} translation] ${text}`;
}

export function transcribeVoiceNotePlaceholder(): string {
  // Future Whisper integration: accept audio uploads and return transcribed profile text here.
  return "Voice transcription will be added in a later iteration.";
}
