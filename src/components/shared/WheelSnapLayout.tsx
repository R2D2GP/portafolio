"use client"

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  useSyncExternalStore,
} from "react"
import { cn } from "@/lib/utils"
import { SectionDots } from "./SectionDots"

interface WheelSnapContextType {
  currentIndex: number
  scrollToSection: (index: number) => void
  isLocked: boolean
  setLocked: (locked: boolean) => void
}

const WheelSnapContext = createContext<WheelSnapContextType>({
  currentIndex: 0,
  scrollToSection: () => {},
  isLocked: false,
  setLocked: () => {},
})

export function useWheelSnap() {
  return useContext(WheelSnapContext)
}

export function WheelSnapLayout({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode
  children: React.ReactNode
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [translateY, setTranslateY] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const isScrolling = useRef(false)
  const currentIndexRef = useRef(0)
  const touchStartY = useRef(0)
  const sectionsRef = useRef<HTMLDivElement>(null)
  const isLockedRef = useRef(false)

  useEffect(() => {
    currentIndexRef.current = currentIndex
  }, [currentIndex])

  useEffect(() => {
    isLockedRef.current = isLocked
  }, [isLocked])

  const scrollToSection = useCallback((index: number) => {
    if (isScrolling.current) return
    isScrolling.current = true
    setCurrentIndex(index)
    currentIndexRef.current = index

    const container = sectionsRef.current
    if (container) {
      const child = container.children[index] as HTMLElement | undefined
      if (child) {
        setTranslateY(-child.offsetTop)
      }
    }

    setTimeout(() => {
      isScrolling.current = false
    }, 700)
  }, [])

  const prefersReduced = useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
      mq.addEventListener("change", callback)
      return () => mq.removeEventListener("change", callback)
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  )

  useEffect(() => {
    const getTotalSections = () => sectionsRef.current?.children.length ?? 1

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isScrolling.current || isLockedRef.current) return

      const direction = e.deltaY > 0 ? 1 : -1
      const nextIndex = currentIndexRef.current + direction

      if (nextIndex >= 0 && nextIndex < getTotalSections()) {
        scrollToSection(nextIndex)
      }
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const onTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY
      if (isScrolling.current || isLockedRef.current) return
      if (Math.abs(deltaY) < 30) return

      const direction = deltaY > 0 ? 1 : -1
      const nextIndex = currentIndexRef.current + direction

      if (nextIndex >= 0 && nextIndex < getTotalSections()) {
        scrollToSection(nextIndex)
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (isLockedRef.current) return
      if (e.key === "PageDown" || e.key === "ArrowDown") {
        e.preventDefault()
        const nextIndex = Math.min(
          getTotalSections() - 1,
          currentIndexRef.current + 1
        )
        if (nextIndex !== currentIndexRef.current) scrollToSection(nextIndex)
      }
      if (e.key === "PageUp" || e.key === "ArrowUp") {
        e.preventDefault()
        const nextIndex = Math.max(0, currentIndexRef.current - 1)
        if (nextIndex !== currentIndexRef.current) scrollToSection(nextIndex)
      }
    }

    document.addEventListener("wheel", onWheel, { passive: false })
    document.addEventListener("touchstart", onTouchStart, { passive: true })
    document.addEventListener("touchend", onTouchEnd, { passive: true })
    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("wheel", onWheel)
      document.removeEventListener("touchstart", onTouchStart)
      document.removeEventListener("touchend", onTouchEnd)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [scrollToSection])

  return (
    <WheelSnapContext.Provider value={{ currentIndex, scrollToSection, isLocked, setLocked: setIsLocked }}>
      <div className="h-dvh w-screen overflow-hidden">
        {sidebar}
        <SectionDots />
        <div className="h-full md:pl-56" role="main">
          <div
            ref={sectionsRef}
            className={cn(
              "relative will-change-transform",
              prefersReduced
                ? "duration-0"
                : "transition-transform duration-700 ease-in-out"
            )}
            style={{ transform: `translateY(${translateY}px)` }}
          >
            {children}
          </div>
        </div>
      </div>
    </WheelSnapContext.Provider>
  )
}
