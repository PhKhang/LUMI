"use client"

import { HStack, Button, Text, Image } from "@chakra-ui/react"

export default function EditorToolbar() {
  return (
    <HStack gap={2} mb={2} p={2} bg="background.secondary" borderRadius="md" borderWidth="1px" borderColor="border.primary">
      <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>
        <Image src="/editor-toolbar/bold.svg" alt="Bold" boxSize={4} />
      </Button>
      <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>
        <Image src="/editor-toolbar/italic.svg" alt="Italic" boxSize={4} />
      </Button>
      <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>
        <Image src="/editor-toolbar/underline.svg" alt="Underline" boxSize={4} />
      </Button>
      <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>
        <Image src="/editor-toolbar/strike.svg" alt="Strike" boxSize={4} />
      </Button>
      <Text color="border.secondary">|</Text>
      <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>
        <Image src="/editor-toolbar/bullet.svg" alt="Bullet List" boxSize={4} />
      </Button>
      <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>
        <Image src="/editor-toolbar/number-bullet.svg" alt="Numbered List" boxSize={4} />
      </Button>
      <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>
        <Image src="/editor-toolbar/highlight.svg" alt="Highlight" boxSize={4} />
      </Button>
      <Text color="border.secondary">|</Text>
      <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>
        <Image src="/editor-toolbar/text-size.svg" alt="Text Size" boxSize={4} />
      </Button>
      <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>
        <Image src="/editor-toolbar/table.svg" alt="Table" boxSize={4} />
      </Button>
      <Text color="border.secondary">|</Text>
      <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>
        <Image src="/editor-toolbar/arrow-curve-left.svg" alt="Undo" boxSize={4} />
      </Button>
      <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>
        <Image src="/editor-toolbar/arrow-curve-right.svg" alt="Redo" boxSize={4} />
      </Button>
    </HStack>
  )
}