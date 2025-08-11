"use client"

import { useState } from "react"
import { Box, Flex, HStack, VStack, Text, IconButton, Badge, Textarea } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode"
import { MdAccessTime, MdMic, MdVolumeUp } from "react-icons/md"
import ExitTestButton from "@/components/ui/exit-test-button"
import SettingsMenu from "@/components/ui/settings-menu"
import AudioPlayer from "@/components/audio/audio-player"
import TabSelector from "@/components/ui/tab-selector"

interface ScoreSection {
  id: string
  name: string
  score: number
  maxScore: number
}

export default function SpeakingTestResult() {
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "vi">("vi")
  const [activeTab, setActiveTab] = useState<"part1" | "part2" | "part3">("part1")
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium")
  const [leftPanelWidth, setLeftPanelWidth] = useState(50)
  const [activeSection, setActiveSection] = useState<string>("overall")
  const [userNotes, setUserNotes] = useState("")
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue("#F6F0E7", "gray.800")
  const contentBackgroundColor = useColorModeValue("#FFFAF6", "gray.900")
  const questionBackgroundColor = useColorModeValue("white", "gray.700")
  const borderColor = useColorModeValue("gray.200", "gray.600")
  const textColor = useColorModeValue("gray.800", "white")
  const mutedColor = useColorModeValue("gray.600", "gray.400")
  const cardBgColor = useColorModeValue("gray.50", "gray.700")

  const overallScore = 5.5

  const scoreSections: ScoreSection[] = [
    { id: "overall", name: "Overall", score: 5.5, maxScore: 9 },
    { id: "grammatical", name: "Grammatical", score: 5.0, maxScore: 9 },
    { id: "pronunciation", name: "Pronunciation", score: 6.0, maxScore: 9 },
    { id: "lexical", name: "Lexical Resource", score: 6.0, maxScore: 9 },
    { id: "fluency", name: "Fluency & Coherence", score: 5.0, maxScore: 9 },
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
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

  const getSectionBadgeColor = (sectionId: string) => {
    if (sectionId === "overall") return "green"
    return "gray"
  }

  // Sample data for corrections
  const grammaticalCorrections = [
    {
      text: "to access toto access",
      explanation: 'Cấu trúc "access something" không cần thêm giới từ "to" sau "access"',
    },
    {
      text: "almost because I spend almost all",
      explanation: 'Khi nói "almost my time" cần thêm từ "all" để biểu thị "gần như tất cả thời gian"',
    },
    { text: "the web. But inon", explanation: 'Cần dùng mạo từ "the" với "web" khi nói về việt lướt web nói chung' },
    {
      text: "environment, the atmosphere is aroundthe environment or the surrounding atmosphere",
      explanation:
        'Cách diễn đạt này không tự nhiên và rõ ràng. Nên dùng "the environment or the surrounding atmosphere" để nghĩa hơn',
    },
  ]

  const pronunciationCorrections = [
    { word: "atmosphere", incorrect: "/ˈætməfɪr/", correct: "/ˈætməsfɪr/" },
    { word: "to", incorrect: "/tu:/", correct: "/tə/" },
    { word: "would", incorrect: "/wuːd/", correct: "/wʊd/" },
  ]

  const lexicalSuggestions = [
    {
      original: "the network condition",
      suggestion: "network conditions",
      explanation: "tính trạng mạng gồm nhiều yếu tố → conditions tổng quát và chính xác hơn.",
    },
    {
      original: "atmosphere",
      suggestion: "surrounding atmosphere",
      explanation: '"surrounding" giúp làm rõ nghĩa vật lý, môi trường xung quanh nơi đang nói đến.',
    },
  ]

  const speakingTabs = [
    { value: "part1", label: "Part 1" },
    { value: "part2", label: "Part 2" },
    { value: "part3", label: "Part 3" },
  ]

  return (
    <Box minH="100vh" bg={bgColor}>
      {/* Control Bar */}
      <Box bg={bgColor} borderBottom="1px" borderColor={borderColor} px={4} position="sticky" top={0} zIndex={1000}>
        <Box display="grid" gridTemplateColumns="1fr auto 1fr" alignItems="center" w="full" mx="auto">
          {/* Left Section - Close Button + Part Tabs */}
          <HStack gap={4} height="60px">
            <Box alignItems="center">
              <ExitTestButton />
            </Box>
            <TabSelector
              activeTab={activeTab}
              onTabChange={(tab) => setActiveTab(tab as "part1" | "part2" | "part3")}
              tabs={speakingTabs}
            />
            <Box alignItems="center">
              <HStack>
                <Icon as={MdMic} color="gray.500" />
                <Text fontSize="sm" color={mutedColor}>
                  Micro check
                </Text>
              </HStack>
            </Box>
          </HStack>

          {/* Center Section - Time */}
          <Box py={3}>
            <HStack gap={2} justify="center" bg={questionBackgroundColor} px={3} py={1} borderRadius="full">
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
            <SettingsMenu fontSize={fontSize} onFontSizeChange={setFontSize} />
          </HStack>
        </Box>
      </Box>

      {/* Main Content */}
      <Flex h="calc(100vh - 60px)" mx="auto">
        {/* Left Panel - Content */}
        <Box
          width={`${leftPanelWidth}%`}
          borderRight="1px"
          borderColor={borderColor}
          overflow="auto"
          p={6}
          bg={contentBackgroundColor}
        >
          <VStack align="start" gap={6}>
            {/* Audio Question */}
            <HStack gap={2} w="full" p={3} bg={cardBgColor} borderRadius="lg">
              <Icon as={MdVolumeUp} color="gray.500" />
              <Text fontSize={getFontSizeValue()} color={textColor} fontStyle={"bold"}>
                In what conditions would it be difficult for you to use a computer?
              </Text>
            </HStack>

            {/* Score Overview */}
            <Box id="overall" w="full">
              <HStack gap={3} mb={6} flexWrap="wrap">
                {scoreSections.map((section) => (
                  <Badge
                    key={section.id}
                    variant={section.id === "overall" ? "solid" : "outline"}
                    colorScheme={getSectionBadgeColor(section.id)}
                    px={3}
                    py={1}
                    borderRadius="full"
                    cursor="pointer"
                    onClick={() => scrollToSection(section.id)}
                    fontSize="sm"
                  >
                    {section.name} {section.score}
                  </Badge>
                ))}
              </HStack>

              <Text fontSize="lg" fontWeight="bold" color={textColor} mb={4}>
                Your Answer
              </Text>

              <Text fontSize={getFontSizeValue()} color={textColor} mb={4} lineHeight="1.8">
                Think it depends. If we are talking about the network conditions, I would say, if my computer can't
                connect to the Wi-Fi, to access the Internet, It would be difficult for me to use it because I spend
                almost all my time using it to surf the web. But in the other hand, if we are talking about the
                environment, the surrounding atmosphere is around. I think it would be inappropriate.
              </Text>

              <AudioPlayer duration="00:30" currentTime="00:00" />
              <Text fontSize="lg" fontWeight="bold" color={textColor} mb={4}>
                Sample Answer
              </Text>
              
                {/* <Text fontSize="sm" fontWeight="bold" color="orange.800" mb={2}>
                  Bài nói gợi ý
                </Text> */}
                <Text fontSize={getFontSizeValue()} color={textColor} lineHeight="1.8" mb={4}>
                  It really depends. If I don't have seamless connectivity, it's almost impossible to browse the web or
                  check emails, which can be frustrating. Last week, my Wi-Fi kept dropping and I felt so annoyed. Also,
                  in a noisy or dimly lit room, environmental distractions make it difficult to concentrate.
                </Text>
                <AudioPlayer duration="00:17" currentTime="00:17" />
            
            </Box>

            {/* Grammatical Section */}
            <Box id="grammatical" w="full">
              <Text fontSize="xl" fontWeight="bold" color={textColor} mb={4}>
                Grammatical range and Accuracy
              </Text>
              <Text fontSize="lg" color="green.600" fontWeight="bold" mb={4}>
                Điểm Ngữ pháp: 5.0
              </Text>

              <Text fontSize={getFontSizeValue()} color={textColor} mb={4} lineHeight="1.8">
                I think it depends. If we are talking about the network conditions, I would say, if my computer can't
                connect to the Wi-Fi, to access the Internet, it would be difficult for me to use it because I spend
                almost all my time using it to surf the web. But in the other hand, if we are talking about the
                environment, the surrounding atmosphere is around. I think it would be inappropriate.
              </Text>

              <AudioPlayer duration="00:30" currentTime="00:00" />

              <VStack align="start" gap={3} mt={6}>
                <Text fontSize="md" fontWeight="bold" color={textColor}>
                  Sửa lỗi Ngữ pháp và Từ vựng
                </Text>
                {grammaticalCorrections.map((correction, index) => (
                  <Text key={index} fontSize="sm" color={mutedColor}>
                    {correction.explanation}
                  </Text>
                ))}
              </VStack>
            </Box>

            {/* Pronunciation Section */}
            <Box id="pronunciation" w="full">
              <Text fontSize="xl" fontWeight="bold" color={textColor} mb={4}>
                Pronunciation
              </Text>
              <Text fontSize="lg" color="green.600" fontWeight="bold" mb={4}>
                Điểm Phát âm: 6.0
              </Text>

              <Text fontSize={getFontSizeValue()} color={textColor} mb={4} lineHeight="1.8">
                Think it depends. If we are talking about the network conditions, I would say, if my computer can
                connect to the Wi-Fi, to access the Internet, It would be difficult for me to use it because I spend
                almost my time using it to surf the web. But in the other hand, if we are talking about the environment,
                the atmosphere is around. I think it would be inappropriate.
              </Text>

              <AudioPlayer duration="00:30" currentTime="00:00" />

              <VStack align="start" gap={4} mt={6}>
                <Text fontSize="md" fontWeight="bold" color={textColor}>
                  Sửa lỗi Phát âm
                </Text>

                <Flex gap={6} w="full">
                  <Box flex={1}>
                    <Text fontSize="sm" fontWeight="bold" color="red.600" mb={3} textAlign="center">
                      Bạn nói lỗi
                    </Text>
                    {pronunciationCorrections.map((item, index) => (
                      <HStack
                        key={`incorrect-${index}`}
                        justify="space-between"
                        p={2}
                        bg="red.50"
                        borderRadius="md"
                        mb={2}
                      >
                        <Text fontSize="sm" color={textColor}>
                          {item.word}
                        </Text>
                        <HStack>
                          <IconButton
                            aria-label="Play pronunciation"
                            size="xs"
                            variant="ghost"
                          />
                          {<Icon as={MdVolumeUp} />}
                          <Text fontSize="sm" color="gray.600">
                            {item.incorrect}
                          </Text>
                        </HStack>
                      </HStack>
                    ))}
                  </Box>

                  <Box flex={1}>
                    <Text fontSize="sm" fontWeight="bold" color="green.600" mb={3} textAlign="center">
                      Cách nói đúng
                    </Text>
                    {pronunciationCorrections.map((item, index) => (
                      <HStack
                        key={`correct-${index}`}
                        justify="space-between"
                        p={2}
                        bg="green.50"
                        borderRadius="md"
                        mb={2}
                      >
                        <Text fontSize="sm" color={textColor}>
                          {item.word}
                        </Text>
                        <HStack>
                          <IconButton
                            aria-label="Play correct pronunciation"
                            size="xs"
                            variant="ghost"
                            color="green.600"
                          />
                          {<Icon as={MdVolumeUp} />}
                          <Text fontSize="sm" color="gray.600">
                            {item.correct}
                          </Text>
                        </HStack>
                      </HStack>
                    ))}
                  </Box>
                </Flex>
              </VStack>
            </Box>

            {/* Lexical Resource Section */}
            <Box id="lexical" w="full">
              <Text fontSize="xl" fontWeight="bold" color={textColor} mb={4}>
                Lexical Resource
              </Text>
              <Text fontSize="lg" color="green.600" fontWeight="bold" mb={4}>
                Điểm Từ vựng: 6.0
              </Text>

              <Text fontSize={getFontSizeValue()} color={textColor} mb={4} lineHeight="1.8">
                I think it depends. If we are talking about network conditions, I would say, if my computer can connect
                to the Wi-Fi, to access the Internet, It would be difficult for me to use it because I spend almost my
                time using it to surf the web. But in the other hand, if we are talking about the environment, the
                surrounding atmosphere is around. I think it would be inappropriate.
              </Text>

              <AudioPlayer duration="00:30" currentTime="00:00" />

              <VStack align="start" gap={4} mt={6}>
                <Text fontSize="md" fontWeight="bold" color={textColor}>
                  Gợi ý sửa từ
                </Text>

                <Flex gap={6} w="full">
                  <Box flex={1}>
                    <Text fontSize="sm" color="gray.600" mb={3} textAlign="center">
                      Cụm từ gốc
                    </Text>
                    {lexicalSuggestions.map((item, index) => (
                      <Box key={`original-${index}`} p={2} bg="gray.100" borderRadius="md" mb={2}>
                        <Text fontSize="sm" color={textColor}>
                          {item.original}
                        </Text>
                      </Box>
                    ))}
                  </Box>

                  <Box flex={1}>
                    <Text fontSize="sm" fontWeight="bold" color="green.600" mb={3} textAlign="center">
                      Gợi ý sửa
                    </Text>
                    {lexicalSuggestions.map((item, index) => (
                      <Box key={`suggestion-${index}`} p={2} bg="green.50" borderRadius="md" mb={2}>
                        <Text fontSize="sm" color={textColor} fontWeight="bold">
                          {item.suggestion}
                        </Text>
                        <Text fontSize="xs" color="gray.600" mt={1}>
                          {item.explanation}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                </Flex>
              </VStack>
            </Box>

            {/* Fluency and Coherence Section */}
            <Box id="fluency" w="full">
              <Text fontSize="xl" fontWeight="bold" color={textColor} mb={4}>
                Fluency and Coherence
              </Text>
              <Text fontSize="lg" color="green.600" fontWeight="bold" mb={4}>
                Điểm Trôi chảy và Mạch lạc: 5.0
              </Text>

              <Text fontSize={getFontSizeValue()} color={textColor} mb={4} lineHeight="1.8">
                Think it depends. If we are talking about the network conditions, I would say, if my computer can't
                connect to the Wi-Fi, to access the Internet, It would be difficult for me to use it because I spend
                almost my time using it to surf the web. But in the other hand, if we are talking about the environment,
                the atmosphere is around. I think it would be inappropriate.
              </Text>

              <AudioPlayer duration="00:30" currentTime="00:00" />
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

        {/* Right Panel - Notes */}
        <Box width={`${100 - leftPanelWidth}%`} overflow="auto" p={6} bg={contentBackgroundColor}>
          <VStack align="start" gap={4} h="full">
            <Box bg="yellow.400" color="black" px={4} py={2} borderRadius="lg" w="full" textAlign="center">
              <Text fontWeight="bold">Note</Text>
            </Box>

            <Textarea
              placeholder="Note"
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              resize="none"
              h="calc(100vh - 200px)"
              bg={questionBackgroundColor}
              border="none"
              borderRadius="lg"
              p={4}
              fontSize={getFontSizeValue()}
              color={textColor}
            />
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
}
