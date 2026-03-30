import type { Metadata } from "next";

import { AliceShell } from "@/components/alice-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALICE",
  description: "Astral Local Intelligence and Content Engine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><AliceShell>{children}</AliceShell></body>
    </html>
  );
}
