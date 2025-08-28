"use client"
import { Box, Flex, HStack, VStack, Text, Icon, ChakraProvider } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import { FiChevronDown } from "react-icons/fi"
import {   
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/menu";
import { system } from "@/styles/theme"

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
  const questionBackgroundColor = useColorModeValue("white", "#3f3f46")
  const textColor = useColorModeValue("gray.800", "white")
  const borderColor = useColorModeValue("#3f3f46", "#52525b")

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

  const getChooseAnswerTextFontSize = () => {
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
    <VStack align="start" w="full" gap={0}>
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

      <VStack gap={6} w="full">
      {/* Questions */}
        {questions.map((question, index) => (
          <Box key={question.id} id={`question-${question.id}`} w="full">
            {/* Question Header */}
            <HStack align="center" gap={4}>
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
              <ChakraProvider value={system}>
                <Menu>
                  <MenuButton
                    as={Box}
                    bg={questionBackgroundColor}
                    color={textColor}
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
                    borderColor={borderColor}
                    _hover={{
                      bg: useColorModeValue("gray.50", "gray.600"),
                    }}
                  >
                    <HStack justify={"space-between"}>
                      <Text fontWeight="bold" fontSize={getAnswerTextFontSize()}>
                        {answers[index] || "—"}
                      </Text>
                      <Icon as={FiChevronDown} height="24px" color={textColor} />
                    </HStack>
                  </MenuButton>
                  <MenuList 
                    bg={questionBackgroundColor}
                    w="full"
                    py="7px"
                    borderRadius="10px"
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    {question.options.map((opt) => (
                      <MenuItem
                        key={opt}
                        onClick={() => handleSelect(index, opt)}
                        width="125px"
                        px="12px"
                        _hover={{
                          bg: useColorModeValue("#e4e4e7", "#27272A"),
                          color: useColorModeValue("gray.900", "white"),
                        }}
                        cursor="pointer"
                        color={textColor}
                      >
                        <Text fontSize={getChooseAnswerTextFontSize()} color={textColor} py="2px">
                          {opt}
                        </Text>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </ChakraProvider>
              

              {/* Question Text */}
              <Text fontSize={getFontSizeValue()} color={textColor} flex={1}>
                {question.text}
              </Text>
            </HStack>
          </Box>
        ))}
      </VStack>
      
    </VStack>
  )
}