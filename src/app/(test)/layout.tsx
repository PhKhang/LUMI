"use client"

import { Box } from "@chakra-ui/react"

export default function TestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box minH="100vh" bg="background.primary">
      {children}
    </Box>
  )
}
