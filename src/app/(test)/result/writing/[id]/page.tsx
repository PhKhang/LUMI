"use client"

import { useState } from "react"
import { Box, Flex, HStack, VStack, Text, Button, IconButton, Badge, SimpleGrid, Tabs } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import { MenuButton, MenuList, Menu, MenuItem } from "@chakra-ui/menu"
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode"
import { MdClose, MdSettings, MdAccessTime, MdLightMode, MdDarkMode, MdExpandMore, MdExpandLess, MdNote, MdEdit } from "react-icons/md"
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
  const [activeTab, setActiveTab] = useState<"original" | "edited">("original")
  const [activeRightTab, setActiveRightTab] = useState<"grammar" | "coherence">("grammar")
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium")
  const [leftPanelWidth, setLeftPanelWidth] = useState(50)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["grammar", "coherence"]))
  const [expandedCriteria, setExpandedCriteria] = useState<Set<string>>(new Set())
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue("#F6F0E7", "gray.800")
  const contentBackgroundColor = useColorModeValue("#FFFAF6", "gray.900") // background color for left (passages content) and right (test answers) panel
  const questionBackgroundColor = useColorModeValue("white", "gray.700")
  const borderColor = useColorModeValue("gray.200", "gray.600")
  const textColor = useColorModeValue("gray.800", "white")
  const mutedColor = useColorModeValue("gray.600", "gray.400")
  const cardBgColor = useColorModeValue("gray.50", "gray.700")

  const overallScore = 7.0
  const totalErrors = 15

  const scoringCriteria: ScoreCriteria[] = [
    {
      name: "Task Achievement",
      score: 6,
      maxScore: 9,
      description:
        "Bài viết có thể đáp ứng đầy đủ các yêu cầu của đề bài, nêu rõ lý do và đề xuất giải pháp. Tuy nhiên, phần phát triển ý tưởng và vị trí mình hơi chưa thật sâu sắc và cụ thể.",
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
        "Bài viết có cấu trúc rõ ràng với mở bài, thân bài và kết bài. Tuy nhiên, sự liên kết giữa các ý tưởng chưa thật tốt và việc sử dụng từ nối còn ít và việc sử dụng từ thực sự hiệu quả.",
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
        "Vốn từ vựng ở mức độ chấp nhận được, có sử dụng một số từ vựng học thuật và chuyên ngành phù hợp với chủ đề.",
    },
    {
      name: "Grammatical Range & Accuracy",
      score: 8,
      maxScore: 9,
      description:
        "Bài viết có sử dụng một số cấu trúc câu phức tạp nhưng còn mắc nhiều lỗi ngữ pháp và cú pháp, ảnh hưởng đến sự rõ ràng của ý nghĩa.",
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
        explanation: 'Cấu trúc "are at at" bị lặp từ "at". Chỉ cần dùng "are at university" là đủ.',
        suggestion: "are at",
      },
      {
        id: 2,
        type: "Object missing",
        text: "find harder it harder",
        explanation: 'Cấu trúc bị lặp "harder". Nên dùng "find it harder" hoặc "find it more difficult".',
        suggestion: "find it harder",
      },
      {
        id: 3,
        type: "Preposition Error",
        text: "in on the internet",
        explanation: 'Không thể dùng cả "in" và "on" cùng lúc. Với "internet" chỉ dùng "on the internet".',
        suggestion: "on the internet",
      },
      {
        id: 4,
        type: "Word Repetition",
        text: "research research",
        explanation: 'Từ "research" bị lặp lại. Chỉ cần dùng một lần.',
        suggestion: "research",
      },
      {
        id: 5,
        type: "Phrasal Verb Error",
        text: "facing up faced",
        explanation: 'Cấu trúc sai. Nên dùng "are faced with" hoặc "are facing".',
        suggestion: "are faced",
      },
      {
        id: 6,
        type: "Article Error",
        text: "large a large",
        explanation: 'Mạo từ "a" đặt sai vị trí. Nên là "a large number".',
        suggestion: "a large",
      },
      {
        id: 7,
        type: "Article Error",
        text: "As the a result",
        explanation: 'Không thể dùng cả "the" và "a" cùng lúc. Cụm từ đúng là "As a result".',
        suggestion: "As a result",
      },
      {
        id: 8,
        type: "Spelling Error",
        text: "leaning learning",
        explanation: 'Từ "leaning" (nghiêng) sai nghĩa. Phải là "learning" (học tập).',
        suggestion: "learning",
      },
      {
        id: 9,
        type: "Verb Tense Error",
        text: "ended ends",
        explanation: 'Thì động từ không nhất quán. Nên dùng "ends" (hiện tại) hoặc "has ended" (hoàn thành).',
        suggestion: "ends",
      },
      {
        id: 10,
        type: "Quantifier Error",
        text: "little a little",
        explanation: 'Với danh từ không đếm được "time", nên dùng "a little" thay vì "little".',
        suggestion: "a little",
      },
      {
        id: 11,
        type: "Possessive Error",
        text: "student's students'",
        explanation: 'Vì đang nói về nhiều sinh viên nên cần dùng sở hữu cách số nhiều "students\'".',
        suggestion: "students'",
      },
      {
        id: 12,
        type: "Preposition Error",
        text: "By in this way",
        explanation: 'Không thể dùng cả "By" và "in" cùng lúc. Cụm từ đúng là "In this way".',
        suggestion: "In this way",
      },
      {
        id: 13,
        type: "Comparative Error",
        text: "deeper more deeply",
        explanation: 'Không thể dùng cả "deeper" và "more deeply". Chọn một trong hai: "more deeply".',
        suggestion: "more deeply",
      },
      {
        id: 14,
        type: "Preposition Error",
        text: "requirement of for",
        explanation: 'Không thể dùng cả "of" và "for" cùng lúc. Với "requirement" dùng "requirement for".',
        suggestion: "requirement for",
      },
  ]
  const coherenceErrors = [
    {
      id: 1,
      title: "Development chưa đủ sâu về tác động cụ thể của việc phải tự học nhiều hơn ở đại học",
      description:
        "Bạn mới chỉ mô tả sự khác biệt giữa trường phổ thông và đại học, nhưng chưa phân tích rõ những khó khăn cụ thể mà sinh viên gặp phải khi phải tự học nhiều hơn và làm research projects phức tạp. Bạn có thể develop bằng cách phân tích tác động của việc phải tự học nhiều hơn đến sinh viên như: sinh viên không biết cách quản lý thời gian hiệu quả → dẫn đến trì hoãn công việc → không hoàn thành bài tập đúng hạn → điểm số thấp → áp lực và căng thẳng tăng lên → ảnh hưởng đến kết quả học tập tổng thể.",
      suggestion:
        "When university students suddenly need to manage their own study schedule without teacher guidance, many struggle with time management and procrastination. This often results in missed deadlines and poor academic performance, creating a cycle of stress that further hinders their learning ability.",
    },
    {
      id: 2,
      title: "Development chưa đủ sâu về tác động cụ thể của việc thiếu hỗ trợ cá nhân từ giáo viên",
      description:
        "Bạn mới chỉ mô tả sự khác biệt giữa lớp học ở trường phổ thông và đại học, nhưng chưa phân tích rõ những hệ quả trực tiếp của việc không nhận được sự hỗ trợ cá nhân. Bạn có thể develop bằng cách phân tích tác động của việc thiếu hỗ trợ cá nhân như: sinh viên không được giải đáp thắc mắc kịp thời → không hiểu bài đầy đủ → tích lũy kiến thức hổng → khó theo kịp bài giảng tiếp theo → tụt hậu so với bạn bè → mất động lực học tập → kết quả học tập giảm sút.",
      suggestion:
        "When university students suddenly need to manage their own study schedule without teacher guidance, many struggle with time management and procrastination. This often results in missed deadlines and poor academic performance, creating a cycle of stress that further hinders their learning ability.",
    },
    {
      id: 3,
      title: "Development chưa đủ sâu về giải pháp cụ thể",
      description:
        "Các giải pháp bạn đưa ra còn chung chung và thiếu tính khả thi. Bạn cần phân tích sâu hơn về cách thực hiện các giải pháp này trong thực tế.",
      suggestion: "Provide more specific and actionable solutions with concrete examples of implementation.",
    },
  ]

  const originalEssayWithHighlights = `Nowadays, there are many students who <mark style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;">are at at</mark> university or college who find it difficult to learn than when they studied at school. This essay will explore some reasons behind this phenomenon.
There are several reasons that make students find <mark style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;">harder it harder</mark> when studying at university or school could understand the knowledge more effectively and easier. In contrast, when they continue to study at university or college, most of students have to look up information about the lecture <mark style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;">in on</mark> the Internet or in specialized books by themselves to do complex <mark style="background-color: #4ADE80; padding: 2px 4px; border-radius: 4px;"> <del>reseach</del> research</mark> projects with minimal guidance from their teachers. Secondly, students are often <mark style="background-color: #4ADE80; padding: 2px 4px; border-radius: 4px;"> <del>facing up</del> faced</mark> with many classes with <mark style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;">large a large</mark> number of students. These classes can make some students find <mark style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;">harder it harder</mark> to connect with their professors. As <mark style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;">the a</mark> result, the individualized support may decrease.
To address these challenges, students should be more proactive in their <mark style="background-color: #4ADE80; padding: 2px 4px; border-radius: 4px;"><del>leaning</del> learning</mark> processes. For example, when the students have questions about the lecture, they should meet their professors to ask them their questions after the class <mark style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;">ended ends</mark>. Most <mark style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;">of</mark> professors may spend <mark style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;">little a little</mark> of their time to answer <mark style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;">student's students'</mark> questions. <mark style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;">By in</mark> this way, many students can understand <mark style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;">deeper more deeply</mark> about the lecture. Moreover, universities and colleges should divide classes into different smaller classes. Thanks to this solution, professors can focus more on their students and enhance the quality of the lecture.
In conclusion, the transition from school to university or college can bring several challenges for many students due to the requirement <mark style="background-color: #FEF08A; padding: 2px 4px; border-radius: 4px;">of for</mark> concentration and self-study and the lack of individualized support. However, the proactiveness of students and smaller classes can solve these issues.`

