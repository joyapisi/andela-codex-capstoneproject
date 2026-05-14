import { useEffect, useMemo, useState } from "react";
import type { AiProfileSummary, LanguageCode, Profile } from "@refugee-wallet/shared";
import { buildLocalSummary, mockTranslate } from "./services/mockClientAi";
import { fetchDashboard, saveProfile } from "./services/profileApi";
import { loadLocalProfile, saveLocalProfile } from "./services/localProfileStore";

type View = "home" | "edit" | "preview" | "dashboard";

const blankProfile: Profile = {
  id: crypto.randomUUID(),
  displayName: "",
  preferredLanguage: "en",
  location: "",
  skills: [],
  experience: "",
  education: "",
  supportNeeds: [],
  contactPreference: "",
  shareConsent: false,
  updatedAt: new Date().toISOString()
};

const languageOptions: Array<{ value: LanguageCode; label: string }> = [
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic" },
  { value: "fr", label: "French" },
  { value: "sw", label: "Swahili" }
];

function App() {
  const [view, setView] = useState<View>("home");
  const [profile, setProfile] = useState<Profile>(() => loadLocalProfile() ?? blankProfile);
  const [dashboard, setDashboard] = useState<{ profiles: Profile[]; summaries: AiProfileSummary[] }>({
    profiles: [],
    summaries: []
  });
  const [status, setStatus] = useState("Local profile storage is ready.");

  const localSummary = useMemo(() => buildLocalSummary(profile), [profile]);

  useEffect(() => {
    if (view !== "dashboard") {
      return;
    }

    fetchDashboard()
      .then(setDashboard)
      .catch(() => {
        setDashboard({ profiles: profile.displayName ? [profile] : [], summaries: profile.displayName ? [localSummary] : [] });
      });
  }, [localSummary, profile, view]);

  function updateProfile(next: Partial<Profile>) {
    setProfile((current) => ({
      ...current,
      ...next,
      updatedAt: new Date().toISOString()
    }));
  }

  async function handleSave() {
    const savedProfile = { ...profile, id: profile.id || crypto.randomUUID(), updatedAt: new Date().toISOString() };
    saveLocalProfile(savedProfile);
    setProfile(savedProfile);
    setStatus("Saved locally. Backend sync is attempted when the API is running.");

    try {
      await saveProfile(savedProfile);
      setStatus("Saved locally and synced to the mock API.");
    } catch {
      setStatus("Saved locally. API is offline, so this profile can sync later.");
    }
  }

  return (
    <main>
      <header className="topbar">
        <button className="brand" onClick={() => setView("home")}>
          Refugee Skills Wallet
        </button>
        <nav aria-label="Primary navigation">
          <button onClick={() => setView("edit")}>Create/Edit</button>
          <button onClick={() => setView("preview")}>Preview</button>
          <button onClick={() => setView("dashboard")}>NGO Dashboard</button>
        </nav>
      </header>

      {view === "home" && <Home onStart={() => setView("edit")} />}
      {view === "edit" && (
        <ProfileEditor profile={profile} status={status} onChange={updateProfile} onSave={handleSave} />
      )}
      {view === "preview" && <ProfilePreview profile={profile} summary={localSummary} />}
      {view === "dashboard" && <Dashboard profiles={dashboard.profiles} summaries={dashboard.summaries} />}
    </main>
  );
}

function Home({ onStart }: { onStart: () => void }) {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">Low-bandwidth proof of concept</p>
        <h1>Portable skills profiles for people rebuilding opportunity.</h1>
        <p>
          Create a simple profile for skills, experience, support needs, and preferred language. Trusted community
          organizations can review concise summaries without requiring formal documents.
        </p>
        <button className="primary" onClick={onStart}>
          Create a profile
        </button>
      </div>
      <aside className="signal-panel" aria-label="MVP capabilities">
        <span>Offline-first local save</span>
        <span>Mock AI summaries</span>
        <span>Multilingual preview</span>
        <span>NGO support view</span>
      </aside>
    </section>
  );
}

