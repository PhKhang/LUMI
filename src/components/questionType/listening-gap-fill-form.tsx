"use client"
import { Box, Flex, HStack, VStack, Text, Button } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import { TbNotes } from "react-icons/tb"
import { PiMapPin } from "react-icons/pi"
import { MdOutlinePlayArrow } from "react-icons/md" // Import the play icon
import GapFillBlank from "./gap-fill-blank"

interface ListeningQuestion {
  id: number
  label: string
  userAnswer: string | null
  correctAnswer: string
  explanation?: string
}

interface ListeningGapFillFormProps {
  title: string
  instruction: string
  questions: ListeningQuestion[]
  fontSize: "small" | "medium" | "large"
  onLocate: (questionId: number) => void
  onExplain: (questionId: number) => void
  expandedExplanations: Set<number>
  onPlayRange: (startTime: number) => void // New prop for playing audio range
  playRangeStartTime: number // New prop for the start time of this question range
}

export default function ListeningGapFillFormComponent({
  title,
  instruction,
  questions,
  fontSize,
  onLocate,
  onExplain,
  expandedExplanations,
  onPlayRange,
  playRangeStartTime,
}: ListeningGapFillFormProps) {
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

  const getBlankStatus = (question: ListeningQuestion) => {
    return question.userAnswer === question.correctAnswer
  }

  const handlePlayButtonClick = () => {
    onPlayRange(playRangeStartTime)
  }

  // Extract question numbers from the title string, e.g., "Questions 1 - 6:" -> "1 - 6"
  const questionRangeText = title.match(/Questions (\d+\s*-\s*\d+):/)?.[1] || ""

  return (
    <VStack align="start" gap={4} w="full">
      {/* Header Section */}
      <Box mb={4}>
        <Text fontSize={getQuestionHeaderFontSize()} fontWeight="bold" color={textColor}>
          {title}
        </Text>
        <HStack mt={2} gap={3}>
          <Button
            variant="outline"
            size="md"
            borderRadius="lg"
            px={4}
            py={2}
            onClick={handlePlayButtonClick}
            _hover={{ bg: useColorModeValue("gray.100", "gray.600") }}
          >
            <Icon as={MdOutlinePlayArrow} boxSize={5} color="yellow.400" mr={2} />
            <Text fontSize={getFontSizeValue()} fontWeight="bold" color="yellow.400">
              {questionRangeText}
            </Text>
          </Button>
          <Text fontSize={getFontSizeValue()} color={textColor}>
            {instruction}
          </Text>
        </HStack>
      </Box>

      {/* Question Form Box */}
      <Box w="full" p={4} bg={questionBackgroundColor} borderRadius="lg" shadow="md">
        <VStack align="start" gap={3}>
          <Text fontSize={getFontSizeValue()} fontWeight="bold" color={textColor} mb={2} textAlign={"center"}  w="full">
            Guitar Group
          </Text>
          <HStack align="center" w="full">
            <Text fontSize={getFontSizeValue()} color={textColor} minW="100px">
              Coordinator:
            </Text>
            <Text fontSize={getFontSizeValue()} color={textColor} mr={2}>
              Gary
            </Text>
            <GapFillBlank
              questionNumber={questions[0].id}
              userAnswer={questions[0].userAnswer}
              correctAnswer={questions[0].correctAnswer}
              isCorrect={getBlankStatus(questions[0])}
              fontSize={fontSize}
            />
          </HStack>
          <HStack align="center" w="full">
            <Text fontSize={getFontSizeValue()} color={textColor} minW="100px">
              Level:
            </Text>
            <GapFillBlank
              questionNumber={questions[1].id}
              userAnswer={questions[1].userAnswer}
              correctAnswer={questions[1].correctAnswer}
              isCorrect={getBlankStatus(questions[1])}
              fontSize={fontSize}
            />
          </HStack>
          <HStack align="center" w="full">
            <Text fontSize={getFontSizeValue()} color={textColor} minW="100px">
              Place:
            </Text>
            <Text fontSize={getFontSizeValue()} color={textColor} mr={2}>
              the
            </Text>
            <GapFillBlank
              questionNumber={questions[2].id}
              userAnswer={questions[2].userAnswer}
              correctAnswer={questions[2].correctAnswer}
              isCorrect={getBlankStatus(questions[2])}
              fontSize={fontSize}
            />
          </HStack>
          <HStack align="center" w="full">
            <Text fontSize={getFontSizeValue()} color={textColor} minW="100px"></Text>
            <GapFillBlank
              questionNumber={questions[3].id}
              userAnswer={questions[3].userAnswer}
              correctAnswer={questions[3].correctAnswer}
              isCorrect={getBlankStatus(questions[3])}
              fontSize={fontSize}
            />
            <Text fontSize={getFontSizeValue()} color={textColor}>
              Street
            </Text>
          </HStack>
          <Text fontSize={getFontSizeValue()} color={textColor} ml="100px">
            First floor, Room T347
          </Text>
          <HStack align="center" w="full">
            <Text fontSize={getFontSizeValue()} color={textColor} minW="100px">
              Time:
            </Text>
            <Text fontSize={getFontSizeValue()} color={textColor} mr={2}>
              Thursday morning at
            </Text>
            <GapFillBlank
              questionNumber={questions[4].id}
              userAnswer={questions[4].userAnswer}
              correctAnswer={questions[4].correctAnswer}
              isCorrect={getBlankStatus(questions[4])}
              fontSize={fontSize}
            />
          </HStack>
          <HStack align="center" w="full">
            <Text fontSize={getFontSizeValue()} color={textColor} minW="100px">
              Recommended website:
            </Text>
            <Text fontSize={getFontSizeValue()} color={textColor} mr={2}>
              'The perfect
            </Text>
            <GapFillBlank
              questionNumber={questions[5].id}
              userAnswer={questions[5].userAnswer}
              correctAnswer={questions[5].correctAnswer}
              isCorrect={getBlankStatus(questions[5])}
              fontSize={fontSize}
            />
            <Text fontSize={getFontSizeValue()} color={textColor}>
              '
            </Text>
          </HStack>
        </VStack>
      </Box>

      {/* Answer Sections */}
      {questions.map((question) => (
        <Box key={question.id} w="full">
          <Flex justify="space-between" align="center" w="full" mb={2}>
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
