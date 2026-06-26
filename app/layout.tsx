import type { ReactNode } from "react";

export const metadata = {
  title: "DeployMind Test App",
  description: "An intentionally broken app used to test the DeployMind pipeline",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
