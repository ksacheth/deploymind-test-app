# DeployMind Test App

A minimal Next.js (App Router) app that is **intentionally broken** so you can
test the DeployMind self-healing pipeline end-to-end.

## The intentional bug (cross-file type error)

`app/page.tsx` renders `user.name`:

```tsx
import { users } from "@/lib/users";
// ...
<li key={user.id}>{user.name}</li>
```

…but the `User` type in `lib/users.ts` only declares `id` and `email` — there is
no `name` field. A strict TypeScript build (`"strict": true`) fails with:

```
Type error: Property 'name' does not exist on type 'User'.
```

The root cause lives in a **different file** (`lib/users.ts`) than where the
error surfaces (`app/page.tsx`).

## Expected DeployMind behavior

1. **Repo analysis** → detects Next.js + TypeScript + npm, notes `@/` path alias.
2. **Log analysis** → "Property 'name' does not exist on type 'User'", requests
   BOTH `app/page.tsx` and `lib/users.ts` (the investigation loop in action).
3. **Fix generation** → either:
   - change `user.name` → `user.email` in `app/page.tsx`, OR
   - add `name: string` to the `User` interface AND to each entry in `users`.
4. **Validation** → source-code change → flagged for human approval.
5. **Apply** → opens a PR with the fix and redeploys.

## Use it

1. Push this folder to a GitHub repo.
2. Import into Vercel and deploy → the build fails (expected).
3. Point DeployMind at it (it can auto-discover the latest failed deployment):
   ```bash
   cd my_agent
   python agent.py            # auto-finds the failed deployment
   ```

## Reset for another demo

Revert the DeployMind PR (or restore `user.name`) and redeploy to break it again.
