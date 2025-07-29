"use client"

import { 
  Box, 
  Text, 
  Flex, 
  VStack, 
  HStack, 
  SimpleGrid, 
  Icon,
  Link,
  Badge,
  Button
} from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import { MdShare, MdOpenInNew, MdCalendarToday, MdLaunch } from "react-icons/md"
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  Legend
} from 'recharts'

export default function ReportPage() {
  const bgColor = useColorModeValue("white", "gray.800")
  const textColor = useColorModeValue("gray.800", "black")
  const mutedColor = useColorModeValue("gray.700", "gray.300")
  const cardBgColor = useColorModeValue("white", "gray.700")
  const borderColor = useColorModeValue("gray.200", "gray.600")

  // Data cho radar chart
  const radarData = [
    {
      skill: 'Overall',
      currentScore: 7.5,
      target: 8.0,
    },
    {
      skill: 'Reading',
      currentScore: 8,
      target: 8.5,
    },
    {
      skill: 'Listening', 
      currentScore: 7.0,
      target: 8.0,
    },
    {
      skill: 'Writing',
      currentScore: 6.5,
      target: 8.5,
    },
    {
      skill: 'Speaking',
      currentScore: 6.5,
      target: 8.0,
    },
  ]

  return (
    <Box p={6} bg={bgColor}>
      {/* Title */}
      <Text fontSize="3xl" fontWeight="bold" color="green.500" mb={6}>
        Study Report
      </Text>
      
      <Flex gap={8} maxW="1400px" mx="auto" direction={{ base: "column", lg: "row" }}>
        {/* Left Section - Your Score (30%) */}
        <Box 
          flex="0 0 30%" 
          minW="300px"
          bg={cardBgColor} 
          borderRadius="lg" 
          boxShadow="md" 
          p={6}
          borderWidth="1px"
          borderColor={borderColor}
        >
            <HStack justify="space-between" mb={6}>
              <Text fontSize="xl" fontWeight="bold" color={textColor}>
                🎯 Your Score
              </Text>
              <Icon as={MdShare} color={mutedColor} boxSize={5} cursor="pointer" />
            </HStack>

            <Box height="400px">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis 
                    dataKey="skill" 
                    tick={{ fill: '#000000', fontSize: 12 }}
                  />
                  <PolarRadiusAxis angle={90} domain={[0, 9]} />
                  <Radar
                    name="Target"
                  dataKey="target"
                  stroke="#F6D55C"
                  fill="#F6D55C"
                  fillOpacity={0.1}
                  strokeWidth={3}
                />
                <Radar
                  name="Current"
                  dataKey="currentScore"
                  stroke="#48BB78"
                  fill="#48BB78"
                  fillOpacity={0.2}
                  strokeWidth={3}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* Right Section - LUMI Assistant (70%) */}
        <Box 
          flex="1"
          bg={cardBgColor} 
          borderRadius="lg" 
          boxShadow="md" 
          p={6}
          borderWidth="1px"
          borderColor={borderColor}
        >
          <HStack mb={6}>
            <Text fontSize="24px">🦉</Text>
            <Text fontSize="xl" fontWeight="bold" color={textColor}>
              LUMI Assistant
            </Text>
          </HStack>

          <Text fontSize="lg" color="green.500" fontWeight="medium" mb={4}>
            Hello Uyên Nhi, here is your study report:
          </Text>

          <Flex gap={6} direction={{ base: "column", md: "row" }} align="start">
            {/* Left Column - Skills Analysis */}
            <VStack align="start" gap={1} flex="1" minW="250px">
              {/* Reading Analysis */}
              <Box>
                <Text fontSize="sm" color={textColor} mb={2}>
                  <Text as="span" fontSize="16px">• </Text>
                  <Text as="span" fontSize="18px">📖 </Text>
                  <Text as="span" fontWeight="bold" color={textColor}>Reading: </Text>
                  Your <Text as="span" fontWeight="bold">strongest skill</Text> with 82% accuracy, fewer errors 
                  in Passages 1 and 2, but <Text as="span" fontWeight="bold">often lose points in Passage 3</Text>. Strong in 
                  <Text as="span" fontWeight="bold"> Multiple Choice</Text>, weak in <Text as="span" fontWeight="bold">Matching Headings</Text> (52%).
                </Text>
              </Box>

              {/* Listening Analysis */}
              <Box>
                <Text fontSize="sm" color={textColor} mb={2}>
                  <Text as="span" fontSize="16px">• </Text>
                  <Text as="span" fontSize="18px">🎧 </Text>
                  <Text as="span" fontWeight="bold" color={textColor}>Listening: </Text>
                  Stable results with average score of 7.0/9.0, you often 
                  struggle with <Text as="span" fontWeight="bold">Part 2, Part 4</Text>, and <Text as="span" fontWeight="bold">Map/Diagram Labelling</Text> questions.
                </Text>
              </Box>

              {/* Writing Analysis */}
              <Box>
                <Text fontSize="sm" color={textColor} mb={2}>
                  <Text as="span" fontSize="16px">• </Text>
                  <Text as="span" fontSize="18px">✍️ </Text>
                  <Text as="span" fontWeight="bold" color={textColor}>Writing: </Text>
                  You <Text as="span" fontWeight="bold">mainly use simple sentences, repetitive vocabulary, and limited 
                  grammatical structures</Text>. Need to practice <Text as="span" color="orange.500" fontWeight="bold">Task 1 Overview section</Text> and 
                  <Text as="span" color="orange.500" fontWeight="bold"> conclusion arguments in Task 2</Text>.
                </Text>
              </Box>

              {/* Speaking Analysis */}
              <Box>
                <Text fontSize="sm" color={textColor} mb={2}>
                  <Text as="span" fontSize="16px">• </Text>
                  <Text as="span" fontSize="18px">🗣️ </Text>
                  <Text as="span" fontWeight="bold" color={textColor}>Speaking: </Text>
                  Average score, need to improve <Text as="span" fontWeight="bold">fluency and pronunciation</Text>. 
                  Often struggle with <Text as="span" fontWeight="bold">Part 2</Text> and need to develop topic-specific vocabulary.
                </Text>
              </Box>
            </VStack>

            {/* Right Column - Suggestions */}
            <Box flex="1" minW="250px">
              <Text fontSize="lg" fontWeight="bold" color="green.500" mb={4}>
                ✨ LUMI suggests the following exercises:
              </Text>
              
              <VStack align="start" gap={3}>
                <VStack align="start" gap={1}>
                  <HStack>
                    <Text color={textColor} fontSize="16px">•</Text>
                    <Text color={textColor} fontWeight="medium">Reading:</Text>
                    <Link color="blue.500" textDecoration="underline" fontSize="sm">
                      The Step Pyramid Of Djoser
                    </Link>
                    <Icon as={MdOpenInNew} color="blue.500" boxSize={4} />
                  </HStack>
                  <Text fontSize="sm" color={mutedColor} ml={6}>(Matching Headings, Note Completion)</Text>
                </VStack>

                <VStack align="start" gap={1}>
                  <HStack>
                    <Text color={textColor} fontSize="16px">•</Text>
                    <Text color={textColor} fontWeight="medium">Listening:</Text>
                    <Link color="blue.500" textDecoration="underline" fontSize="sm">
                      The New Housing
                    </Link>
                    <Icon as={MdOpenInNew} color="blue.500" boxSize={4} />
                  </HStack>
                  <Text fontSize="sm" color={mutedColor} ml={6}>(Multiple Choice, Map Labeling)</Text>
                </VStack>
              </VStack>
            </Box>
          </Flex>
        </Box>
      </Flex>

      {/* Bottom Section - Exam Schedule and Learning Stats */}
      <Flex gap={8} maxW="1400px" mx="auto" mt={8} direction={{ base: "column", lg: "row" }}>
        {/* Left - Exam Schedule (30%) */}
        <Box 
          flex="0 0 30%" 
          minW="300px"
          bg={cardBgColor} 
          borderRadius="lg" 
          boxShadow="md" 
          p={6}
          borderWidth="1px"
          borderColor={borderColor}
        >
          <HStack justify="space-between" mb={6}>
            <HStack>
              <Icon as={MdCalendarToday} color="green.500" boxSize={5} />
              <Text fontSize="xl" fontWeight="bold" color={textColor}>
                Exam Schedule
              </Text>
            </HStack>
            <Icon as={MdLaunch} color={mutedColor} boxSize={4} cursor="pointer" />
          </HStack>

          <SimpleGrid columns={2} gap={4}>
            <Box 
              p={4} 
              bg={cardBgColor} 
              borderRadius="md" 
              borderWidth="2px" 
              borderColor={borderColor}
              textAlign="center"
            >
              <Text fontSize="sm" color={mutedColor} mb={2}>Exam Date</Text>
              <Text fontSize="xl" fontWeight="bold" color={textColor}>01/01/2026</Text>
            </Box>
            
            <Box 
              p={4} 
              bg={cardBgColor} 
              borderRadius="md" 
              borderWidth="2px" 
              borderColor={borderColor}
              textAlign="center"
            >
              <Text fontSize="sm" color={mutedColor} mb={2}>Days Remaining</Text>
              <Text fontSize="xl" fontWeight="bold" color={textColor}>183 days</Text>
            </Box>
          </SimpleGrid>
        </Box>

        {/* Right - Learning Performance Statistics (70%) */}
        <Box 
          flex="1"
          bg={cardBgColor} 
          borderRadius="lg" 
          boxShadow="md" 
          p={6}
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Text fontSize="xl" fontWeight="bold" color={textColor} mb={6}>
            Learning Performance Statistics
          </Text>

          {/* Skill Tabs */}
          <HStack mb={6} gap={2}>
            <Button size="sm" variant="outline" color={textColor}>Reading</Button>
            <Button size="sm" bg="yellow.400" color="black" fontWeight="medium">Listening</Button>
            <Button size="sm" variant="outline" color={textColor}>Writing</Button>
            <Button size="sm" variant="outline" color={textColor}>Speaking</Button>
          </HStack>

          {/* Performance Metrics */}
          <SimpleGrid columns={{ base: 2, md: 5 }} gap={4}>
            <Box 
              p={4} 
              bg={cardBgColor} 
              borderRadius="md" 
              borderWidth="2px" 
              borderColor={borderColor}
              textAlign="center"
            >
              <Text fontSize="sm" color={mutedColor} mb={2}>Tests Completed</Text>
              <Text fontSize="xl" fontWeight="bold" color={textColor}>9</Text>
            </Box>
            
            <Box 
              p={4} 
              bg={cardBgColor} 
              borderRadius="md" 
              borderWidth="2px" 
              borderColor={borderColor}
              textAlign="center"
            >
              <Text fontSize="sm" color={mutedColor} mb={2}>Accuracy</Text>
              <Text fontSize="xl" fontWeight="bold" color={textColor}>75%</Text>
            </Box>
            
            <Box 
              p={4} 
              bg={cardBgColor} 
              borderRadius="md" 
              borderWidth="2px" 
              borderColor={borderColor}
              textAlign="center"
            >
              <Text fontSize="sm" color={mutedColor} mb={2}>Avg. Rewind Count</Text>
              <Text fontSize="xl" fontWeight="bold" color={textColor}>2.7 times</Text>
            </Box>
            
            <Box 
              p={4} 
              bg={cardBgColor} 
              borderRadius="md" 
              borderWidth="2px" 
              borderColor={borderColor}
              textAlign="center"
            >
              <Text fontSize="sm" color={mutedColor} mb={2}>Average Score</Text>
              <Text fontSize="xl" fontWeight="bold" color={textColor}>7.0/9.0</Text>
            </Box>
            
            <Box 
              p={4} 
              bg={cardBgColor} 
              borderRadius="md" 
              borderWidth="2px" 
              borderColor={borderColor}
              textAlign="center"
            >
              <Text fontSize="sm" color={mutedColor} mb={2}>Highest Score</Text>
              <Text fontSize="xl" fontWeight="bold" color={textColor}>8.0/9.0</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>
    </Box>
  )
}
