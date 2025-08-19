"use client";

import { useState, useMemo, useRef, useEffect, forwardRef } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Flex,
  HStack,
  Button,
  VStack,
  Text,
  IconButton,
  Image,
  SimpleGrid,
  Icon,
  Drawer,
  Portal,
  createOverlay,
  StackProps,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import SettingsMenu from "@/components/ui/settings-menu";
import TabSelector from "@/components/ui/tab-selector";
import PassageMatchingQuestionComponent from "@/components/questionType/passage-matching-test";
import MultipleChoiceQuestionComponent from "@/components/questionType/multiple-choice-test";
import ExitTestButton from "@/components/ui/exit-test-button";
import { MdClose, MdTimer, MdVolumeUp } from "react-icons/md";
import { FaPen, FaBook } from "react-icons/fa";
import GapFillQuestionComponent from "@/components/questionType/gap-fill-test";
import GapFillBlank from "@/components/questionType/gap-fill-blank-test";
import {
  MultipleChoiceQuestion,
  gapFillQuestions,
  multipleChoiceOptions,
  multipleChoiceOptions89,
  multipleChoiceQuestions,
  multipleChoiceQuestions89,
  passageMatchingQuestions,
  sectionContent,
} from "./data";
import { drawer } from "@/components/ui/dictionary-bottom";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  userAnswer: string | null;
  explanation?: string;
}

