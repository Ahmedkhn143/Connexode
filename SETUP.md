# Connexode — Complete Setup Guide

## Step 1: Run setup script (creates all folders)

```bash
chmod +x setup.sh
./setup.sh
```

## Step 2: Install dependencies

```bash
npm install next-auth@beta bcryptjs resend @prisma/client prisma
npm install -D @types/bcryptjs
```

## Step 3: Create .env.local

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/connexode?sslmode=require"
NEXTAUTH_SECRET="paste-output-of-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
RESEND_API_KEY="re_xxxxxxxxxxxx"
ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxx"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Step 4: Copy files (exact paths below)

### ROOT FILES (paste in project root — same level as package.json)
| Download name       | Paste as          |
|---------------------|-------------------|
| auth                | auth.ts           |
| middleware           | middleware.ts     |
| schema              | prisma/schema.prisma |
| .env                | .env.example      |

### APP — PAGES
| Download name          | Paste as                                      |
|------------------------|-----------------------------------------------|
| page (homepage)        | app/page.tsx                                  |
| layout (root)          | app/layout.tsx  ← replaces existing           |
| layout-with-session    | (same as layout — already included)           |
| not-found              | app/not-found.tsx                             |
| error                  | app/error.tsx                                 |
| loading                | app/loading.tsx                               |
| page (about)           | app/about/page.tsx                            |
| page (services)        | app/services/page.tsx                         |
| page (contact)         | app/contact/page.tsx                          |
| page (join)            | app/join/page.tsx                             |
| page (ambassador)      | app/join/ambassador/page.tsx                  |
| page (internship)      | app/join/internship/page.tsx                  |
| page (community)       | app/community/page.tsx                        |
| page (leaderboard)     | app/community/leaderboard/page.tsx            |
| page (showcase)        | app/community/showcase/page.tsx               |
| page (success-stories) | app/community/success-stories/page.tsx        |
| page (verify)          | app/verify/page.tsx                           |
| page (signin)          | app/auth/signin/page.tsx                      |
| page (signup)          | app/auth/signup/page.tsx                      |
| layout (dashboard)     | app/dashboard/layout.tsx                      |
| page (student)         | app/dashboard/student/page.tsx                |
| page (ambassador dash) | app/dashboard/ambassador/page.tsx             |
| layout (admin)         | app/admin/layout.tsx                          |
| page (admin overview)  | app/admin/page.tsx                            |
| page (applications)    | app/admin/applications/page.tsx               |
| page (app detail)      | app/admin/applications/[id]/page.tsx          |
| page (certificates)    | app/admin/certificates/page.tsx               |
| page (projects)        | app/admin/projects/page.tsx                   |
| page (stats)           | app/admin/stats/page.tsx                      |

### APP — API ROUTES
| Download name             | Paste as                                         |
|---------------------------|--------------------------------------------------|
| route ([...nextauth])     | app/api/auth/[...nextauth]/route.ts              |
| route (register)          | app/api/auth/register/route.ts                   |
| route (amb application)   | app/api/applications/ambassador/route.ts         |
| route (int application)   | app/api/applications/internship/route.ts         |
| route (contact)           | app/api/contact/route.ts                         |
| route (leaderboard)       | app/api/leaderboard/route.ts                     |
| route (showcase)          | app/api/showcase/route.ts                        |
| route (verify)            | app/api/verify/route.ts                          |
| route (ai-advisor)        | app/api/ai-advisor/route.ts                      |
| route (app status)        | app/api/admin/applications/[id]/status/route.ts  |
| route (cert issue)        | app/api/admin/certificates/issue/route.ts        |
| route (project update)    | app/api/admin/projects/[id]/route.ts             |

### COMPONENTS
| Download name              | Paste as                                          |
|----------------------------|---------------------------------------------------|
| RootNav                    | components/layout/RootNav.tsx                     |
| RootFooter                 | components/layout/RootFooter.tsx                  |
| SessionProvider            | components/providers/SessionProvider.tsx          |
| ApplicationActions         | components/admin/ApplicationActions.tsx           |
| IssueCertificateButton     | components/admin/IssueCertificateButton.tsx       |
| ProjectToggleButtons       | components/admin/ProjectToggleButtons.tsx         |
| AICareerAdvisor            | components/dashboard/AICareerAdvisor.tsx          |

