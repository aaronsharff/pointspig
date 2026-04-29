import type { Metadata } from "next";
import { Geist, Bungee, Caveat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bungee = Bungee({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "700",
});

export const metadata: Metadata = {
  title: "PointsPig — UNLIMITED Credit Card Points!",
  description:
    "PointsPig: the world's #1 rewards multiplier engine. Unlimited points. No caps. No categories. Get those points, piggy!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${bungee.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
