"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useWheelSnap } from "@/components/shared/WheelSnapLayout"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { cn } from "@/lib/utils"
import {
  Sparkles,
  User,
  Code2,
  FolderGit2,
  Timeline,
  Brain,
  Mail,
  Menu,
  X,
} from "lucide-react"

const navLinks = [
  { href: "#hero", label: "Inicio", icon: Sparkles },
  { href: "#about", label: "Sobre mí", icon: User },
  { href: "#technologies", label: "Tecnologías", icon: Code2 },
  { href: "#projects", label: "Proyectos", icon: FolderGit2 },
  { href: "#experience", label: "Experiencia", icon: Timeline },
  { href: "#philosophy", label: "Filosofía", icon: Brain },
  { href: "#contact", label: "Contacto", icon: Mail },
]

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { currentIndex, scrollToSection } = useWheelSnap()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const index = navLinks.findIndex((l) => l.href === href)
    if (index >= 0) scrollToSection(index)
    setMobileOpen(false)
  }

  const activeId = navLinks[currentIndex]?.href.slice(1) ?? "hero"

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 flex md:hidden h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 shadow-sm transition-colors"
        aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <MobileDrawer
        open={mobileOpen}
        links={navLinks}
        activeId={activeId}
        onClose={() => setMobileOpen(false)}
        onNavigate={handleClick}
      />

      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 z-40 w-56 flex-col border-r border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl py-6 px-4">
        <a
          href="#hero"
          onClick={(e) => handleClick(e, "#hero")}
          className="mb-10 text-lg font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent px-3"
        >
          AI
        </a>

        <nav className="flex flex-1 flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = activeId === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-300",
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-medium"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                )}
                title={link.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute inset-0 bg-blue-500/10 rounded-xl border border-blue-500/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <link.icon className="relative h-5 w-5 shrink-0" />
                <span className="relative">{link.label}</span>
              </a>
            )
          })}
        </nav>

        <div className="mt-auto px-3">
          <ThemeToggle />
        </div>
      </aside>
    </>
  )
}

function MobileDrawer({
  open,
  links,
  activeId,
  onClose,
  onNavigate,
}: {
  open: boolean
  links: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[]
  activeId: string
  onClose: () => void
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-72 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-zinc-200 dark:border-zinc-800">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                AI.Dev
              </span>
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col p-4 gap-1">
              {links.map((link) => {
                const isActive = activeId === link.href.slice(1)
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      onNavigate(e, link.href)
                      onClose()
                    }}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200",
                      isActive
                        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </a>
                )
              })}
            </nav>
            <div className="absolute bottom-6 left-6">
              <ThemeToggle />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
