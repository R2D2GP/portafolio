import { cn } from "@/lib/utils"

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
}: {
  title: string
  subtitle?: string
  className?: string
  align?: "left" | "center"
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
