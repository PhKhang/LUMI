"use client"
import { Box, Text } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"

interface GapFillBlankProps {
  questionNumber: number
  userAnswer: string | null
  correctAnswer: string
  isCorrect: boolean
  fontSize: "small" | "medium" | "large"
}

export default function GapFillBlank({
  questionNumber,
  userAnswer,
  correctAnswer,
  isCorrect,
  fontSize,
}: GapFillBlankProps) {
  const textColor = useColorModeValue("gray.800", "white")

  const getBlankColor = () => {
    if (!userAnswer) return "gray.400"
    return isCorrect ? "green.600" : "#DC2626"
  }

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

  const getAnswerFontSize = () => {
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

      {/* Answer Text */}
      <Text
        as="span"
        borderBottom="2px solid"
        borderColor={getBlankColor()}
        color={getBlankColor()}
        fontWeight="bold"
        fontSize={getAnswerFontSize()}
        px={2}
        py={1}
        minW="60px"
        display="inline-block"
        textAlign="center"
      >
        {userAnswer || "______"}
      </Text>
    </Box>
  )
}
