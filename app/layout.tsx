import { Toaster } from "@/components/ui/toaster";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "./components/header/Header";
import "./globals.css";

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
  title: "Edukai",
  description: "Révise mieux, pas plus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/logo-2.png" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-[5%] min-h-screen w-full flex flex-col bg-gradient-to-b from-[#0f172a] to-[#1e293b] relative`}
      >
        <div
          className="absolute pointer-events-none z-0 animate-glow-pulse h-full hidden lg:block"
          style={{
            width: "600px",
            height: "300px",
            top: "-5%",
            left: "5%",
            background:
              "radial-gradient(circle, rgba(54,120,255,0.75) 0%, transparent 100%)",
            filter: "blur(200px)",
          }}
        ></div>
        <div
          className="absolute pointer-events-none z-0 animate-glow-float h-full hidden lg:block"
          style={{
            width: "600px",
            height: "500px",
            top: "15%",
            right: "5%",
            background:
              "radial-gradient(circle, rgba(54,120,255,0.75) 0%, transparent 100%)",
            filter: "blur(200px)",
          }}
        ></div>

        <div className="flex items-center justify-center z-20 h-full">
          <Header />
        </div>
        <div className="flex-1 flex items-center justify-center relative z-10 h-full pb-[10%] lg:pb-[5%]">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
