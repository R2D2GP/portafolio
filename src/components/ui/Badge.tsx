import { cn } from "@/lib/utils"

const variants = {
  default:
    "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300",
  primary:
    "bg-primary/10 text-primary border border-primary/20",
}

export function Badge({
  className,
  variant = "default",
  children,
}: {
  className?: string
  variant?: keyof typeof variants
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