const correctedEssayWithHighlights = `Nowadays, there are many students who are at university or college find difficult to learn than when they studied at school. This essay will explore some reasons behind this phenomenon.
There are several reasons that make students find it harder when studying at university or college. Firstly, transition to higher level education is difficult for students to follow. The curriculum at university or college <mark style="background-color: #FFA500; padding: 2px 4px; border-radius: 4px;">The reason is given that when they studied at school, their old teachers might give them different examples and exercises in each lessons. Thanks to that, student when studied at school could understand the knowledge more effectively and easier.</mark> Secondly, students are often facing up with many classes with large number of students. <mark style="background-color: #FFA500; padding: 2px 4px; border-radius: 4px;">As the result, the individualized support may decrease. This is also very different from what they received from their old teachers at school. Due to the smaller class size, old teachers could focus on all students, so they could know each student's weaknesses and strengths to help them improve their strengths and fix their weaknesses.</mark>
To address these challenges, students should be more proactive in their learning processes. For example, when the students have questions about the lecture, they should meet their professors to ask them their questions after the class ended. <mark style="background-color: #FFA500; padding: 2px 4px; border-radius: 4px;">Most of professors may spend little of their time to answer student's questions. By this way, many students can understand deeper about the lecture.</mark>
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

  const writingTabs = [
    { value: "original", label: "Bài gốc", icon: MdNote },
    { value: "edited", label: "Bài sửa", icon: MdEdit },
  ]

  return (
    <Box minH="100vh" bg={bgColor}>
      {/* Control Bar */}
      <Box bg={bgColor} borderBottom="1px" borderColor={borderColor} px={4} position="sticky" top={0} zIndex={1000}>
        <Box display="grid" gridTemplateColumns="1fr auto 1fr" alignItems="center" w="full" mx="auto">
          {/* Left Section - Close Button + Tabs */}
            <HStack gap={4} height="60px">
            <Box alignItems="center">
                <IconButton aria-label="Close" variant="outline" size="sm" rounded="full"> <Icon as={MdClose} /> </IconButton>
            </Box>
            
              <TabSelector
                activeTab={activeTab}
                onTabChange={(tab) => setActiveTab(tab as "original" | "edited")}
                tabs={writingTabs}
              />
            </HStack>
            {/* Center Section - Time + Score */}
          <Box py={3}>
            <HStack gap={2} justify="center" bg={questionBackgroundColor} px={3} py={1} borderRadius={"full"}>
              <HStack>
                <Icon as={MdAccessTime} color="accent" />
                <Text fontSize={getFontSizeValue()} fontWeight="medium" color={textColor}>
                  00:10:39
                </Text>
              </HStack>
            </HStack>
          </Box>

          {/* Right Section - Settings */}
          <HStack justify="flex-end">
            <SettingsMenu fontSize={fontSize} onFontSizeChange={setFontSize}/>
          </HStack>
        </Box>
      </Box>

      {/* Main Content */}
      <Flex h="calc(100vh - 60px)" mx="auto">
        {/* Left Panel - Essay Content */}
        <Box width={`${leftPanelWidth}%`} borderRight="1px" borderColor={borderColor} overflow="auto" p={6} bg={contentBackgroundColor}>
          <VStack align="start" gap={6}>
            {/* Word Count */}
            <Text fontSize="lg" color={mutedColor}>
              Word count: 384
            </Text>

            {/* Essay Question */}
            <Box w="full" p={4} border="1px" borderColor={borderColor} borderRadius="lg" bg={cardBgColor}>
              <Text fontSize={getFontSizeValue()} color={textColor} fontStyle="italic">
                Many students find it harder to study when they are at university or college than when they were at
                school. Why is this? What can be done to solve the problem?
              </Text>
            </Box>

            {/* Grammar & Vocabulary Section */}
            <Box w="full">
              <Button
                variant="ghost"
                onClick={() => toggleSection("grammar")}
                // rightIcon={<Icon as={expandedSections.has("grammar") ? MdExpandLess : MdExpandMore} />}
                w="full"
                justifyContent="space-between"
                p={4}
                bg={cardBgColor}
                borderRadius="lg"
                _hover={{ bg: useColorModeValue("gray.100", "gray.600") }}
              >
                <Text fontSize="lg" fontWeight="bold" color={textColor}>
                  Sửa lỗi Ngữ pháp và Từ vựng
                </Text>
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
                bg={cardBgColor}
                borderRadius="lg"
                _hover={{ bg: useColorModeValue("gray.100", "gray.600") }}
              >
                <Text fontSize="lg" fontWeight="bold" color={textColor}>
                  Sửa lỗi Lập luận và Mạch lạc
                </Text>
              </Button>

              {expandedSections.has("coherence") && (
                <Box mt={4}>
                  <Text fontSize="lg" fontWeight="bold" color="green.500" mb={4} textAlign="center">
                    Bài sửa của LUMI
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
        <Box width={`${100 - leftPanelWidth}%`} overflow="auto" p={6} bg={contentBackgroundColor}>
          <VStack align="start" gap={6}>
            {/* Overall Score */}
            <Box w="full" textAlign="center">
              <HStack justify="flex-start" mb={4}>
                <Box w={8} h={8} bg="yellow.400" borderRadius="full" ml="20px" />
                <Text fontSize="lg" fontWeight="bold" color={textColor}>
                  Điểm LUMI chấm
                </Text>
              </HStack>

              <Flex justify="center" gap={6} align="stretch">
                <Box textAlign="center">
                  <Box
                    bg="green.500"
                    color="white"
                    p={9}
                    borderRadius="lg"
                    w="full"
                    h="full"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <Text fontSize="sm" opacity={0.9} >
                      Est. Band Score
                    <Text fontSize="4xl" fontWeight="bold" my="1"> 
                      {overallScore}
                    </Text>
                       
                    </Text>
                    <Text fontSize="sm" opacity={0.9}>
                      +/- 0.5
                    </Text>
                  </Box>
                </Box>

                <SimpleGrid columns={2} gap={4}>
                  {scoringCriteria.map((criteria) => (
                    <Box key={criteria.name} bg="gray.100" p={3} borderRadius="lg" textAlign="center" minW="100px">
                      <Text fontSize="xs" color="gray.600" mb={1}>
                        {criteria.name}
                      </Text>
                      <Text fontSize="xl" fontWeight="bold" color={textColor}>
                        {criteria.score}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Flex>
            </Box>

            {/* Detailed Criteria */}
            <Box w="full">
              <Button
                variant="ghost"
                onClick={() => toggleCriteria("details")}
                w="full"
                justifyContent="space-between"
                p={4}
                bg={cardBgColor}
                borderRadius="lg"
                mb={4}
              >
                <Icon as={expandedCriteria.has("details") ? MdExpandLess : MdExpandMore} />
                <Text fontSize="lg" fontWeight="bold" color={textColor}>
                  Nhận xét các tiêu chí điểm
                </Text>
              </Button>

              {expandedCriteria.has("details") && (
                <VStack gap={4} w="full">
                  {scoringCriteria.map((criteria) => (
                    <Box key={criteria.name} w="full" p={4} border="2px" borderColor="green.200" borderRadius="lg">
                      <Text fontSize="lg" fontWeight="bold" color={textColor} mb={2}>
                        {criteria.name}: {criteria.score}
                      </Text>
                      <Text fontSize="sm" color={mutedColor} mb={3}>
                        {criteria.description}
                      </Text>

                      {criteria.subCriteria && (
                        <SimpleGrid columns={2} gap={2}>
                          {criteria.subCriteria.map((sub) => (
                            <HStack key={sub.name} justify="space-between" p={2} bg={cardBgColor} borderRadius="md">
                              <Text fontSize="xs" color={textColor}>
                                {sub.score}
                              </Text>
                              <Text fontSize="xs" color={mutedColor}>
                                {sub.name}
                              </Text>
                            </HStack>
                          ))}
                        </SimpleGrid>
                      )}
                    </Box>
                  ))}
                </VStack>
              )}
            </Box>

             {/* Tab Navigation */}
             <HStack gap={2} w="full" mb={4}>
              <Button
                variant={activeRightTab === "grammar" ? "solid" : "outline"}
                colorScheme={activeRightTab === "grammar" ? "green" : "gray"}
                size="sm"
                onClick={() => setActiveRightTab("grammar")}
                borderRadius="full"
                flex={1}
              >
              Ngữ pháp và Từ vựng
              </Button>
              <Button
                variant={activeRightTab === "coherence" ? "solid" : "outline"}
                colorScheme={activeRightTab === "coherence" ? "orange" : "gray"}
                size="sm"
                onClick={() => setActiveRightTab("coherence")}
                borderRadius="full"
                flex={1}
              >
              Lập luận và Mạch lạc
              </Button>
            </HStack>

            {/* Tab Content */}
            {activeRightTab === "grammar" && (
              <Box w="full">
                <HStack justify="space-between" mb={4}>
                  <HStack gap={4}>
                    <HStack>
                      <Box w={3} h={3} bg="yellow.400" borderRadius="full" />
                      <Text fontSize="sm" color={textColor}>
                        Ngữ pháp
                      </Text>
                    </HStack>
                    <HStack>
                      <Box w={3} h={3} bg="green.400" borderRadius="full" />
                      <Text fontSize="sm" color={textColor}>
                        Từ vựng
                      </Text>
                    </HStack>
                  </HStack>
                  <Badge colorScheme="yellow" variant="solid" borderRadius="full" px={3} py={1}>
                    Tổng hợp lỗi 15
                  </Badge>
                </HStack>

                <Text fontSize="lg" fontWeight="bold" color={textColor} mb={4}>
                  Sửa lỗi Ngữ pháp và Từ vựng
                </Text>

                <VStack gap={4} w="full">
                  {grammarErrors.map((error) => (
                    <Box key={error.id} w="full" p={4} bg={cardBgColor} borderRadius="lg">
                      <Text fontSize="md" fontWeight="bold" color={textColor} mb={3}>
                        {error.type === "Uncommon Pairings" ? "Từ vựng" : "Ngữ pháp"}: {error.type}
                      </Text>
                      <Text fontSize="sm" color={mutedColor} lineHeight="1.6">
                        {error.explanation}
                      </Text>
                    </Box>
                  ))}
                </VStack>
              </Box>
            )}

            {activeRightTab === "coherence" && (
              <Box w="full">
                <HStack justify="space-between" mb={4}>
                  <Text fontSize="lg" fontWeight="bold" color={textColor}>
                    Sửa lỗi Lập luận và Mạch lạc
                  </Text>
                  <Badge colorScheme="yellow" variant="solid" borderRadius="full" px={3} py={1}>
                    Tổng hợp lỗi 3
                  </Badge>
                </HStack>

                <VStack gap={6} w="full">
                  {coherenceErrors.map((error) => (
                    <Box key={error.id} w="full" p={4} bg={cardBgColor} borderRadius="lg">
                      <Text fontSize="sm" color={mutedColor} lineHeight="1.8" mb={4}>
                        {error.description}
                      </Text>

                      <Box bg="orange.50" p={3} borderRadius="md" borderLeft="4px" borderColor="orange.400">
                        <Text fontSize="sm" fontWeight="bold" color="orange.800" mb={2}>
                          Gợi ý sửa:
                        </Text>
                        <Text fontSize="sm" color="orange.700" lineHeight="1.6">
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
