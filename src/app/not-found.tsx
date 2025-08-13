import { Box, VStack, Text, Button, Icon, Image } from "@chakra-ui/react"

export default function NotFound() {
  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50" _dark={{ bg: "gray.900" }}>
      <VStack gap={6} p={8} borderRadius="lg" boxShadow="lg" bg="white" _dark={{ bg: "gray.800" }}>
        <Image src="/favicon.png" alt="LUMI favicon" boxSize="64px" mb={2} />
        <Text fontSize="2xl" fontWeight="bold" color="gray.800" _dark={{ color: "white" }}>
          This page does not exist or has not been updated yet
        </Text>
        <Text color="gray.500" _dark={{ color: "gray.300" }}>
          Please check the URL or go back to the previous page.
        </Text>
        <Button colorPalette="yellow" variant="solid">
          Go back to previous page
        </Button>
      </VStack>
    </Box>
  )
}
