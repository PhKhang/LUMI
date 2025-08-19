"use client"
import { Box, Flex, HStack, VStack, Text } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import type { ReactNode } from "react"

interface GapFillQuestionProps {
  title: string
  instruction: string
  questionRange: string
  additionalInstruction: string
  summaryTitle: string
  summaryContent: ReactNode
  fontSize: "small" | "medium" | "large"
  activeTab: "note" | "lookup"
}

export default function GapFillQuestionComponent({
  title,
  instruction,
  questionRange,
  additionalInstruction,
  summaryTitle,
  summaryContent,
  fontSize,
  activeTab,
}: GapFillQuestionProps) {
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
    <VStack align="start" gap={0} w="full">
      {/* Header Section */}
      <Box mb={5}>
        <Text fontSize={getQuestionHeaderFontSize()} fontWeight="bold" color={textColor}>
          {title}
        </Text>
        <Text fontSize={getFontSizeValue()} color={textColor} mb={4}>
          {instruction}
        </Text>
        
        {/* Question Number and Additional Instruction */}
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
            {additionalInstruction}
          </Text>
        </HStack>
      </Box>

      {/* Summary Title */}
      <Text fontSize={getSummaryTitleFontSize()} fontWeight="bold" color={textColor} mb={2} textAlign="center" w="full">
        {summaryTitle}
      </Text>

      {/* Summary Content */}
      <Box w="full" fontSize={getFontSizeValue()} color={textColor} lineHeight="2" mb={2}>
        {summaryContent}
      </Box>
    </VStack>
  )
}