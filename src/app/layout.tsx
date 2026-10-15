import type { Metadata } from "next";
import { Alice, Montserrat } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";

const heading = Alice({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400"],
});

const sans = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ogImageUrl = `${siteConfig.siteUrl}${siteConfig.ogImagePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: [
      { url: siteConfig.iconPath, type: "image/png", sizes: "192x192" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: siteConfig.iconPath, sizes: "192x192", type: "image/png" }],
    shortcut: siteConfig.iconPath,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: ogImageUrl,
        secureUrl: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Escuela Valores Divinos · LIVE",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [ogImageUrl],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${heading.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#0a1423] font-sans text-[#e0d3ba]">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(90deg,#0a1423_22%,#231724_91%)]" />
        <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[55vh] bg-[linear-gradient(180deg,#6d9bba_0%,rgba(35,23,36,0)_100%)] opacity-80" />
        {children}
      </body>
    </html>
  );
}
