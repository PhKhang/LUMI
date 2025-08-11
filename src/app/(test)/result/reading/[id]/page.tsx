"use client"

import { useState, useMemo, useRef, useEffect, forwardRef } from "react"
import { useParams } from "next/navigation"
import { Box, Flex, HStack, Button, VStack, Text, IconButton, Image, SimpleGrid, Icon, Drawer, Portal, createOverlay, StackProps } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import SettingsMenu from "@/components/ui/settings-menu"
import TabSelector from "@/components/ui/tab-selector"
import PassageMatchingQuestionComponent from "@/components/questionType/passage-matching"
import MultipleChoiceQuestionComponent from "@/components/questionType/multiple-choice"
import { MdClose, MdTimer, MdVolumeUp } from "react-icons/md"
import { FaPen, FaBook } from "react-icons/fa"
import GapFillQuestionComponent from "@/components/questionType/gap-fill"
import GapFillBlank from "@/components/questionType/gap-fill-blank"
import {MultipleChoiceQuestion, gapFillQuestions, multipleChoiceOptions, multipleChoiceOptions89, multipleChoiceQuestions, multipleChoiceQuestions89, passageMatchingQuestions, sectionContent} from "./data"
import { drawer } from "@/components/ui/dictionary-bottom"

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: string
  userAnswer: string | null
  explanation?: string
}

const highlightMappings: Record<number, string> = {
  1: "enzymes are used by astronauts in the International Space Station",
  2: "telson, is located behind the abdominal region",
  3: "mouth of the horseshoe crab is located between the twelve legs",
  4: "Female horseshoe crabs communicate by releasing a scent",
  5: "After the larval stage, horseshoe crabs move into the juvenile period. The juvenile horseshoe crabs will slowly grow over a period of about ten years. The growing process requires shedding small exterior shells, known as exoskeletons, in exchange for larger shells. Horseshoe crabs can shed up to 17 exoskeletons during development and their entire life span can be over twenty years. Mature females can reach 45-50 centimeters from head to tail, while the males grow to approximately 35-40 centimeters.",
  6: "The mouth of the horseshoe crab is located between the twelve legs. They can only eat when crawling, as the motion allows them to open and close their mouths. Their diet consists mainly of worms and clams.",
  7: "The head region contains a brain, heart, mouth, four eyes and six pairs of legs. What is significant is that horseshoe crabs possess the rare ability to regrow lost limbs.",
  8: "copper-containing protein called hemocyanin",
  9: "The oxygen is also transported in a fluid on the exterior of the cell, in contrast to most animals, where oxygen molecules are transported inside red blood bacteria and fungi.",
  10: "widespread decline in their abundance",
  11: "species that feed on the animal and its eggs",
  12: "decrease the biodiversity of the lagoon",
  13: "use of horseshoe crabs as bait"
}

