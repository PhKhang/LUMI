"use client"

import { useState } from "react"
import { Box, Flex, HStack, VStack, Text, Button, IconButton, Badge, SimpleGrid, Tabs, Separator } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import { MenuButton, MenuList, Menu, MenuItem } from "@chakra-ui/menu"
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode"
import { MdTimer, MdSettings, MdAccessTime, MdLightMode, MdDarkMode, MdExpandMore, MdExpandLess, MdNote, MdEdit } from "react-icons/md"
import ExitTestButton from "@/components/ui/exit-test-button"
import TabSelector from "@/components/ui/tab-selector"
import SettingsMenu from "@/components/ui/settings-menu"
interface ScoreCriteria {
  name: string
  score: number
  maxScore: number
  description: string
  subCriteria?: { name: string; score: number }[]
}

interface GrammarError {
  id: number
  type: string
  text: string
  explanation: string
  suggestion: string
}

export default function WritingTestResult() {
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "vi">("vi")
  const [activeTab, setActiveTab] = useState<"original" | "edited">("edited")
  const [activeRightTab, setActiveRightTab] = useState<"grammar" | "coherence">("grammar")
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium")
  const [leftPanelWidth, setLeftPanelWidth] = useState(60)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["grammar", "coherence"]))
  const [expandedCriteria, setExpandedCriteria] = useState<Set<string>>(new Set())
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue("#F6F0E7", "gray.800")
  const bgColorSecondary = useColorModeValue("gray.50", "gray.800")
  const contentBackgroundColor = useColorModeValue("#FFFAF6", "gray.900") // background color for left (passages content) and right (test answers) panel
  const questionBackgroundColor = useColorModeValue("white", "gray.700")
  const borderColor = useColorModeValue("gray.200", "gray.600")
  const textColor = useColorModeValue("gray.800", "white")
  const mutedColor = useColorModeValue("gray.600", "gray.200")
  const cardBgColor = useColorModeValue("gray.50", "gray.700")
  const expandColor = useColorModeValue("gray.200", "gray.700")
  const greenThemeColor = useColorModeValue("green.600", "green.500")
  const highlightBg = useColorModeValue('rgba(255, 0, 0, 0.1)', 'rgba(255, 255, 255, 0.3)');

  const overallScore = 7.0
  const totalErrors = 15

  const scoringCriteria: ScoreCriteria[] = [
    {
      name: "Task Achievement",
      score: 6,
      maxScore: 9,
      description:
        "The essay has addressed all the requirements of the prompt, clearly stating reasons and proposing solutions. However, the development of ideas and the use of illustrative examples are not yet sufficiently in-depth or specific. For instance, the examples of “different examples and exercises” or “complex research projects” do not clearly highlight the differences compared to the high school level.",
      subCriteria: [
        { name: "Relevance to Prompt", score: 6 },
        { name: "Clarity of Position", score: 5 },
        { name: "Depth of Ideas", score: 7 },
        { name: "Appropriateness of Format", score: 7 },
        { name: "Relevant & Specific Examples", score: 5 },
        { name: "Appropriate Word Count", score: 6 },
      ],
    },
    {
      name: "Coherence & Cohesion",
      score: 7,
      maxScore: 9,
      description:
        "The essay has a clear structure with an introduction, body, and conclusion. However, the connection between ideas is not yet strong, and the use of linking words is still limited and not fully effective.",
      subCriteria: [
        { name: "Logical Organisation", score: 6 },
        { name: "Effective Introduction & Conclusion", score: 5 },
        { name: "Supported Main Points", score: 7 },
        { name: "Cohesive Devices Usage", score: 7 },
        { name: "Paragraphing", score: 5 },
      ],
    },
    {
      name: "Lexical Resource",
      score: 7,
      maxScore: 9,
      description:
        'The vocabulary level is acceptable, with the use of some academic terms such as "phenomenon," "curriculum," and "individualized support." However, there is repetition of words and unnatural phrasing, for example, "find difficult to learn" and "find harder to connect." There are also some spelling and word formation errors, such as "befor" and "reseach."',
      subCriteria: [
        { name: "Vocabulary Range", score: 6 },
        { name: "Lexical Accuracy", score: 5 },
        { name: "Spelling and Word Formation", score: 7 },
      ],
    },
    {
      name: "Grammatical & Accuracy",
      score: 8,
      maxScore: 9,
      description:
        "The essay uses some complex sentence structures but still contains many grammar and syntax errors, affecting clarity of meaning.",
      subCriteria: [
        { name: "Sentence Structure Variety", score: 6 },
        { name: "Grammar Accuracy", score: 5 },
        { name: "Punctuation Usage", score: 7 },
      ],
    },
  ]

  const grammarErrors: GrammarError[] = [
    {
      id: 1,
      type: "Sentence Structure",
      text: "are at at",
      explanation: 'The structure "are at at" repeats the word "at". Just use "are at university" instead.',
      suggestion: "are at",
    },
    {
      id: 2,
      type: "Object missing",
      text: "find <del>harder</del> it harder",
      explanation: 'The word "harder" is repeated. Use either "find it harder" or "find it more difficult".',
      suggestion: "find it harder",
    },
    {
      id: 3,
      type: "Preposition Error",
      text: "in on the internet",
      explanation: 'You cannot use both "in" and "on" together. With "internet", use only "on the internet".',
      suggestion: "on the internet",
    },
    {
      id: 4,
      type: "Vocabulary Error",
      text: "research research",
      explanation: 'The word "research" is repeated. Just use it once.',
      suggestion: "research",
    },
    {
      id: 5,
      type: "Phrasal Verb Error",
      text: "facing up faced",
      explanation: 'Incorrect structure. Use either "are faced with" or "are facing".',
      suggestion: "are faced",
    },
    {
      id: 6,
      type: "Article Error",
      text: "large a large",
      explanation: 'The article "a" is in the wrong position. It should be "a large number".',
      suggestion: "a large",
    },
    {
      id: 7,
      type: "Article Error",
      text: "As the a result",
      explanation: 'You cannot use both "the" and "a" together. The correct phrase is "As a result".',
      suggestion: "As a result",
    },
    {
      id: 8,
      type: "Vocabulary Error",
      text: "leaning learning",
      explanation: 'The word "leaning" (tilting) is incorrect in meaning. It should be "learning" (studying).',
      suggestion: "learning",
    },
    {
      id: 9,
      type: "Verb Tense Error",
      text: "<del>ended</del> ends",
      explanation: 'Verb tense inconsistency. Use either "ends" (present) or "has ended" (present perfect).',
      suggestion: "ends",
    },
    {
      id: 10,
      type: "Quantifier Error",
      text: "little a little",
      explanation: 'With uncountable nouns like "time", use "a little" instead of "little".',
      suggestion: "a little",
    },
    {
      id: 11,
      type: "Possessive Error",
      text: "student's students'",
      explanation: 'Since you are referring to many students, use the plural possessive form "students\'".',
      suggestion: "students'",
    },
    {
      id: 12,
      type: "Preposition Error",
      text: "By in this way",
      explanation: 'You cannot use both "By" and "in" together. The correct phrase is "In this way".',
      suggestion: "In this way",
    },
    {
      id: 13,
      type: "Comparative Error",
      text: "deeper more deeply",
      explanation: 'You cannot use both "deeper" and "more deeply" together. Choose one: "more deeply".',
      suggestion: "more deeply",
    },
    {
      id: 14,
      type: "Preposition Error",
      text: "requirement of for",
      explanation: 'You cannot use both "of" and "for" together. With "requirement", use "requirement for".',
      suggestion: "requirement for",
    },
  ]

  const coherenceErrors = [
    {
      id: 1,
      title: "Insufficient development on the specific impact of having to self-study more at university",
      description:
        "You only described the difference between high school and university, but did not clearly analyze the specific difficulties students face when having to self-study more and carry out complex research projects. You could develop this by analyzing the impact of increased self-study on students, such as: students not knowing how to manage time effectively → leading to procrastination → missing assignment deadlines → getting lower grades → increasing stress and pressure → negatively affecting overall academic performance.",
      suggestion:
        "The reason is given that when they studied at school, their old teachers might give them different examples and exercises in each lesson. Thanks to that, when they studied at school, students could understand the knowledge more effectively and easily.",
    },
    {
      id: 2,
      title: "Insufficient development on the specific impact of lack of personal support from teachers",
      description:
        "You only described the difference between classes in high school and university, but did not clearly analyze the direct consequences of not receiving personal support. You could develop this by analyzing the impact of lacking personal support, such as: students not getting their questions answered promptly → not fully understanding the lessons → accumulating knowledge gaps → struggling to keep up with subsequent lectures → falling behind classmates → losing motivation to study → declining academic performance.",
      suggestion:
        "When university students suddenly need to manage their own study schedule without teacher guidance, many struggle with time management and procrastination. This often results in missed deadlines and poor academic performance, creating a cycle of stress that further hinders their learning ability.",
    },
    {
      id: 3,
      title: "Insufficient development on specific solutions",
      description:
        "The solutions you proposed are still too general and lack feasibility. You need to analyze in more detail how to implement these solutions in practice.",
      suggestion:
        "Most professors may spend a little of their time answering students' questions. In this way, many students can understand the lecture more deeply.",
    },
  ]


  const originalEssayWithHighlights = `Nowadays, there are many students who <mark id="orig-error-1" style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;"><del>are at</del> at</mark> university or college who find it difficult to learn than when they studied at school. This essay will explore some reasons behind this phenomenon.
There are several reasons that make students find <mark id="orig-error-2" style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;"><del>harder</del> it harder</mark> when studying at university or school could understand the knowledge more effectively and easier. In contrast, when they continue to study at university or college, most of students have to look up information about the lecture <mark id="orig-error-3" style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;"><del>in</del> on</mark> the Internet or in specialized books by themselves to do complex <mark id="orig-error-4" style="background-color: #4ADE80; padding: 2px 4px; border-radius: 4px;"> <del>reseach</del> research</mark> projects with minimal guidance from their teachers. Secondly, students are often <mark id="orig-error-5" style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;"> <del>facing up</del> faced</mark> with many classes with <mark id="orig-error-6" style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;"><del>large</del> a large</mark> number of students. These classes can make some students find <mark id="orig-error-2" style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;"><del>harder</del> it harder</mark> to connect with their professors. As <mark id="orig-error-7" style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;"><del>the</del> a</mark> result, the individualized support may decrease.
To address these challenges, students should be more proactive in their <mark id="orig-error-8" style="background-color: #4ADE80; padding: 2px 4px; border-radius: 4px;"><del>leaning</del> learning</mark> processes. For example, when the students have questions about the lecture, they should meet their professors to ask them their questions after the class <mark id="orig-error-9" style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;"><del>ended</del> ends</mark>. Most <mark id="orig-error-10" style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;"><del>of</del></mark> professors may spend <mark id="orig-error-10" style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;"><del>little</del> a little</mark> of their time to answer <mark id="orig-error-11" style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;"><del>student's</del> students'</mark> questions. <mark id="orig-error-12" style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;"><del>By</del> In</mark> this way, many students can understand <mark id="orig-error-13" style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;"><del>deeper</del> more deeply</mark> about the lecture. Moreover, universities and colleges should divide classes into different smaller classes. Thanks to this solution, professors can focus more on their students and enhance the quality of the lecture.
In conclusion, the transition from school to university or college can bring several challenges for many students due to the requirement <mark id="orig-error-14" style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;"><del>of</del> for</mark> concentration and self-study and the lack of individualized support. However, the proactiveness of students and smaller classes can solve these issues.`

