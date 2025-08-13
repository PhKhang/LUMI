"use client"

import { useState, useMemo, useRef } from "react"
import { Box, Flex, HStack, Button, VStack, Text, IconButton, SimpleGrid, Icon } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import SettingsMenu from "@/components/ui/settings-menu"
import TabSelector from "@/components/ui/tab-selector"
import AudioPlayer, { type AudioPlayerRef } from "@/components/audio/audio-player"
// Fixed import paths to use correct components/questions directory
import ListeningGapFillFormComponent from "@/components/questionType/listening-gap-fill-form"
import ListeningTableGapFillComponent from "@/components/questionType/listening-table-gap-fill"
import { MdClose, MdTimer } from "react-icons/md"
import { FaPen, FaBook } from "react-icons/fa"
import ExitTestButton from "@/components/ui/exit-test-button"

interface ListeningQuestion {
  id: number
  label: string
  userAnswer: string | null
  correctAnswer: string
  explanation?: string
}

export default function ListeningTestResult() {
  const [activeTab, setActiveTab] = useState<"note" | "lookup">("note")
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium")
  const [leftPanelWidth, setLeftPanelWidth] = useState(50)
  const [expandedExplanations, setExpandedExplanations] = useState<Set<number>>(new Set())
  const [highlightedText, setHighlightedText] = useState<number | null>(null)
  const [activePart, setActivePart] = useState<"part1" | "part2" | "part3" | "part4">("part1")

  const audioPlayerRef = useRef<AudioPlayerRef>(null)
  
  const bgColor = useColorModeValue("#F6F0E7", "gray.800")
  const contentBackgroundColor = useColorModeValue("#FFFAF6", "gray.900")
  const questionBackgroundColor = useColorModeValue("white", "gray.700")
  const borderColor = useColorModeValue("gray.200", "gray.600")
  const textColor = useColorModeValue("gray.800", "white")
  const greenThemeColor = useColorModeValue("green.600", "green.500")
  const activePartBgColor = useColorModeValue("green.50", "green.900")
  const inactivePartBgColor = useColorModeValue("gray.50", "gray.700")
  const mutedColor = useColorModeValue("gray.500", "gray.400")

  // Updated sample data with correct answers for questions 7-10
  const part1Questions: ListeningQuestion[] = [
    {
      id: 1,
      label: "Mathieson",
      userAnswer: "Mathieson",
      correctAnswer: "Mathieson",
      explanation: "Giải thích cho câu 1",
    },
    {
      id: 2,
      label: "beginners",
      userAnswer: "beginners",
      correctAnswer: "beginners",
      explanation: "Giải thích cho câu 2",
    },
    { id: 3, label: "college", userAnswer: "college", correctAnswer: "college", explanation: "Giải thích cho câu 3" },
    { id: 4, label: "New", userAnswer: "New", correctAnswer: "New", explanation: "Giải thích cho câu 4" },
    { id: 5, label: "11", userAnswer: "11", correctAnswer: "11", explanation: "Giải thích cho câu 5" },
    {
      id: 6,
      label: "instrument",
      userAnswer: "instrument",
      correctAnswer: "instrument",
      explanation: "Giải thích cho câu 6",
    },
    { id: 7, label: "ear", userAnswer: "ear", correctAnswer: "ear", explanation: "Giải thích cho câu 7" },
    {
      id: 8,
      label: "clapping",
      userAnswer: "clapping",
      correctAnswer: "clapping",
      explanation: "Giải thích cho câu 8",
    },
    {
      id: 9,
      label: "recording",
      userAnswer: "recording",
      correctAnswer: "recording",
      explanation: "Giải thích cho câu 9",
    },
    {
      id: 10,
      label: "alone",
      userAnswer: "alone",
      correctAnswer: "alone",
      explanation: "Giải thích cho câu 10",
    },
  ]

  const part2Questions: ListeningQuestion[] = [
    {
      id: 11,
      label: "Question 11",
      userAnswer: null,
      correctAnswer: "Answer 11",
      explanation: "Giải thích cho câu 11",
    },
    {
      id: 12,
      label: "Question 12",
      userAnswer: "User 12",
      correctAnswer: "Answer 12",
      explanation: "Giải thích cho câu 12",
    },
    {
      id: 13,
      label: "Question 13",
      userAnswer: null,
      correctAnswer: "Answer 13",
      explanation: "Giải thích cho câu 13",
    },
    {
      id: 14,
      label: "Question 14",
      userAnswer: "User 14",
      correctAnswer: "Answer 14",
      explanation: "Giải thích cho câu 14",
    },
    {
      id: 15,
      label: "Question 15",
      userAnswer: null,
      correctAnswer: "Answer 15",
      explanation: "Giải thích cho câu 15",
    },
    {
      id: 16,
      label: "Question 16",
      userAnswer: "User 16",
      correctAnswer: "Answer 16",
      explanation: "Giải thích cho câu 16",
    },
    {
      id: 17,
      label: "Question 17",
      userAnswer: null,
      correctAnswer: "Answer 17",
      explanation: "Giải thích cho câu 17",
    },
    {
      id: 18,
      label: "Question 18",
      userAnswer: "User 18",
      correctAnswer: "Answer 18",
      explanation: "Giải thích cho câu 18",
    },
    {
      id: 19,
      label: "Question 19",
      userAnswer: null,
      correctAnswer: "Answer 19",
      explanation: "Giải thích cho câu 19",
    },
    {
      id: 20,
      label: "Question 20",
      userAnswer: "User 20",
      correctAnswer: "Answer 20",
      explanation: "Giải thích cho câu 20",
    },
  ]

  const part3Questions: ListeningQuestion[] = [
    {
      id: 21,
      label: "Question 21",
      userAnswer: null,
      correctAnswer: "Answer 21",
      explanation: "Giải thích cho câu 21",
    },
    {
      id: 22,
      label: "Question 22",
      userAnswer: "User 22",
      correctAnswer: "Answer 22",
      explanation: "Giải thích cho câu 22",
    },
    {
      id: 23,
      label: "Question 23",
      userAnswer: null,
      correctAnswer: "Answer 23",
      explanation: "Giải thích cho câu 23",
    },
    {
      id: 24,
      label: "Question 24",
      userAnswer: "User 24",
      correctAnswer: "Answer 24",
      explanation: "Giải thích cho câu 24",
    },
    {
      id: 25,
      label: "Question 25",
      userAnswer: null,
      correctAnswer: "Answer 25",
      explanation: "Giải thích cho câu 25",
    },
    {
      id: 26,
      label: "Question 26",
      userAnswer: "User 26",
      correctAnswer: "Answer 26",
      explanation: "Giải thích cho câu 26",
    },
    {
      id: 27,
      label: "Question 27",
      userAnswer: null,
      correctAnswer: "Answer 27",
      explanation: "Giải thích cho câu 27",
    },
    {
      id: 28,
      label: "Question 28",
      userAnswer: "User 28",
      correctAnswer: "Answer 28",
      explanation: "Giải thích cho câu 28",
    },
    {
      id: 29,
      label: "Question 29",
      userAnswer: null,
      correctAnswer: "Answer 29",
      explanation: "Giải thích cho câu 29",
    },
    {
      id: 30,
      label: "Question 30",
      userAnswer: "User 30",
      correctAnswer: "Answer 30",
      explanation: "Giải thích cho câu 30",
    },
  ]

  const part4Questions: ListeningQuestion[] = [
    {
      id: 31,
      label: "Question 31",
      userAnswer: null,
      correctAnswer: "Answer 31",
      explanation: "Giải thích cho câu 31",
    },
    {
      id: 32,
      label: "Question 32",
      userAnswer: "User 32",
      correctAnswer: "Answer 32",
      explanation: "Giải thích cho câu 32",
    },
    {
      id: 33,
      label: "Question 33",
      userAnswer: null,
      correctAnswer: "Answer 33",
      explanation: "Giải thích cho câu 33",
    },
    {
      id: 34,
      label: "Question 34",
      userAnswer: "User 34",
      correctAnswer: "Answer 34",
      explanation: "Giải thích cho câu 34",
    },
    {
      id: 35,
      label: "Question 35",
      userAnswer: null,
      correctAnswer: "Answer 35",
      explanation: "Giải thích cho câu 35",
    },
    {
      id: 36,
      label: "Question 36",
      userAnswer: "User 36",
      correctAnswer: "Answer 36",
      explanation: "Giải thích cho câu 36",
    },
    {
      id: 37,
      label: "Question 37",
      userAnswer: null,
      correctAnswer: "Answer 37",
      explanation: "Giải thích cho câu 37",
    },
    {
      id: 38,
      label: "Question 38",
      userAnswer: "User 38",
      correctAnswer: "Answer 38",
      explanation: "Giải thích cho câu 38",
    },
    {
      id: 39,
      label: "Question 39",
      userAnswer: null,
      correctAnswer: "Answer 39",
      explanation: "Giải thích cho câu 39",
    },
    {
      id: 40,
      label: "Question 40",
      userAnswer: "User 40",
      correctAnswer: "Answer 40",
      explanation: "Giải thích cho câu 40",
    },
  ]

  const allQuestions = useMemo(() => {
    return {
      part1: part1Questions,
      part2: part2Questions,
      part3: part3Questions,
      part4: part4Questions,
    }
  }, [part1Questions, part2Questions, part3Questions, part4Questions])

  const currentQuestions = allQuestions[activePart]
  const totalQuestionsInCurrentPart = currentQuestions.length

  const getQuestionButtonColor = (status: number) => {
    switch (status) {
      case 1:
        return "green.600" // correct
      case -1:
        return "#DC2626" // incorrect
      default:
        return "gray.500" // unanswered
    }
  }

  const getQuestionButtonHoverColor = (status: number) => {
    switch (status) {
      case 1:
        return "green.700"
      case -1:
        return "#B91C1C"
      default:
        return "gray.600"
    }
  }

  const questionStatuses = useMemo(() => {
    const statuses: number[] = []
    Object.values(allQuestions)
      .flat()
      .forEach((question) => {
        if (question.userAnswer === null) {
          statuses[question.id - 1] = 0 // unanswered
        } else if (question.userAnswer === question.correctAnswer) {
          statuses[question.id - 1] = 1 // correct
        } else {
          statuses[question.id - 1] = -1 // incorrect
        }
      })
    return statuses
  }, [allQuestions])

  const handleLocate = (questionId: number) => {
    setHighlightedText(questionId)
    // Logic to scroll to relevant text in transcript
  }

  const toggleExplanation = (questionId: number) => {
    const newExpanded = new Set(expandedExplanations)
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId)
    } else {
      newExpanded.add(questionId)
    }
    setExpandedExplanations(newExpanded)
  }

  const handlePlayRange = (startTimeInSeconds: number) => {
    audioPlayerRef.current?.seekTo(startTimeInSeconds);
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

  const listeningTabs = [
    { value: "note", label: "Take notes mode", icon: FaPen },
    { value: "lookup", label: "Dictionary mode", icon: FaBook },
  ]

  const partNavigationData = [
    { id: "part1", label: "Part 1", startQuestion: 1, endQuestion: 10 },
    { id: "part2", label: "Part 2", startQuestion: 11, endQuestion: 20 },
    { id: "part3", label: "Part 3", startQuestion: 21, endQuestion: 30 },
    { id: "part4", label: "Part 4", startQuestion: 31, endQuestion: 40 },
  ]
  
  const currentPartCorrectAnswers = useMemo(() => {
    const partQuestions = allQuestions[activePart]
    return partQuestions.filter(q => q.userAnswer === q.correctAnswer).length
  }, [allQuestions, activePart])

  const currentPartTotalQuestions = allQuestions[activePart].length

  return (
    <Box minH="100vh" bg={bgColor} overflow="hidden">
      {/* Header */}
      <Box bg={bgColor} borderColor={borderColor} px={4}>
        <Box display="grid" gridTemplateColumns="1fr auto 1fr" alignItems="center" w="full" mx="auto">
          {/* Left Section - Close Button + Tabs */}
          <HStack gap={4} height="60px">
            <Box alignItems="center">
              <ExitTestButton />
            </Box>
            <Box marginTop="auto">
              <TabSelector
                activeTab={activeTab}
                onTabChange={(tab) => setActiveTab(tab as "note" | "lookup")}
                tabs={listeningTabs}
              />
            </Box>
          </HStack>

          {/* Center Section - Time + Score */}
          <Box py={3}>
            <HStack gap={2} justify="center" bg={questionBackgroundColor} px={3} py={1} borderRadius="full">
              <HStack>
                <Icon as={MdTimer} color={greenThemeColor} />
                <Text fontSize={getFontSizeValue()} fontWeight="medium" color={textColor}>
                  00:10:39
                </Text>
              </HStack>
              <Box width="1px" height="10px" bg="#E5E5EA" />
              <Text fontSize={getFontSizeValue()} fontWeight="bold" color={greenThemeColor}>
                {currentPartCorrectAnswers}/{currentPartTotalQuestions} correct answers
              </Text>
            </HStack>
          </Box>

          {/* Right Section - Settings */}
          <HStack justify="flex-end">
            <SettingsMenu fontSize={fontSize} onFontSizeChange={setFontSize} />
          </HStack>
        </Box>
      </Box>

      {/* Main Content */}
      <Flex h="calc(100vh - 125px)" mx="auto">
        {/* Left Panel - Transcript Content */}
        <VStack
          width={`${leftPanelWidth}%`}
          borderRight="1px"
          borderColor={borderColor}
          bg={contentBackgroundColor}
          align="start"
        >
          <Box flex={1} overflowY="auto" p={6} w="full">
            <VStack align="start" gap={4} fontSize={getFontSizeValue()} color={textColor}>
              <p>
                <Text as="span" fontWeight="bold">
                  WOMAN:
                </Text>{" "}
                Hi Coleman, how are you?
              </p>
              <p>
                <Text as="span" fontWeight="bold">
                  COLEMAN:
                </Text>{" "}
                Good. Thanks.
              </p>
              <p>
                <Text as="span" fontWeight="bold">
                  WOMAN:
                </Text>{" "}
                I wanted to have a chat with you because our friend Josh told me that you've joined a guitar group and
                it sounds interesting. I'd really like to learn myself.
              </p>
              <p>
                <Text as="span" fontWeight="bold">
                  COLEMAN:
                </Text>{" "}
                Why don't you come along? I'm sure there's room for another person.
              </p>
              <p>
                <Text as="span" fontWeight="bold">
                  WOMAN:
                </Text>{" "}
                Really? So - who runs the classes?
              </p>
              <p>
                <Text as="span" fontWeight="bold">
                  COLEMAN:
                </Text>{" "}
                He's called a 'coordinator' - his name's Gary Mathieson.
              </p>
              <p>
                <Text as="span" fontWeight="bold">
                  WOMAN:
                </Text>{" "}
                Let me note that down. Gary.... How do you spell his surname?
              </p>
              <p>
                <Text as="span" fontWeight="bold">
                  COLEMAN:
                </Text>{" "}
                It's M-A-T-H-I-E-S-O-N.
              </p>
              <p>
                <Text as="span" fontWeight="bold">
                  WOMAN:
                </Text>{" "}
                And could you play anything before you started?
              </p>
              <p>
                <Text as="span" fontWeight="bold">
                  COLEMAN:
                </Text>{" "}
                I knew a few chords, but that's all.
              </p>
              <p>
                <Text as="span" fontWeight="bold">
                  WOMAN:
                </Text>{" "}
                I'm sure everyone will be better than me.
              </p>
              <p>
                <Text as="span" fontWeight="bold">
                  COLEMAN:
                </Text>{" "}
                That's what I thought, too. When I first spoke to Gary on the phone, he said it was a class for
                beginners, but I was still worried that everyone would be better than me, but we were all equally
                hopeless!
              </p>
              <p>
                <Text as="span" fontWeight="bold">
                  WOMAN:
                </Text>{" "}
                Oh, that's reassuring. So where do you meet?
              </p>
              <p>
                <Text as="span" fontWeight="bold">
                  COLEMAN:
                </Text>{" "}
                Well, when I joined the group, they were meeting in Gary's home, but as the group got bigger, he decided
                to book a room at the college in town. I prefer going there.
              </p>
              <p>
                <Text as="span" fontWeight="bold">
                  WOMAN:
                </Text>{" "}
                I know that place. I used to go to tap dancing classes there when I was at secondary school. I haven't
                been since, though, and I can't remember what road it's in ... is it Lock Street?
              </p>
              <p>
                <Text as="span" fontWeight="bold">
                  COLEMAN:
                </Text>{" "}
                It's just beyond there at the bottom of New Street near the city roundabout.
              </p>
              <p>
                <Text as="span" fontWeight="bold">
                  WOMAN:
                </Text>{" "}
                Yes, of course.
              </p>
              <p>
                <Text as="span" fontWeight="bold">
                  WOMAN:
                </Text>{" "}
                Well, thanks Coleman. I'll go and have a look at that website, I think.
              </p>
            </VStack>
          </Box>
          {/* Fixed Audio Player */}
          <Box w="full" p={0} borderTop="1px" borderColor={borderColor} bg={contentBackgroundColor}>
            <AudioPlayer ref={audioPlayerRef} />
          </Box>
        </VStack>

        {/* Resizer */}
        <Box
          width="4px"
          bg={borderColor}
          cursor="col-resize"
          _hover={{ bg: "blue.300" }}
          onMouseDown={(e) => {
            const startX = e.clientX
            const startWidth = leftPanelWidth
            const handleMouseMove = (e: MouseEvent) => {
              const diff = e.clientX - startX
              const newWidth = Math.max(20, Math.min(80, startWidth + (diff / window.innerWidth) * 100))
              setLeftPanelWidth(newWidth)
            }
            const handleMouseUp = () => {
              document.removeEventListener("mousemove", handleMouseMove)
              document.removeEventListener("mouseup", handleMouseUp)
            }
            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
          }}
        />

        {/* Right Panel - Questions */}
        <VStack
          width={`${100 - leftPanelWidth}%`}
          bg={contentBackgroundColor}
          align="start"
          overflowY="auto"
          p={6}
          gap={5}
        >
          {activePart === "part1" && (
            <>
              <ListeningGapFillFormComponent
                title="Questions 1 - 6:"
                instruction="Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer."
                questions={currentQuestions.slice(0, 6)}
                fontSize={fontSize}
                onLocate={handleLocate}
                onExplain={toggleExplanation}
                expandedExplanations={expandedExplanations}
                onPlayRange={() => handlePlayRange(114)}
                playRangeStartTime={10}
              />

              <ListeningTableGapFillComponent
                title="Questions 7 - 10:"
                instruction="Complete the table below. Write ONE WORD ONLY for each answer."
                questions={currentQuestions.slice(6, 10)}
                fontSize={fontSize}
                onLocate={handleLocate}
                onExplain={toggleExplanation}
                expandedExplanations={expandedExplanations}
                onPlayRange={() =>handlePlayRange(314)}
                playRangeStartTime={314}
              />
            </>
          )}
          {activePart === "part2" && (
            <Text fontSize="xl" fontWeight="bold" color={textColor}>
              Questions for Part 2 (11-20)
            </Text>
          )}
          {activePart === "part3" && (
            <Text fontSize="xl" fontWeight="bold" color={textColor}>
              Questions for Part 3 (21-30)
            </Text>
          )}
          {activePart === "part4" && (
            <Text fontSize="xl" fontWeight="bold" color={textColor}>
              Questions for Part 4 (31-40)
            </Text>
          )}
        </VStack>
      </Flex>

      {/* Question Navigation */}
      <Box bg={bgColor} borderTop="1px" borderColor={borderColor} height="65px">
        <Flex justify="center" mx="auto" align="center" h="100%" gap={4}>
          {partNavigationData.map((part) => (
            <Box
              key={part.id}
              onClick={() => setActivePart(part.id as "part1" | "part2" | "part3" | "part4")}
              cursor="pointer"
              bg={activePart === part.id ? contentBackgroundColor : "transparent"}
              px={2} py={1}
              borderRadius="md"
              border={"1px solid"}
              borderColor={activePart === part.id ? "green.600" : "gray.300"}
              _hover={{ bg: activePart === part.id ? contentBackgroundColor : "gray.100" }}
            >
              <HStack gap={4} alignItems="center">
                <Text fontWeight="bold" fontSize="md" color={textColor}>
                  {part.label}
                </Text>
                {activePart === part.id ? (
                  <SimpleGrid columns={10} gap={1}>
                    {Array.from({ length: 10 }, (_, i) => {
                      const globalQuestionNum = part.startQuestion + i
                      const status = questionStatuses[globalQuestionNum - 1] || 0
                      return (
                        <IconButton
                          key={globalQuestionNum}
                          size="sm"
                          variant="solid"
                          color="white"
                          bg={getQuestionButtonColor(status)}
                          _hover={{ bg: getQuestionButtonHoverColor(status) }}
                          w="35px"
                          h="35px"
                          borderRadius="full"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Logic để scroll đến câu hỏi cụ thể
                          }}
                          cursor="pointer"
                        >
                          {globalQuestionNum}
                        </IconButton>
                      )
                    })}
                  </SimpleGrid>
                ) : (
                  <Flex alignItems="center" height="35px">
                    <Text fontSize="sm" color={mutedColor}>
                      10 questions
                    </Text>
                  </Flex>
                )}
              </HStack>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}
