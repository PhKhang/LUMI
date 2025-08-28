"use client";

import { useState, useMemo, useRef, useEffect, forwardRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { HiOutlineArrowRight } from "react-icons/hi";
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
  Center,
  
  Drawer,
  Portal,
  createOverlay,
  StackProps,
} from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/modal";
import { useColorModeValue } from "@/components/ui/color-mode";
import SettingsMenu from "@/components/ui/settings-menu";
import TabSelector from "@/components/ui/tab-selector";
import PassageMatchingQuestionComponent from "@/components/questionType/passage-matching-test";
import MultipleChoiceQuestionComponent from "@/components/questionType/multiple-choice-test";
import ExitTestButton from "@/components/ui/exit-test-button";
import { MdClose, MdTimer, MdVolumeUp } from "react-icons/md";
import { FaPen, FaBook } from "react-icons/fa";
import { PiWarningFill } from "react-icons/pi";
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
import { keyframes } from '@emotion/react';

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
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"note" | "lookup">("note");
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">(
    "medium"
  );
  const [leftPanelWidth, setLeftPanelWidth] = useState(50);
  const [minutesRemaining, setMinutesRemaining] = useState(20);
  const [passageAnswers, setPassageAnswers] = useState<(string | null)[]>(
    passageMatchingQuestions.map(() => null)
  );
  const [mcAnswers67, setMcAnswers67] = useState<string[]>([]);
  const [mcAnswers89, setMcAnswers89] = useState<string[]>([]);
  const [gapAnswers, setGapAnswers] = useState<string[]>(
    gapFillQuestions.map(() => "")
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Intro modal and exit modal state
  const [isIntroOpen, setIsIntroOpen] = useState(true);
  const [isExitOpen, setIsExitOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [showExitModal, setShowExitModal] = useState(true);

  // Request fullscreen when starting test
  const enterFullScreen = async () => {
    try {
      const el = document.documentElement as any;
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
    } catch (err) {
      // ignore
    }
  };

  // Exit fullscreen helper
  const exitFullScreen = async () => {
    try {
      const doc: any = document;
      if (doc.fullscreenElement || doc.webkitFullscreenElement) {
        if (doc.exitFullscreen) await doc.exitFullscreen();
        else if (doc.webkitExitFullscreen) await doc.webkitExitFullscreen();
      }
    } catch (e) {
      // ignore
    }
  };

  // Exit handler: open exit modal on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExitOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // If fullscreen is exited (e.g. user presses ESC), show exit modal when test was started
  useEffect(() => {
    const onFsChange = () => {
      try {
        const fs = (document as any).fullscreenElement || (document as any).webkitFullscreenElement;
        if (!fs && started) {
          setIsExitOpen(true);
        }
      } catch (e) {
        // ignore
      }
    }
    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('webkitfullscreenchange', onFsChange as any);
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      document.removeEventListener('webkitfullscreenchange', onFsChange as any);
    }
  }, [started]);

  // Intercept clicks on modal 'Exit' button (capture phase) so we can exit fullscreen and go home
  useEffect(() => {
    const onCaptureClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const btn = target.closest('button');
      if (!btn) return;

      const text = (btn.textContent || '').trim();
      // If it's the Exit button inside a dialog, handle here (prevent component's handler)
      if (text === 'Exit' && btn.closest('[role="dialog"]') && !isSubmitting) {
        e.stopPropagation();
        e.preventDefault();
        // exit fullscreen first, then navigate to home
        exitFullScreen().then(() => {
          try {
            router.push('/');
          } catch (err) {
            // fallback
            window.location.href = '/';
          }
        });
      }
    };

    document.addEventListener('click', onCaptureClick, true);
    return () => document.removeEventListener('click', onCaptureClick, true);
  }, [router, isSubmitting]);

  const bgColor = useColorModeValue("#F6F0E7", "gray.800");
  const contentBackgroundColor = useColorModeValue("#FFFAF6", "gray.900");
  const questionBackgroundColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");
  const greenThemeColor = useColorModeValue("green.600", "green.500");
  const resizerColor = useColorModeValue("orange.500", "orange.400")
  const modalBg = useColorModeValue('#FFF9F3', 'gray.800')
  const headerColor = useColorModeValue('orange.500', 'orange.300')
  const iconColor = useColorModeValue('yellow.500', 'yellow.300')
  const modalTextColor = useColorModeValue('gray.800', 'gray.100')
  const subTextColor = useColorModeValue('gray.600', 'gray.400')
  const outlineBtnColor = useColorModeValue('gray', 'gray')
  const readingTabs = [
    { value: "note", label: "Take notes Mode", icon: FaPen },
    { value: "lookup", label: "Dictionary Mode", icon: FaBook },
  ];

  const handleSubmit = () => {
    setIsSubmitting(true);
    setShowExitModal(false); // Ensure the exit modal is hidden
    exitFullScreen(); // Exit fullscreen immediately
    // Simulate marking process for 2.5 seconds
    setTimeout(() => {
      router.push('/result/reading/1');
    }, 3000);
  };

  useEffect(() => {
    if (started) {
      const interval = setInterval(() => {
        setMinutesRemaining((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            exitFullScreen(); // Exit fullscreen immediately
            setIsIntroOpen(false); // Ensure no intro modal is shown
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // decrement 1 minute every 60 seconds
      return () => clearInterval(interval);
    }
  }, [started]);

  const timerColor = minutesRemaining <= 5 ? "red.500" : textColor;

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
      {/* Intro Modal - match ExitTestButton UI/props exactly */}
      <Modal isOpen={isIntroOpen} onClose={() => {}} isCentered size="sm" closeOnEsc={false} closeOnOverlayClick={false}>
        <ModalOverlay 
          bg="rgba(0, 0, 0, 0.5)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={99}
        />
        <ModalContent
          height="100vh"
          width="100vw"
          containerProps={{
            zIndex: '100',
          }}
        >
          <VStack mx="auto" my="auto" borderRadius="lg" bg={modalBg} py={4} px={6}>
            <ModalHeader textAlign="center" bg={modalBg} w="100%">
              <Text color={modalTextColor} fontWeight="bold" fontSize="2xl">Important Notice</Text>
            </ModalHeader>
            <ModalBody bg={modalBg} mb={2}>
              <Center>
                <Icon as={PiWarningFill} boxSize={10} color={iconColor} mb={2}/>
              </Center>
              <Text textAlign="center" fontWeight="semibold" fontSize="lg" color={modalTextColor}>You are not allowed to leave this test window during the mock test.</Text>
              <Text textAlign="center" color={subTextColor} fontSize="sm">When you start, the test will enter fullscreen. Press ESC will trigger an exit confirmation.</Text>
            </ModalBody>
            <ModalFooter display="flex" justifyContent="center" gap={10} bg={modalBg} w="100%" px={0}>
              <Button onClick={async () => { await enterFullScreen(); setIsIntroOpen(false); setStarted(true); }} variant="outline" colorPalette="gray" borderRadius="full">Start Test</Button>
              <Button onClick={() => window.location.href = '/report'} variant="solid" colorPalette="black" borderRadius="full">Exit</Button>
            </ModalFooter>
          </VStack>
        </ModalContent>
      </Modal>

      {/* Exit Modal - match ExitTestButton UI/props exactly */}
      {showExitModal && (
        <Modal isOpen={isExitOpen} onClose={() => setIsExitOpen(false)} isCentered size="sm">
          <ModalOverlay 
            bg="rgba(0, 0, 0, 0.5)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex={99}
          />
          <ModalContent
            height="100vh"
            width="100vw"
            containerProps={{
              zIndex: '100',
            }}
          >
            <VStack mx="auto" my="auto" borderRadius="lg" bg={modalBg} py={4} px={6}>
              <ModalHeader textAlign="center" bg={modalBg} w="100%">
                <Text color={modalTextColor} fontWeight="bold" fontSize="2xl">Exit Test</Text>
              </ModalHeader>
              <ModalBody bg={modalBg} mb={2}>
                <Center>
                  <Icon as={PiWarningFill} boxSize={10} color={iconColor} mb={2}/>
                </Center>
                <Text textAlign="center" fontWeight="semibold" fontSize="lg" color={modalTextColor}>Are you sure you want to exit this test?</Text>
                <Text textAlign="center" color={subTextColor} fontSize="sm">If you exit now, your progress will not be saved.</Text>
              </ModalBody>
              <ModalFooter display="flex" justifyContent="center" gap={10} bg={modalBg} w="100%" px={0}>
                <Button onClick={async () => { await enterFullScreen(); setIsExitOpen(false); setStarted(true); }} variant="outline" colorPalette="gray" borderRadius="full">Continue Test</Button>
                <Button onClick={() => window.location.href = '/report'} variant="solid" colorPalette="black" borderRadius="full">Exit</Button>
              </ModalFooter>
            </VStack>
          </ModalContent>
        </Modal>
      )}
      
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
                  color={timerColor}
                >
                  {minutesRemaining} minute{minutesRemaining !== 1 ? "s" : ""}
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
          width="6px"
          bg={borderColor}
          cursor="col-resize"
          _hover={{ bg: resizerColor}}
          onMouseDown={(e) => {
            const startX = e.clientX
            const startWidth = leftPanelWidth
            const handleMouseMove = (e: MouseEvent) => {
              const diff = e.clientX - startX
              const newWidth = Math.max(30, Math.min(70, startWidth + (diff / window.innerWidth) * 100))
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
        <Box width={`${100 - leftPanelWidth}%`} flex={1} p={6} overflowY="auto" bg={contentBackgroundColor} minWidth={"410px"}>
          <VStack gap={11}  w="full" align="stretch">
          {/* Passage Matching Questions 1-5 */}
            <Box id="questions-1-5">
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
            <Box id="questions-6-7">
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
            <Box id="questions-8-9">
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
          </VStack>
          
        </Box>
      </Flex>

      {/* Loading Overlay */}
      {isSubmitting && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0, 0, 0, 0.9)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={9999}
        >
          <VStack gap={6} textAlign="center" mb={6}>
            {/* Animated Favicon */}
            <Box animation={`${bounce} 2s ease-in-out infinite`}>
              <Image src="/favicon.png" alt="LUMI" width="80px" />
            </Box>

            {/* Loading Message */}
            <VStack gap={2}>
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color="white"
                textAlign="center"
              >
                LUMI is marking your exam
              </Text>
              <Text
                fontSize="md"
                color="gray.300"
                textAlign="center"
              >
                Please wait while we process your answers...
              </Text>
            </VStack>

            {/* Loading Dots Animation */}
            <HStack gap={1}>
              {[0, 1, 2].map((i) => (
                <Box
                  key={i}
                  w="8px"
                  h="8px"
                  bg="green.400"
                  borderRadius="full"
                  animation={`${pulse} 1.5s ease-in-out ${i * 0.2}s infinite`}
                />
              ))}
            </HStack>
          </VStack>
        </Box>
      )}

      {/* Submit Button */}
      <Box
        bg={bgColor}
        borderTop="1px"
        borderColor={borderColor}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="65px"
        px={10}
      >
        <Button variant="solid" colorPalette={"green"} borderRadius={"full"} size="sm" border="1px solid" borderColor={borderColor} visibility="hidden">
          Submit
          <Icon as={HiOutlineArrowRight}/>
        </Button>
        <Flex justify="center">
          <SimpleGrid
            columns={13}
            gap={1}
            bg={contentBackgroundColor}
            px={2}
            py={1}
            borderRadius="md"
            border="1px solid"
            borderColor={borderColor}
          >
            {Array.from({ length: totalQuestions }, (_, i) => {
              const questionNum = i + 1;
              const isAnswered = questionStatuses[i] || false;

              return (
                <IconButton
                  key={questionNum}
                  size="sm"
                  variant="solid"
                  color={isAnswered ? "yellow.600" : textColor}
                  bg={isAnswered ? "yellow.100" : questionBackgroundColor}
                  _hover={{ 
                    bg: isAnswered ? "yellow.500" : useColorModeValue("gray.100", "gray.600"),
                    color: isAnswered ? "yellow.700" : textColor
                  }}
                  w="35px"
                  h="35px"
                  borderRadius="full"
                  onClick={() => scrollToQuestion(questionNum)}
                  cursor="pointer"
                  border="1px solid"
                  borderColor={isAnswered ? "yellow.200" : borderColor}
                >
                  {questionNum}
                </IconButton>
              );
            })}
          </SimpleGrid>
        </Flex>
        <Button variant="solid" colorPalette={"green"} borderRadius={"full"} size="sm" border="1px solid" borderColor={borderColor} onClick={handleSubmit}>
            <Text fontWeight={"medium"}>
              Submit
            </Text>
            <Icon as={HiOutlineArrowRight}/>
        </Button>
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

const pulse = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;