const correctedEssayWithHighlights = `Nowadays, there are many students who are at university or college find difficult to learn than when they studied at school. This essay will explore some reasons behind this phenomenon.
There are several reasons that make students find it harder when studying at university or college. Firstly, transition to higher level education is difficult for students to follow. The curriculum at university or college <mark id="corr-error-1" style="background-color: #FFA500; padding: 2px 4px; border-radius: 4px;">The reason is given that when they studied at school, their old teachers might give them different examples and exercises in each lessons. Thanks to that, student when studied at school could understand the knowledge more effectively and easier.</mark> Secondly, students are often facing up with many classes with large number of students. <mark id="corr-error-2" style="background-color: #FFA500; padding: 2px 4px; border-radius: 4px;">As the</mark> result, the individualized support may decrease. This is also very different from what they received from their old teachers at school. Due to the smaller class size, old teachers could focus on all students, so they could know each student's weaknesses and strengths to help them improve their strengths and fix their weaknesses.
To address these challenges, students should be more proactive in their learning processes. For example, when the students have questions about the lecture, they should meet their professors to ask them their questions after the class ended. <mark id="corr-error-3" style="background-color: #FFA500; padding: 2px 4px; border-radius: 4px;">Most of professors may spend little of their time to answer student's questions. By this way, many students can understand deeper about the lecture.</mark>
In conclusion, the transition from school to university or college can bring several challenges for many students due to the requirement of concentration and self-study and the lack of individualized support. However, by the proactive of students and smaller classes can solve these issues.`

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const toggleCriteria = (criteria: string) => {
    const newExpanded = new Set(expandedCriteria)
    if (newExpanded.has(criteria)) {
      newExpanded.delete(criteria)
    } else {
      newExpanded.add(criteria)
    }
    setExpandedCriteria(newExpanded)
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

  const getFontSizeErrorValue = () => {
    switch (fontSize) {
      case "small":
        return "sm"
      case "large":
        return "lg"
      default:
        return "md"
    }
  }

  const getFontSizeTitleValue = () => {
    switch (fontSize) {
      case "small":
        return "md"
      case "large":
        return "xl"
      default:
        return "lg"
    }
  }

  const highlightErrors = (text: string) => {
    let highlightedText = text
    grammarErrors.forEach((error) => {
      const regex = new RegExp(`\\b${error.text}\\b`, "gi")
      highlightedText = highlightedText.replace(
        regex,
        `<mark style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;">${error.text}</mark>`,
      )
    })
    return highlightedText
  }

  const scrollToError = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('error-highlight');
      setTimeout(() => {
        element.classList.remove('error-highlight');
      }, 2000);
    }
  };

  const writingTabs = [
    { value: "original", label: "Task 1" },
    { value: "edited", label: "Task 2" },
  ]

  return (
    <Box minH="100vh" bg={bgColor}>
      <style jsx global>{`
        .error-highlight {
          display: inline-block;
          transition: transform 0.3s ease-in-out;
          position: relative;
        }
        .error-highlight::before {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          z-index: -1;
          background: ${highlightBg};
          border-radius: 8px;
          animation: pulse 2s ease-in-out;
        }
        @keyframes pulse {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
      {/* Header - Unified style with reading/listening */}
      <Box bg={bgColor} borderColor={borderColor} px={4}>
        <Box display="grid" gridTemplateColumns="1fr auto 1fr" alignItems="center" w="full" mx="auto">
          {/* Left Section - Exit + Tabs */}
          <HStack gap={4} height="60px">
            <Box alignItems="center">
              <ExitTestButton />
            </Box>
            <Box marginTop="auto">
              <TabSelector
                activeTab={activeTab}
                onTabChange={(tab) => setActiveTab(tab as "original" | "edited")}
                tabs={writingTabs}
              />
            </Box>
          </HStack>
            {/* Center Section - Time (and Score if needed) */}
            <Box py={3}>
              <HStack gap={2} justify="center" bg={questionBackgroundColor} px={3} py={1} borderRadius="full">
                <HStack>
                  <Icon as={MdTimer} color={greenThemeColor}/>
                  <Text fontSize={getFontSizeValue()} fontWeight="medium" color={textColor}>
                    00:30:12
                  </Text>
                </HStack>
                {/* Add score here if you want to match reading/listening exactly */}
              </HStack>
            </Box>

            {/* Right Section - Settings */}
            <HStack justify="flex-end">
              <SettingsMenu fontSize={fontSize} onFontSizeChange={setFontSize} />
            </HStack>
          </Box>
        </Box>

      {/* Main Content */}
      <Flex h="calc(100vh - 60px)" mx="auto">
        {/* Left Panel - Essay Content */}
        <Box width={`${leftPanelWidth}%`} borderRight="1px" borderColor={borderColor} overflow="auto" p={6} bg={contentBackgroundColor}>
          <VStack align="start" gap={6}>
            {/* Word Count */}
            <VStack alignItems={"left"}>
              <Text fontSize="md" color={mutedColor}  px={4} textAlign={"left"}>
                Word count: 384
              </Text>
              {/* Essay Question */}
              <Box w="full" py={2} px={4} border="1px solid" borderColor={textColor}>
                <Text fontSize={getFontSizeValue()} color={textColor} fontStyle="italic">
                  Many students find it harder to study when they are at university or college than when they were at
                  school. Why is this? What can be done to solve the problem?
                </Text>
              </Box>
            </VStack>

            {/* Grammar & Vocabulary Section */}
            <Box w="full">
              <Button
                variant="ghost"
                onClick={() => toggleSection("grammar")}
                // rightIcon={<Icon as={expandedSections.has("grammar") ? MdExpandLess : MdExpandMore} />}
                w="full"
                justifyContent="space-between"
                p={4}
                borderRadius="lg"
                _hover={{ bg: useColorModeValue("gray.200", "gray.600") }}
              >
                <Text fontSize={getFontSizeTitleValue()} fontWeight="bold" color={textColor}>
                  Grammar & Vocabulary Correction
                </Text>
                <Icon as={expandedSections.has("grammar") ? MdExpandLess : MdExpandMore} />
              </Button>

              {expandedSections.has("grammar") && (
                <Box mt={4} p={4} border="1px" borderColor={borderColor} borderRadius="lg" bg={bgColor}>
                  <Text
                    fontSize={getFontSizeValue()}
                    color={textColor}
                    lineHeight="1.8"
                    whiteSpace="pre-line"
                    dangerouslySetInnerHTML={{ __html: originalEssayWithHighlights }}
                  />
                </Box>
              )}
            </Box>

            {/* Logic & Coherence Section */}
            <Box w="full">
              <Button
                variant="ghost"
                onClick={() => toggleSection("coherence")}
                // rightIcon={<Icon as={expandedSections.has("coherence") ? MdExpandLess : MdExpandMore} />}
                w="full"
                justifyContent="space-between"
                p={4}
                borderRadius="lg"
                _hover={{ bg: useColorModeValue("gray.200", "gray.600") }}
              >
                <Text fontSize={getFontSizeTitleValue()} fontWeight="bold" color={textColor}>
                  Coherence & Cohesion Correction
                </Text>
                <Icon as={expandedSections.has("coherence") ? MdExpandLess : MdExpandMore} />
              </Button>

              {expandedSections.has("coherence") && (
                <Box mt={4}>
                  <Text fontSize={getFontSizeValue()} fontWeight="bold" color="green.600" mb={4} textAlign="center">
                    LUMI's Revised Essay
                  </Text>
                  <Box p={4} border="1px" borderColor={borderColor} borderRadius="lg" bg={bgColor}>
                    <Text
                      fontSize={getFontSizeValue()}
                      color={textColor}
                      lineHeight="1.8"
                      whiteSpace="pre-line"
                      dangerouslySetInnerHTML={{ __html: correctedEssayWithHighlights }}
                    />
                  </Box>
                </Box>
              )}
            </Box>
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

        {/* Right Panel - Scoring */}
        <Box width={`${100 - leftPanelWidth}%`} minWidth={`30%`} overflow="auto" pt={6} bg={contentBackgroundColor}>
          <VStack align="start" gap={0}>
            {/* Overall Score */}
            <Box w="full" textAlign="center">
              <HStack justify="flex-start" mb={4} px={6}>
                <img src={"/favicon.png"} width="50px"/>
                <Text fontSize="lg" fontWeight="bold" color={textColor}>
                  LUMI Evaluation Score
                </Text>
              </HStack>

              <Flex justify="center" gap={4} align="stretch" w="full" px={6} mb={6}>
                <Box textAlign="center" flex={1} minW={0} maxW="300px" display="flex">
                  <Box
                    bg="green.600"
                    color="white"
                    py={9}
                    borderRadius="lg"
                    w="full"
                    h="full"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <Text fontSize={getFontSizeValue()} opacity={0.9} px={9}>
                      Est. Band Score
                    </Text>
                    <Text fontSize="5xl" fontWeight="bold" my="1"> 
                      7.0
                    </Text>
                    <Text fontSize={getFontSizeValue()} opacity={0.9}>
                      +/- 0.5
                    </Text>
                  </Box>
                </Box>

                <SimpleGrid columns={2} gap={4} flex={2} w="full" minW={0}>
                  {scoringCriteria.map((criteria) => (
                    <VStack justifyContent={"space-between"} key={criteria.name} bg="gray.100" p={3} borderRadius="lg" textAlign="center" minW={0} w="full">
                      <Text fontSize={getFontSizeErrorValue()}  color="gray.600" mb={1}>
                        {criteria.name}
                      </Text>
                      <Text fontSize={getFontSizeTitleValue()} fontWeight="bold" color="black">
                        {criteria.score}
                      </Text>
                    </VStack>
                  ))}
                </SimpleGrid>
              </Flex>
            </Box>

            {/* Detailed Criteria */}
            <Box w="full" px={6}>
              <Button
                variant="ghost"
                onClick={() => toggleCriteria("details")}
                w="full"
                justifyContent="space-between"
                p={4}
                borderRadius="lg"
                mb={6}
                _hover={{ bg: useColorModeValue("gray.200", "gray.600") }}
              >
                <Text fontSize={getFontSizeTitleValue()} fontWeight="bold" color={textColor}>
                  Criteria Comments
                </Text>
                <Icon as={expandedCriteria.has("details") ? MdExpandLess : MdExpandMore} />
              </Button>

              {expandedCriteria.has("details") && (
                <VStack gap={4} w="full" mb={6}>
                  {scoringCriteria.map((criteria, idx) => (
                    <>
                      <Box key={criteria.name} w="full" p={4} border="2px solid" borderColor="green.600" borderRadius="xl">
                        <Text fontSize="lg" fontWeight="bold" color={textColor} mb={2}>
                          {criteria.name}: {criteria.score}
                        </Text>
                        <Text fontSize="sm" color={textColor} mb={3}>
                          {criteria.description}
                        </Text>

                        {criteria.subCriteria && (
                          <SimpleGrid columns={1} gap={0}>
                            {criteria.subCriteria.map((sub) => (
                              <HStack key={sub.name} pb={1} borderRadius="md">
                                <Box border="0.5px solid" px={2} py={1} borderColor="green.600" bgColor="green.50" borderRadius={"lg"}>
                                  <Text fontSize="xs" fontWeight={"bold"} color="black">
                                    {sub.score}
                                  </Text>
                                </Box>
                                <Text fontSize="xs" fontWeight={"bold"} color={textColor}>
                                  {sub.name}
                                </Text>
                              </HStack>
                            ))}
                          </SimpleGrid>
                        )}
                      </Box>
                      {idx < scoringCriteria.length - 1 && (
                        <Box w="full">
                          <Box borderColor={textColor} borderBottom="0.1px solid" my={1} />
                        </Box>
                      )}
                    </>
                  ))}
                </VStack>
              )}
            </Box>

            {/* Tab Navigation */}
            <Box w="100%" px={6} bg={bgColor} pt={2}>
              <TabSelector
                activeTab={activeRightTab}
                onTabChange={(tab) => setActiveRightTab(tab as "grammar" | "coherence")}
                tabs={[
                  { value: "grammar", label: "Grammar & Vocabulary" },
                  { value: "coherence", label: "Coherence & Cohesion" },
                ]}
              />
            </Box>
            
            {/* Tab Content */}
            {activeRightTab === "grammar" && (
              <Box w="full" px={6} pt={4} pb={6}>
                <HStack justify="space-between" mb={4}>
                  <Text fontSize={getFontSizeTitleValue()} fontWeight="bold" color={textColor}>
                    Grammar & Vocabulary Correction
                  </Text>
                  <Badge fontSize={getFontSizeErrorValue()} colorPalette="yellow" variant="solid" borderRadius="full" px={3} py={1}>
                    Number of errors: 15
                  </Badge>
                </HStack>

                <VStack gap={4} w="full">
                  {grammarErrors.map((error) => (
                      <Box key={error.id} w="full" p={4} bg={cardBgColor} borderRadius="lg" shadow={"sm"} cursor="pointer" onClick={() => scrollToError(`orig-error-${error.id}`)}> 
                        <Text fontSize="md" fontWeight="bold" color={textColor} mb={3} textDecoration={"underline"}>
                          {error.type === "Vocabulary Error" ? "Vocabulary" : "Grammar"}: {error.type}
                        </Text>
                        <Text fontSize={getFontSizeErrorValue()} color={textColor} lineHeight="1.6">
                          {error.explanation}
                        </Text>
                      </Box>
                  ))}
                </VStack>
              </Box>
            )}

            {activeRightTab === "coherence" && (
              <Box w="full" px={6} pt={4} pb={6}>
                <HStack justify="space-between" mb={4}>
                  <Text fontSize={getFontSizeTitleValue()} fontWeight="bold" color={textColor}>
                    Coherence & Cohesion Correction
                  </Text>
                  <Badge fontSize={getFontSizeErrorValue()} colorPalette="yellow" variant="solid" borderRadius="full" px={3} py={1}>
                    Number of errors: 3
                  </Badge>
                </HStack>

                <VStack gap={6} w="full">
                  {coherenceErrors.map((error) => (
                    <Box key={error.id} w="full" p={4} bg={cardBgColor} borderRadius="lg" shadow={"md"} cursor="pointer" onClick={() => scrollToError(`corr-error-${error.id}`)}>
                      <Text fontSize={getFontSizeErrorValue()} color={textColor} lineHeight="1.8" mb={4}>
                        {error.description}
                      </Text>

                      <Box borderRadius="md" borderLeft="4px">
                        <Text fontSize={getFontSizeErrorValue()} fontWeight="bold" color="orange.500" mb={2}>
                          Suggestion:
                        </Text>
                        <Text fontSize={getFontSizeErrorValue()} color={textColor} lineHeight="1.6">
                          {error.suggestion}
                        </Text>
                      </Box>
                    </Box>
                  ))}
                </VStack>
              </Box>
            )}
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
}
