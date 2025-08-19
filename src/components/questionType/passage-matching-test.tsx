"use client"
import { Box, Flex, HStack, VStack, Text, Icon } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import { FiChevronDown } from "react-icons/fi"
import {   
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/menu";

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
  answers: (string | null)[]
  setAnswers: (answers: (string | null)[]) => void
  fontSize: "small" | "medium" | "large"
  activeTab: "note" | "lookup"
}

export default function PassageMatchingQuestionComponent({
  title,
  instruction,
  note,
  questions,
  answers,
  setAnswers,
  fontSize,
  activeTab,
}: PassageMatchingQuestionProps) {
  const questionBackgroundColor = useColorModeValue("white", "gray.700")
  const textColor = useColorModeValue("gray.800", "white")
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

  const handleSelect = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
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
      {questions.map((question, index) => (
        <Box key={question.id} id={`question-${question.id}`} w="full" mb={6}>
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

            {/* Dropdown */}
            <Menu>
              <MenuButton
                as={Box}
                bg="white"
                color="black"
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
                <HStack>
                  <Text fontWeight="bold" fontSize={getFontSizeValue()}>
                    {answers[index] || "—"}
                  </Text>
                  <Icon as={FiChevronDown} height="24px" color="black" />
                </HStack>
              </MenuButton>
              <MenuList>
                {question.options.map((opt) => (
                  <MenuItem key={opt} onClick={() => handleSelect(index, opt)}>
                    {opt}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            {/* Question Text */}
            <Text fontSize={getFontSizeValue()} color={textColor} flex={1}>
              {question.text}
            </Text>
          </HStack>
        </Box>
      ))}
    </VStack>
  )
}