import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crete Pool Rating",
  description: "Official pool ranking system of Crete",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white">

        <nav className="border-b border-zinc-800 bg-black/80 backdrop-blur sticky top-0 z-50">

          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

            <h1 className="text-2xl font-bold">
              Crete Pool Rating
            </h1>

            <div className="flex gap-6 text-zinc-300">

              <a
                href="/"
                className="hover:text-white transition"
              >
                Home
              </a>

              <a
                href="/players"
                className="hover:text-white transition"
              >
                Players
              </a>

              <a
                href="/matches"
                className="hover:text-white transition"
              >
                Matches
              </a>

            </div>

          </div>

        </nav>

        {children}

      </body>
    </html>
  );
}