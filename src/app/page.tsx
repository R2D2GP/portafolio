import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Methodologies } from "@/components/sections/Technologies"
import { AIStack } from "@/components/sections/AIStack"
import { Projects } from "@/components/sections/Projects"
import { Philosophy } from "@/components/sections/Philosophy"
import { Contact } from "@/components/sections/Contact"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Methodologies />
      <AIStack />
      <Projects />
      <Philosophy />
      <Contact />
    </>
  )
}
