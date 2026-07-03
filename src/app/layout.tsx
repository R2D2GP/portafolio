import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Providers } from "./providers"
import { Sidebar } from "@/components/layout/Sidebar"
import { WheelSnapLayout } from "@/components/shared/WheelSnapLayout"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "AI-First Developer | Portafolio",
  description:
    "Portafolio de un AI-First Developer autodidacta. Construyo aplicaciones modernas utilizando Inteligencia Artificial como núcleo del desarrollo.",
  keywords: [
    "AI-First",
    "Developer",
    "Inteligencia Artificial",
    "Desarrollo Web",
    "Next.js",
    "React",
    "TypeScript",
    "Portafolio",
  ],
  authors: [{ name: "AI-First Developer" }],
  openGraph: {
    title: "AI-First Developer | Portafolio",
    description:
      "Construyo aplicaciones modernas utilizando Inteligencia Artificial como núcleo del desarrollo.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-First Developer | Portafolio",
    description:
      "Construyo aplicaciones modernas utilizando Inteligencia Artificial como núcleo del desarrollo.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-background text-foreground antialiased transition-colors duration-300">
        <Providers>
          <WheelSnapLayout sidebar={<Sidebar />}>
            {children}
          </WheelSnapLayout>
        </Providers>
      </body>
    </html>
  )
}
