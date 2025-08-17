"use client"

import { useState, useEffect } from "react"
import { Box } from "@chakra-ui/react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "vi">("en")
  const { setColorMode } = useColorMode(); 

  useEffect(() => {
    setColorMode("light");
  }, []);

  return (
    <Box minH="100vh" bg="background.primary">
      <Box
        position="sticky" 
        top="0"
        zIndex="10"
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
