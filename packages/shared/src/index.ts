export type LanguageCode = "en" | "ar" | "fr" | "sw";

export interface Profile {
  id: string;
  displayName: string;
  preferredLanguage: LanguageCode;
  location: string;
  skills: string[];
  experience: string;
  education: string;
  supportNeeds: string[];
  contactPreference: string;
  shareConsent: boolean;
  updatedAt: string;
}

export interface AiProfileSummary {
  profileId: string;
  headline: string;
  summary: string;
  suggestedSupport: string[];
  translatedSummary: string;
  language: LanguageCode;
}
