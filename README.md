# This project contains the following technologies

# Project setup commands:
terminal powershell -> `pnpm i` (install dependencies)
terminal powershell -> `pnpm update --recursive` (update all dependencies)
terminal powershell -> `pnpm run dev`
terminal powershell -> `pnpm run lint` (loading ESLint checker)
terminal powershell -> `pnpm run types` (loading TypeScript checker)
terminal powershell -> `pnpm run knip` (loading Knip checker)

# Database commands:
terminal powershell -> `npx prisma generate`
terminal powershell -> `npx prisma db push`
terminal powershell -> `npx prisma migrate reset`

terminal powershell -> `npx prisma db seed` (loading test DB)

# GitHub commands:
terminal powershell -> `git pull origin master` (get latest changes)

terminal powershell -> `git add .` (add all changes)
terminal powershell -> `git commit -m "commit message"` (commit changes)
terminal powershell -> `git checkout -b <branch-name>` (create new branch)

terminal powershell -> `git push origin master` (push changes to master)
terminal powershell -> `git push origin master:<branch-name>` (if branch already exists)
terminal powershell -> `git push origin <branch-name>` (push changes to branch)
