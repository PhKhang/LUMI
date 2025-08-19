"use client"
import { Box, Text, Input } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"

interface GapFillBlankProps {
  questionNumber: number
  value: string
  onChange: (value: string) => void
  fontSize: "small" | "medium" | "large"
}

export default function GapFillBlank({
  questionNumber,
  value,
  onChange,
  fontSize,
}: GapFillBlankProps) {
  const textColor = useColorModeValue("gray.800", "white")

  const getNumberBoxSize = () => {
    switch (fontSize) {
      case "small":
        return { w: "20px", h: "20px", fontSize: "xs" }
      case "large":
        return { w: "28px", h: "28px", fontSize: "sm" }
      default:
        return { w: "24px", h: "24px", fontSize: "xs" }
    }
  }

  const getInputFontSize = () => {
    switch (fontSize) {
      case "small":
        return "sm"
      case "large":
        return "lg"
      default:
        return "md"
    }
  }

  return (
    <Box as="span" display="inline-flex" alignItems="center" mx={1}>
      {/* Question Number - positioned to the left */}
      <Box
        as="span"
        bg="gray.200"
        borderRadius="full"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        fontWeight="bold"
        color="black"
        mr={2}
        {...getNumberBoxSize()}
      >
        {questionNumber}
      </Box>

      {/* Input */}
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        borderBottom="2px solid"
        borderColor="black"
        color="black"
        fontWeight="bold"
        fontSize={getInputFontSize()}
        px={2}
        py={1}
        minW="60px"
        display="inline-block"
        textAlign="center"
      />
    </Box>
  )
}