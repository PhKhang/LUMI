"use client"

import { Box, Container, Text } from "@chakra-ui/react"

export default function HomePage() {
  return (
    <Container maxW="1200px" py={20}>
      <Box textAlign="center">
        <Text fontSize="4xl" fontWeight="bold" mb={4}>
          Welcome to LUMI
        </Text>
        <Text fontSize="lg" color="gray.600">
          Learn, Upgrade, Master your IELTS Test
        </Text>
      </Box>
    </Container>
  )
}