function ProfileEditor({
  profile,
  status,
  onChange,
  onSave
}: {
  profile: Profile;
  status: string;
  onChange: (profile: Partial<Profile>) => void;
  onSave: () => void;
}) {
  return (
    <section className="content">
      <div className="section-heading">
        <p className="eyebrow">Profile</p>
        <h2>Create or edit a lightweight profile</h2>
      </div>
      <form
        className="form-grid"
        onSubmit={(event) => {
          event.preventDefault();
          onSave();
        }}
      >
        <label>
          Display name
          <input value={profile.displayName} onChange={(event) => onChange({ displayName: event.target.value })} />
        </label>
        <label>
          Current location
          <input value={profile.location} onChange={(event) => onChange({ location: event.target.value })} />
        </label>
        <label>
          Preferred language
          <select
            value={profile.preferredLanguage}
            onChange={(event) => onChange({ preferredLanguage: event.target.value as LanguageCode })}
          >
            {languageOptions.map((language) => (
              <option key={language.value} value={language.value}>
                {language.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Contact preference
          <input
            value={profile.contactPreference}
            onChange={(event) => onChange({ contactPreference: event.target.value })}
          />
        </label>
        <label className="wide">
          Skills
          <input
            placeholder="tailoring, carpentry, translation"
            value={profile.skills.join(", ")}
            onChange={(event) => onChange({ skills: splitList(event.target.value) })}
          />
        </label>
        <label className="wide">
          Experience
          <textarea value={profile.experience} onChange={(event) => onChange({ experience: event.target.value })} />
        </label>
        <label className="wide">
          Education or training
          <textarea value={profile.education} onChange={(event) => onChange({ education: event.target.value })} />
        </label>
        <label className="wide">
          Support needs
          <input
            placeholder="tools, mentorship, childcare"
            value={profile.supportNeeds.join(", ")}
            onChange={(event) => onChange({ supportNeeds: splitList(event.target.value) })}
          />
        </label>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={profile.shareConsent}
            onChange={(event) => onChange({ shareConsent: event.target.checked })}
          />
          Allow this selected profile information to be shared with trusted organizations.
        </label>
        <div className="actions">
          <button className="primary" type="submit">
            Save profile
          </button>
          <span>{status}</span>
        </div>
      </form>
    </section>
  );
}

function ProfilePreview({ profile, summary }: { profile: Profile; summary: AiProfileSummary }) {
  return (
    <section className="content two-column">
      <article className="profile-card">
        <p className="eyebrow">Profile preview</p>
        <h2>{profile.displayName || "Unnamed profile"}</h2>
        <p>{profile.location || "Location not added yet"}</p>
        <TagList values={profile.skills} fallback="No skills added yet" />
        <h3>Experience</h3>
        <p>{profile.experience || "Experience can be added later."}</p>
        <h3>Education</h3>
        <p>{profile.education || "Training or education can be added later."}</p>
      </article>
      <article className="profile-card">
        <p className="eyebrow">Mock translation and summary</p>
        <h2>{summary.headline}</h2>
        <p>{summary.summary}</p>
        <h3>Translated profile note</h3>
        <p>{mockTranslate(profile.experience || "Experience can be added later.", profile.preferredLanguage)}</p>
      </article>
    </section>
  );
}

function Dashboard({ profiles, summaries }: { profiles: Profile[]; summaries: AiProfileSummary[] }) {
  return (
    <section className="content">
      <div className="section-heading">
        <p className="eyebrow">NGO/community view</p>
        <h2>Profiles needing support</h2>
      </div>
      <div className="dashboard-list">
        {profiles.map((profile) => {
          const summary = summaries.find((item) => item.profileId === profile.id) ?? buildLocalSummary(profile);

          return (
            <article className="profile-card" key={profile.id}>
              <div className="card-header">
                <div>
                  <h3>{profile.displayName}</h3>
                  <p>{profile.location}</p>
                </div>
                <span className={profile.shareConsent ? "badge good" : "badge"}>{profile.shareConsent ? "Share OK" : "Private"}</span>
              </div>
              <p>{summary.summary}</p>
              <TagList values={summary.suggestedSupport} fallback="No support needs listed" />
            </article>
          );
        })}
      </div>
    </section>
  );
}

function TagList({ values, fallback }: { values: string[]; fallback: string }) {
  const visibleValues = values.filter(Boolean);

  if (!visibleValues.length) {
    return <p className="muted">{fallback}</p>;
  }

  return (
    <div className="tags">
      {visibleValues.map((value) => (
        <span key={value}>{value}</span>
      ))}
    </div>
  );
}

function splitList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default App;
