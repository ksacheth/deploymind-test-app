// The User type intentionally has NO `name` field — only `id` and `email`.
// app/page.tsx tries to render `user.name`, which does not exist on this type,
// so the strict TypeScript build fails. The correct fix requires reading THIS
// file to see which fields actually exist.
export interface User {
  id: number;
  email: string;
}

export const users: User[] = [
  { id: 1, email: "ada@example.com" },
  { id: 2, email: "alan@example.com" },
  { id: 3, email: "grace@example.com" },
];
