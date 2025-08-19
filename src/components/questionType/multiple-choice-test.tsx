"use client"
import { Box, Flex, HStack, VStack, Text } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import { MdCheck } from "react-icons/md"

interface MultipleChoiceOption {
  letter: string
  text: string
}

interface MultipleChoiceQuestionProps {
  title: string
  instruction: string
  questionRange: string
  questionText: string
  options: MultipleChoiceOption[]
  selectedAnswers: string[]
  setSelectedAnswers: (answers: string[]) => void
  fontSize: "small" | "medium" | "large"
  activeTab?: "note" | "lookup"
}

export default function MultipleChoiceQuestionComponent({
  title,
  instruction,
  questionRange,
  questionText,
  options,
  selectedAnswers,
  setSelectedAnswers,
  fontSize,
  activeTab,
}: MultipleChoiceQuestionProps) {
  const questionBackgroundColor = useColorModeValue("white", "gray.700")
  const textColor = useColorModeValue("gray.800", "white")

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

  const handleToggle = (letter: string) => {
    if (selectedAnswers.includes(letter)) {
      setSelectedAnswers(selectedAnswers.filter((a) => a !== letter))
    } else if (selectedAnswers.length < 2) {
      setSelectedAnswers([...selectedAnswers, letter])
    }
  }

  const getCheckboxBg = (isSelected: boolean) => {
    return isSelected ? "black" : "transparent"
  }

  const getCheckboxBorder = () => {
    return "2px solid"
  }

  const getCheckboxBorderColor = (isSelected: boolean) => {
    return isSelected ? "transparent" : "gray.300"
  }

  const getCheckboxIcon = (isSelected: boolean) => {
    return isSelected ? <Icon as={MdCheck} color="white" /> : null
  }

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

      {/* Options */}
      <VStack align="start" gap={3}>
        {options.map((option) => {
          const isSelected = selectedAnswers.includes(option.letter)

          return (
            <HStack key={option.letter} gap={4} w="full" cursor="pointer" onClick={() => handleToggle(option.letter)}>
              <Text fontSize="xl" fontWeight="bold" color="yellow.400" minW="20px">
                {option.letter}
              </Text>
              <Box
                w="24px"
                h="24px"
                bg={getCheckboxBg(isSelected)}
                border={getCheckboxBorder()}
                borderColor={getCheckboxBorderColor(isSelected)}
                borderRadius="md"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {getCheckboxIcon(isSelected)}
              </Box>
              <Text fontSize={getFontSizeValue()} color={textColor} flex={1}>
                {option.text}
              </Text>
            </HStack>
          )
        })}
      </VStack>
    </VStack>
  )
}