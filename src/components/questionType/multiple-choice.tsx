"use client"
import { Box, Flex, HStack, VStack, Text, Button } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import { TbNotes } from "react-icons/tb"
import { PiMapPin } from "react-icons/pi"
import { MdCheck, MdClose } from "react-icons/md"

interface MultipleChoiceOption {
  letter: string
  text: string
}

interface MultipleChoiceQuestion {
  id: number
  correctAnswers: string[]
  userAnswers: string[]
  explanation?: string
}

interface MultipleChoiceQuestionProps {
  title: string
  instruction: string
  questionRange: string
  questionText: string
  options: MultipleChoiceOption[]
  questions: MultipleChoiceQuestion[]
  fontSize: "small" | "medium" | "large"
  onLocate: (questionId: number) => void
  onExplain: (questionId: number) => void
  expandedExplanations: Set<number>
}

export default function MultipleChoiceQuestionComponent({
  title,
  instruction,
  questionRange,
  questionText,
  options,
  questions,
  fontSize,
  onLocate,
  onExplain,
  expandedExplanations,
}: MultipleChoiceQuestionProps) {
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

  const getOptionStatus = (optionLetter: string, question: MultipleChoiceQuestion) => {
    const isCorrect = question.correctAnswers.includes(optionLetter)
    const isSelected = question.userAnswers.includes(optionLetter)

    if (isSelected && isCorrect) return "correct-selected"
    if (isSelected && !isCorrect) return "incorrect-selected" 
    return "not-selected"
  }

  const getCheckboxIcon = (status: string) => {
    switch (status) {
      case "correct-selected":
        return <Icon as={MdCheck} color="white" />
      case "incorrect-selected":
        return <Icon as={MdClose} color="white" />
      default:
        return null
    }
  }

  const getCheckboxBg = (status: string) => {
    switch (status) {
      case "correct-selected":
        return "green.600"
      case "incorrect-selected":
        return "#DC2626"
      default:
        return "transparent"
    }
  }

  const getCheckboxBorder = (status: string) => {
    switch (status) {
      case "correct-selected":
      case "incorrect-selected":
      default:
        return "2px solid"
    }
  }

  const getCheckboxBorderColor = (status: string) => {
    return status === "not-selected" ? "gray.300" : "transparent"
  }

  const firstQuestion = questions[0]

  return (
    <VStack align="start" gap={4} w="full">
      {/* Header Section */}
      <Box mb={4}>
        <Text fontSize={getQuestionHeaderFontSize()} fontWeight="bold" color={textColor}>
          {title}
        </Text>
        <Text fontSize={getFontSizeValue()} color={textColor} mb={2}>
          {instruction} {questionText}
        </Text>
      </Box>

      {/* Question Box */}
      <Box w="full" p={4} bg={questionBackgroundColor} borderRadius="lg" shadow="md">
        {/* <HStack mb={4} align="center">
          <Box bg="yellow.400" color="white" px={4} py={2} borderRadius="lg" fontWeight="bold" fontSize="xl">
            {questionRange}
          </Box>
          <Text fontSize={getFontSizeValue()} color={textColor}>
            {questionText}
          </Text>
        </HStack> */}

        {/* Options */}
        <VStack align="start" gap={3}>
          {options.map((option) => {
            const status = getOptionStatus(option.letter, firstQuestion)

            return (
              <HStack key={option.letter} gap={4} w="full">
                <Text fontSize="xl" fontWeight="bold" color="yellow.400" minW="20px">
                  {option.letter}
                </Text>
                <Box
                  w="24px"
                  h="24px"
                  bg={getCheckboxBg(status)}
                  border={getCheckboxBorder(status)}
                  borderColor={getCheckboxBorderColor(status)}
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {getCheckboxIcon(status)}
                </Box>
                <Text fontSize={getFontSizeValue()} color={textColor} flex={1}>
                  {option.text}
                </Text>
              </HStack>
            )
          })}
        </VStack>
      </Box>

      {/* Answer Sections */}
      {questions.map((question) => (
        <Flex key={question.id} justify="space-between" align="center" w="full">
          <Box bg="gray.200" px={4} py={2} borderRadius="md">
            <Text fontSize={getAnswerTextFontSize()} color="gray.700">
              {question.id}. Answer:{" "}
              <Text as="span" fontWeight="bold">
                {question.correctAnswers.join(", ")}
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

      {/* Explanation */}
      {firstQuestion.explanation && expandedExplanations.has(firstQuestion.id) && (
        <Box mt={4} p={4} bg={explanationBgColor} borderRadius="md" w="full">
          <Text fontSize="sm" fontWeight="bold" mb={2} color={mutedColor}>
            Bước 1: Hiểu câu hỏi:
          </Text>
          <Text fontSize="sm" color={mutedColor} mb={2}>
            {firstQuestion.explanation.split("Bước 2:")[0].replace("Bước 1: Hiểu câu hỏi:", "").trim()}
          </Text>

          {firstQuestion.explanation.includes("Bước 2:") && (
            <>
              <Text fontSize="sm" fontWeight="bold" mt={2} mb={2} color={mutedColor}>
                Bước 2: Tìm các keywords được paraphrase trong câu hỏi:
              </Text>
              <VStack align="start" gap={1}>
                {firstQuestion.explanation
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
      )}
    </VStack>
  )
}
