"use client";
import { Box, VStack, HStack, Text, Button, Image, ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { system } from "@/styles/theme"

export default function NotFound() {
  const router = useRouter();

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50" _dark={{ bg: "gray.900" }}>
      <VStack gap={1} p={8} borderRadius="lg" boxShadow="lg" bg="white" _dark={{ bg: "gray.800" }}>
        <img src="/sad-lumi.png" alt="LUMI favicon" width="100px"/>
        <VStack gap={2}>
          <Text fontSize="2xl" fontWeight="bold" color="gray.800" _dark={{ color: "white" }}>
            This page does not exist or has not been updated yet
          </Text>
          <Text color="gray.700" _dark={{ color: "gray.300" }}>
            Please check the URL or go back to the previous page.
          </Text>
          <HStack mt={2} gap={2}>
            <ChakraProvider value={system}>
              <Button colorPalette="yellow" variant="outline" onClick={() => router.push("/practice/mini-test")}>
                Go to Practice/Mini Test
              </Button>
            </ChakraProvider>
            <ChakraProvider value={system}>
              <Button colorPalette="yellow" variant="solid" onClick={() => router.back()}>
                Go back to previous page
              </Button>
            </ChakraProvider>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
}
