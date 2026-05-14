# Capstone spec — [Refugee skills Wallet]
## Problem statement
Many refugees and displaced people lose important documents, proof of skills, and access to economic opportunities when forced to leave their homes. At the same time, NGOs, community organizations, and civil society groups such as the Open Society Foundations often struggle to verify skills, coordinate support, and help displaced communities reconnect with work, education, and local networks. Refugeee Wallet is a low-bandwidth, multilingual digital profile platform that helps displaced people securely store and share their experience, skills, and identity while giving trusted community organizations better tools to support inclusion, dignity, and economic participation.

## What success looks like (acceptance criteria)
- [] Users can create a lightweight digital profile without needing formal documentation
- [] NGOs/community organizations can quickly understand a person’s skills and support needs through AI-generated summaries
- [] Profiles can work offline and sync later in low-connectivity environments
- [] Users can securely share selected information using QR codes or temporary links
- [] Profiles can be translated into multiple languages for cross-border accessibility

## Architecture sketch
- A lightweight React web app with offline support
- A backend for secure profile storage and syncing
- AI tools for translation, voice-to-text, and profile summarization
- A trusted-sharing layer for NGOs, employers, and community organizations

## Tech stack
- Language: TypeScript
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: Supabase
- APIs: OpenAI, Whisper

## Task list(in order)
- Set up frontend and backend structure
- Build profile creation and editing flows
- Add offline storage and synchronization
- Integrate AI summaries and multilingual translation
-  Create secure profile-sharing features
-  Add NGO/community-support dashboard prototype
-  Test low-bandwidth and multilingual workflows

## Out of scope
- Government identity verification
- Blockchain identity systems
- Native mobile apps
- Full employment marketplace functionality

## Open questions
- Which languages should be prioritized first?
- What information should NGOs be allowed to access?
- Should organizations be able to verify skills or endorsements?
- How anonymous should profiles remain?
- What is the safest method for profile sharing in vulnerable communities?