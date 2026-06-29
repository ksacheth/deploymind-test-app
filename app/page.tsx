// NOTE (intentional bug for DeployMind):
// This renders `user.email`, as the User type in lib/users.ts does not have a `name` field.
import { users } from "@/lib/users";

export default function Home() {
  return (
    <main style={{ padding: 32, fontFamily: "system-ui, sans-serif" }}>
      <h1>Team</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </main>
  );
}
