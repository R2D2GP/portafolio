import { cn } from "@/lib/utils"

const variants = {
  default:
    "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300",
  primary:
    "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20",
  secondary:
    "bg-violet-500/10 text-violet-700 dark:text-violet-400 border border-violet-500/20",
}

export function Badge({
  className,
  variant = "default",
  children,
}: {
  className?: string
  variant?: "default" | "primary" | "secondary"
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
