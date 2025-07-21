"use client"

import { useState } from "react"
import { Box, Flex, SimpleGrid, Container, HStack, Button, Text  } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "vi">("en")

  return (
    <Box minH="100vh">
        <Box
          position="sticky" 
          top="0"
          zIndex="sticky"
          boxShadow="sm"
        >
          <Navigation currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
        </Box>


      <Footer currentLanguage={currentLanguage} />
    </Box>
  )
}