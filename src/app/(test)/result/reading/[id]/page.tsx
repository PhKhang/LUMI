"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Box, Flex, HStack, VStack, Text, IconButton, Image, SimpleGrid, Icon } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import SettingsMenu from "@/components/ui/settings-menu"
import TabSelector from "@/components/ui/tab-selector"
import PassageMatchingQuestionComponent from "@/components/questionType/passage-matching"
import MultipleChoiceQuestionComponent from "@/components/questionType/multiple-choice"
import { MdClose, MdTimer } from "react-icons/md"
import GapFillQuestionComponent from "@/components/questionType/gap-fill"
import GapFillBlank from "@/components/questionType/gap-fill-blank"

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

  const bgColor = useColorModeValue("#F6F0E7", "gray.800")
  const contentBackgroundColor = useColorModeValue("#FFFAF6", "gray.900")
  const questionBackgroundColor = useColorModeValue("white", "gray.700")
  const borderColor = useColorModeValue("gray.200", "gray.600")
  const textColor = useColorModeValue("gray.800", "white")
  const greenThemeColor = useColorModeValue("green.600", "green.500")

  interface Question {
    id: number
    text: string
    options: string[]
    correctAnswer: string
    userAnswer: string | null
    explanation?: string
  }
  
  interface MultipleChoiceQuestion {
    id: number
    correctAnswers: string[]
    userAnswers: string[]
    explanation?: string
  }
  // Data for passage matching questions
  const passageMatchingQuestions: Question[] = [
    {
      id: 1,
      text: "A mention of the horseshoe crab's potential value in medical science",
      options: ["A", "B", "C", "D", "E", "F"],
      correctAnswer: "A",
      userAnswer: "C",
      explanation:
        "Mô tả về sự sinh sản của sam biển 🤔. Bước 2: Tìm các keywords được paraphrase trong câu hỏi: female horseshoe crabs communicate → horseshoe crab reproduction, crab eggs by digging holes → reproduction",
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

  // Data for multiple choice questions
  const multipleChoiceQuestions: MultipleChoiceQuestion[] = [
    {
      id: 6,
      correctAnswers: ["A", "D"],
      userAnswers: ["A", "E"],
      explanation:
        "Bước 1: Hiểu yêu cầu câu hỏi: Theo tác giả, hai đặc điểm nào sau đây đúng về sam biển? Bước 2: Tìm các keywords đã được paraphrase trong câu hỏi: possess the rare ability to regrow lost limbs → able to replace their missing legs, copper-containing protein → different mineral composition",
    },
    {
      id: 7,
      correctAnswers: ["A", "D"],
      userAnswers: ["A", "E"],
    },
  ]

  const multipleChoiceOptions = [
    { letter: "A", text: "It has a different mineral composition." },
    { letter: "B", text: "It lacks a bacteria-fighting protein." },
    { letter: "C", text: "Harmless fungi regularly grow in the blood." },
    { letter: "D", text: "Its colour changes from blue to red as it circulates." },
    { letter: "E", text: "The blood cell carries oxygen its surface." },
  ]

  // Data for gap fill questions
  const gapFillQuestions = [
    {
      id: 10,
      correctAnswer: "decline",
      userAnswer: "decline",
      explanation:
        "Tìm từ khóa trong đoạn văn về sự suy giảm của quần thể sam biển. Bước 2: widespread decline → decline in population",
    },
    {
      id: 11,
      correctAnswer: "egg",
      userAnswer: "eggs",
      explanation: "Cần chú ý đến dạng số ít/số   của danh từ. Trong ngữ cảnh này cần dùng dạng số ít 'egg'.",
    },
    {
      id: 12,
      correctAnswer: "biodiversity",
      userAnswer: "biodiversity",
    },
    {
      id: 13,
      correctAnswer: "bait",
      userAnswer: "bait",
    },
  ]

  // Summary content for gap fill
  const gapFillSummaryContent = (
    <Text mb={4}>
      A study of the Indian River Lagoon system in Florida has shown a{" "}
      <GapFillBlank
        questionNumber={10}
        userAnswer="decline"
        correctAnswer="decline"
        isCorrect={true}
        fontSize={fontSize}
      />{" "}
      in the horseshoe crab's population. This means that animals that eat both horseshoe crabs and their{" "}
      <GapFillBlank questionNumber={11} userAnswer="eggs" correctAnswer="egg" isCorrect={false} fontSize={fontSize} />{" "}
      could also be impacted. The result would affect the Indian River Lagoon system's{" "}
      <GapFillBlank
        questionNumber={12}
        userAnswer="biodiversity"
        correctAnswer="biodiversity"
        isCorrect={true}
        fontSize={fontSize}
      />
      . Local fishermen taking horseshoe crabs for{" "}
      <GapFillBlank questionNumber={13} userAnswer="bait" correctAnswer="bait" isCorrect={true} fontSize={fontSize} />{" "}
      could be one cause of the reduction in numbers.
    </Text>
  )

  const correctAnswers = passageMatchingQuestions.filter((q) => q.userAnswer === q.correctAnswer).length
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

  const getQuestionStatus = (question: Question | MultipleChoiceQuestion) => {
    if ("userAnswer" in question) {
      if (question.userAnswer === null) return "unanswered"
      return question.userAnswer === question.correctAnswer ? "correct" : "incorrect"
    } else if ("userAnswers" in question) {
      if (question.userAnswers.length === 0) return "unanswered"
      const isCorrect = question.userAnswers.every((answer) => question.correctAnswers.includes(answer))
      return isCorrect ? "correct" : "incorrect"
    }
    return "unanswered"
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
    <Box minH="100vh" bg={bgColor} overflow="hidden">
      {/* Header */}
      <Box bg={bgColor} borderColor={borderColor} px={4}>
        <Box display="grid" gridTemplateColumns="1fr auto 1fr" alignItems="center" w="full" mx="auto">
          {/* Left Section - Close Button + Tabs */}
          <HStack gap={4} height="60px">
            <Box alignItems="center">
              <IconButton aria-label="Close" variant="outline" size="sm" rounded="full">
                <Icon as={MdClose} />
              </IconButton>
            </Box>
            <Box marginTop="auto">
              <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
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
                {correctAnswers}/{totalQuestions} correct answers
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
        {/* Left Panel - Reading Content */}
        <Box
          width={`${leftPanelWidth}%`}
          borderRight="1px"
          borderColor={borderColor}
          overflow="auto"
          p={6}
          bg={contentBackgroundColor}
        >
          <VStack align="start" gap={4}>
            <Image src="/horseshoe-crab.png" alt="Horseshoe Crab" maxW="240px" borderRadius="md" mx="auto" />
            <Text fontSize="xl" fontWeight="bold" color={textColor}>
              [Recent Tests] - The Horseshoe Crab
            </Text>
            <VStack align="start" gap={4} fontSize={getFontSizeValue()} color={textColor}>
              <p>
                <strong>A.</strong> One of the world's oldest animal species, the horseshoe crab, is found along the
                east coast of the United States and Mexico. Fossil records indicate this creature dates back 450 million
                years, and it has changed very little over time. This is because its anatomy has been so successful. In
                fact, the horseshoe crab is more closely related to spiders, scorpions and ticks than it is to true
                crabs and other crustaceans.
              </p>
              <p>
                <strong>B.</strong> The soft body of the horseshoe crab is protected by a large oval shell with jagged,
                point spines. The two-part body consists of a head and an abdominal region. The head region contains a
                brain, heart, mouth, four eyes and six pairs of legs. What is significant is that horseshoe crabs
                possess the rare ability to regrow lost limbs. They also use crawling as their primary means of
                movement, and commonly bury themselves under the surface of the sand. However, in the water, they will
                occasionally turn onto their backs and swim upside-down. The mouth of the horseshoe carb is located
                between the twelve legs. They can only eat when crawling, as the motion allows them to open and close
                their mouths. Their diet consists mainly of worms and clams.
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
        <Box width={`${100 - leftPanelWidth}%`} overflow="auto" p={6} bg={contentBackgroundColor}>
          <PassageMatchingQuestionComponent
            title="Questions 1-5"
            instruction="Reading Passage 2 has six sections, A-F. Which section contains the following information?"
            note="You may use any letter more than once."
            questions={passageMatchingQuestions}
            fontSize={fontSize}
            onLocate={handleLocate}
            onExplain={toggleExplanation}
            expandedExplanations={expandedExplanations}
          />

          {/* Multiple Choice Questions */}
          <MultipleChoiceQuestionComponent
            title="Questions 6-7"
            instruction="Choose TWO letters, A-E."
            questionRange="6 - 7"
            questionText="Which TWO of the following are true about the characteristics of horseshoe crabs?"
            options={multipleChoiceOptions}
            questions={multipleChoiceQuestions}
            fontSize={fontSize}
            onLocate={handleLocate}
            onExplain={toggleExplanation}
            expandedExplanations={expandedExplanations}
          />
          {/* Gap Fill Questions */}
          <GapFillQuestionComponent
            title="Questions 10-13"
            instruction="Complete the summary below."
            questionRange="10 - 13"
            additionalInstruction="Choose ONE WORD ONLY from the passage for each answer."
            summaryTitle="The horseshoe crab in Florida"
            summaryContent={gapFillSummaryContent}
            questions={gapFillQuestions}
            fontSize={fontSize}
            onLocate={handleLocate}
            onExplain={toggleExplanation}
            expandedExplanations={expandedExplanations}
          />
        </Box>
      </Flex>

      {/* Question Navigation */}
      <Box
        bg={bgColor}
        borderTop="1px"
        borderColor={borderColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="65px"
      >
        <Flex justify="center">
          <SimpleGrid
            columns={13}
            gap={1}
            bg={contentBackgroundColor}
            px={2}
            py={1}
            borderRadius="md"
            border="1px solid"
            borderColor="green.600"
          >
            {Array.from({ length: totalQuestions }, (_, i) => {
              const questionNum = i + 1
              const question = passageMatchingQuestions.find((q) => q.id === questionNum)
              const status = question ? getQuestionStatus(question) : "unanswered"

              return (
                <IconButton
                  key={questionNum}
                  size="sm"
                  variant="solid"
                  color="white"
                  background={status === "correct" ? "green.600" : status === "incorrect" ? "#DC2626" : "gray.500"}
                  _hover={
                    status === "correct"
                      ? { background: "green.700" }
                      : status === "incorrect"
                        ? { background: "#B91C1C" }
                        : {}
                  }
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
