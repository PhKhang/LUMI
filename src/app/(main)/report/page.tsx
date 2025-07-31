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
  Button,
  Progress,
  Pagination
} from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import { MdShare, MdOpenInNew, MdCalendarToday, MdLaunch, MdHeadphones, MdMenuBook, MdEdit, MdRecordVoiceOver } from "react-icons/md"
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  Legend
} from 'recharts'
import { useState } from 'react'

export default function ReportPage() {
  const [selectedSkill, setSelectedSkill] = useState('Listening')
  const [selectedTab, setSelectedTab] = useState('Reading')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5
  
  const bgColor = useColorModeValue("white", "gray.800")
  const textColor = useColorModeValue("gray.800", "black")
  const mutedColor = useColorModeValue("gray.700", "gray.300")
  const cardBgColor = useColorModeValue("white", "gray.700")
  const borderColor = useColorModeValue("gray.100", "gray.700")
  const tableBorderColor = useColorModeValue("gray.200", "gray.600")

  // Data cho exam history
  const allExamHistoryData = [
    {
      id: 1,
      "Tên bài": "Orange 19 Listening - Test 2",
      "Thời gian nộp bài": "05/07/25 01:11:23",
      "Thời gian làm bài": "00:14:32",
      "Tổng số câu": 13,
      "Đúng": 10,
      "Sai": 0,
      "Bỏ qua": 3,
      "Tỷ lệ đúng": 75.0
    },
    {
      id: 2,
      "Tên bài": "[C19T3] - Microplastic",
      "Thời gian nộp bài": "04/07/25 20:23:16",
      "Thời gian làm bài": "00:12:45",
      "Tổng số câu": 10,
      "Đúng": 5,
      "Sai": 5,
      "Bỏ qua": 0,
      "Tỷ lệ đúng": 50.0
    },
    {
      id: 3,
      "Tên bài": "[C19T3] - Microplastic",
      "Thời gian nộp bài": "03/07/25 19:35:35",
      "Thời gian làm bài": "00:07:04",
      "Tổng số câu": 10,
      "Đúng": 5,
      "Sai": 5,
      "Bỏ qua": 0,
      "Tỷ lệ đúng": 50.0
    },
    {
      id: 4,
      "Tên bài": "Science experiment for year 12",
      "Thời gian nộp bài": "02/07/25 19:26:26",
      "Thời gian làm bài": "00:26:49",
      "Tổng số câu": 10,
      "Đúng": 8,
      "Sai": 2,
      "Bỏ qua": 0,
      "Tỷ lệ đúng": 80.0
    },
    {
      id: 5,
      "Tên bài": "Children book festival",
      "Thời gian nộp bài": "01/07/25 19:13:53",
      "Thời gian làm bài": "00:13:26",
      "Tổng số câu": 10,
      "Đúng": 8,
      "Sai": 2,
      "Bỏ qua": 0,
      "Tỷ lệ đúng": 80.0
    },
    {
      id: 6,
      "Tên bài": "IELTS Writing Task 1 - Bar Chart",
      "Thời gian nộp bài": "30/06/25 18:45:12",
      "Thời gian làm bài": "00:20:15",
      "Tổng số câu": 8,
      "Đúng": 6,
      "Sai": 2,
      "Bỏ qua": 0,
      "Tỷ lệ đúng": 75.0
    },
    {
      id: 7,
      "Tên bài": "Academic Reading - Passage 1",
      "Thời gian nộp bài": "29/06/25 16:30:45",
      "Thời gian làm bài": "00:18:22",
      "Tổng số câu": 12,
      "Đúng": 9,
      "Sai": 3,
      "Bỏ qua": 0,
      "Tỷ lệ đúng": 75.0
    },
    {
      id: 8,
      "Tên bài": "Listening Practice - Section 2",
      "Thời gian nộp bài": "28/06/25 14:22:18",
      "Thời gian làm bài": "00:15:08",
      "Tổng số câu": 10,
      "Đúng": 7,
      "Sai": 3,
      "Bỏ qua": 0,
      "Tỷ lệ đúng": 70.0
    },
    {
      id: 9,
      "Tên bài": "Speaking Part 2 - Describe a place",
      "Thời gian nộp bài": "27/06/25 11:15:33",
      "Thời gian làm bài": "00:03:45",
      "Tổng số câu": 5,
      "Đúng": 4,
      "Sai": 1,
      "Bỏ qua": 0,
      "Tỷ lệ đúng": 80.0
    },
    {
      id: 10,
      "Tên bài": "Writing Task 2 - Opinion Essay",
      "Thời gian nộp bài": "26/06/25 20:10:27",
      "Thời gian làm bài": "00:35:18",
      "Tổng số câu": 15,
      "Đúng": 12,
      "Sai": 3,
      "Bỏ qua": 0,
      "Tỷ lệ đúng": 80.0
    }
  ]

  // Get current page data
  const totalItems = allExamHistoryData.length
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const examHistoryData = allExamHistoryData.slice(startIndex, endIndex)

  // Format date for display
  const formatDate = (dateStr: string) => {
    const [datePart, timePart] = dateStr.split(' ')
    return { date: datePart, time: timePart }
  }

  // Get progress bar color based on accuracy
  const getProgressColor = (accuracy: number) => {
    if (accuracy >= 80) return "green"
    if (accuracy >= 60) return "yellow"
    return "red"
  }

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
            <HStack justify="space-between" mb={3}>
              <Text fontSize="xl" fontWeight="bold" color={textColor}>
                🎯 Your Score
              </Text>
              <Icon as={MdShare} color={mutedColor} boxSize={5} cursor="pointer" />
            </HStack>
            <Box height="1px" bg={borderColor} mb={6} />

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
          <HStack mb={3}>
            <Text fontSize="24px">🦉</Text>
            <Text fontSize="xl" fontWeight="bold" color={textColor}>
              LUMI Assistant
            </Text>
          </HStack>
          <Box height="1px" bg={borderColor} mb={6} />

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
          <HStack justify="space-between" mb={3}>
            <HStack>
              <Icon as={MdCalendarToday} color="green.500" boxSize={5} />
              <Text fontSize="xl" fontWeight="bold" color={textColor}>
                Exam Schedule
              </Text>
            </HStack>
            <Icon as={MdLaunch} color={mutedColor} boxSize={4} cursor="pointer" />
          </HStack>
          <Box height="1px" bg={borderColor} mb={6} />

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
          <Text fontSize="xl" fontWeight="bold" color={textColor} mb={3}>
            Learning Performance Statistics
          </Text>
          <Box height="1px" bg={borderColor} mb={6} />

          {/* Skill Selector and Performance Metrics in same row */}
          <SimpleGrid columns={{ base: 2, md: 6 }} gap={4}>
            {/* Skill Selector - 2x2 Grid */}
            <Box 
              gridColumn={{ base: "1 / -1", md: "1 / 2" }}
              bg={cardBgColor} 
              borderRadius="md"
            >
              <SimpleGrid columns={2} gap={0} h="full">
                {['Reading', 'Listening', 'Writing', 'Speaking'].map((skill, index) => (
                  <Box
                    key={skill}
                    p={4}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    cursor="pointer"
                    fontWeight="medium"
                    fontSize="xs"
                    transition="all 0.2s"
                    borderRightWidth={index % 2 === 0 ? "1px" : "0"}
                    borderBottomWidth={index < 2 ? "1px" : "0"}
                    borderColor={borderColor}
                    borderTopLeftRadius={index === 0 ? "md" : "0"}
                    borderTopRightRadius={index === 1 ? "md" : "0"}
                    borderBottomLeftRadius={index === 2 ? "md" : "0"}
                    borderBottomRightRadius={index === 3 ? "md" : "0"}
                    onClick={() => setSelectedSkill(skill)}
                  >
                    <Box
                      px={1}
                      py={0.25}
                      bg={selectedSkill === skill ? "yellow.400" : "transparent"}
                      color={selectedSkill === skill ? "black" : textColor}
                      borderRadius="full"
                      transition="all 0.2s"
                      fontWeight="medium"
                      fontSize="xs"
                      _hover={{
                        bg: selectedSkill === skill ? "yellow.500" : "gray.100"
                      }}
                    >
                      {skill}
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
            
            {/* Performance Metrics */}
            <Box 
              p={4} 
              bg={cardBgColor} 
              borderRadius="md" 
              borderWidth="2px" 
              borderColor={borderColor}
              textAlign="center"
            >
              <Text fontSize="xs" color={mutedColor} mb={2}>Tests Completed</Text>
              <Text fontSize="md" fontWeight="bold" color={textColor}>9</Text>
            </Box>
            
            <Box 
              p={4} 
              bg={cardBgColor} 
              borderRadius="md" 
              borderWidth="2px" 
              borderColor={borderColor}
              textAlign="center"
            >
              <Text fontSize="xs" color={mutedColor} mb={2}>Accuracy</Text>
              <Text fontSize="md" fontWeight="bold" color={textColor}>75%</Text>
            </Box>
            
            <Box 
              p={4} 
              bg={cardBgColor} 
              borderRadius="md" 
              borderWidth="2px" 
              borderColor={borderColor}
              textAlign="center"
            >
              <Text fontSize="xs" color={mutedColor} mb={2}>Avg. Rewind Count</Text>
              <Text fontSize="md" fontWeight="bold" color={textColor}>2.7 times</Text>
            </Box>
            
            <Box 
              p={4} 
              bg={cardBgColor} 
              borderRadius="md" 
              borderWidth="2px" 
              borderColor={borderColor}
              textAlign="center"
            >
              <Text fontSize="xs" color={mutedColor} mb={2}>Average Score</Text>
              <Text fontSize="md" fontWeight="bold" color={textColor}>7.0/9.0</Text>
            </Box>
            
            <Box 
              p={4} 
              bg={cardBgColor} 
              borderRadius="md" 
              borderWidth="2px" 
              borderColor={borderColor}
              textAlign="center"
            >
              <Text fontSize="xs" color={mutedColor} mb={2}>Highest Score</Text>
              <Text fontSize="md" fontWeight="bold" color={textColor}>8.0/9.0</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>

      {/* Lịch sử làm bài Section */}
      <Box maxW="1400px" mx="auto" mt={8}>
        <Box 
          bg={cardBgColor} 
          borderRadius="lg" 
          boxShadow="md" 
          p={6}
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Text fontSize="2xl" fontWeight="bold" color={textColor} mb={6}>
            Lịch sử làm bài
          </Text>

          {/* Skill Tabs */}
          <HStack gap={0} mb={4}>
            {[
              { name: 'Listening', icon: MdHeadphones },
              { name: 'Reading', icon: MdMenuBook },
              { name: 'Writing', icon: MdEdit },
              { name: 'Speaking', icon: MdRecordVoiceOver }
            ].map((skill) => (
              <Box
                key={skill.name}
                px={4}
                py={2}
                cursor="pointer"
                borderBottomWidth="2px"
                borderBottomColor={selectedTab === skill.name ? "blue.500" : "transparent"}
                color={selectedTab === skill.name ? "blue.500" : mutedColor}
                fontWeight={selectedTab === skill.name ? "bold" : "normal"}
                onClick={() => setSelectedTab(skill.name)}
                transition="all 0.2s"
                _hover={{ color: "blue.500" }}
              >
                <HStack gap={2}>
                  <Icon as={skill.icon} boxSize={4} />
                  <Text fontSize="sm">{skill.name}</Text>
                </HStack>
              </Box>
            ))}
          </HStack>

          {/* Filter Tabs */}
          <HStack gap={6} mb={6}>
            {['Theo tên bài', 'Theo dạng câu hỏi', 'Theo section'].map((filter, index) => (
              <Text
                key={filter}
                fontSize="sm"
                color={index === 0 ? "green.500" : mutedColor}
                fontWeight={index === 0 ? "bold" : "normal"}
                borderBottom={index === 0 ? "2px solid" : "none"}
                borderBottomColor="green.500"
                pb={1}
                cursor="pointer"
                _hover={{ color: "green.500" }}
              >
                {filter}
              </Text>
            ))}
          </HStack>

          {/* Table Container using HTML table */}
          <Box 
            borderWidth="1px" 
            borderColor={tableBorderColor} 
            borderRadius="lg" 
            overflow="hidden"
          >
            <Box as="table" w="full" borderCollapse="collapse">
              {/* Table Header */}
              <Box as="thead">
                <Box as="tr" bg={useColorModeValue("gray.50", "gray.700")}>
                  <Box 
                    as="th" 
                    p={4} 
                    borderRightWidth="1px" 
                    borderRightColor={tableBorderColor}
                    borderBottomWidth="1px"
                    borderBottomColor={tableBorderColor}
                    textAlign="left"
                    fontWeight="bold"
                    fontSize="sm"
                    color="black"
                    w="25%"
                  >
                    Tên bài
                  </Box>
                  <Box 
                    as="th" 
                    p={4} 
                    borderRightWidth="1px" 
                    borderRightColor={tableBorderColor}
                    borderBottomWidth="1px"
                    borderBottomColor={tableBorderColor}
                    textAlign="center"
                    fontWeight="bold"
                    fontSize="sm"
                    color="black"
                    w="12%"
                  >
                    Thời gian nộp bài
                  </Box>
                  <Box 
                    as="th" 
                    p={4} 
                    borderRightWidth="1px" 
                    borderRightColor={tableBorderColor}
                    borderBottomWidth="1px"
                    borderBottomColor={tableBorderColor}
                    textAlign="center"
                    fontWeight="bold"
                    fontSize="sm"
                    color="black"
                    w="10%"
                  >
                    Thời gian làm bài
                  </Box>
                  <Box 
                    as="th" 
                    p={4} 
                    borderRightWidth="1px" 
                    borderRightColor={tableBorderColor}
                    borderBottomWidth="1px"
                    borderBottomColor={tableBorderColor}
                    textAlign="center"
                    fontWeight="bold"
                    fontSize="sm"
                    color="black"
                    w="8%"
                  >
                    Tổng số câu
                  </Box>
                  <Box 
                    as="th" 
                    p={4} 
                    borderRightWidth="1px" 
                    borderRightColor={tableBorderColor}
                    borderBottomWidth="1px"
                    borderBottomColor={tableBorderColor}
                    textAlign="center"
                    fontWeight="bold"
                    fontSize="sm"
                    color="black"
                    bg="green.100"
                    w="6%"
                  >
                    Đúng
                  </Box>
                  <Box 
                    as="th" 
                    p={4} 
                    borderRightWidth="1px" 
                    borderRightColor={tableBorderColor}
                    borderBottomWidth="1px"
                    borderBottomColor={tableBorderColor}
                    textAlign="center"
                    fontWeight="bold"
                    fontSize="sm"
                    color="black"
                    bg="red.100"
                    w="6%"
                  >
                    Sai
                  </Box>
                  <Box 
                    as="th" 
                    p={4} 
                    borderRightWidth="1px" 
                    borderRightColor={tableBorderColor}
                    borderBottomWidth="1px"
                    borderBottomColor={tableBorderColor}
                    textAlign="center"
                    fontWeight="bold"
                    fontSize="sm"
                    color="black"
                    bg="gray.100"
                    w="6%"
                  >
                    Bỏ qua
                  </Box>
                  <Box 
                    as="th" 
                    p={4} 
                    borderRightWidth="1px" 
                    borderRightColor={tableBorderColor}
                    borderBottomWidth="1px"
                    borderBottomColor={tableBorderColor}
                    textAlign="center"
                    fontWeight="bold"
                    fontSize="sm"
                    color="black"
                    w="12%"
                  >
                    Tỷ lệ đúng
                  </Box>
                  <Box 
                    as="th" 
                    p={4} 
                    borderRightWidth="1px" 
                    borderRightColor={tableBorderColor}
                    borderBottomWidth="1px"
                    borderBottomColor={tableBorderColor}
                    textAlign="center"
                    fontWeight="bold"
                    fontSize="sm"
                    color="black"
                    w="7.5%"
                  >
                    Làm lại
                  </Box>
                  <Box 
                    as="th" 
                    p={4}
                    borderBottomWidth="1px"
                    borderBottomColor={tableBorderColor}
                    textAlign="center"
                    fontWeight="bold"
                    fontSize="sm"
                    color="black"
                    w="7.5%"
                  >
                    Xem lại
                  </Box>
                </Box>
              </Box>

              {/* Table Body */}
              <Box as="tbody">
                {examHistoryData.map((exam, index) => {
                  const { date, time } = formatDate(exam["Thời gian nộp bài"])
                  
                  return (
                    <Box 
                      as="tr" 
                      key={exam.id}
                      _hover={{ bg: useColorModeValue("gray.50", "gray.600") }}
                    >
                      {/* Tên bài */}
                      <Box 
                        as="td" 
                        p={4} 
                        borderRightWidth="1px" 
                        borderRightColor={tableBorderColor}
                        borderBottomWidth={index === examHistoryData.length - 1 ? "0" : "1px"}
                        borderBottomColor={tableBorderColor}
                        verticalAlign="middle"
                      >
                        <Text fontSize="sm" fontWeight="medium" color={textColor}>
                          {exam["Tên bài"]}
                        </Text>
                      </Box>

                      {/* Thời gian nộp bài */}
                      <Box 
                        as="td" 
                        p={4} 
                        borderRightWidth="1px" 
                        borderRightColor={tableBorderColor}
                        borderBottomWidth={index === examHistoryData.length - 1 ? "0" : "1px"}
                        borderBottomColor={tableBorderColor}
                        textAlign="center"
                        verticalAlign="middle"
                      >
                        <Text fontSize="sm" fontWeight="medium" color={textColor}>
                          {date}
                        </Text>
                        <Text fontSize="xs" color={mutedColor}>
                          {time}
                        </Text>
                      </Box>

                      {/* Thời gian làm bài */}
                      <Box 
                        as="td" 
                        p={4} 
                        borderRightWidth="1px" 
                        borderRightColor={tableBorderColor}
                        borderBottomWidth={index === examHistoryData.length - 1 ? "0" : "1px"}
                        borderBottomColor={tableBorderColor}
                        textAlign="center"
                        verticalAlign="middle"
                      >
                        <Text fontSize="sm" color={textColor}>
                          {exam["Thời gian làm bài"]}
                        </Text>
                      </Box>

                      {/* Tổng số câu */}
                      <Box 
                        as="td" 
                        p={4} 
                        borderRightWidth="1px" 
                        borderRightColor={tableBorderColor}
                        borderBottomWidth={index === examHistoryData.length - 1 ? "0" : "1px"}
                        borderBottomColor={tableBorderColor}
                        textAlign="center"
                        verticalAlign="middle"
                      >
                        <Text fontSize="sm" fontWeight="bold" color={textColor}>
                          {exam["Tổng số câu"]}
                        </Text>
                      </Box>

                      {/* Đúng */}
                      <Box 
                        as="td" 
                        p={4} 
                        borderRightWidth="1px" 
                        borderRightColor={tableBorderColor}
                        borderBottomWidth={index === examHistoryData.length - 1 ? "0" : "1px"}
                        borderBottomColor={tableBorderColor}
                        textAlign="center"
                        verticalAlign="middle"
                      >
                        <Text fontSize="sm" fontWeight="bold" color="green.600">
                          {exam["Đúng"]}
                        </Text>
                      </Box>

                      {/* Sai */}
                      <Box 
                        as="td" 
                        p={4} 
                        borderRightWidth="1px" 
                        borderRightColor={tableBorderColor}
                        borderBottomWidth={index === examHistoryData.length - 1 ? "0" : "1px"}
                        borderBottomColor={tableBorderColor}
                        textAlign="center"
                        verticalAlign="middle"
                      >
                        <Text fontSize="sm" fontWeight="bold" color="red.600">
                          {exam["Sai"]}
                        </Text>
                      </Box>

                      {/* Bỏ qua */}
                      <Box 
                        as="td" 
                        p={4} 
                        borderRightWidth="1px" 
                        borderRightColor={tableBorderColor}
                        borderBottomWidth={index === examHistoryData.length - 1 ? "0" : "1px"}
                        borderBottomColor={tableBorderColor}
                        textAlign="center"
                        verticalAlign="middle"
                      >
                        <Text fontSize="sm" fontWeight="bold" color="gray.600">
                          {exam["Bỏ qua"]}
                        </Text>
                      </Box>

                      {/* Tỷ lệ đúng */}
                      <Box 
                        as="td" 
                        p={4} 
                        borderRightWidth="1px" 
                        borderRightColor={tableBorderColor}
                        borderBottomWidth={index === examHistoryData.length - 1 ? "0" : "1px"}
                        borderBottomColor={tableBorderColor}
                        textAlign="center"
                        verticalAlign="middle"
                      >
                        <Text fontSize="sm" fontWeight="bold" color={textColor} mb={1}>
                          {exam["Tỷ lệ đúng"]}%
                        </Text>
                        <Box 
                          w="full" 
                          h="8px" 
                          bg="gray.200" 
                          borderRadius="full" 
                          overflow="hidden"
                        >
                          <Box
                            h="full"
                            bg={exam["Tỷ lệ đúng"] >= 80 ? "green.500" : exam["Tỷ lệ đúng"] >= 60 ? "yellow.500" : "red.500"}
                            w={`${exam["Tỷ lệ đúng"]}%`}
                            borderRadius="full"
                          />
                        </Box>
                      </Box>

                      {/* Làm lại */}
                      <Box 
                        as="td" 
                        p={4} 
                        borderRightWidth="1px" 
                        borderRightColor={tableBorderColor}
                        borderBottomWidth={index === examHistoryData.length - 1 ? "0" : "1px"}
                        borderBottomColor={tableBorderColor}
                        textAlign="center"
                        verticalAlign="middle"
                      >
                        <Link color="blue.500" fontSize="sm" fontWeight="medium">
                          Làm lại
                        </Link>
                      </Box>

                      {/* Xem lại */}
                      <Box 
                        as="td" 
                        p={4}
                        borderBottomWidth={index === examHistoryData.length - 1 ? "0" : "1px"}
                        borderBottomColor={tableBorderColor}
                        textAlign="center"
                        verticalAlign="middle"
                      >
                        <Link color="blue.500" fontSize="sm" fontWeight="medium">
                          Xem lại
                        </Link>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            </Box>
          </Box>

          {/* Pagination */}
          <VStack gap={2} mt={4}>
            {/* Pagination controls centered */}
            <Flex justify="center" w="full">
              <Pagination.Root 
                count={totalItems} 
                pageSize={pageSize} 
                page={currentPage}
                onPageChange={(e) => setCurrentPage(e.page)}
              >
                <HStack gap={1}>
                  <Pagination.PrevTrigger asChild>
                    <Button variant="outline" size="sm">
                      ←
                    </Button>
                  </Pagination.PrevTrigger>
                  
                  <Pagination.Context>
                    {({ pages }) =>
                      pages.map((page, index) =>
                        page.type === "page" ? (
                          <Pagination.Item key={index} {...page} asChild>
                            <Button 
                              variant={page.value === currentPage ? "solid" : "outline"} 
                              size="sm"
                              colorScheme={page.value === currentPage ? "blue" : "gray"}
                            >
                              {page.value}
                            </Button>
                          </Pagination.Item>
                        ) : (
                          <Pagination.Ellipsis key={index} index={index}>
                            <Text fontSize="sm" color={mutedColor}>...</Text>
                          </Pagination.Ellipsis>
                        ),
                      )
                    }
                  </Pagination.Context>
                  
                  <Pagination.NextTrigger asChild>
                    <Button variant="outline" size="sm">
                      →
                    </Button>
                  </Pagination.NextTrigger>
                </HStack>
              </Pagination.Root>
            </Flex>
            
            {/* Results info below and to the right */}
            <Flex justify="flex-end" w="full">
              <Text fontSize="sm" color={mutedColor}>
                Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} results
              </Text>
            </Flex>
          </VStack>
        </Box>
      </Box>
    </Box>
  )
}