const HighlightableText = ({
  children,
  highlightText,
  isHighlighted,
  fontSize,
}: {
  children: string;
  highlightText?: string;
  isHighlighted?: boolean;
  fontSize: string;
}) => {
  if (!highlightText || !isHighlighted) {
    return <span>{children}</span>;
  }

  const parts = children.split(
    new RegExp(
      `(${highlightText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    )
  );

  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === highlightText.toLowerCase() ? (
          <span
            key={index}
            style={{
              backgroundColor: "rgba(22, 163, 74, 0.2)",
            }}
          >
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};

export default function TestTaking() {
  const params = useParams();
  const examId = params.id as string;
  const leftPanelRef = useRef<HTMLElement>(null);

  const [activeTab, setActiveTab] = useState<"note" | "lookup">("note");
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">(
    "medium"
  );
  const [leftPanelWidth, setLeftPanelWidth] = useState(50);
  const [timer, setTimer] = useState(0);
  const [passageAnswers, setPassageAnswers] = useState<(string | null)[]>(
    passageMatchingQuestions.map(() => null)
  );
  const [mcAnswers67, setMcAnswers67] = useState<string[]>([]);
  const [mcAnswers89, setMcAnswers89] = useState<string[]>([]);
  const [gapAnswers, setGapAnswers] = useState<string[]>(
    gapFillQuestions.map(() => "")
  );

  const bgColor = useColorModeValue("#F6F0E7", "gray.800");
  const contentBackgroundColor = useColorModeValue("#FFFAF6", "gray.900");
  const questionBackgroundColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");
  const greenThemeColor = useColorModeValue("green.600", "green.500");
  const readingTabs = [
    { value: "note", label: "Take notes Mode", icon: FaPen },
    { value: "lookup", label: "Dictionary Mode", icon: FaBook },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const questionStatuses = useMemo(() => {
    const statuses: boolean[] = []; // true if answered

    // 1-5: Passage matching
    passageAnswers.forEach((ans, idx) => {
      statuses[idx] = !!ans;
    });

    // 6-7: MC 67, answered if at least one selected (since choose two)
    statuses[5] = mcAnswers67.length > 0;
    statuses[6] = mcAnswers67.length > 0;

    // 8-9: MC 89
    statuses[7] = mcAnswers89.length > 0;
    statuses[8] = mcAnswers89.length > 0;

    // 10-13: Gap fill
    gapAnswers.forEach((ans, idx) => {
      statuses[9 + idx] = !!ans.trim();
    });

    return statuses;
  }, [passageAnswers, mcAnswers67, mcAnswers89, gapAnswers]);

  const totalQuestions = 13;

  const scrollToQuestion = (questionNum: number) => {
    const element = document.getElementById(`question-${questionNum}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const gapFillSummaryContent = (
    <Text mb={4}>
      A study of the Indian River Lagoon system in Florida has shown a{" "}
      <GapFillBlank
        questionNumber={10}
        value={gapAnswers[0]}
        onChange={(val) => {
          const newGaps = [...gapAnswers];
          newGaps[0] = val;
          setGapAnswers(newGaps);
        }}
        fontSize={fontSize}
      />{" "}
      in the horseshoe crab's population. This means that animals that eat both
      horseshoe crabs and their{" "}
      <GapFillBlank
        questionNumber={11}
        value={gapAnswers[1]}
        onChange={(val) => {
          const newGaps = [...gapAnswers];
          newGaps[1] = val;
          setGapAnswers(newGaps);
        }}
        fontSize={fontSize}
      />{" "}
      could also be impacted. The result would affect the Indian River Lagoon
      system's{" "}
      <GapFillBlank
        questionNumber={12}
        value={gapAnswers[2]}
        onChange={(val) => {
          const newGaps = [...gapAnswers];
          newGaps[2] = val;
          setGapAnswers(newGaps);
        }}
        fontSize={fontSize}
      />
      . Local fishermen taking horseshoe crabs for{" "}
      <GapFillBlank
        questionNumber={13}
        value={gapAnswers[3]}
        onChange={(val) => {
          const newGaps = [...gapAnswers];
          newGaps[3] = val;
          setGapAnswers(newGaps);
        }}
        fontSize={fontSize}
      />{" "}
      could be one cause of the reduction in numbers.
    </Text>
  );

  return (
    <Box display="flex" flexDir="column" height="100vh" overflow="hidden">
      {/* Header */}
      <Box bg={bgColor} borderColor={borderColor} px={4}>
        <Box
          display="grid"
          gridTemplateColumns="1fr auto 1fr"
          alignItems="center"
          w="full"
          mx="auto"
        >
          {/* Left Section - Close Button + Tabs */}
          <HStack gap={4} height="60px">
            <Box alignItems="center">
              <ExitTestButton />
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
            <HStack
              gap={2}
              justify="center"
              bg={questionBackgroundColor}
              px={3}
              py={1}
              borderRadius="full"
            >
              <HStack>
                <Icon as={MdTimer} color={greenThemeColor} />
                <Text
                  fontSize={
                    fontSize === "small"
                      ? "sm"
                      : fontSize === "large"
                      ? "lg"
                      : "md"
                  }
                  fontWeight="medium"
                  color={textColor}
                >
                  {formatTime(timer)}
                </Text>
              </HStack>
            </HStack>
          </Box>

          {/* Right Section - Settings */}
          <HStack justify="flex-end">
            <SettingsMenu fontSize={fontSize} onFontSizeChange={setFontSize} />
          </HStack>
        </Box>
      </Box>

      {/* Main Content */}
      <Flex flex={1} overflow="hidden">
        {/* Left Panel - Passage */}
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
              <Image
                src="/horseshoe-crab.png"
                alt="Horseshoe Crab"
                maxW="240px"
                borderRadius="md"
                mx="auto"
              />
              <Text fontSize="xl" fontWeight="bold" color={textColor}>
                [Recent Tests] - The Horseshoe Crab
              </Text>
              <VStack
                align="start"
                gap={4}
                fontSize={
                  fontSize === "small"
                    ? "sm"
                    : fontSize === "large"
                    ? "lg"
                    : "md"
                }
                color={textColor}
              >
                {sectionContent.map((section, index) => (
                  <ReadingParagraph
                    key={index}
                    leading={section.leading}
                    content={section.content}
                    fontSize={fontSize}
                    activeTab={activeTab}
                    containerRef={leftPanelRef}
                  />
                ))}
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
            const startX = e.clientX;
            const startWidth = leftPanelWidth;
            const handleMouseMove = (e: MouseEvent) => {
              const diff = e.clientX - startX;
              const newWidth = Math.max(
                20,
                Math.min(80, startWidth + (diff / window.innerWidth) * 100)
              );
              setLeftPanelWidth(newWidth);
            };
            const handleMouseUp = () => {
              document.removeEventListener("mousemove", handleMouseMove);
              document.removeEventListener("mouseup", handleMouseUp);
            };
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
          }}
        />

        {/* Right Panel - Questions */}
        <Box flex={1} p={6} overflowY="auto" bg={contentBackgroundColor}>
          {/* Passage Matching Questions 1-5 */}
          <Box id="questions-1-5" mb={5}>
            <PassageMatchingQuestionComponent
              title="Questions 1-5"
              instruction="Reading Passage 2 has six sections, A-F. Which section contains the following information?"
              note="You may use any letter more than once."
              questions={passageMatchingQuestions}
              answers={passageAnswers}
              setAnswers={setPassageAnswers}
              fontSize={fontSize}
              activeTab={activeTab}
            />
          </Box>

          {/* Multiple Choice Questions 6-7 */}
          <Box id="questions-6-7" mb={5}>
            <MultipleChoiceQuestionComponent
              title="Questions 6-7"
              instruction="Choose TWO letters, A-E."
              questionRange="6 - 7"
              questionText="Which TWO of the following are true about the characteristics of horseshoe crabs?"
              options={multipleChoiceOptions}
              selectedAnswers={mcAnswers67}
              setSelectedAnswers={setMcAnswers67}
              fontSize={fontSize}
              activeTab={activeTab}
            />
          </Box>

          {/* Multiple Choice Questions 8-9 */}
          <Box id="questions-8-9" mb={5}>
            <MultipleChoiceQuestionComponent
              title="Questions 8-9"
              instruction="Choose TWO letters, A-E."
              questionRange="8 - 9"
              questionText="In which TWO ways is horseshoe crab blood different from that of most other animals?"
              options={multipleChoiceOptions89}
              selectedAnswers={mcAnswers89}
              setSelectedAnswers={setMcAnswers89}
              fontSize={fontSize}
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
              fontSize={fontSize}
              activeTab={activeTab}
            />
          </Box>
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
              const questionNum = i + 1;
              const isAnswered = questionStatuses[i] || false;

              return (
                <IconButton
                  key={questionNum}
                  size="sm"
                  variant="solid"
                  color="black"
                  bg={isAnswered ? "yellow.400" : "white"}
                  _hover={{ bg: isAnswered ? "yellow.500" : "gray.100" }}
                  w="35px"
                  h="35px"
                  borderRadius="full"
                  onClick={() => scrollToQuestion(questionNum)}
                  cursor="pointer"
                >
                  {questionNum}
                </IconButton>
              );
            })}
          </SimpleGrid>
        </Flex>
      </Box>
    </Box>
  );
}