const HighlightableText = ({ 
  children, 
  highlightText, 
  isHighlighted,
  fontSize 
}: { 
  children: string
  highlightText?: string
  isHighlighted?: boolean
  fontSize: string
}) => {
  if (!highlightText || !isHighlighted) {
    return <span>{children}</span>
  }

  const parts = children.split(new RegExp(`(${highlightText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'))
  
  return (
    <span>
      {parts.map((part, index) => 
        part.toLowerCase() === highlightText.toLowerCase() ? (
          <span 
            key={index} 
            style={{ 
              backgroundColor: 'rgba(22, 163, 74, 0.2)'
            }}
          >
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  )
}

export default function TestResult() {
  const params = useParams()
  const examId = params.id as string
  const leftPanelRef = useRef<HTMLElement>(null)

  const [activeTab, setActiveTab] = useState<"note" | "lookup">("note")
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium")
  const [leftPanelWidth, setLeftPanelWidth] = useState(50)
  const [expandedExplanations, setExpandedExplanations] = useState<Set<number>>(new Set())
  const [highlightedText, setHighlightedText] = useState<number | null>(null)
  const [highlightedQuestionId, setHighlightedQuestionId] = useState<number | null>(null)


  const bgColor = useColorModeValue("#F6F0E7", "gray.800")
  const contentBackgroundColor = useColorModeValue("#FFFAF6", "gray.900")
  const questionBackgroundColor = useColorModeValue("white", "gray.700")
  const borderColor = useColorModeValue("gray.200", "gray.600")
  const textColor = useColorModeValue("gray.800", "white")
  const greenThemeColor = useColorModeValue("green.600", "green.500")

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

  // General question status calculation
  const questionStatuses = useMemo(() => {
    const statuses: number[] = []
    
    // Process passage matching questions (1-5)
    passageMatchingQuestions.forEach((question) => {
      if (question.userAnswer === null) {
        statuses[question.id - 1] = 0 // unanswered
      } else if (question.userAnswer === question.correctAnswer) {
        statuses[question.id - 1] = 1 // correct
      } else {
        statuses[question.id - 1] = -1 // incorrect
      }
    })

    // Process multiple choice questions (6-9)
    multipleChoiceQuestions.forEach((question) => {
      if (!question.userAnswers || question.userAnswers.length === 0) {
        statuses[question.id - 1] = 0 // unanswered
      } else {
        // Check if all correct answers are selected and no incorrect ones
        const hasAllCorrect = question.correctAnswers.every(answer => question.userAnswers?.includes(answer))
        const hasOnlyCorrect = question.userAnswers.every(answer => question.correctAnswers.includes(answer))
        const isCorrect = hasAllCorrect && hasOnlyCorrect && question.correctAnswers.length === question.userAnswers.length
        
        statuses[question.id - 1] = isCorrect ? 1 : -1
      }
    })
 
    // Process gap fill questions (10-13)
    gapFillQuestions.forEach((blank) => {
      if (blank.userAnswer === null) {
        statuses[blank.id - 1] = 0 // unanswered
      } else {
        statuses[blank.id - 1] = blank.userAnswer === blank.correctAnswer ? 1 : -1
      }
    })

    return statuses
  }, [passageMatchingQuestions, multipleChoiceQuestions, gapFillQuestions])

  const handleLocate = (questionId: number) => {
    if (activeTab !== "note") return;
    setHighlightedQuestionId(questionId)
    
    if (leftPanelRef.current) {
      const textToFind = highlightMappings[questionId]
      if (textToFind) {
        
        setTimeout(() => {
          const elements = leftPanelRef.current?.querySelectorAll('p')
          if (elements) {
            for (let element of elements) {
              if (element.textContent?.includes(textToFind.substring(0, 50))) {
                element.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'center' 
                })
                break
              }
            }
          }
        }, 100)
      }
    }
  }

  const totalQuestions = 13
  const correctAnswers = questionStatuses.filter(status => status === 1).length

  const toggleExplanation = (questionId: number) => {
    const newExpanded = new Set(expandedExplanations)
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId)
    } else {
      newExpanded.add(questionId)
    }
    setExpandedExplanations(newExpanded)
  }

  const scrollToQuestion = (questionNumber: number) => {
    let targetId = '';
    if (questionNumber >= 1 && questionNumber <= 5) {
      targetId = `question-${questionNumber}`;
    } else if (questionNumber >= 6 && questionNumber <= 7) {
      targetId = 'questions-6-7';
    } else if (questionNumber >= 8 && questionNumber <= 9) {
      targetId = 'questions-8-9';
    } else if (questionNumber >= 10 && questionNumber <= 13) {
      targetId = 'questions-10-13';
    }
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
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

  const readingTabs = [
    { value: "note", label: "Take notes Mode", icon: FaPen },
    { value: "lookup", label: "Dictionary Mode", icon: FaBook },
  ]

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
              <TabSelector
                activeTab={activeTab}
                onTabChange={(tab) => setActiveTab(tab as "note" | "lookup")}
                tabs={readingTabs}
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
        <DrawerContainer
          h={"full"}
          width={`${leftPanelWidth}%`}
          borderRight="1px"
          borderColor={borderColor}
          overflow="hidden"
          bg={contentBackgroundColor}
          ref={leftPanelRef}
        >
          <Box overflowY={"scroll"} h={"full"} p={6}>
            <VStack align="start" gap={4}>
              <Image src="/horseshoe-crab.png" alt="Horseshoe Crab" maxW="240px" borderRadius="md" mx="auto" />
              <Text fontSize="xl" fontWeight="bold" color={textColor}>
                [Recent Tests] - The Horseshoe Crab
              </Text>
              <VStack align="start" gap={4} fontSize={getFontSizeValue()} color={textColor}>
                {sectionContent.map((section, index) => {
                  // Kiểm tra xem section này có chứa text cần highlight không
                  const highlightText = highlightedQuestionId ? highlightMappings[highlightedQuestionId] : undefined
                  const shouldHighlight = highlightText && section.content.toLowerCase().includes(highlightText.toLowerCase()) && activeTab === "note" // Chỉ highlight ở note mode
            
                  return (
                    <ReadingParagraph
                      key={index}
                      leading={section.leading}
                      content={section.content}
                      highlightText={highlightText}
                      isHighlighted={!!shouldHighlight}
                      fontSize={fontSize}
                      activeTab={activeTab}
                      containerRef={leftPanelRef}
                    />
                  )
                })}
              </VStack>
            </VStack>
          </Box>
          <drawer.Viewport />
        </DrawerContainer>

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
          <Box id="questions-1-5">
            <PassageMatchingQuestionComponent
              title="Questions 1-5"
              instruction="Reading Passage 2 has six sections, A-F. Which section contains the following information?"
              note="You may use any letter more than once."
              questions={passageMatchingQuestions}
              fontSize={fontSize}
              onLocate={activeTab === "note" ? handleLocate : () => {}}
              onExplain={toggleExplanation}
              expandedExplanations={expandedExplanations}
              activeTab={activeTab}
            />
          </Box>

          {/* Multiple Choice Questions 6-7 */}
          <Box id="questions-6-7">
            <MultipleChoiceQuestionComponent
              title="Questions 6-7"
              instruction="Choose TWO letters, A-E."
              questionRange="6 - 7"
              questionText="Which TWO of the following are true about the characteristics of horseshoe crabs?"
              options={multipleChoiceOptions}
              questions={multipleChoiceQuestions}
              fontSize={fontSize}
              onLocate={activeTab === "note" ? handleLocate : () => {}}
              onExplain={toggleExplanation}
              expandedExplanations={expandedExplanations}
              activeTab={activeTab}
            />
          </Box>

          {/* Multiple Choice Questions 8-9 */}
          <Box id="questions-8-9">
            <MultipleChoiceQuestionComponent
              title="Questions 8-9"
              instruction="Choose TWO letters, A-E."
              questionRange="8 - 9"
              questionText="In which TWO ways is horseshoe crab blood different from that of most other animals?"
              options={multipleChoiceOptions89}
              questions={multipleChoiceQuestions89}
              fontSize={fontSize}
              onLocate={activeTab === "note" ? handleLocate : () => {}}
              onExplain={toggleExplanation}
              expandedExplanations={expandedExplanations}
              activeTab={activeTab}
            />
          </Box>

          {/* Gap Fill Questions */}
          <Box id="questions-10-13">
            <GapFillQuestionComponent
              title="Questions 10-13"
              instruction="Complete the summary below."
              questionRange="10 - 13"
              additionalInstruction="Choose ONE WORD ONLY from the passage for each answer."
              summaryTitle="The horseshoe crab in Florida"
              summaryContent={gapFillSummaryContent}
              questions={gapFillQuestions}
              fontSize={fontSize}
              onLocate={activeTab === "note" ? handleLocate : () => {}}
              onExplain={toggleExplanation}
              expandedExplanations={expandedExplanations}
              activeTab={activeTab}
            />
          </Box>
        </Box>
      </Flex>

      {/* Question Navigation */}
      <Box bg={bgColor} borderTop="1px" borderColor={borderColor} display="flex" alignItems="center" justifyContent="center" height="65px">
        <Flex justify="center">
          <SimpleGrid columns={13} gap={1} bg={contentBackgroundColor} px={2} py={1} borderRadius="md" border="1px solid" borderColor="green.600">
            {Array.from({ length: totalQuestions }, (_, i) => {
              const questionNum = i + 1
              const status = questionStatuses[i] || 0

              return (
                <IconButton
                  key={questionNum}
                  size="sm"
                  variant="solid"
                  color="white"
                  bg={getQuestionButtonColor(status)}
                  _hover={{ bg: getQuestionButtonHoverColor(status) }}
                  w="35px"
                  h="35px"
                  borderRadius="full"
                  onClick={() => scrollToQuestion(questionNum)}
                  cursor="pointer"
                >
                  {questionNum}
                </IconButton>
              )
            })}
          </SimpleGrid>
        </Flex>
      </Box>
    </Box>
  )
}


const DrawerContainer = forwardRef<HTMLElement, StackProps>(
  function DrawerContainer(props, ref) {
    return (
      <Box
        pos="relative"
        overflow="hidden"
        ref={ref}
        {...props}
      />
    );
  }
);

const ReadingParagraph = ({
  leading, 
  content, 
  highlightText, 
  isHighlighted,
  fontSize,
  activeTab,
  containerRef
}: { 
  leading: string
  content: string
  highlightText?: string
  isHighlighted?: boolean
  fontSize: string
  activeTab: "note" | "lookup"
  containerRef?: React.RefObject<HTMLElement | null>
}) => {
  const renderHighlightableContent = (text: string) => {
    const isDictionaryMode = activeTab === "lookup";

    if (!highlightText || !isHighlighted) {
      if (isDictionaryMode) {
        return text.split(/(\s+)/).map((part, index) => 
          part.trim() ? (
            <span 
              key={index} 
              className="cursor-pointer hover:underline" 
              onClick={() => {
                drawer.open("a", {
                  title: "Drawer Title",
                  description: "Drawer Description",
                  placement: "bottom",
                  containerRef: containerRef!,
                })
              }}
            >
              {part}
            </span>
          ) : part
        );
      } else {
        return text;
      }
    }

    // Tìm và highlight text
    const regex = new RegExp(`(${highlightText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      const isHighlightPart = regex.test(part);

      // Hàm helper để render words với optional underline hover và highlight
      const renderWords = (content: string, isHighlighted: boolean) => {
        if (isDictionaryMode) {
          return content.split(/(\s+)/).map((word, wordIndex) => 
            word.trim() ? (
              <span 
                key={`${index}-${wordIndex}`} 
                className="cursor-pointer hover:underline"
                style={isHighlighted ? { backgroundColor: 'rgba(22, 163, 74, 0.3)' } : undefined}
                onClick={() => {
                  // drawer.open...
                }}
              >
                {word}
              </span>
            ) : word
          );
        } else {
          return (
            <span 
              style={isHighlighted ? { backgroundColor: 'rgba(22, 163, 74, 0.3)' } : undefined}
            >
              {content}
            </span>
          );
        }
      };

      if (isHighlightPart && part.trim()) {
        return renderWords(part, true);
      } else {
        return renderWords(part, false);
      }
    }).flat()
  }

  return (
    <p ref={isHighlighted ? (el) => {
      if (el && highlightText) {
        setTimeout(() => {
          el.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          })
        }, 100)
      }
    } : undefined}>
      <strong>{leading}</strong> {renderHighlightableContent(content)}
    </p>
  )
}
