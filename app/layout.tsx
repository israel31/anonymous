import type { Metadata } from "next";
import { Inter } from "next/font/google"; // We are importing a standard font
import "./globals.css";

// This sets up the standard 'Inter' font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anonymous Q&A",
  description: "Create your anonymous questions easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* We apply the font's class name to the body */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}