"use client"

import { HStack, Button, Text } from "@chakra-ui/react"

export default function EditorToolbar() {
  return (
    <HStack gap={2} mb={2} p={2} bg="background.secondary" borderRadius="md" borderWidth="1px" borderColor="border.primary">
      <Button size="sm" variant="ghost" fontWeight="bold" color="black" _hover={{ color: "gray.600" }}>B</Button>
      <Button size="sm" variant="ghost" fontStyle="italic" color="black" _hover={{ color: "gray.600" }}>I</Button>
      <Button size="sm" variant="ghost" textDecoration="underline" color="black" _hover={{ color: "gray.600" }}>U</Button>
      <Button size="sm" variant="ghost" textDecoration="line-through" color="black" _hover={{ color: "gray.600" }}>S</Button>
      <Text color="border.secondary">|</Text>
      <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>≡</Button>
      <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>::</Button>
      <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>⚏</Button>
      <Text color="border.secondary">|</Text>
      <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>🔗</Button>
      <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>T</Button>
      <Text color="border.secondary">|</Text>
      <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>↶</Button>
      <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>↷</Button>
    </HStack>
  )
}