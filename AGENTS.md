# AGENTS.md

## Setup
- Use Node.js LTS and npm.
- Install dependencies with `npm install`.
- Run the full MVP with `npm run dev`.
- Run apps separately with `npm run dev:frontend` or `npm run dev:backend`.

## Testing
- Run `npm run typecheck` before finishing TypeScript changes.
- Run `npm run build` for broader verification.
- No dedicated test runner is configured yet.

## Style
- Keep changes small, readable, and TypeScript-first.
- Match the existing React/Vite frontend and Express backend structure.
- Keep UI simple, accessible, human, and low-bandwidth friendly.
- Use mock services until real Supabase, OpenAI, or Whisper integration is requested.

## Review
- Check profile create/edit, preview, and NGO dashboard flows.
- Preserve hackathon scope: no real auth, blockchain, or job marketplace.
- Summarize changes, verification run, and any remaining risks.
