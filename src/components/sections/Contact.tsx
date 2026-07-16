"use client"

import { Mail } from "lucide-react"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { GitHubIcon } from "@/components/ui/GitHubIcon"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com",
    icon: <GitHubIcon className="w-7 h-7" />,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

export function Contact() {
  const currentYear = new Date().getFullYear()

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center px-6 py-20"
    >
      <div className="max-w-4xl mx-auto w-full text-center">
        <AnimatedSection>
          <SectionHeading
            title="Contacto"
            subtitle="Hablemos sobre tu próximo proyecto"
          />
        </AnimatedSection>

        <div className="mt-16">
          <AnimatedSection delay={0.1}>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl mx-auto">
              Estoy abierto a colaboraciones, proyectos freelance o simplemente
              una conversación interesante. No dudes en escribirme.
            </p>

            <div className="flex justify-center gap-8 mb-16">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl border border-zinc-300 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-400 hover:text-primary hover:border-primary/30 hover:bg-primary/5 hover:shadow-[0_0_16px_-4px] hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <a
              href="mailto:lapazajimenez@outlook.com"
              className="inline-flex flex-col items-center gap-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-primary hover:text-[#5ab398] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-xl group px-4 sm:px-6"
            >
              <Mail className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 group-hover:animate-pulse" />
              <span>lapazajimenez@outlook.com</span>
            </a>
          </AnimatedSection>
        </div>
      </div>

      <footer className="mt-20 text-center text-sm text-zinc-500">
        <p>&copy; {currentYear} AI-First Developer. Todos los derechos reservados.</p>
      </footer>
    </section>
  )
}
