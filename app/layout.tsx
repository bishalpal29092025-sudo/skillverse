import type { Metadata } from "next";
import "./globals.css";

import AuthProvider from "@/providers/auth-provider";

export const metadata: Metadata = {
  title: {
    default: "SkillVerse",
    template: "%s | SkillVerse",
  },
  description: "Learn Skills. Teach Skills. Grow Together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#0B0F19] text-white antialiased"
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
