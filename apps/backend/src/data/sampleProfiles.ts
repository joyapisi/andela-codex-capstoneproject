import type { Profile } from "@refugee-wallet/shared";

export const sampleProfiles: Profile[] = [
  {
    id: "sample-1",
    displayName: "Amina H.",
    preferredLanguage: "sw",
    location: "Nairobi, Kenya",
    skills: ["tailoring", "inventory tracking", "community translation"],
    experience:
      "Ran a small tailoring shop and helped neighbors translate between Swahili and Arabic at clinics.",
    education: "Secondary school, informal business training",
    supportNeeds: ["sewing machine access", "business mentorship", "childcare during training"],
    contactPreference: "SMS through community organization",
    shareConsent: true,
    updatedAt: new Date().toISOString()
  },
  {
    id: "sample-2",
    displayName: "Yusuf M.",
    preferredLanguage: "ar",
    location: "Kampala, Uganda",
    skills: ["carpentry", "repair work", "basic bookkeeping"],
    experience:
      "Worked with a family carpentry workshop, repaired furniture, and tracked small cash orders.",
    education: "Vocational carpentry certificate, document unavailable",
    supportNeeds: ["tool access", "local employer introduction"],
    contactPreference: "WhatsApp via trusted NGO staff",
    shareConsent: true,
    updatedAt: new Date().toISOString()
  }
];
