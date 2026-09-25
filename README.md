# TwinLink

Professional technology consulting website and talent portal. Public marketing pages are powered by a singleton company profile. Candidates self-register; employees are invite-only (plus a seeded admin).

## Stack

- Next.js 15 App Router, React 19, TypeScript (strict)
- Tailwind CSS v4 and shadcn-style UI
- Prisma + PostgreSQL (Neon recommended)
- Auth.js v5 (Credentials + JWT) and `@auth/prisma-adapter`
- Vercel Blob for resume uploads
- Deploy target: Vercel

## Local setup

1. **Create a Postgres database** (Neon is the intended host). SQLite is not supported.

2. Copy environment files:

   ```bash
   copy .env.example .env.local
   ```

3. Fill in `.env.local`:

   | Variable | Purpose |
   | --- | --- |
   | `DATABASE_URL` | Pooled Postgres URL |
   | `DIRECT_URL` | Direct (unpooled) URL for migrations |
   | `AUTH_SECRET` | `openssl rand -base64 32` |
   | `AUTH_URL` | `http://localhost:3000` locally |
   | `NEXT_PUBLIC_APP_URL` | Same as the public site URL |
   | `BLOB_READ_WRITE_TOKEN` | Optional. Resume upload degrades in the UI if empty |
   | `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | First employee account |

4. Install and generate the Prisma client:

   ```bash
   npm install
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

5. Run the app:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

### First accounts

- **Admin employee:** `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` after seed.
- **Candidate:** `/register` (always creates a `CANDIDATE`).
- **Additional employees:** Dashboard → Settings → generate invite → `/register?invite=TOKEN` with the invited email.

## Vercel deploy

1. Push the repo and import it in Vercel.
2. Add the same environment variables. Use the Neon pooled URL for `DATABASE_URL` and the direct URL for `DIRECT_URL`.
3. Create a Vercel Blob store and set `BLOB_READ_WRITE_TOKEN`.
4. Set `AUTH_URL` and `NEXT_PUBLIC_APP_URL` to the production domain.
5. Build command is `prisma generate && next build` (already in `package.json`).
6. Run `prisma db push` or `prisma migrate deploy` against production once, then `npm run db:seed` from a trusted machine.

## Product map

| Area | Routes |
| --- | --- |
| Marketing | `/` `/about` `/careers` `/careers/[slug]` |
| Auth | `/login` `/register` |
| Employee | `/dashboard/employee/*` — profile, company, jobs, applicants, messages, settings |
| Candidate | `/dashboard/candidate/*` — profile, resume, applications, saved jobs, messages, settings |

Messages are threaded per application. A candidate may apply to a job once (`@@unique([jobId, candidateUserId])`).

## Useful scripts

```bash
npm run dev
npm run build
npm run lint
npm run db:push
npm run db:seed
npm run db:studio
```
