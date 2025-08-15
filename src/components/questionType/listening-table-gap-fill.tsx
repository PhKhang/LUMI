"use client"
import { Box, Flex, HStack, VStack, Text, Button, Table } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import { TbNotes } from "react-icons/tb"
import { PiMapPin } from "react-icons/pi"
import GapFillBlank from "./gap-fill-blank"
import { IoPlayCircleOutline } from "react-icons/io5";

interface ListeningQuestion {
  id: number
  label: string
  userAnswer: string | null
  correctAnswer: string
  explanation?: string
}

interface ListeningTableGapFillProps {
  title: string
  instruction: string
  questions: ListeningQuestion[]
  fontSize: "small" | "medium" | "large"
  onLocate: (questionId: number) => void
  onExplain: (questionId: number) => void
  expandedExplanations: Set<number>
  onPlayRange: (startTime: number) => void
  playRangeStartTime: number
  activeTab?: "note" | "lookup"
}

export default function ListeningTableGapFillComponent({
  title,
  instruction,
  questions,
  fontSize,
  onLocate,
  onExplain,
  expandedExplanations,
  onPlayRange,
  playRangeStartTime,
  activeTab,
}: ListeningTableGapFillProps) {
  const questionBackgroundColor = useColorModeValue("white", "gray.700")
  const textColor = useColorModeValue("gray.800", "white")
  const mutedColor = useColorModeValue("gray.600", "gray.400")
  const explanationBgColor = useColorModeValue("gray.200", "gray.700")
  const borderColor = useColorModeValue("black", "gray.600")

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

  const getBlankStatus = (question: ListeningQuestion) => {
    return question.userAnswer === question.correctAnswer
  }

  const handlePlayButtonClick = () => {
    onPlayRange(playRangeStartTime)
  }

  // Extract question numbers from the title string, e.g., "Questions 7 - 10:" -> "7 - 10"
  const questionRangeText = title.match(/Questions (\d+\s*-\s*\d+):/)?.[1] || ""

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
        
        {/* Question Number with Integrated Play Button */}
        <HStack align="center" gap={4}>
          <Box
            bg={questionBackgroundColor}
            borderRadius="lg"
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="center"
            shadow="md"
            cursor="pointer"
            onClick={handlePlayButtonClick}
            _hover={{ bg: useColorModeValue("gray.50", "gray.600") }}
            position="relative"
            minW={fontSize === "small" ? "60px" : fontSize === "large" ? "100px" : "80px"}
            h={fontSize === "small" ? "40px" : fontSize === "large" ? "60px" : "50px"}
          >
            <Icon 
              as={IoPlayCircleOutline} 
              boxSize={fontSize === "small" ? 6 : fontSize === "large" ? 8 : 7} 
              color="black" 
              mr={2}
            />
            <Text fontSize={getQuestionNumberFontSize()} fontWeight="bold" color="yellow.400">
              {questionRangeText}
            </Text>
          </Box>
          
          <Text fontSize={getFontSizeValue()} color={textColor} flex={1}>
            Complete the table below. Write ONE WORD ONLY for each answer.
          </Text>
        </HStack>
      </Box>

      {/* Summary Title */}
      <Text fontSize={getSummaryTitleFontSize()} fontWeight="bold" color={textColor} mb={2} textAlign="center" w="full">
        A typical 45-minute guitar lesson
      </Text>

      {/* Table Content - No background wrapper to match other components */}
      <Box w="full" fontSize={getFontSizeValue()} color={textColor} lineHeight="2" mb={5}>
        <Table.Root size="md" variant="outline" showColumnBorder={true} borderColor={borderColor} color={textColor}>
          <Table.Body> 
            {/* Header Row */}
            <Table.Row>
                <Table.Cell textAlign="center" fontSize={getFontSizeValue()} w="30%" fontWeight="bold">
                    Time
                </Table.Cell>
                <Table.Cell textAlign="center" fontSize={getFontSizeValue()} w="33%" fontWeight="bold">
                    Activity
                </Table.Cell>
                <Table.Cell textAlign="center" fontSize={getFontSizeValue()} w="33%" fontWeight="bold">
                    Notes
                </Table.Cell>
            </Table.Row>
            
            {/* Row 1 */}
            <Table.Row>
              <Table.Cell textAlign="center" fontSize={getFontSizeValue()}>
                5 min
              </Table.Cell>
              <Table.Cell textAlign="center" fontSize={getFontSizeValue()}>
                tuning guitars
              </Table.Cell>
              <Table.Cell textAlign="center" fontSize={getFontSizeValue()}>
                <Box display="flex" alignItems="center" justifyContent="center" flexWrap="wrap" gap={1}>
                  <Text as="span">using an app or by </Text>
                  <GapFillBlank
                    questionNumber={questions[0].id}
                    userAnswer={questions[0].userAnswer}
                    correctAnswer={questions[0].correctAnswer}
                    isCorrect={getBlankStatus(questions[0])}
                    fontSize={fontSize}
                  />
                </Box>
              </Table.Cell>
            </Table.Row>

            {/* Row 2 */}
            <Table.Row>
              <Table.Cell textAlign="center" fontSize={getFontSizeValue()}>
                10 min
              </Table.Cell>
              <Table.Cell textAlign="center" fontSize={getFontSizeValue()}>
                strumming chords using our thumbs
              </Table.Cell>
              <Table.Cell textAlign="center" fontSize={getFontSizeValue()}>
                <Box display="flex" alignItems="center" justifyContent="center" flexWrap="wrap" gap={1}>
                  <Text as="span">keeping time while the teacher is </Text>
                  <GapFillBlank
                    questionNumber={questions[1].id}
                    userAnswer={questions[1].userAnswer}
                    correctAnswer={questions[1].correctAnswer}
                    isCorrect={getBlankStatus(questions[1])}
                    fontSize={fontSize}
                  />
                </Box>
              </Table.Cell>
            </Table.Row>

            {/* Row 3 */}
            <Table.Row>
              <Table.Cell textAlign="center" fontSize={getFontSizeValue()}>
                15 min
              </Table.Cell>
              <Table.Cell textAlign="center" fontSize={getFontSizeValue()}>
                playing songs
              </Table.Cell>
              <Table.Cell textAlign="center" fontSize={getFontSizeValue()}>
                <Box display="flex" alignItems="center" justifyContent="center" flexWrap="wrap" gap={1}>
                  <Text as="span">often listening to a </Text>
                  <GapFillBlank
                    questionNumber={questions[2].id}
                    userAnswer={questions[2].userAnswer}
                    correctAnswer={questions[2].correctAnswer}
                    isCorrect={getBlankStatus(questions[2])}
                    fontSize={fontSize}
                  />
                  <Text as="span"> of a song</Text>
                </Box>
              </Table.Cell>
            </Table.Row>

            {/* Row 4 */}
            <Table.Row>
              <Table.Cell textAlign="center" fontSize={getFontSizeValue()}>
                10 min
              </Table.Cell>
              <Table.Cell textAlign="center" fontSize={getFontSizeValue()}>
                playing single notes and simple tunes
              </Table.Cell>
              <Table.Cell textAlign="center" fontSize={getFontSizeValue()}>
                <Box display="flex" alignItems="center" justifyContent="center" flexWrap="wrap" gap={1}>
                  <Text as="span">playing together, then </Text>
                  <GapFillBlank
                    questionNumber={questions[3].id}
                    userAnswer={questions[3].userAnswer}
                    correctAnswer={questions[3].correctAnswer}
                    isCorrect={getBlankStatus(questions[3])}
                    fontSize={fontSize}
                  />
                </Box>
              </Table.Cell>
            </Table.Row>

            {/* Row 5 */}
            <Table.Row>
              <Table.Cell textAlign="center" fontSize={getFontSizeValue()}>
                5 min
              </Table.Cell>
              <Table.Cell textAlign="center" fontSize={getFontSizeValue()}>
                noting things to practise at home
              </Table.Cell>
              <Table.Cell textAlign="center" fontSize={getFontSizeValue()}>
                {/* Empty cell */}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Box>

      {/* Answer Sections */}
      {questions.map((question) => (
        <Box key={question.id} w="full">
          <Flex justify="space-between" align="center" w="full" mb={5}>
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
                style={activeTab === "lookup" ? { display: "none" } : {}}
                disabled={true}
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
