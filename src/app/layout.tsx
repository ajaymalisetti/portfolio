import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { InitialLoader } from "@/components/layout/InitialLoader";
import { IntroGateProvider } from "@/components/layout/IntroGateContext";
import { SiteHeader } from "@/components/layout/SiteHeader";
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
  title: {
    default: "Ajay Malisetti",
    template: "%s · Ajay Malisetti",
  },
  description:
    "Ajay Malisetti is a software engineer with a passion for building products that help people live better lives.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh overflow-x-clip bg-[#09090b] font-sans antialiased text-zinc-100`}
      >
        <IntroGateProvider>
          <InitialLoader />
          <SiteHeader />
          {children}
        </IntroGateProvider>
      </body>
    </html>
  );
}
