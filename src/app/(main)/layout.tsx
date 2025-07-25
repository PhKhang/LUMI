"use client"

import { useState } from "react"
import { Box } from "@chakra-ui/react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "vi">("en")

  return (
    <Box minH="100vh" bg="background.primary">
      <Box
        position="sticky" 
        top="0"
        zIndex="sticky"
      >
        <Navigation 
          currentLanguage={currentLanguage} 
          onLanguageChange={setCurrentLanguage} 
        />
      </Box>

      <Box flex="1">
        {children}
      </Box>

      <Footer currentLanguage={currentLanguage} />
    </Box>
  )
}
