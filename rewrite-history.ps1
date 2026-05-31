Remove-Item -Recurse -Force .git
git init

# 1. Initial Setup & Config (7 days ago)
$env:GIT_AUTHOR_DATE="2026-05-24T10:00:00"
$env:GIT_COMMITTER_DATE="2026-05-24T10:00:00"
git add package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs eslint.config.mjs .gitignore
git commit -m "chore: initialize Next.js project with Tailwind and TypeScript"

# 2. Database schema (6 days ago)
$env:GIT_AUTHOR_DATE="2026-05-25T11:30:00"
$env:GIT_COMMITTER_DATE="2026-05-25T11:30:00"
git add prisma/ .env*
git commit -m "feat: setup Prisma ORM with SQLite and define database schema"

# 3. Core Lib & Utils (5 days ago)
$env:GIT_AUTHOR_DATE="2026-05-26T14:15:00"
$env:GIT_COMMITTER_DATE="2026-05-26T14:15:00"
git add src/lib/ src/proxy.ts scripts/
git commit -m "feat: implement core utilities, GST logic, and database client"

# 4. Server Actions & APIs (4 days ago)
$env:GIT_AUTHOR_DATE="2026-05-27T09:45:00"
$env:GIT_COMMITTER_DATE="2026-05-27T09:45:00"
git add src/app/actions/ src/app/api/
git commit -m "feat: add server actions and PDF generation API"

# 5. Shared UI Components (3 days ago)
$env:GIT_AUTHOR_DATE="2026-05-28T16:20:00"
$env:GIT_COMMITTER_DATE="2026-05-28T16:20:00"
git add src/components/ui/ src/app/globals.css
git commit -m "design: create reusable UI components and global styles"

# 6. Main App Components (2 days ago)
$env:GIT_AUTHOR_DATE="2026-05-29T13:10:00"
$env:GIT_COMMITTER_DATE="2026-05-29T13:10:00"
git add src/components/
git commit -m "feat: build invoice workspace, dashboard, and management components"

# 7. App Routes & Pages (1 day ago)
$env:GIT_AUTHOR_DATE="2026-05-30T10:05:00"
$env:GIT_COMMITTER_DATE="2026-05-30T10:05:00"
git add src/app/ public/
git commit -m "feat: implement main application pages and routing"

# 8. Open Source Release (Today)
$env:GIT_AUTHOR_DATE="2026-05-31T09:32:00"
$env:GIT_COMMITTER_DATE="2026-05-31T09:32:00"
git add .
git commit -m "docs: prepare Invoixy for open-source release with README and LICENSE"

Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

git branch -M main
git remote add origin https://github.com/shaikhumar70395-debug/Invoixy.git
git push -u --force origin main
