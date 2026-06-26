// NOTE (intentional bug for DeployMind):
// This file imports `lodash`, but `lodash` is NOT listed in package.json.
// On Vercel the build fails with: "Module not found: Can't resolve 'lodash'".
// The correct fix is to add "lodash" to dependencies in package.json.
import capitalize from "lodash/capitalize";

export default function Home() {
  const title = capitalize("hello from the deploymind test app");
  return (
    <main style={{ padding: 32, fontFamily: "system-ui, sans-serif" }}>
      <h1>{title}</h1>
      <p>If you can read this in production, the deployment succeeded.</p>
    </main>
  );
}
