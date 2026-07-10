import type { Metadata } from "next"
import { Archivo, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { Providers } from "./providers"
import { Sidebar } from "@/components/layout/Sidebar"
import { WheelSnapLayout } from "@/components/shared/WheelSnapLayout"
import "./globals.css"

const archivo = Archivo({
  variable: "--font-heading",
  subsets: ["latin"],
})

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
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
      className={`${archivo.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
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
