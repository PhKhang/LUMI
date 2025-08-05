"use client"
import { Box, Flex, HStack, VStack, Text, Button } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import { TbNotes } from "react-icons/tb"
import { PiMapPin } from "react-icons/pi"
import type { ReactNode } from "react"

interface GapFillBlank {
  id: number
  correctAnswer: string
  userAnswer: string | null
  isCorrect: boolean
}

interface GapFillQuestion {
  id: number
  correctAnswer: string
  userAnswer: string | null
  explanation?: string
}

interface GapFillQuestionProps {
  title: string
  instruction: string
  questionRange: string
  additionalInstruction: string
  summaryTitle: string
  summaryContent: ReactNode
  questions: GapFillQuestion[]
  fontSize: "small" | "medium" | "large"
  onLocate: (questionId: number) => void
  onExplain: (questionId: number) => void
  expandedExplanations: Set<number>
}

export default function GapFillQuestionComponent({
  title,
  instruction,
  questionRange,
  additionalInstruction,
  summaryTitle,
  summaryContent,
  questions,
  fontSize,
  onLocate,
  onExplain,
  expandedExplanations,
}: GapFillQuestionProps) {
  const questionBackgroundColor = useColorModeValue("white", "gray.700")
  const textColor = useColorModeValue("gray.800", "white")
  const mutedColor = useColorModeValue("gray.600", "gray.400")
  const explanationBgColor = useColorModeValue("gray.50", "gray.700")
  const borderColor = useColorModeValue("gray.200", "gray.600")

  const getFontSizeValue = () => {
    switch (fontSize) {
      case "small":
        return "sm"
      case "large":
        return "lg"
      default:
        return "md"
    }
  }

  const getQuestionHeaderFontSize = () => {
    switch (fontSize) {
      case "small":
        return "lg"
      case "large":
        return "2xl"
      default:
        return "xl"
    }
  }

  const getAnswerTextFontSize = () => {
    switch (fontSize) {
      case "small":
        return "xs"
      case "large":
        return "md"
      default:
        return "sm"
    }
  }

  const getSummaryTitleFontSize = () => {
    switch (fontSize) {
      case "small":
        return "md"
      case "large":
        return "xl"
      default:
        return "lg"
    }
  }

  return (
    <VStack align="start" gap={4} w="full">
      {/* Header Section */}
      <Box mb={4}>
        <Text fontSize={getQuestionHeaderFontSize()} fontWeight="bold" color={textColor}>
          {title}
        </Text>
        <Text fontSize={getFontSizeValue()} color={textColor} mb={2}>
          {instruction} {additionalInstruction}
        </Text>
      </Box>

      {/* Question Box */}
      <Box w="full" p={4} bg={questionBackgroundColor} borderRadius="lg" shadow="md">
        {/* <HStack mb={4} align="center">
          <Box bg="yellow.400" color="white" px={4} py={2} borderRadius="lg" fontWeight="bold" fontSize="xl">
            {questionRange}
          </Box>
          <Text fontSize={getFontSizeValue()} color={textColor}>
            {additionalInstruction}
          </Text>
        </HStack> */}

        {/* Summary Title */}
        <Text fontSize={getSummaryTitleFontSize()} fontWeight="bold" color={textColor} mb={4} textAlign="center">
          {summaryTitle}
        </Text>

        {/* Summary Content */}
        <Box fontSize={getFontSizeValue()} color={textColor} lineHeight="1.8">
          {summaryContent}
        </Box>
      </Box>

      {/* Answer Sections */}
      {questions.map((question) => (
        <Flex key={question.id} justify="space-between" align="center" w="full">
          <Box bg="gray.200" px={4} py={2} borderRadius="md">
            <Text fontSize={getAnswerTextFontSize()} color="gray.700">
              {question.id}. Answer:{" "}
              <Text as="span" fontWeight="bold">
                {question.correctAnswer}
              </Text>
            </Text>
          </Box>

          <HStack gap={2}>
            <Button
              size="sm"
              colorPalette="green"
              variant="outline"
              onClick={() => onLocate(question.id)}
              borderRadius="full"
            >
              <Icon as={PiMapPin} />
              <Text fontSize={getAnswerTextFontSize()}>Locate</Text>
            </Button>
            <Button
              size="sm"
              variant="solid"
              colorPalette="green"
              onClick={() => onExplain(question.id)}
              borderRadius="full"
            >
              <Icon as={TbNotes} /> Explain
            </Button>
          </HStack>
        </Flex>
      ))}

      {/* Explanations */}
      {questions.map(
        (question) =>
          question.explanation &&
          expandedExplanations.has(question.id) && (
            <Box key={`explanation-${question.id}`} mt={4} p={4} bg={explanationBgColor} borderRadius="md" w="full">
              <Text fontSize="sm" fontWeight="bold" mb={2} color={mutedColor}>
                Bước 1: Hiểu câu hỏi:
              </Text>
              <Text fontSize="sm" color={mutedColor} mb={2}>
                {question.explanation.split("Bước 2:")[0].replace("Bước 1: Hiểu câu hỏi:", "").trim()}
              </Text>

              {question.explanation.includes("Bước 2:") && (
                <>
                  <Text fontSize="sm" fontWeight="bold" mt={2} mb={2} color={mutedColor}>
                    Bước 2: Tìm các keywords được paraphrase trong câu hỏi:
                  </Text>
                  <VStack align="start" gap={1}>
                    {question.explanation
                      .split("Bước 2:")[1]
                      ?.split("→")
                      .map((part, index, array) => {
                        if (index === array.length - 1) return null
                        const [before, after] = part.split("→")
                        return (
                          <Text key={index} fontSize="sm" color={mutedColor}>
                            • {before?.trim()} → {after?.trim()}
                          </Text>
                        )
                      })}
                  </VStack>
                </>
              )}
            </Box>
          ),
      )}
    </VStack>
  )
}
