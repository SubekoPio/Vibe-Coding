# Subeko Pio — Software Engineer Portfolio

Production-ready portfolio with admin CMS, file uploads, contact form, newsletter, and password management.

## Features

| Public | Admin |
|--------|-------|
| Home with photo, CV download, featured projects | Profile photo & CV upload |
| Project detail pages | Projects + cover images |
| About timeline | Experience, skills, messages |
| Contact form + subscribe | Subscribers, password settings |
| SEO (sitemap, robots, Open Graph) | Forgot / reset password |

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

- **Site:** http://localhost:3000  
- **Admin:** http://localhost:3000/admin/login  
- **Password:** value in `.env.local` (`ADMIN_PASSWORD`) — hashed on first login

## Environment

| Variable | Purpose |
|----------|---------|
| `ADMIN_PASSWORD` | Initial admin password |
| `SESSION_SECRET` | Session cookie secret (32+ chars) |
| `ADMIN_EMAIL` | Email for password reset (defaults to profile email) |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO |
| `RESEND_API_KEY` | Optional — email reset links |

## Data files

- `src/data/portfolio.json` — site content  
- `src/data/subscribers.json` — newsletter emails  
- `src/data/messages.json` — contact form submissions  
- `src/data/admin.json` — password hash  
- `public/uploads/` — avatar, CV, project images  

## Deploy

Use a host with **persistent disk** (VPS, Railway volume) so uploads and JSON edits survive restarts. For Vercel, swap storage to S3 + database.

```bash
npm run build
npm start
```

## Scripts

- `npm run dev` — development  
- `npm run build` — production build  
- `npm start` — production server  
