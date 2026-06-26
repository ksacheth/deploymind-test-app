# DeployMind Test App

A minimal Next.js (App Router) app that is **intentionally broken** so you can
test the DeployMind self-healing pipeline end-to-end.

## The intentional bug

`app/page.tsx` imports `lodash`:

```ts
import { capitalize } from "lodash";
```

…but `lodash` is **not** in `package.json` dependencies. A Vercel build will
fail with:

```
Module not found: Can't resolve 'lodash'
```

## Expected DeployMind behavior

1. **Repo analysis** → detects Next.js + npm, reads `package.json`.
2. **Log analysis** → root cause: `lodash` imported but missing from dependencies.
3. **Fix generation** → add `"lodash": "^4.17.21"` to `package.json` dependencies.
4. **Validation** → low risk, single config file.
5. **Apply** → opens a PR with the fix and redeploys.

## Use it

1. Create an empty GitHub repo and push this folder to it.
2. Import the repo into Vercel and deploy → the build fails (expected).
3. Copy the failed deployment ID (`dpl_...`).
4. Point DeployMind at it:
   ```bash
   cd my_agent
   # set GITHUB_OWNER / GITHUB_REPO in .env for this repo, then:
   python agent.py dpl_THE_FAILED_ID
   ```

## Reset for another demo

To break it again after a fix, remove `lodash` from `package.json` (or revert
the DeployMind PR) and redeploy.
