"use client"

import { useState } from "react"
import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  IconButton,
  Badge,
  Textarea,
  Button,
  Grid,
  Table
} from "@chakra-ui/react"
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
  const [highlightedCorrection, setHighlightedCorrection] = useState<number | null>(null)
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

  const grammaticalCorrections = [
    {
      text: "to access toto access",
      explanation: 'The correct structure is "access something" without the preposition "to" after "access".',
      highlightStart: "to access to",
      highlightEnd: "to access",
    },
    {
      text: "almost because I spend almost all",
      explanation: 'When saying "almost my time," you need to add "all" to express "almost all of my time."',
      highlightStart: "because I spend almost",
      highlightEnd: "all",
    },
    {
      text: "the web. But inon",
      explanation: 'Use the article "the" with "web" when referring to web browsing in general.',
      highlightStart: "in",
      highlightEnd: "on",
    },
    {
      text: "environment, the atmosphere is aroundthe environment or the surrounding atmosphere",
      explanation:
        'This expression is unnatural and unclear. It is better to say "the environment or the surrounding atmosphere" for clearer meaning.',
      highlightStart: "the atmosphere is around",
      highlightEnd: "the environment or the surrounding atmosphere",
    },
  ]

  const handleCorrectionClick = (index: number) => {
    setHighlightedCorrection(highlightedCorrection === index ? null : index)
  }

  const renderTextWithHighlights = (text: string) => {
    if (highlightedCorrection === null) {
      return text
    }

    const correction = grammaticalCorrections[highlightedCorrection]
    if (!correction) return text

    const parts = text.split(correction.highlightStart)
    if (parts.length === 1) return text

    return (
      <>
        {parts[0]}
        <Box as="span" bg="yellow.200" px={1} borderRadius="sm">
          {correction.highlightStart}
        </Box>
        {parts[1]}
      </>
    )
  }

  const pronunciationCorrections = [
    { word: "atmosphere", incorrect: "/ˈætməfɪr/", correct: "/ˈætməsfɪr/" },
    { word: "to", incorrect: "/tu:/", correct: "/tə/" },
    { word: "would", incorrect: "/wuːd/", correct: "/wʊd/" },
  ]

  const lexicalSuggestions = [
    {
      original: "the network condition",
      suggestion: "network conditions",
      explanation: 'network status consists of many factors → the word "conditions" is more general and accurate.',
    },
    {
      original: "atmosphere",
      suggestion: "surrounding atmosphere",
      explanation:
        '"surrounding" helps clarify the physical meaning, referring to the around the place being discussed.',
    },
  ]

  const speakingTabs = [
    { value: "part1", label: "Part 1" },
    { value: "part2", label: "Part 2" },
    { value: "part3", label: "Part 3" },
  ]

  return (
    <Box minH="100vh" bg={bgColor}>
      {/* Header - Unified style with reading/listening/writing */}
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
                onTabChange={(tab) => setActiveTab(tab as "part1" | "part2" | "part3")}
                tabs={speakingTabs}
              />
            </Box>
            {/* Optionally add Micro check here if you want, or move below */}
          </HStack>

          {/* Center Section - Time */}
          <Box py={3}>
            <HStack gap={2} justify="center" bg={questionBackgroundColor} px={3} py={1} borderRadius="full">
              <HStack>
                <Icon as={MdAccessTime} color={useColorModeValue("green.600", "green.500")}/>
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
                Score: 5.0
              </Text>

              <Text fontSize={getFontSizeValue()} color={textColor} mb={4} lineHeight="1.8">
                {renderTextWithHighlights(
                  "I think it depends. If we are talking about the network conditions, I would say, if my computer can't connect to the Wi-Fi, to access to to access the Internet, it would be difficult for me to use it because I spend almost because I spend almost all my time using it to surf the web. But in on the other hand, if we are talking about environment, the atmosphere is around the environment or the surrounding atmosphere, I think it would be inappropriate.",
                )}
              </Text>

              <AudioPlayer duration="00:30" currentTime="00:00" />

              <VStack align="start" gap={3} mt={6}>
                <Text fontSize="md" fontWeight="bold" color={textColor}>
                  Grammar and Vocabulary correction
                </Text>
                {grammaticalCorrections.map((correction, index) => (
                  <Button
                    key={index}
                    variant={highlightedCorrection === index ? "solid" : "outline"}
                    colorScheme={highlightedCorrection === index ? "yellow" : "gray"}
                    size="sm"
                    // onClick={() => handleCorrectionClick(index)}
                    justifyContent="flex-start"
                    whiteSpace="normal"
                    height="auto"
                    py={2}
                    px={3}
                    w="full"
                  >
                    <Text fontSize="sm">{correction.explanation}</Text>
                  </Button>
                ))}
              </VStack>
            </Box>

            {/* Pronunciation Section */}
            <Box id="pronunciation" w="full">
              <Text fontSize="xl" fontWeight="bold" color={textColor} mb={4}>
                Pronunciation
              </Text>
              <Text fontSize="lg" color="green.600" fontWeight="bold" mb={4}>
                Score: 6.0
              </Text>

              <Text fontSize={getFontSizeValue()} color={textColor} mb={4} lineHeight="1.8">
                Think it depends. If we are talking about the network conditions, I{" "}
                <Text as="span" bg="purple.200" px={1} borderRadius="sm">
                  would
                </Text>{" "}
                say, if my computer can connect to the Wi-Fi,{" "}
                <Text as="span" bg="purple.200" px={1} borderRadius="sm">
                  to
                </Text>{" "}
                access the Internet, It would be difficult for me to use it because I spend almost my time using it to
                surf web. But in the other hand, if we are talking about environment, the{" "}
                <Text as="span" bg="purple.200" px={1} borderRadius="sm">
                  atmosphere
                </Text>{" "}
                is around. I think it would be inappropriate.
              </Text>

              <AudioPlayer duration="00:30" currentTime="00:00" />

              <VStack align="start" gap={4} mt={6}>
                <Text fontSize="md" fontWeight="bold" color={textColor}>
                  Pronunciation correction
                </Text>

                <Table.Root w="full" border="1px" borderColor="gray.200" borderRadius="md" overflow="hidden" showColumnBorder={true}>
                  {/* Table Header */}
                  <Table.Body gap={0}>
                    <Table.Row>
                      <Table.Cell p={3} bg="gray.100" borderRight="1px" borderColor="gray.200">
                        <Text fontSize="sm" fontWeight="bold" color="gray.600">
                          Word
                        </Text>
                      </Table.Cell>
                      <Table.Cell p={3} bg="red.50" borderRight="1px" borderColor="gray.200">
                        <Text fontSize="sm" fontWeight="bold" color="red.600" textAlign="center">
                          You said incorrectly
                        </Text>
                      </Table.Cell>
                      <Table.Cell p={3} bg="green.50">
                        <Text fontSize="sm" fontWeight="bold" color="green.600" textAlign="center">
                          Correct pronunciation
                        </Text>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>

                  {/* Table Rows */}
                  {pronunciationCorrections.map((item, index) => (
                    <Table.Row key={index} gap={0} borderColor="black">
                      <Table.Cell p={3}> 
                        <Text fontSize="sm" color={textColor} fontWeight="medium">
                          {item.word}
                        </Text>
                      </Table.Cell>
                      <Table.Cell p={3} bg="red.25">
                        <HStack gap={2}>
                          <IconButton
                            aria-label="Play incorrect pronunciation"
                            size="xs"
                            variant="ghost"
                            color="red.600"
                          >
                            {<Icon as={MdVolumeUp} color={"black"} />}
                          </IconButton>
                          <Text fontSize="sm" color="black">
                            {item.incorrect}
                          </Text>
                        </HStack>
                      </Table.Cell>
                      <Table.Cell p={3} bg="green.25">
                        <HStack gap={2}>
                          <IconButton
                            aria-label="Play correct pronunciation"
                            size="xs"
                            variant="ghost"
                            color="green.600"
                          >
                            {<Icon as={MdVolumeUp} color={"black"} />}
                          </IconButton>

                          <Text fontSize="sm" color="black">
                            {item.correct}
                          </Text>
                        </HStack>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Root>
              </VStack>
            </Box>

            {/* Lexical Resource Section */}
            <Box id="lexical" w="full">
              <Text fontSize="xl" fontWeight="bold" color={textColor} mb={4}>
                Lexical Resource
              </Text>
              <Text fontSize="lg" color="green.600" fontWeight="bold" mb={4}>
                Score: 6.0
              </Text>

              <Text fontSize={getFontSizeValue()} color={textColor} mb={4} lineHeight="1.8">
                I think it depends. If we are talking about{" "}
                <Text as="span" bg="green.100" px={1} textDecoration="line-through">
                  the network condition
                </Text>
                <Text as="span" bg="green.200" px={1} ml={1}>
                  network conditions
                </Text>
                , I would say, if my computer can connect to the Wi-Fi, to access the Internet, It would be difficult
                for me to use it because I spend almost my time using it to surf the web. But in the other hand, if we
                are talking about the environment, the{" "}
                <Text as="span" bg="green.100" px={1} textDecoration="line-through">
                  atmosphere
                </Text>
                <Text as="span" bg="green.200" px={1} ml={1}>
                  surrounding atmosphere
                </Text>{" "}
                is around. I think it would be inappropriate.
              </Text>

              <AudioPlayer duration="00:30" currentTime="00:00" />

              <VStack align="start" gap={4} mt={6}>
                <Text fontSize="md" fontWeight="bold" color={textColor}>
                  Vocabulary correct suggestion
                </Text>

                <Table.Root size="md" variant="outline" showColumnBorder={true} borderColor={borderColor} color={textColor}>
                  <Table.Body> 
                    {/* Header Row */}
                    <Table.Row>
                      <Table.Cell bg="gray.100" fontSize="sm" fontWeight="bold" textAlign="center" w="25%">
                        Original word
                      </Table.Cell>
                      <Table.Cell bg="green.100" color="green.700" fontSize="sm" fontWeight="bold" textAlign="center" w="25%">
                        Suggestion
                      </Table.Cell>
                      <Table.Cell bg="gray.50" fontSize="sm" fontWeight="bold" textAlign="center" w="50%">
                        Explanation
                      </Table.Cell>
                    </Table.Row>

                    {/* Data Rows */}
                    {lexicalSuggestions.map((item, index) => (
                      <Table.Row key={index}>
                        <Table.Cell bg="gray.50" fontWeight="medium" fontSize={getFontSizeValue()}>
                          {item.original}
                        </Table.Cell>
                        <Table.Cell bg="green.50" fontWeight="bold" color="green.700" fontSize={getFontSizeValue()}>
                          {item.suggestion}
                        </Table.Cell>
                        <Table.Cell fontSize="sm" color="gray.700">
                          {item.explanation}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </VStack>
            </Box>

            {/* Fluency and Coherence Section */}
            <Box id="fluency" w="full">
              <Text fontSize="xl" fontWeight="bold" color={textColor} mb={4}>
                Fluency and Coherence
              </Text>
              <Text fontSize="lg" color="green.600" fontWeight="bold" mb={4}>
                Score: 5.0
              </Text>

              <Text fontSize={getFontSizeValue()} color={textColor} mb={4} lineHeight="1.8">
                Think it depends. If we are talking about the network conditions, I would say, if my computer can't
                connect to the Wi-Fi, to access the Internet, It would be difficult for me to use it because I spend
                almost all my time using it to surf the web. But in the other hand, if we are talking about the
                environment, the surrounding atmosphere is around. I think it would be inappropriate.
              </Text>

              <AudioPlayer duration="00:30" currentTime="00:00" />

              {/* Feedback section with bullet points listing fluency issues */}
              <Box mt={6}>
                <Text fontSize="lg" fontWeight="bold" color={textColor} mb={3}>
                  Feedback
                </Text>
                <VStack align="start">
                  <HStack align="start">
                    <Text color={textColor}>•</Text>
                    <Text fontSize={getFontSizeValue()} color={textColor}>
                      The ideas lack clear connection: "In the other hand... the atmosphere is around..." — the two
                      parts are unrelated.
                    </Text>
                  </HStack>
                  <HStack align="start">
                    <Text color={textColor}>•</Text>
                    <Text fontSize={getFontSizeValue()} color={textColor}>
                      The structure is repetitive or incomplete ("... to access to the Internet. It would be
                      difficult...").
                    </Text>
                  </HStack>
                  <HStack align="start">
                    <Text color={textColor}>•</Text>
                    <Text fontSize={getFontSizeValue()} color={textColor}>
                      You have to pause to think, causing long breaks between words within a sentence, making the speech
                      less fluent.
                    </Text>
                  </HStack>
                </VStack>
              </Box>

              {/* Suggestion section with bullet points providing improvement advice */}
              <Box mt={6}>
                <Text fontSize="lg" fontWeight="bold" color={textColor} mb={3}>
                  Suggestion
                </Text>
                <VStack align="start">
                  <HStack align="start">
                    <Text color={textColor}>•</Text>
                    <Text fontSize={getFontSizeValue()} color={textColor}>
                      Use the correct linking words: "On the other hand", "Since", "That's why".
                    </Text>
                  </HStack>
                  <HStack align="start">
                    <Text color={textColor}>•</Text>
                    <Text fontSize={getFontSizeValue()} color={textColor}>
                      Practice using the shadowing technique when you need to think, to avoid speaking and thinking at
                      the same time.
                    </Text>
                  </HStack>
                </VStack>
              </Box>
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
