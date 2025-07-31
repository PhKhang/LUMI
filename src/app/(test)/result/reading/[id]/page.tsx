"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Box, Flex, HStack, VStack, Text, Button, IconButton, Image, SimpleGrid , Icon, Tabs} from "@chakra-ui/react"
import { CloseButton } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import SettingsMenu from "@/components/ui/settings-menu"
import {
  MdClose,
  MdAccessTime,
  MdHelp,
  MdNote,
  MdSearch,
  MdTimer
} from "react-icons/md"
import { FiChevronDown } from "react-icons/fi"
import { TbNotes } from "react-icons/tb"
import { PiMapPin } from "react-icons/pi"
import { BiChevronDown } from "react-icons/bi"

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: string
  userAnswer: string | null
  explanation?: string
}

export default function TestResult() {
  const params = useParams()
  const examId = params.id as string 
  
  const [activeTab, setActiveTab] = useState<"note" | "lookup">("note")
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium")
  const [leftPanelWidth, setLeftPanelWidth] = useState(50)
  const [expandedExplanations, setExpandedExplanations] = useState<Set<number>>(new Set())
  const [highlightedText, setHighlightedText] = useState<number | null>(null)
  const bgColor = useColorModeValue("#F6F0E7", "gray.800") // background for entire page
  const contentBackgroundColor = useColorModeValue("#FFFAF6", "gray.900") // background color for left (passages content) and right (test answers) panel
  const questionBackgroundColor = useColorModeValue("white", "gray.700") // background color for question card
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
        return "green.600"
      case "incorrect":
        return "#DC2626"
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

  return (
    <Box minH="100vh" bg={bgColor} overflow="hidden">
      <Box bg={bgColor} borderColor={borderColor} px={4}>
        <Box display="grid" gridTemplateColumns="1fr auto 1fr" alignItems="center" w="full" mx="auto">
          {/* Left Section - Close Button + Tabs */}
          <HStack gap={4} height="60px">
            <Box alignItems="center">
              <IconButton aria-label="Close" variant="outline" size="sm" rounded="full"> <Icon as={MdClose} /> </IconButton>
            </Box>
            <Box marginTop="auto">
              <Tabs.Root
                defaultValue="note"
                variant="line"
              >
                <Tabs.List>
                  <Tabs.Trigger value="note">
                    <Icon as={MdNote} />
                    Chế độ ghi chú
                  </Tabs.Trigger>
                  <Tabs.Trigger value="lookup">
                    <Icon as={MdSearch} />
                    Chế độ tra từ
                  </Tabs.Trigger>
                </Tabs.List>
              </Tabs.Root>
            </Box>
          </HStack>

          {/* Center Section - Time + Score */}
          <Box py={3}>
            <HStack gap={2} justify="center" bg={questionBackgroundColor} px={3} py={1} borderRadius={"full"}>
              <HStack>
                <Icon as={MdTimer} color="accent" />
                <Text fontSize={getFontSizeValue()} fontWeight="medium" color={textColor}>
                  00:10:39
                </Text>
              </HStack>

              {/* Vertical Divider */}
              <Box width="1px" height="10px" bg="#E5E5EA" />

              <Text fontSize={getFontSizeValue()} fontWeight="bold" color="accent">
                {correctAnswers}/{totalQuestions} correct answers
              </Text>
            </HStack>
          </Box>


          {/* Right Section - Settings */}
          <HStack justify="flex-end">
            <SettingsMenu fontSize={fontSize} onFontSizeChange={setFontSize}/>
          </HStack>
        </Box>
      </Box>

      {/* Main Content */}
      <Flex h="calc(100vh - 125px)" mx="auto">
        {/* Left Panel - Reading Content */}
        <Box width={`${leftPanelWidth}%`} borderRight="1px" borderColor={borderColor} overflow="auto" p={6} bg={contentBackgroundColor}>
          <VStack align="start" gap={4}>
            <Image src="/horseshoe-crab.png" alt="Horseshoe Crab" maxW="240px" borderRadius="md" mx="auto" />

            <Text fontSize="xl" fontWeight="bold" color={textColor}>
              [Recent Tests] - The Horseshoe Crab
            </Text>

            <VStack align="start" gap={4} fontSize={getFontSizeValue()} color={textColor}>
              <p>
                <strong>A.</strong> One of the world's oldest animal species, the horseshoe crab, is found along the east coast of the
                United States and Mexico. Fossil records indicate this creature dates back 450 million years, and it
                has changed very little over time. This is because its anatomy has been so successful. In fact, the
                horseshoe crab is more closely related to spiders, scorpions and ticks than it is to true crabs and
                other crustaceans.
              </p>

              <p>
                <strong>B.</strong> The soft body of the horseshoe crab is protected by a large oval shell with jagged, point spines. The
                two-part body consists of a head and an abdominal region. The head region contains a brain, heart,
                mouth, four eyes and six pairs of legs. What is significant is that horseshoe crabs possess the rare
                ability to regrow lost limbs. They also use crawling as their primary means of movement, and commonly
                bury themselves under the surface of the sand. However, in the water, they will occasionally turn onto
                their backs and swim upside-down. The mouth of the horseshoe carb is located between the twelve legs.
                They can only eat when crawling, as the motion allows them to open and close their mouths. Their diet
                consists mainly of worms and clams.
              </p>

              <p>
                The abdominal region contains mules for movement and is for breathing. A long spine forming a tail,
                called a telson, is located behind the abdominal region. Although this part of the body looks intimidating, it is not dangerous, poisonous or used to sting. Horseshoe crabs use it to flip over if they happen to be pushed on their backs, but this is only possible under the sea. Every year, about 10 percent of the horseshoe crab breeding population dies while on the beach, when rough surf flips the creatures onto their backs, a position from which they often cannot right themselves.
              </p>

              <p>
                <strong>C.</strong> Another distinctive feature of horseshoe crabs is that they do not have hemoglobin (a protein that contains the mineral iron), which gives blood its red color. Hemoglobin is the basis of oxygen transport in the blood of mammals, reptiles and birds. Rather, the blood of horseshoe crabs has a copper-containing protein called hemocyanin. Hemocyanin is dark blue when it is transporting oxygen and colorless when it is not. The oxygen is also transported in a fluid on the exterior of the cell, in contrast to most animals, where oxygen molecules are transported inside red blood bacteria and fungi. In fact, there enzymes are used by astronauts in the International Space Station to test surfaces for unwanted bacteria and fungi. Another application is a protein from horseshoe crab blood that is under investigation as an antibiotic.
              </p>

              <p>
                <strong>D.</strong> The horseshoe crab faces the greatest dangers in early life. Between April and June, adult horseshoe crabs travel from deep ocean waters to converge on beaches. Crawling out of the sea and onto the beach is especially common at high tides during full and new moons. The males arrive first and await the females for breeding. Female horseshoe crabs communicate by releasing a scent to signal to the males.
              </p>

              <p>
                Then female horseshoe crabs crate nests by digging holes in the sand and laying between 60,000 and 120,000 eggs at a time before covering them with sand for protection. Most eggs do not survive the hatching period before being eaten, as the eggs are a food source for numerous birds, reptiles and fish.
              </p>

              <p>
                <strong>E.</strong> If the egg does survive, the young horseshoe crab will hatch after five weeks. Referred to as larvae, they look like miniature versions of adult horseshoe crabs. When first entering the sea, they exhibit a 'swimming frenzy' similar to that of newborn sea turtles, swimming vigorously and continuously for hours. During the larval stage, which can last a year or more, newly hatched horseshoe crabs travel into the ocean water and settle on the sandy bottom in shallow waters. As they develop, they move into deeper waters.
              </p>

              <p>
                After the larval stage, horseshoe crabs move into the juvenile period. The juvenile horseshoe crabs will slowly grow over a period of about ten years. The growing process requires shedding small exterior shells, known as exoskeletons, in exchange for larger shells. Horseshoe crabs can shed up to 17 exoskeletons during development and their entire life span can be over twenty years. Mature females can reach 45-50 centimeters from head to tail, while the males grow to approximately 35-40 centimeters.
              </p>

              <p>
                <strong>F.</strong> Despite their long history, horseshoe crabs face increased threats in modern times. For this reason, scientists have been studying the populations of horseshoe crabs, but more investigation is needed, particularly on the coast of Florida. A widespread decline in their abundance in the last 20 years may be especially severe in the Indian River Lagoon system in Florida. While the horseshoe crab is not currently listed as threatened, there is rising concern about the fact that it is increasingly absent from the Indian River Lagoon system, where it has historically been common. Loss of the horseshoe crab would negatively impact species that feed on the animal and its eggs and would decrease the biodiversity of the lagoon. Moreover, this development might indicate serious ecological disturbance in the region. In the northeast, the use of horseshoe crabs as bait to catch fish over the past ten years is, in part, responsible for a rapidly declining population of this unique species, and it is suspected that this is also a problem in Florida. However, the extent of this has not been well documented.
              </p>
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
          <VStack align="start" gap={0}>
            <Box mb={4}>
              <Text fontSize={getQuestionHeaderFontSize()} fontWeight="bold" color={textColor}>
                Questions 1-5
              </Text>
              <Text fontSize={getFontSizeValue()} color={textColor} mb={0}>
                Reading Passage 2 has six sections, A-F. Which section contains the following information?
              </Text>
              <Text fontSize={getFontSizeValue()} fontStyle="italic" color={textColor}>
                <Text as="span" fontWeight="bold">NB</Text> You may use any letter more than once.
              </Text>
            </Box>

            {questions.map((question) => (
              <Box key={question.id} w="full" mb={6}>
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
                    shadow={"md"}
                  >
                    <Text fontSize={getQuestionNumberFontSize()} fontWeight="bold" color="yellow.400">
                      {question.id}
                    </Text>
                  </Box>

                  {/* User Answer Badge */}
                  <Box
                    bg={getUserAnswerBgColor(question)}
                    color="white"
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
                    <Text fontWeight="bold" fontSize={getAnswerTextFontSize()}>
                      {question.userAnswer || "—"}
                    </Text>
                    <Icon as={FiChevronDown} height="24px" color="white" />
                  </Box>

                  {/* Question Text */}
                  <Text fontSize={getFontSizeValue()} color={textColor} flex={1}>
                    {question.text}
                  </Text>
                </HStack>

                {/* Answer Section */}
                <Flex justify="space-between" align="center">
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
                      onClick={() => handleLocate(question.id)}
                      borderRadius="full"
                    >
                      <Icon as={PiMapPin} /> <Text fontSize={getAnswerTextFontSize()}>Locate</Text>
                    </Button>
                    <Button
                      size="sm"
                      variant="solid"
                      colorPalette="green"
                      onClick={() => toggleExplanation(question.id)}
                      borderRadius="full"
                    >
                      <Icon as={TbNotes} /> Explain
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
      <Box bg={bgColor} borderTop="1px" borderColor={borderColor} display="flex" alignItems="center" justifyContent="center" height="65px">
        <Flex justify="center">
          <SimpleGrid columns={13} gap={1} bg={contentBackgroundColor} px={2} py={1} borderRadius="md" border="1px solid" borderColor="green.600">
            {Array.from({ length: totalQuestions }, (_, i) => {
              const questionNum = i + 1
              const question = questions.find((q) => q.id === questionNum)
              const status = question ? getQuestionStatus(question) : "unanswered"
              console.log(`Question ${questionNum} status: ${status}`)
              return (
                <IconButton
                  key={questionNum}
                  size="sm"
                  variant="solid"
                  color="white"
                  background={status === "correct" ? "green.600" : status === "incorrect" ? "#DC2626" : "gray.500"}
                  _hover={status === "correct" ? { background: "green.700" } : status === "incorrect" ? { background: "#B91C1C" } : {}}
                  minW="35px"
                  h="35px"
                  borderRadius="full"
                  border="1px solid"
                  borderColor={borderColor}
                >
                  <Text fontSize="md" fontWeight="bold">
                    {questionNum}
                  </Text>
                </IconButton>
              )
            })}
          </SimpleGrid>
        </Flex>
      </Box>
    </Box>
  )
}
