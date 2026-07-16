"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import {
  BrainCircuit,
  Network,
  Wrench,
  Server,
  Rocket,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { stackLayers } from "@/data/aistack"
import { cn } from "@/lib/utils"

const layerIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  models: BrainCircuit,
  frameworks: Network,
  tools: Wrench,
  infra: Server,
  deploy: Rocket,
}

const particles = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: 8 + ((i * 13 + 7) % 84),
  y: 10 + ((i * 23 + 11) % 75),
  size: 1.5 + ((i * 3 + 5) % 4) * 0.5,
  duration: 3 + ((i * 7 + 3) % 4),
  floatAmount: -(4 + ((i * 5 + 2) % 3)),
  animDelay: ((i * 11 + 13) % 20) * 0.1,
}))

function TechLogo({ id, className }: { id: string; className?: string }) {
  const logoData: Record<string, { path: string; color: string }> = {
    gpt5: {
      path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z",
      color: "#10A37F",
    },
    "openai-sdk": {
      path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z",
      color: "#10A37F",
    },
    claude: {
      path: "M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z",
      color: "#D97706",
    },
    vscode: {
      path: "M17.5 0.027 7.562 8.393 2.555 4.373 0 6.005v12l2.555 1.632 5.007-4.02L17.5 23.973 24 20.587V3.413L17.5 0.027zM17.5 6.438v11.124L10.225 12 17.5 6.438z",
      color: "#007ACC",
    },
    gemini: {
      path: "M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81",
      color: "#1A73E8",
    },
    langgraph: {
      path: "M13.796 0a6.93 6.93 0 0 0-4.91 2.019L5.451 5.455l3.273 3.27 3.432-3.432a2.284 2.284 0 0 1 3.277 0 2.28 2.28 0 0 1 0 3.275L12 12.001l3.273 3.273 3.433-3.435c2.692-2.692 2.692-7.127 0-9.82A6.92 6.92 0 0 0 13.796 0m-5.07 8.728-3.433 3.434c-2.692 2.693-2.692 7.126 0 9.819A6.92 6.92 0 0 0 10.203 24a6.93 6.93 0 0 0 4.911-2.02l3.432-3.432-3.271-3.272-3.433 3.433a2.284 2.284 0 0 1-3.277 0 2.28 2.28 0 0 1 0-3.276L12 12z",
      color: "#13B68C",
    },
    "vercel-ai-sdk": {
      path: "m12 1.608 12 20.784H0Z",
      color: "#FFFFFF",
    },
    cursor: {
      path: "M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23",
      color: "#38BDF8",
    },
    playwright: {
      path: "M23.996 7.462c-.056.837-.257 2.135-.716 3.85-.995 3.715-4.27 10.874-10.42 9.227-6.15-1.65-5.407-9.487-4.412-13.201.46-1.716.934-2.94 1.305-3.694.42-.853.846-.289 1.815.523.684.573 2.41 1.791 5.011 2.488 2.601.697 4.706.506 5.583.352 1.245-.219 1.897-.494 1.834.455Zm-9.807 3.863s-.127-1.819-1.773-2.286c-1.644-.467-2.613 1.04-2.613 1.04Zm4.058 4.539-7.769-2.172s.446 2.306 3.338 3.153c2.862.836 4.43-.98 4.43-.981Zm2.701-2.51s-.13-1.818-1.773-2.286c-1.644-.469-2.612 1.038-2.612 1.038ZM8.57 18.23c-4.749 1.279-7.261-4.224-8.021-7.08C.197 9.831.044 8.832.003 8.188c-.047-.73.455-.52 1.415-.354.677.118 2.3.261 4.308-.28a11.28 11.28 0 0 0 2.41-.956c-.058.197-.114.4-.17.61-.433 1.618-.827 4.055-.632 6.426-1.976.732-2.267 2.423-2.267 2.423l2.524-.715c.227 1.002.6 1.987 1.15 2.838a5.914 5.914 0 0 1-.171.049Zm-4.188-6.298c1.265-.333 1.363-1.631 1.363-1.631l-3.374.888s.745 1.076 2.01.743Z",
      color: "#45BA5A",
    },
    docker: {
      path: "M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z",
      color: "#2496ED",
    },
    supabase: {
      path: "M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z",
      color: "#3ECF8E",
    },
    pinecone: {
      path: "M3 20h7l-3.5-12zm11 0h7l-3.5-12zm-6-2h7l-3.5-12z",
      color: "#248834",
    },
    cloudflare: {
      path: "M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.6045-.499-1.0615-.5205l-8.6592-.1123a.1559.1559 0 0 1-.1333-.0713c-.0283-.042-.0351-.0986-.021-.1553.0278-.084.1123-.1484.2036-.1562l8.7359-.1123c1.0351-.0489 2.1601-.8868 2.5537-1.9136l.499-1.3013c.0215-.0561.0293-.1128.0147-.168-.5625-2.5463-2.835-4.4453-5.5499-4.4453-2.5039 0-4.6284 1.6177-5.3876 3.8614-.4927-.3658-1.1187-.5625-1.794-.499-1.2026.119-2.1665 1.083-2.2861 2.2856-.0283.31-.0069.6128.0635.894C1.5683 13.171 0 14.7754 0 16.752c0 .1748.0142.3515.0352.5273.0141.083.0844.1475.1689.1475h15.9814c.0909 0 .1758-.0645.2032-.1553l.12-.4268zm2.7568-5.5634c-.0771 0-.1611 0-.2383.0112-.0566 0-.1054.0415-.127.0976l-.3378 1.1744c-.1475.5068-.0918.9707.1543 1.3164.2256.3164.6055.498 1.0625.5195l1.8437.1133c.0557 0 .1055.0263.1329.0703.0283.043.0351.1074.0214.1562-.0283.084-.1132.1485-.204.1553l-1.921.1123c-1.041.0488-2.1582.8867-2.5527 1.914l-.1406.3585c-.0283.0713.0215.1416.0986.1416h6.5977c.0771 0 .1474-.0489.169-.126.1122-.4082.1757-.837.1757-1.2803 0-2.6025-2.125-4.727-4.7344-4.727",
      color: "#F38020",
    },
    "github-actions": {
      path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
      color: "#FFFFFF",
    },
    n8n: {
      path: "M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632",
      color: "#FF6C37",
    },
    vercel: {
      path: "M12 1.608 24 22.392H0Z",
      color: "#FFFFFF",
    },
  }

  const data = logoData[id]
  if (!data) return null

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      style={{ color: data.color }}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={data.path} />
    </svg>
  )
}

