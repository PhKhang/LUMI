"use client"
import { Box, Flex, HStack, VStack, Text, Button } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import { FiChevronDown } from "react-icons/fi"
import { TbNotes } from "react-icons/tb"
import { PiMapPin } from "react-icons/pi"

interface PassageMatchingQuestion {
  id: number
  text: string
  options: string[]
  correctAnswer: string
  userAnswer: string | null
  explanation?: string
}

interface PassageMatchingQuestionProps {
  title: string
  instruction: string
  note?: string
  questions: PassageMatchingQuestion[]
  fontSize: "small" | "medium" | "large"
  onLocate: (questionId: number) => void
  onExplain: (questionId: number) => void
  expandedExplanations: Set<number>
}

export default function PassageMatchingQuestionComponent({
  title,
  instruction,
  note,
  questions,
  fontSize,
  onLocate,
  onExplain,
  expandedExplanations,
}: PassageMatchingQuestionProps) {
  const questionBackgroundColor = useColorModeValue("white", "gray.700")
  const textColor = useColorModeValue("gray.800", "white")
  const mutedColor = useColorModeValue("gray.600", "gray.400")
  const explanationBgColor = useColorModeValue("gray.50", "gray.700")
  const borderColor = useColorModeValue("gray.200", "gray.600")

  const getQuestionStatus = (question: PassageMatchingQuestion) => {
    if (question.userAnswer === null) return "unanswered"
    return question.userAnswer === question.correctAnswer ? "correct" : "incorrect"
  }

  const getUserAnswerBgColor = (question: PassageMatchingQuestion) => {
    const status = getQuestionStatus(question)
    switch (status) {
      case "correct":
        return "green.600"
      case "incorrect":
        return "#DC2626"
      default:
        return "gray.400"
    }
  }

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

  const getQuestionBoxSize = () => {
    switch (fontSize) {
      case "small":
        return { minW: "40px", h: "40px" }
      case "large":
        return { minW: "60px", h: "60px" }
      default:
        return { minW: "50px", h: "50px" }
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

  const getQuestionNumberFontSize = () => {
    switch (fontSize) {
      case "small":
        return "xl"
      case "large":
        return "3xl"
      default:
        return "2xl"
    }
  }

  return (
    <VStack align="start" gap={0} w="full">
      {/* Header Section */}
      <Box mb={4}>
        <Text fontSize={getQuestionHeaderFontSize()} fontWeight="bold" color={textColor}>
          {title}
        </Text>
        <Text fontSize={getFontSizeValue()} color={textColor} mb={0}>
          {instruction}
        </Text>
        {note && (
          <Text fontSize={getFontSizeValue()} fontStyle="italic" color={textColor}>
            <Text as="span" fontWeight="bold">
              NB
            </Text>{" "}
            {note}
          </Text>
        )}
      </Box>

      {/* Questions */}
      {questions.map((question) => (
        <Box key={question.id} w="full" mb={6}>
          {/* Question Header */}
          <HStack align="center" gap={4} mb={4}>
            {/* Question Number */}
            <Box
              bg={questionBackgroundColor}
              borderRadius="lg"
              p={3}
              {...getQuestionBoxSize()}
              display="flex"
              alignItems="center"
              justifyContent="center"
              shadow="md"
            >
              <Text fontSize={getQuestionNumberFontSize()} fontWeight="bold" color="yellow.400">
                {question.id}
              </Text>
            </Box>

            {/* User Answer Badge */}
            <Box
              bg={getUserAnswerBgColor(question)}
              color="white"
              px={4}
              py={2}
              borderRadius="full"
              height="35px"
              width="125px"
              textAlign="center"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              border="1px solid"
              borderColor="gray.500"
            >
              <Text fontWeight="bold" fontSize={getAnswerTextFontSize()}>
                {question.userAnswer || "—"}
              </Text>
              <Icon as={FiChevronDown} height="24px" color="white" />
            </Box>

            {/* Question Text */}
            <Text fontSize={getFontSizeValue()} color={textColor} flex={1}>
              {question.text}
            </Text>
          </HStack>

          {/* Answer Section */}
          <Flex justify="space-between" align="center">
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

          {/* Explanation for this specific question */}
          {question.explanation && expandedExplanations.has(question.id) && (
            <Box mt={2} mb={4} p={4} bg={explanationBgColor} borderRadius="md" w="full">
              <Text fontSize="sm" color={mutedColor} lineHeight="1.6">
                {question.explanation}
              </Text>
            </Box>
          )}
        </Box>
      ))}
    </VStack>
  )
}
