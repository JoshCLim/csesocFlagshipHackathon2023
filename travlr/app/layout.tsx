import "./globals.css";
import { Inter } from "next/font/google";
import NextAuthSession from "./nextAuthSession";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Travlr",
  description: "A travel app for the modern age.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSession>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </NextAuthSession>
  );
}
