"use client"

import { useState, useEffect, useRef } from "react"
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
import { MdAccessTime, MdMic, MdVolumeUp, MdTimer } from "react-icons/md"
import ExitTestButton from "@/components/ui/exit-test-button"
import SettingsMenu from "@/components/ui/settings-menu"
import AudioPlayer from "@/components/audio/audio-player"
import TabSelector from "@/components/ui/tab-selector"
import TabSelectorContent from "@/components/ui/tab-selector-content"

interface ScoreSection {
  id: string
  name: string
  score: number
  maxScore: number
}

export default function SpeakingTestResult() {
  // Add mounted state to prevent hydration issues
  const [mounted, setMounted] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "vi">("vi")
  const [activeTab, setActiveTab] = useState<"part1" | "part2" | "part3">("part1")
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium")
  const [leftPanelWidth, setLeftPanelWidth] = useState(70)
  const [activeSection, setActiveSection] = useState<string>("overall")
  const [userNotes, setUserNotes] = useState("")
  const [highlightedCorrection, setHighlightedCorrection] = useState<number | null>(null)
  const [isManualTabChange, setIsManualTabChange] = useState(false)
  
  const { colorMode, toggleColorMode } = useColorMode()
  
  // Always call hooks - never conditionally
  const bgColorLight = "#F6F0E7"
  const bgColorDark = "gray.800"
  const contentBackgroundColorLight = "#FFFAF6"
  const contentBackgroundColorDark = "gray.900"
  const questionBackgroundColorLight = "white"
  const questionBackgroundColorDark = "gray.700"
  const borderColorLight = "gray.900"
  const borderColorDark = "gray.200"
  const textColorLight = "gray.800"
  const textColorDark = "white"
  const mutedColorLight = "gray.600"
  const mutedColorDark = "gray.400"
  const cardBgColorLight = "gray.50"
  const cardBgColorDark = "gray.700"
  const greenThemeColorLight = "green.600"
  const greenThemeColorDark = "green.500"
  const headerBgColorLight = "#F2F2F7"
  const headerBgColorDark = "gray.800"

  // Highlight colors for criteria (light/dark)
  const highlightYellowBgLight = "yellow.400"
  const highlightYellowBgDark = "#665c00"
  const highlightYellowTextLight = "#3d2c00"
  const highlightYellowTextDark = "#fffbe6"
  const highlightGreenBgLight = "green.100"
  const highlightGreenBgDark = "#234d20"
  const highlightGreenTextLight = "green.700"
  const highlightGreenTextDark = "#b9fbc0"
  const highlightPurpleBgLight = "purple.200"
  const highlightPurpleBgDark = "#3a2352"
  const highlightPurpleTextLight = "#3a2352"
  const highlightPurpleTextDark = "#e0d6f5"

  // Use effect to set mounted state
  useEffect(() => {
    setMounted(true)
  }, [])

  // Define color values based on mounted state and color mode
  const bgColor = !mounted ? bgColorDark : (colorMode === 'light' ? bgColorLight : bgColorDark)
  const contentBackgroundColor = !mounted ? contentBackgroundColorDark : (colorMode === 'light' ? contentBackgroundColorLight : contentBackgroundColorDark)
  const questionBackgroundColor = !mounted ? questionBackgroundColorDark : (colorMode === 'light' ? questionBackgroundColorLight : questionBackgroundColorDark)
  const borderColor = !mounted ? borderColorDark : (colorMode === 'light' ? borderColorLight : borderColorDark)
  const textColor = !mounted ? textColorDark : (colorMode === 'light' ? textColorLight : textColorDark)
  const mutedColor = !mounted ? mutedColorDark : (colorMode === 'light' ? mutedColorLight : mutedColorDark)
  const cardBgColor = !mounted ? cardBgColorDark : (colorMode === 'light' ? cardBgColorLight : cardBgColorDark)
  const greenThemeColor = !mounted ? greenThemeColorDark : (colorMode === 'light' ? greenThemeColorLight : greenThemeColorDark)
  const headerBgColor = !mounted ? headerBgColorDark : (colorMode === 'light' ? headerBgColorLight : headerBgColorDark) 
  const resizerBorderColor = useColorModeValue("gray.200", "gray.600")
  const highlightYellowBg = !mounted ? highlightYellowBgDark : (colorMode === 'light' ? highlightYellowBgLight : highlightYellowBgDark)
  const highlightYellowText = !mounted ? highlightYellowTextDark : (colorMode === 'light' ? highlightYellowTextLight : highlightYellowTextDark)
  const highlightGreenBg = !mounted ? highlightGreenBgDark : (colorMode === 'light' ? highlightGreenBgLight : highlightGreenBgDark)
  const highlightGreenText = !mounted ? highlightGreenTextDark : (colorMode === 'light' ? highlightGreenTextLight : highlightGreenTextDark)
  const highlightPurpleBg = !mounted ? highlightPurpleBgDark : (colorMode === 'light' ? highlightPurpleBgLight : highlightPurpleBgDark)
  const highlightPurpleText = !mounted ? highlightPurpleTextDark : (colorMode === 'light' ? highlightPurpleTextLight : highlightPurpleTextDark)
  const resizerColor = useColorModeValue("orange.500", "orange.400")
  // Refs for section elements
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})
  const questionAudioRef = useRef<HTMLAudioElement | null>(null)

  const overallScore = 5.5

  const scoreSections: ScoreSection[] = [
    { id: "overall", name: "Overall", score: 5.5, maxScore: 9 },
    { id: "grammatical", name: "Grammatical", score: 5.0, maxScore: 9 },
    { id: "pronunciation", name: "Pronunciation", score: 6.0, maxScore: 9 },
    { id: "lexical", name: "Lexical Resource", score: 6.0, maxScore: 9 },
    { id: "fluency", name: "Fluency & Coherence", score: 5.0, maxScore: 9 },
  ]

  // Set up Intersection Observer for auto tab switching
  useEffect(() => {
    if (!mounted) return

    const scrollContainer = document.querySelector('[data-scroll-container]') as HTMLElement
    const stickyHeader = document.querySelector('[data-sticky-header]') as HTMLElement
    
    if (!scrollContainer || !stickyHeader) return

    const handleScroll = () => {
      if (isManualTabChange) return

      const headerHeight = stickyHeader.offsetHeight
      const scrollTop = scrollContainer.scrollTop + headerHeight + 30;

      // Find which section is currently in view
      let currentSection = scoreSections[0].id
      
      for (const section of scoreSections) {
        const element = document.getElementById(section.id)
        if (element) {
          const elementTop = element.offsetTop
          if (scrollTop >= elementTop) {
            currentSection = section.id
          } else {
            break
          }
        }
      }

      if (currentSection !== activeSection) {
        setActiveSection(currentSection)
      }
    }

    // Throttle scroll events
    let timeoutId: NodeJS.Timeout | null = null
    const throttledHandleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, 500)
    }

    scrollContainer.addEventListener('scroll', throttledHandleScroll, { passive: true })

    return () => {
      scrollContainer.removeEventListener('scroll', throttledHandleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [activeSection, isManualTabChange, scoreSections, mounted])

  useEffect(() => {
    if (isManualTabChange) {
      const timer = setTimeout(() => {
        setIsManualTabChange(false)
      }, 1000) // Reset after 1 second

      return () => clearTimeout(timer)
    }
  }, [isManualTabChange])

  const scrollToSection = (sectionId: string) => {
    if (!mounted) return
    
    setIsManualTabChange(true)
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    const stickyHeader = document.querySelector('[data-sticky-header]') as HTMLElement
    
    if (element && stickyHeader) {
      const headerHeight = stickyHeader.offsetHeight
      const elementPosition = element.offsetTop
      const scrollContainer = element.closest('[data-scroll-container]') as HTMLElement
      
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: elementPosition - headerHeight - 20,
          behavior: 'smooth'
        })
      }
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

  // Show loading or fallback UI until mounted
  if (!mounted) {
    return (
      <Box minH="100vh" bg="gray.800" display="flex" alignItems="center" justifyContent="center">
        <Text color="white">Loading...</Text>
      </Box>
    )
  }

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
          </HStack>

          {/* Center Section - Time */}
          <Box py={3}>
            <HStack gap={2} justify="center" bg={questionBackgroundColor} px={3} py={1} borderRadius="full">
              <HStack>
                <Icon as={MdTimer} color={greenThemeColor}/>
                <Text fontSize={getFontSizeValue()} fontWeight="medium" color={textColor}>
                  00:30:12
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
      <Flex h="calc(100vh - 60px)" mx="auto" minWidth={"1000px"}>
        {/* Left Panel - Content */}
        <Box
          width={`${leftPanelWidth}%`}
          borderRight="1px"
          borderColor={borderColor}
          overflow="auto"
          bg={contentBackgroundColor}
          position="relative"
          pb={6}
          data-scroll-container
          minWidth={"630px"}
        >
          <VStack align="start" gap={6}>
            {/* Sticky Header for Question + Tabs */}
            <Box
              position="sticky"
              top="0"
              zIndex={10}
              bg={contentBackgroundColor}
              w="full"
              boxShadow="sm"
              px={6}
              data-sticky-header
            >
              {/* Audio Question - Now inside sticky */}
              <HStack gap={2} w="full" borderRadius="lg" mb={2} pt={2}> 
                <IconButton
                  aria-label="Play question audio"
                  size="sm"
                  variant="ghost"
                  color={greenThemeColor}
                  onClick={() => {
                    if (questionAudioRef.current) {
                      questionAudioRef.current.currentTime = 0;
                      questionAudioRef.current.play();
                    }
                  }}
                  borderRadius="full"
                  _hover={{ 
                    bg: !mounted ? 'green.700' : (colorMode === 'light' ? 'green.100' : 'green.700'), 
                    color: !mounted ? 'white' : (colorMode === 'light' ? 'green.700' : 'white') 
                  }}
                  _active={{ 
                    bg: !mounted ? 'green.600' : (colorMode === 'light' ? 'green.200' : 'green.600'), 
                    color: !mounted ? 'white' : (colorMode === 'light' ? 'green.800' : 'white') 
                  }}
                  transition="background 0.2s, color 0.2s"
                >
                  <Icon as={MdVolumeUp}/>
                </IconButton>
                <audio ref={questionAudioRef} src="/question_speaking.mp3" preload="auto" />
                <Text fontSize={getFontSizeValue()} color={textColor} fontWeight="bold">
                  In what conditions would it be difficult for you to use a computer?
                </Text>
              </HStack>

              {/* Score Overview - Tabs */}
              <Box>
                <TabSelectorContent
                  activeTab={activeSection}
                  onTabChange={(tab) => {
                    scrollToSection(tab);
                  }}
                  tabs={scoreSections.map((section) => ({
                    value: section.id,
                    label: `${section.name} ${section.score}`,
                  }))}
                />
              </Box>
            </Box>
            
            <Box px={6} id="overall">
              <Text fontSize="lg" fontWeight="bold" color={textColor} mb={4}>
                Your Answer
              </Text>

              <Text fontSize={getFontSizeValue()} color={textColor} mb={4} lineHeight="1.8">
                Think it depends. If we are talking about the network condition, I would say, if my computer can't
                connect to the Wi-Fi, to access the Internet, It would be difficult for me to use it because I spend
                almost all my time using it to surf the web. But in the other hand, if we are talking about the
                environment, the surrounding atmosphere is around. I think it would be inappropriate.
              </Text>

              <Box mb={4}>
                <AudioPlayer audioSrc="/speaking_your_speech.mp3"/>
              </Box>
              
              <Text fontSize="lg" fontWeight="bold" color={textColor} mb={4}>
                Sample Answer
              </Text>

              <Text fontSize={getFontSizeValue()} color={textColor} lineHeight="1.8" mb={4}>
                It really depends. If I don't have seamless connectivity, it's almost impossible to browse the web or
                check emails, which can be frustrating. Last week, my Wi-Fi kept dropping and I felt so annoyed. Also,
                in a noisy or dimly lit room, environmental distractions make it difficult to concentrate.
              </Text>
              <AudioPlayer audioSrc="/speaking_revision_speech.mp3"/>
            </Box>

            {/* Grammatical Section */}
            <Box id="grammatical" w="full">
              <Box w="100%" bg={headerBgColor} px={6} py={2} alignItems={"center"} mb={4}>
                <Text fontSize="xl" fontWeight="bold" color={textColor}>
                  Grammatical Range and Accuracy
                </Text>
              </Box>

              <Text fontSize="lg" color="green.600" fontWeight="bold" mb={4} px={6}>
                Score: 5.0
              </Text>

              <Text fontSize={getFontSizeValue()} color={textColor} mb={4} lineHeight="1.8" px={6}>
                I think it depends. If we are talking about the network conditions, I would say, if my computer can't connect to the Wi-Fi,{' '}
                <Box as="span" bg={highlightYellowBg} color={highlightYellowText} px={1} borderRadius="sm" textDecoration="line-through">
                  to access to
                </Box>{' '}
                <Box as="span" bg={highlightYellowBg} color={highlightYellowText} px={1} borderRadius="sm">
                  to access
                </Box>{' '}
                the Internet, it would be difficult for me to use it because I spend almost{' '} because I spend almost{' '}
                <Box as="span" bg={highlightYellowBg} color={highlightYellowText} px={1} borderRadius="sm">
                  all
                </Box>{' '}
                my time using it to surf the web. But in{' '}
                <Box as="span" bg={highlightYellowBg} color={highlightYellowText} px={1} borderRadius="sm" textDecoration="line-through">
                  in
                </Box>{' '}
                <Box as="span" bg={highlightYellowBg} color={highlightYellowText} px={1} borderRadius="sm">
                  on
                </Box>{' '}
                the other hand, if we are talking about {' '} 
                <Box as="span" bg={highlightYellowBg} color={highlightYellowText} px={1} borderRadius="sm" textDecoration="line-through">
                   environment,{' '} the atmosphere is around
                </Box>{' '}
                <Box as="span" bg={highlightYellowBg} color={highlightYellowText} px={1} borderRadius="sm">
                  the environment or the surrounding atmosphere
                </Box>
                , I think it would be inappropriate.
              </Text>

              <VStack align="start" gap={3} mt={6} px={6}>
                <Text fontSize="md" fontWeight="bold" color={textColor}>
                  Grammar and Vocabulary correction
                </Text>
                {grammaticalCorrections.map((correction, index) => (
                  <Button
                    key={index}
                    variant={highlightedCorrection === index ? "solid" : "outline"}
                    colorScheme={highlightedCorrection === index ? "yellow" : "gray"}
                    size="sm"
                    justifyContent="flex-start"
                    whiteSpace="normal"
                    height="auto"
                    py={2}
                    px={3}
                    w="full"
                  >
                    <Text fontSize={getFontSizeValue()} textAlign={"left"}>{correction.explanation}</Text>
                  </Button>
                ))}
              </VStack>
            </Box>

            {/* Pronunciation Section */}
            <Box id="pronunciation" w="full">
              <Box w="100%" bg={headerBgColor} px={6} py={2} alignItems={"center"} mb={4}>
                <Text fontSize="xl" fontWeight="bold" color={textColor}>
                  Pronunciation
                </Text>
              </Box>
              <Text fontSize="lg" color="green.600" fontWeight="bold" mb={4} px={6}>
                Score: 6.0
              </Text>

              <Text fontSize={getFontSizeValue()} color={textColor} mb={4} lineHeight="1.8" px={6}>
                Think it depends. If we are talking about the network conditions, I{" "}
                <Text as="span" bg={highlightPurpleBg} color={highlightPurpleText} px={1} borderRadius="sm">
                  would
                </Text>{" "}
                say, if my computer can connect to the Wi-Fi,{" "}
                <Text as="span" bg={highlightPurpleBg} color={highlightPurpleText} px={1} borderRadius="sm">
                  to
                </Text>{" "}
                access the Internet, It would be difficult for me to use it because I spend almost my time using it to
                surf web. But in the other hand, if we are talking about environment, the{" "}
                <Text as="span" bg={highlightPurpleBg} color={highlightPurpleText} px={1} borderRadius="sm">
                  atmosphere
                </Text>{" "}
                is around. I think it would be inappropriate.
              </Text>

              <VStack align="start" gap={4} mt={6} px={6}>
                <Text fontSize={getFontSizeValue()} fontWeight="bold" color={textColor}>
                  Pronunciation correction
                </Text>

                <Table.Root w="full" border="2px solid" borderColor={borderColor} borderRadius="md" showColumnBorder={true}>
                  <Table.Body gap={0}>
                    <Table.Row>
                      <Table.Cell p={3} bg={!mounted ? 'gray.700' : (colorMode === 'light' ? 'gray.200' : 'gray.700')} border="2px solid" borderColor={borderColor}>
                        <Text fontSize={getFontSizeValue()} fontWeight="bold" color={!mounted ? 'gray.200' : (colorMode === 'light' ? 'gray.600' : 'gray.200')}>
                          Word
                        </Text>
                      </Table.Cell>
                      <Table.Cell p={3} bg={!mounted ? 'red.900' : (colorMode === 'light' ? 'red.100' : 'red.900')} borderRight="1px" border="2px solid" borderColor={borderColor}>
                        <Text fontSize={getFontSizeValue()} fontWeight="bold" color={!mounted ? 'red.200' : (colorMode === 'light' ? 'red.500' : 'red.200')} textAlign="center">
                          You said incorrectly
                        </Text>
                      </Table.Cell>
                      <Table.Cell p={3} bg={!mounted ? 'green.900' : (colorMode === 'light' ? 'green.50' : 'green.900')} border="2px solid" borderColor={borderColor}>
                        <Text fontSize={getFontSizeValue()} fontWeight="bold" color={!mounted ? 'green.200' : (colorMode === 'light' ? 'green.600' : 'green.200')} textAlign="center">
                          Correct pronunciation
                        </Text>
                      </Table.Cell>
                    </Table.Row>
       

                  {pronunciationCorrections.map((item, index) => (
                    <Table.Row key={index} gap={0} borderColor="black">
                      <Table.Cell p={3} border="2px solid" borderColor={borderColor}> 
                        <Text fontSize={getFontSizeValue()} color={textColor} fontWeight="medium">
                          {item.word}
                        </Text>
                      </Table.Cell>
                      <Table.Cell p={3} bg={!mounted ? 'red.800' : (colorMode === 'light' ? 'red.25' : 'red.800')} border="2px solid" borderColor={borderColor}>
                        <HStack gap={2}>
                          <IconButton
                            aria-label="Play incorrect pronunciation"
                            size="xs"
                            borderRadius="full"
                            variant="ghost"
                            color={!mounted ? 'red.200' : (colorMode === 'light' ? 'red.600' : 'red.200')}
                          >
                            {<Icon as={MdVolumeUp} color={!mounted ? 'white' : (colorMode === 'light' ? 'black' : 'white')} />}
                          </IconButton>
                          <Text fontSize={getFontSizeValue()} color={!mounted ? 'white' : (colorMode === 'light' ? 'black' : 'white')}>
                            {item.incorrect}
                          </Text>
                        </HStack>
                      </Table.Cell>
                      <Table.Cell p={3} bg={!mounted ? 'green.800' : (colorMode === 'light' ? 'green.25' : 'green.800')} border="2px solid" borderColor={borderColor}>
                        <HStack gap={2}>
                          <IconButton
                            aria-label="Play correct pronunciation"
                            size="xs"
                            borderRadius="full"
                            variant="ghost"
                            color={!mounted ? 'green.200' : (colorMode === 'light' ? 'green.600' : 'green.200')}
                          >
                            {<Icon as={MdVolumeUp} color={!mounted ? 'white' : (colorMode === 'light' ? 'black' : 'white')} />}
                          </IconButton>

                          <Text fontSize={getFontSizeValue()} color={!mounted ? 'white' : (colorMode === 'light' ? 'black' : 'white')}>
                            {item.correct}
                          </Text>
                        </HStack>
                      </Table.Cell>
                      </Table.Row>
                  ))}
                  </Table.Body>
                </Table.Root>
              </VStack>
            </Box>

            {/* Lexical Resource Section */}
            <Box id="lexical" w="full">
              <Box w="100%" bg={headerBgColor} px={6} py={2} alignItems={"center"} mb={4}>
                <Text fontSize="xl" fontWeight="bold" color={textColor}>
                  Lexical Resource
                </Text>
              </Box>
              <Text fontSize="lg" color="green.600" fontWeight="bold" mb={4} px={6}>
                Score: 6.0
              </Text>

              <Text fontSize={getFontSizeValue()} color={textColor} mb={4} lineHeight="1.8" px={6}>
                I think it depends. If we are talking about{" "}
                <Text as="span" bg={highlightGreenBg} color={highlightGreenText} px={1} textDecoration="line-through" borderRadius={"sm"}>
                  the network condition
                </Text>
                <Text as="span" bg={highlightGreenBg} color={highlightGreenText} px={1} ml={1} borderRadius={"sm"}>
                  network conditions
                </Text>
                , I would say, if my computer can connect to the Wi-Fi, to access the Internet, It would be difficult
                for me to use it because I spend almost my time using it to surf the web. But in the other hand, if we
                are talking about the environment, the{" "}
                <Text as="span" bg={highlightGreenBg} color={highlightGreenText} px={1} textDecoration="line-through" borderRadius={"sm"}>
                  atmosphere
                </Text>
                <Text as="span" bg={highlightGreenBg} color={highlightGreenText} px={1} ml={1} borderRadius={"sm"}>
                  surrounding atmosphere
                </Text>{" "}
                is around. I think it would be inappropriate.
              </Text>

              <VStack align="start" gap={4} mt={6} px={6}>
                <Text fontSize={getFontSizeValue()} fontWeight="bold" color={textColor}>
                  Vocabulary correct suggestion
                </Text>

                <Table.Root w="full" border="1px" borderColor={borderColor} borderRadius="md" showColumnBorder={true}>
                  <Table.Body> 
                    <Table.Row>
                        <Table.Cell bg={!mounted ? 'gray.700' : (colorMode === 'light' ? 'gray.200' : 'gray.700')} fontSize={getFontSizeValue()} fontWeight="bold" textAlign="left" w="25%" color={!mounted ? 'gray.200' : (colorMode === 'light' ? 'gray.700' : 'gray.200')} border="2px solid" borderColor={borderColor}>
                        Word
                      </Table.Cell>
                        <Table.Cell bg={!mounted ? 'green.900' : (colorMode === 'light' ? 'green.100' : 'green.900')} color={!mounted ? 'green.200' : (colorMode === 'light' ? 'green.700' : 'green.200')} fontSize={getFontSizeValue()} fontWeight="bold" textAlign="left" w="25%" border="2px solid" borderColor={borderColor}>
                        Suggestion
                      </Table.Cell>
                        <Table.Cell bg={!mounted ? 'gray.800' : (colorMode === 'light' ? 'gray.200' : 'gray.700')} fontSize={getFontSizeValue()} fontWeight="bold" textAlign="left" w="50%" color={!mounted ? 'gray.200' : (colorMode === 'light' ? 'gray.700' : 'gray.200')} border="2px solid" borderColor={borderColor}>
                        Note
                      </Table.Cell>
                    </Table.Row>

                    {lexicalSuggestions.map((item, index) => (
                      <Table.Row key={index}>
                          <Table.Cell bg={!mounted ? 'gray.800' : (colorMode === 'light' ? 'gray.50' : 'gray.800')} fontWeight="medium" fontSize={getFontSizeValue()} color={!mounted ? 'gray.100' : (colorMode === 'light' ? 'gray.800' : 'gray.100')} textAlign="left" border="2px solid" borderColor={borderColor}>
                          {item.original}
                        </Table.Cell>
                          <Table.Cell bg={!mounted ? 'green.800' : (colorMode === 'light' ? 'green.25' : 'green.800')} fontWeight="bold" color={!mounted ? 'green.200' : (colorMode === 'light' ? 'green.700' : 'green.200')} fontSize={getFontSizeValue()} textAlign="left" border="2px solid" borderColor={borderColor}>
                          {item.suggestion}
                        </Table.Cell>
                          <Table.Cell fontSize={getFontSizeValue()} color={!mounted ? 'gray.200' : (colorMode === 'light' ? 'gray.700' : 'gray.200')} bg={!mounted ? 'gray.800' : (colorMode === 'light' ? 'gray.50' : 'gray.800')} textAlign="left" border="2px solid" borderColor={borderColor}>
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
              <Box w="100%" bg={headerBgColor} px={6} py={2} alignItems={"center"} mb={4}>
                <Text fontSize="xl" fontWeight="bold" color={textColor}>
                  Fluency and Coherence
                </Text>
              </Box>
              <Text fontSize="lg" color="green.600" fontWeight="bold" mb={4} px={6}>
                Score: 5.0
              </Text>

              <Text fontSize={getFontSizeValue()} color={textColor} mb={4} lineHeight="1.8" px={6}>
                Think it depends. If we are talking about the network conditions, I would say, if my computer can't
                connect to the Wi-Fi, to access the Internet, It would be difficult for me to use it because I spend
                almost all my time using it to surf the web. But in the other hand, if we are talking about the
                environment, the surrounding atmosphere is around. I think it would be inappropriate.
              </Text>

              {/* Feedback section with bullet points listing fluency issues */}
              <Box mt={6} px={6}>
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
              <Box mt={6} px={6}>
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
          width="6px"
          bg={resizerBorderColor}
          cursor="col-resize"
          _hover={{ bg: resizerColor }}
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

        {/* Right Panel - Notes */}
        <Box width={`${100 - leftPanelWidth}%`} overflow="auto" bg={contentBackgroundColor}>
          <VStack align="start" gap={0} h="full">
            <Box bg="yellow.400" color="black" px={4} py={2} w="full" textAlign="center">
              <Text fontWeight="bold">Note</Text>
            </Box>

            <Textarea
              placeholder="This is the note you used in Speaking test..."
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              resize="none"
              h="100%"
              bg={questionBackgroundColor}
              border="none"
              p={4}
              fontSize={getFontSizeValue()}
              color={textColor}
            >
            </Textarea>
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
}
