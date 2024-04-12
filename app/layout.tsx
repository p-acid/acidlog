import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

import { ThemeProvider } from "@/components/theme-provider";

import { Analytics } from "@/components/analytics";
import { ThemeToggle } from "@/components/theme-toggle";
import { Route } from "@/lib/route";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Samuel's Devlog",
  description: "박산성의 기술 블로그입니다.",
  metadataBase: new URL("https://www.acidlog.life"),
  openGraph: {
    images: "/images/og-image.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark" style={{ colorScheme: "dark" }}>
      <head>
        <link rel="icon" type="image/png" href="/images/favicon.png" />
      </head>

      <body
        className={`antialiased min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider>
          <div className="max-w-2xl mx-auto py-10 px-4">
            <header>
              <div className="flex items-center justify-between mb-12">
                <ThemeToggle />

                <nav className="ml-auto text-sm font-medium space-x-6">
                  <Link href={Route.Home}>Home</Link>
                  <Link href={Route.Projects}>Projects</Link>
                  <Link href={Route.About}>About</Link>
                  <Link href={Route.Docs}>Docs</Link>
                </nav>
              </div>
            </header>
            <main>{children}</main>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
