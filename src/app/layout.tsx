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

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  icons: {
    icon: "/cropped-logo-EVD-SKY-dodecaedro-192x192.png",
    apple: "/cropped-logo-EVD-SKY-dodecaedro-192x192.png",
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