### LIB
| Download name  | Paste as              |
|----------------|-----------------------|
| prisma (lib)   | lib/prisma.ts         |
| email          | lib/email.ts          |
| certificate    | lib/certificate.ts    |

## Step 5: Delete old partial schema files

```bash
rm -f prisma/schema-v2-addition.prisma
rm -f prisma/schema-certificate-update.prisma
rm -f prisma/schema-project-addition.prisma
rm -f prisma/schema-auth-update.prisma
```

## Step 6: Push schema to database

```bash
npx prisma generate
npx prisma db push
```

## Step 7: Make yourself admin

```bash
npx prisma studio
# Opens at localhost:5555
# Go to User table → your email row → role field → change to ADMIN → Save
```

## Step 8: Update social links (3 places)

Search in your editor for `instagram.com/connexode` — update all 3 occurrences:
- components/layout/RootFooter.tsx (line ~35)
- app/contact/page.tsx (line ~25)
- app/page.tsx footer section

## Step 9: Update email in contact API

In app/api/contact/route.ts line 10:
```ts
const ADMIN_EMAIL = "ahmadkha8143@gmail.com"; // already yours ✅
const FROM_EMAIL  = "Connexode <noreply@connexode.com>"; // update after domain verify
```

## Step 10: Test locally

```bash
npm run dev
```

Test this checklist:
- [ ] Homepage loads with nav + footer
- [ ] /join → ambassador and internship forms work
- [ ] /auth/signup → create account → redirects to dashboard
- [ ] /auth/signin → sign in → role-based redirect
- [ ] /admin → only accessible after making yourself ADMIN in Prisma Studio
- [ ] Submit ambassador application → check email received

## Step 11: Deploy to Vercel

```bash
git add .
git commit -m "feat: complete Connexode platform"
git push origin main
```

In Vercel dashboard → Settings → Environment Variables, add:
- DATABASE_URL
- NEXTAUTH_SECRET
- NEXTAUTH_URL = https://connexode.vercel.app
- RESEND_API_KEY
- ANTHROPIC_API_KEY
- NEXT_PUBLIC_APP_URL = https://connexode.vercel.app

## Complete file tree (for reference)

```
connexode/
├── auth.ts
├── middleware.ts
├── .env.local
├── .env.example
├── prisma/
│   └── schema.prisma
├── lib/
│   ├── prisma.ts
│   ├── email.ts
│   └── certificate.ts
├── components/
│   ├── layout/
│   │   ├── RootNav.tsx
│   │   └── RootFooter.tsx
│   ├── providers/
│   │   └── SessionProvider.tsx
│   ├── admin/
│   │   ├── ApplicationActions.tsx
│   │   ├── IssueCertificateButton.tsx
│   │   └── ProjectToggleButtons.tsx
│   └── dashboard/
│       └── AICareerAdvisor.tsx
└── app/
    ├── layout.tsx
    ├── page.tsx
    ├── not-found.tsx
    ├── error.tsx
    ├── loading.tsx
    ├── about/page.tsx
    ├── services/page.tsx
    ├── contact/page.tsx
    ├── verify/page.tsx
    ├── join/
    │   ├── page.tsx
    │   ├── ambassador/page.tsx
    │   └── internship/page.tsx
    ├── community/
    │   ├── page.tsx
    │   ├── leaderboard/page.tsx
    │   ├── showcase/page.tsx
    │   └── success-stories/page.tsx
    ├── auth/
    │   ├── signin/page.tsx
    │   └── signup/page.tsx
    ├── dashboard/
    │   ├── layout.tsx
    │   ├── student/page.tsx
    │   └── ambassador/page.tsx
    ├── admin/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── applications/
    │   │   ├── page.tsx
    │   │   └── [id]/page.tsx
    │   ├── certificates/page.tsx
    │   ├── projects/page.tsx
    │   └── stats/page.tsx
    └── api/
        ├── auth/
        │   ├── [...nextauth]/route.ts
        │   └── register/route.ts
        ├── applications/
        │   ├── ambassador/route.ts
        │   └── internship/route.ts
        ├── contact/route.ts
        ├── leaderboard/route.ts
        ├── showcase/route.ts
        ├── verify/route.ts
        ├── ai-advisor/route.ts
        └── admin/
            ├── applications/[id]/status/route.ts
            ├── certificates/issue/route.ts
            └── projects/[id]/route.ts
```
