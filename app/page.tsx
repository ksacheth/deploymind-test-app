// NOTE (intentional bug for DeployMind):
// This renders `user.name`, but the User type in lib/users.ts has no `name`
// field (only `id` and `email`). On Vercel the strict TypeScript build fails:
//   Type error: Property 'name' does not exist on type 'User'.
// Fixing it correctly requires reading lib/users.ts to see the real fields,
// then either using `user.email` here, or adding a `name` field to the type
// and the data. This is a cross-file fix, not a one-line guess.
import { users } from "@/lib/users";

export default function Home() {
  return (
    <main style={{ padding: 32, fontFamily: "system-ui, sans-serif" }}>
      <h1>Team</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </main>
  );
}