const DrawerContainer = forwardRef<HTMLElement, StackProps>(
  function DrawerContainer(props, ref) {
    return <Box pos="relative" overflow="hidden" ref={ref} {...props} />;
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
              key={`dict-${index}-${part}`}
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
          ) : <span key={`dict-ws-${index}`}>{part}</span>
        );
      } else {
        return text;
      }
    }

    // Tìm và highlight text
    const regex = new RegExp(`(${highlightText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    const highlightBg = useColorModeValue(
      "rgba(22, 163, 74, 0.2)",
      "rgba(22, 163, 74, 0.4)"
    );

    return parts.map((part, index) => {
      const isHighlightPart = regex.test(part);

      // Hàm helper để render words với optional underline hover và highlight
      const renderWords = (content: string, isHighlighted: boolean) => {
        if (isDictionaryMode) {
          return content.split(/(\s+)/).map((word, wordIndex) =>
            word.trim() ? (
              <span
                key={`dict-hl-${index}-${wordIndex}-${word}`}
                className="cursor-pointer hover:underline"
                style={isHighlighted ? { backgroundColor: highlightBg } : undefined}
                onClick={() => {
                  // drawer.open...
                }}
              >
                {word}
              </span>
            ) : <span key={`dict-hl-ws-${index}-${wordIndex}`}>{word}</span>
          );
        } else {
          return (
            <span
              style={isHighlighted ? { backgroundColor: highlightBg } : undefined}
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
