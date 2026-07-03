# UI Agent Skill

Construye los componentes primitivos de UI.

## utils (`src/lib/utils.ts`)

- Función `cn()`: combina `clsx` + `tailwind-merge`.
- Tipo `ClassValue` importado de `clsx`.
- Corto: 3 líneas de implementación.

## Button (`src/components/ui/Button.tsx`)

- `"use client"`.
- Usa `Slot` de `@radix-ui/react-slot` para `asChild`.
- Usa `cva` de `class-variance-authority` para variantes.
- Variantes: `primary` (gradiente azul-violeta), `secondary` (borde + fondo sutil), `ghost`, `outline`.
- Tamaños: `sm`, `md`, `lg`, `icon`.
- Variante por defecto: `primary`, tamaño: `md`.
- `forwardRef` + `displayName`.
- Props extienden `ButtonHTMLAttributes` + `VariantProps<typeof buttonVariants>` + `asChild`.

## Badge (`src/components/ui/Badge.tsx`)

- Componente servidor (no necesita `"use client"`).
- Variantes: `default` (gris), `primary` (azul con borde), `secondary` (violeta con borde).
- Props: `children`, `className?`, `variant?` (default "default").

## Input (`src/components/ui/Input.tsx`)

- `forwardRef` + `displayName`.
- Props extienden `InputHTMLAttributes<HTMLInputElement>`.
- Estilo: borde, focus ring azul, placeholder estilizado, backdrop-blur.

## Textarea (`src/components/ui/Textarea.tsx`)

- `forwardRef` + `displayName`.
- Props extienden `TextareaHTMLAttributes<HTMLTextAreaElement>`.
- Mismo estilo que Input pero con `min-h-[120px]` y `resize-y`.