export function AIStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })
  const [activeLayerId, setActiveLayerId] = useState("models")
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const activeLayer = useMemo(() => {
    return stackLayers[currentCategoryIndex] || stackLayers[0]
  }, [currentCategoryIndex])

  const ActiveIcon = layerIcons[activeLayer.id]

  const goToPrevious = () => {
    if (currentCategoryIndex > 0) {
      setSlideDirection("right")
      setCurrentCategoryIndex(currentCategoryIndex - 1)
    }
  }

  const goToNext = () => {
    if (currentCategoryIndex < stackLayers.length - 1) {
      setSlideDirection("left")
      setCurrentCategoryIndex(currentCategoryIndex + 1)
    }
  }

  const handleDesktopCategoryClick = (layerId: string) => {
    setActiveLayerId(layerId)
  }

  return (
    <section
      ref={sectionRef}
      id="ai-stack"
      className="min-h-screen flex flex-col justify-center px-4 py-24 relative overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 30% 20%, rgba(104,195,169,0.05), transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(104,195,169,0.03), transparent 50%)",
      }}
    >
      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/20 pointer-events-none"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? {
                  opacity: [0, 0.5, 0],
                  y: [0, p.floatAmount, 0],
                }
              : {}
          }
          transition={{
            repeat: Infinity,
            duration: p.duration,
            delay: p.animDelay,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Custom Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-100 font-heading">
            AI Stack
          </h2>
          <div className="w-24 h-0.5 bg-primary mt-4 mx-auto rounded-full" />
          <p className="mt-4 text-zinc-300 text-lg">
            Sistemas de IA listos para producción
          </p>
        </motion.div>

        {/* Category Circle Buttons - Desktop Layout (md+) */}
        <motion.div
          className="hidden md:flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-14 mb-10 relative z-10"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          {stackLayers.map((layer) => {
            const Icon = layerIcons[layer.id]
            const isActive = activeLayerId === layer.id
            return (
              <button
                key={layer.id}
                onClick={() => handleDesktopCategoryClick(layer.id)}
                className="flex flex-col items-center group focus-visible:outline-none"
                aria-label={`Ver capa de ${layer.label}`}
              >
                <div
                  className={cn(
                    "w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-500 relative cursor-pointer",
                    isActive
                      ? "bg-primary/10 border border-primary/40 text-primary shadow-[0_0_40px_-8px] shadow-primary/30 scale-105"
                      : "bg-zinc-900/60 border border-zinc-800/40 text-zinc-500 hover:text-primary/80 hover:border-primary/20 hover:shadow-[0_0_20px_-8px] hover:shadow-primary/20 hover:scale-102 focus-visible:ring-2 focus-visible:ring-primary/50"
                  )}
                >
                  {Icon && (
                    <Icon
                      className={cn(
                        "w-7 h-7 sm:w-9 sm:h-9 transition-transform duration-300",
                        isActive ? "scale-100" : "group-hover:scale-105"
                      )}
                    />
                  )}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl -z-10" />
                  )}
                </div>
                <p
                  className={cn(
                    "text-center text-[10px] sm:text-xs font-semibold uppercase tracking-wider mt-3 transition-colors duration-300 max-w-[90px] sm:max-w-[110px] font-heading",
                    isActive ? "text-primary" : "text-zinc-400 group-hover:text-zinc-200"
                  )}
                >
                  {layer.label}
                </p>
              </button>
            )
          })}
        </motion.div>

        {/* Mobile Carousel - Single Button with Navigation (< md) */}
        <motion.div
          className="flex md:hidden justify-center items-center gap-4 mb-6 relative z-10"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          <button
            onClick={goToPrevious}
            disabled={currentCategoryIndex === 0}
            className="p-2 rounded-full bg-zinc-900/60 border border-zinc-800/40 text-zinc-500 hover:text-primary/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
            aria-label="Categoría anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center min-w-[140px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentCategoryIndex}-button`}
                initial={{
                  opacity: 0,
                  x: slideDirection === "left" ? 40 : -40,
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: slideDirection === "left" ? -40 : 40,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex flex-col items-center w-full"
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/10 border border-primary/40 text-primary shadow-[0_0_40px_-8px] shadow-primary/30 relative">
                  {ActiveIcon && <ActiveIcon className="w-7 h-7" />}
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl -z-10" />
                </div>
                <p className="text-center text-[10px] font-semibold uppercase tracking-wider mt-2 text-primary font-heading">
                  {activeLayer.label}
                </p>
              </motion.div>
            </AnimatePresence>
            <p className="text-xs text-zinc-500 mt-2">
              {currentCategoryIndex + 1} / {stackLayers.length}
            </p>
          </div>

          <button
            onClick={goToNext}
            disabled={currentCategoryIndex === stackLayers.length - 1}
            className="p-2 rounded-full bg-zinc-900/60 border border-zinc-800/40 text-zinc-500 hover:text-primary/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
            aria-label="Siguiente categoría"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Decorative Connecting Line */}
        <div className="flex justify-center mb-10">
          <svg width="2" height="40" className="opacity-30">
            <motion.line
              x1="0"
              y1="0"
              x2="0"
              y2="40"
              stroke="#68C3A9"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
        </div>

        {/* Active Layer Details Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={isMobile ? `mobile-${currentCategoryIndex}` : `desktop-${activeLayerId}`}
              initial={{
                opacity: 0,
                x: slideDirection === "left" ? 40 : -40,
              }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: slideDirection === "left" ? -40 : 40,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full max-w-4xl mx-auto rounded-2xl border border-zinc-800/60 bg-zinc-900/60 backdrop-blur-md p-4 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Internal Ambient Radial Lighting */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-start gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 shadow-sm">
                  {ActiveIcon && <ActiveIcon className="w-5 h-5 md:w-6 md:h-6 text-primary" />}
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg md:text-2xl font-bold text-zinc-100 tracking-tight font-heading">
                    {activeLayer.label}
                  </h3>
                  <p className="text-xs md:text-base text-zinc-400 mt-1">
                    {activeLayer.description}
                  </p>
                </div>
              </div>

              {/* Premium Technology Chips Row - Scrollable on mobile */}
              <div className="flex flex-wrap md:flex-wrap gap-3 md:gap-4 justify-start overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
                {activeLayer.nodes.map((node) => (
                  <div
                    key={node.id}
                    className="flex items-center gap-2 md:gap-4 px-3 md:px-5 py-3 md:py-4 rounded-2xl bg-zinc-950/40 border border-zinc-800/60 text-zinc-300 hover:bg-zinc-900/40 hover:border-primary/30 hover:text-primary transition-all duration-350 shadow-lg group cursor-default shrink-0 md:shrink"
                  >
                    <div className="w-7 h-7 md:w-9 md:h-9 rounded-xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-center p-1 md:p-2 shrink-0 group-hover:border-primary/20 transition-colors shadow-inner">
                      <TechLogo id={node.id} className="w-full h-full transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="min-w-0 pr-1">
                      <span className="text-xs md:text-base font-bold tracking-tight text-zinc-100 group-hover:text-primary transition-colors font-heading whitespace-nowrap">
                        {node.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

