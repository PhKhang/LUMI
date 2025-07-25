"use client"

import { useState } from "react"
import { Box, Flex, HStack, VStack, Text, Button, IconButton, Image, SimpleGrid , Icon} from "@chakra-ui/react"
import { CloseButton } from "@chakra-ui/react"
import { MenuButton, MenuList, Menu, MenuItem } from "@chakra-ui/menu"
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import {
  MdClose,
  MdSettings,
  MdAccessTime,
  MdLocationOn,
  MdHelp,
  MdLightMode,
  MdDarkMode,
  MdNote,
  MdSearch,
} from "react-icons/md"

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: string
  userAnswer: string | null
  explanation?: string
}

export default function TestResult() {
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "vi">("vi")
  const [activeTab, setActiveTab] = useState<"note" | "lookup">("note")
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium")
  const [leftPanelWidth, setLeftPanelWidth] = useState(50)
  const [expandedExplanations, setExpandedExplanations] = useState<Set<number>>(new Set())
  const [highlightedText, setHighlightedText] = useState<number | null>(null)
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue("#F6F0E7", "gray.800") // background for entire page
  const contentBackgroundColor = useColorModeValue("white", "gray.900") // background color for left (passages content) and right (test answers) panel
  const borderColor = useColorModeValue("gray.200", "gray.600")
  const textColor = useColorModeValue("gray.800", "white")
  const mutedColor = useColorModeValue("gray.600", "gray.400")
  const explanationBgColor = useColorModeValue("gray.50", "gray.700")

  const questions: Question[] = [
    {
      id: 1,
      text: "A mention of the horseshoe crab's potential value in medical science",
      options: ["A", "B", "C", "D", "E", "F"],
      correctAnswer: "A",
      userAnswer: "C",
      explanation:
        "Hiểu câu hỏi: Mô tả về sự sinh sản của sam biển 🤔. Tìm các keywords được paraphrase trong câu hỏi: female horseshoe crabs communicate → horseshoe crab reproduction, crab eggs by digging holes → reproduction",
    },
    {
      id: 2,
      text: "An explanation of the function of the horseshoe crab's tail",
      options: ["A", "B", "C", "D", "E", "F"],
      correctAnswer: "B",
      userAnswer: "B",
    },
    {
      id: 3,
      text: "A reference to the horseshoe crab's feeding habits",
      options: ["A", "B", "C", "D", "E", "F"],
      correctAnswer: "D",
      userAnswer: "D",
    },
    {
      id: 4,
      text: "A description of horseshoe crab reproduction",
      options: ["A", "B", "C", "D", "E", "F"],
      correctAnswer: "A",
      userAnswer: "D",
    },
    {
      id: 5,
      text: "Information about the horseshoe crab's evolutionary history",
      options: ["A", "B", "C", "D", "E", "F"],
      correctAnswer: "E",
      userAnswer: null,
    },
  ]

  const correctAnswers = questions.filter((q) => q.userAnswer === q.correctAnswer).length
  const totalQuestions = 13

  const toggleExplanation = (questionId: number) => {
    const newExpanded = new Set(expandedExplanations)
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId)
    } else {
      newExpanded.add(questionId)
    }
    setExpandedExplanations(newExpanded)
  }

  const handleLocate = (questionId: number) => {
    setHighlightedText(questionId)
    // Scroll to relevant text in left panel
  }

  const getQuestionStatus = (question: Question) => {
    if (question.userAnswer === null) return "unanswered"
    return question.userAnswer === question.correctAnswer ? "correct" : "incorrect"
  }

  const getUserAnswerBgColor = (question: Question) => {
    const status = getQuestionStatus(question)
    switch (status) {
      case "correct":
        return "green.500"
      case "incorrect":
        return "red.500"
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

  return (
    <Box minH="100vh" bg={bgColor}>
      <Box position="sticky" top="0" zIndex="sticky" boxShadow="sm">
        <Navigation currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      </Box>

      {/* Control Bar */}
      <Box bg={bgColor} borderBottom="1px" borderColor={borderColor} p={4}>
        <Flex justify="space-between" align="center" maxW="1400px" mx="auto">
          <HStack gap={4}>
            <IconButton aria-label="Close"variant="ghost" size="sm" rounded="full" background={"gray.500"}  _hover={{ bg: "gray.600" }}> <Icon as={MdClose} /> </IconButton>

            <HStack gap={2}>
              <Button
                variant={activeTab === "note" ? "solid" : "ghost"}
                colorScheme={activeTab === "note" ? "green" : "gray"}
                size="sm"
                onClick={() => setActiveTab("note")}
              >
                <Icon as={MdNote} /> Chế độ ghi chú
              </Button>
              <Button
                variant={activeTab === "lookup" ? "solid" : "ghost"}
                colorScheme={activeTab === "lookup" ? "green" : "gray"}
                size="sm"
                onClick={() => setActiveTab("lookup")}
              >
                <Icon as={MdSearch} /> Chế độ tra từ
              </Button>
            </HStack>
          </HStack>

          <HStack gap={6}>
            <HStack>
              <Icon as={MdAccessTime} color="green.500" />
              <Text fontWeight="medium" color={textColor}>
                00:10:39
              </Text>
            </HStack>

            <Text fontWeight="bold" color="green.500">
              {correctAnswers}/{totalQuestions} câu đúng
            </Text>

            <Menu>
              <MenuButton as={IconButton} aria-label="Settings" variant="ghost" > <Icon as={MdSettings} /> </MenuButton>
              <MenuList
                bg={useColorModeValue("#FEFFEB", "#292929")}
                borderColor={useColorModeValue("green", "gray")}
                boxShadow="lg"
                zIndex={1000}
                borderWidth="1px"
                borderRadius="10px" 
              >
                <MenuItem
                  onClick={toggleColorMode}
                  color={useColorModeValue("black", "white")}
                  _hover={{ 
                    bg: useColorModeValue("gray", "gray"),
                    borderRadius: "10px",
                  }}
                  borderRadius="md"
                  px={8} py={8}
                  fontSize="1rem"
                >
                  <Icon as={colorMode === "light" ? MdDarkMode : MdLightMode} />
                  {colorMode === "light" ? "Dark Mode" : "Light Mode"}
                </MenuItem>

                <Box px={3} py={2}>
                  <Flex align="center" gap={3}>
                    <Text fontSize="sm" color={useColorModeValue("black", "white")} minW="70px">
                      Font Size:
                    </Text>
                    <HStack gap={1}>
                      <Button
                        size="xs"
                        variant={fontSize === "small" ? "solid" : "outline"}
                        colorScheme={fontSize === "small" ? "blue" : "gray"}
                        onClick={() => setFontSize("small")}
                        borderRadius="md"
                        px={2}
                      >
                        Small
                      </Button>
                      <Button
                        size="xs"
                        variant={fontSize === "medium" ? "solid" : "outline"}
                        colorScheme={fontSize === "medium" ? "blue" : "gray"}
                        onClick={() => setFontSize("medium")}
                        borderRadius="md"
                        px={2}
                      >
                        Medium
                      </Button>
                      <Button
                        size="xs"
                        variant={fontSize === "large" ? "solid" : "outline"}
                        colorScheme={fontSize === "large" ? "blue" : "gray"}
                        onClick={() => setFontSize("large")}
                        borderRadius="md"
                        px={2}
                      >
                        Large
                      </Button>
                    </HStack>
                  </Flex>
                </Box>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Box>

      {/* Main Content */}
      <Flex h="calc(100vh - 200px)" maxW="2000px" mx="auto">
        {/* Left Panel - Reading Content */}
        <Box width={`${leftPanelWidth}%`} borderRight="1px" borderColor={borderColor} overflow="auto" p={6} bg={contentBackgroundColor}>
          <VStack align="start" gap={4}>
            <Image src="/horseshoe-crab.png" alt="Horseshoe Crab" maxW="400px" borderRadius="md" mx="auto" />

            <Text fontSize="xl" fontWeight="bold" color={textColor}>
              [Recent Tests] - The Horseshoe Crab
            </Text>

            <VStack align="start" gap={4} fontSize={getFontSizeValue()} color={textColor}>
              <Box>
                <Text fontWeight="bold" mb={2}>
                  A.
                </Text>
                <Text>
                  One of the world's oldest animal species, the horseshoe crab, is found along the east coast of the
                  United States and Mexico. Fossil records indicate this creature dates back 450 million years, and it
                  has changed very little over time. This is because its anatomy has been so successful. In fact, the
                  horseshoe crab is more closely related to spiders, scorpions and ticks than it is to true crabs and
                  other crustaceans.
                </Text>
              </Box>

              <Box>
                <Text fontWeight="bold" mb={2}>
                  B.
                </Text>
                <Text>
                  The soft body of the horseshoe crab is protected by a large oval shell with jagged, point spines. The
                  two-part body consists of a head and an abdominal region. The head region contains a brain, heart,
                  mouth, four eyes and six pairs of legs. What is significant is that horseshoe crabs possess the rare
                  ability to regrow lost limbs. They also use crawling as their primary means of movement, and commonly
                  bury themselves under the surface of the sand. However, in the water, they will occasionally turn onto
                  their backs and swim upside-down. The mouth of the horseshoe carb is located between the twelve legs.
                  They can only eat when crawling, as the motion allows them to open and close their mouths. Their diet
                  consists mainly of worms and clams.
                </Text>
              </Box>

              <Box>
                <Text fontWeight="bold" mb={2}>
                  C.
                </Text>
                <Text>
                  The abdominal region contains mules for movement and is for breathing. A long spine forming a tail,
                  called a telson, is located behind the abdominal region...
                </Text>
              </Box>
            </VStack>
          </VStack>
        </Box>

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
        <Box width={`${100 - leftPanelWidth}%`} overflow="auto" p={6} bg = {contentBackgroundColor}>
          <VStack align="start" gap={6}>
            <Text fontSize="2xl" fontWeight="bold" color={textColor}>
              Questions 1-5
            </Text>

            <Box>
              <Text fontSize={getFontSizeValue()} color={textColor} mb={2}>
                Reading Passage 2 has six sections, A-F. Which section contains the following information?
              </Text>
              <Text fontSize="sm" fontStyle="italic" color={mutedColor}>
                NB You may use any letter more than once.
              </Text>
            </Box>

            {questions.map((question) => (
              <Box key={question.id} w="full" mb={6}>
                {/* Question Header */}
                <HStack align="center" gap={4} mb={4}>
                  {/* Question Number */}
                  <Box
                    bg="gray.100"
                    borderRadius="lg"
                    p={3}
                    minW="60px"
                    h="60px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="xl" fontWeight="bold" color="yellow.400">
                      {question.id}
                    </Text>
                  </Box>

                  {/* User Answer Badge */}
                  <Box
                    bg={getUserAnswerBgColor(question)}
                    color="white"
                    px={6}
                    py={2}
                    borderRadius="full"
                    minW="60px"
                    textAlign="center"
                  >
                    <Text fontWeight="bold" fontSize="lg">
                      {question.userAnswer || "—"}
                    </Text>
                  </Box>

                  {/* Question Text */}
                  <Text fontSize={getFontSizeValue()} color={textColor} flex={1}>
                    {question.text}
                  </Text>
                </HStack>

                {/* Answer Section */}
                <Flex justify="space-between" align="center">
                  <Box bg="gray.200" px={4} py={2} borderRadius="lg">
                    <Text fontSize="sm" color="gray.700">
                      {question.id}. Answer:{" "}
                      <Text as="span" fontWeight="bold">
                        {question.correctAnswer}
                      </Text>
                    </Text>
                  </Box>

                  <HStack gap={2}>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleLocate(question.id)}
                      borderRadius="full"
                    >
                      <Icon as={MdLocationOn} /> Locate
                    </Button>
                    <Button
                      size="sm"
                      variant="solid"
                      color="white"
                      background="green"
                      onClick={() => toggleExplanation(question.id)}
                      borderRadius="full"
                    >
                      <Icon as={MdHelp} /> Explain
                    </Button>
                  </HStack>
                </Flex>

                {/* Explanation */}
                {expandedExplanations.has(question.id) && (
                  <Box mt={4} p={4} bg={explanationBgColor} borderRadius="md">
                    <Text fontSize="sm" fontWeight="bold" mb={2} color={mutedColor}>
                      Bước 1: Hiểu câu hỏi:
                    </Text>
                    <Text fontSize="sm" color={mutedColor}>
                      Mô tả về sự sinh sản của sam biển 🤔.
                    </Text>
                    <Text fontSize="sm" fontWeight="bold" mt={2} mb={2} color={mutedColor}>
                      Bước 2: Tìm các keywords được paraphrase trong câu hỏi:
                    </Text>
                    <Text fontSize="sm" color={mutedColor}>
                      • female horseshoe crabs communicate → horseshoe crab reproduction
                    </Text>
                    <Text fontSize="sm" color={mutedColor}>
                      • crab eggs by digging holes → reproduction
                    </Text>
                  </Box>
                )}
              </Box>
            ))}
          </VStack>
        </Box>
      </Flex>

      {/* Question Navigation */}
      <Box bg={bgColor} borderTop="1px" borderColor={borderColor} p={4}>
        <Flex justify="center" maxW="1400px" mx="auto">
          <SimpleGrid columns={13} gap={2}>
            
            {Array.from({ length: totalQuestions }, (_, i) => {
              const questionNum = i + 1
              const question = questions.find((q) => q.id === questionNum)
              const status = question ? getQuestionStatus(question) : "unanswered"
              console.log(`Question ${questionNum} status: ${status}`)
              return (
                <Button
                  key={questionNum}
                  size="sm"
                  variant="solid"
                  color="white"
                  background={status === "correct" ? "green.500" : status === "incorrect" ? "red.500" : "gray"}
                  minW="40px"
                  h="40px"
                  borderRadius="full"
                >
                  {questionNum}
                </Button>
              )
            })}
          </SimpleGrid>
        </Flex>
      </Box>

      <Footer currentLanguage={currentLanguage} />
    </Box>
  )
}
