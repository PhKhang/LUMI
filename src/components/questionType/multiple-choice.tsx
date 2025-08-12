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
  activeTab?: "note" | "lookup"
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
  activeTab,
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
    <VStack align="start" gap={0} w="full">
      {/* Header Section */}
      <Box mb={5}>
        <Text fontSize={getQuestionHeaderFontSize()} fontWeight="bold" color={textColor}>
          {title}
        </Text>
        <Text fontSize={getFontSizeValue()} color={textColor} mb={4}>
          {instruction}
        </Text>
        
        {/* Question Number and Text */}
        <HStack align="center" gap={4}>
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
              {questionRange}
            </Text>
          </Box>
          
          <Text fontSize={getFontSizeValue()} color={textColor} flex={1}>
            {questionText}
          </Text>
        </HStack>
      </Box>

      {/* Question Box */}
      <Box w="full" px={4} mb={5}>
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
        <Box key={question.id} w="full">
          <Flex justify="space-between" align="center" w="full" mb={5}>
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
                style={activeTab === "lookup" ? { display: "none" } : {}}
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
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              question.explanation && expandedExplanations.has(question.id)
                ? 'max-h-96 opacity-100'
                : 'max-h-0 opacity-0'
            }`}
          >
            {question.explanation && (
              <Box mb={5} p={4} bg={explanationBgColor} borderRadius="md" w="full">
                <Text fontSize="sm" color={textColor} lineHeight="1.6">
                  {question.explanation}
                </Text>
              </Box>
            )}
          </div>
        </Box>
      ))}
    </VStack>
  )
}
