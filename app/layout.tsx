import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter, Space_Grotesk } from 'next/font/google'
import Navbar from "@/components/Navbar";

const inter = Inter({subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({subsets: ['latin'], weight: ['300','400','500','600','700']})
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Amazon Price Tracker",
  description: "Track product prices online effortlessly to save money while shopping online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-10xl mx-auto">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
