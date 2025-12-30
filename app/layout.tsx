import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SafeGuard Nigeria - Community Safety Platform",
  description: "Real-time safety alerts, school tracking, and family protection for Nigerian communities",
  keywords: "safety, nigeria, security, incident reporting, school safety, family protection",
  authors: [{ name: "SafeGuard Nigeria" }],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "SafeGuard Nigeria - Community Safety Platform",
    description: "Real-time safety alerts, school tracking, and family protection for Nigerian communities",
    type: "website",
    locale: "en_NG",
    siteName: "SafeGuard Nigeria",
  },
  twitter: {
    card: "summary_large_image",
    title: "SafeGuard Nigeria - Community Safety Platform",
    description: "Real-time safety alerts, school tracking, and family protection for Nigerian communities",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import { OfflineStatus } from "@/components/OfflineStatus";
import { GlobalEmergencyOverlay } from "@/components/safety/GlobalEmergencyOverlay";
import { EmergencyCallingUI } from "@/components/safety/EmergencyCallingUI";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className={inter.className}>
        <ServiceWorkerRegistration />
        <OfflineStatus />
        <GlobalEmergencyOverlay />
        <EmergencyCallingUI />
        {children}
      </body>
    </html>
  );
}
