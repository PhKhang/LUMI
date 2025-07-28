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
  Badge
} from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import { MdShare, MdOpenInNew } from "react-icons/md"
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
  const mutedColor = useColorModeValue("black.600", "black")
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
                🎯 Điểm số của bạn
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
                    name="Mục tiêu"
                  dataKey="target"
                  stroke="#F6D55C"
                  fill="#F6D55C"
                  fillOpacity={0.1}
                  strokeWidth={3}
                />
                <Radar
                  name="Điểm số hiện tại"
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
              Trợ lý LUMI
            </Text>
          </HStack>

          <Text fontSize="lg" color="green.500" fontWeight="medium" mb={4}>
            Xin chào Uyên Nhi, đây là báo cáo học tập của bạn:
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
                  Kỹ năng <Text as="span" fontWeight="bold">tốt nhất</Text> của bạn với độ chính xác 82%, ít gặp lỗi sai 
                  khi làm các Passage 1 và 2, nhưng <Text as="span" fontWeight="bold">thường mất điểm ở Passage 3</Text>. Dạng 
                  bài mạnh là <Text as="span" fontWeight="bold">Multiple Choice</Text>, dạng yếu là <Text as="span" fontWeight="bold">Matching Headings</Text> (52%).
                </Text>
              </Box>

              {/* Listening Analysis */}
              <Box>
                <Text fontSize="sm" color={textColor} mb={2}>
                  <Text as="span" fontSize="16px">• </Text>
                  <Text as="span" fontSize="18px">🎧 </Text>
                  <Text as="span" fontWeight="bold" color={textColor}>Listening: </Text>
                  Kết quả ổn định với điểm trung bình 7.0/9.0, bạn thường 
                  gặp khó khăn ở <Text as="span" fontWeight="bold">Part 2, Part 4</Text>, và dạng bài <Text as="span" fontWeight="bold">Map/Diagram Labelling</Text>.
                </Text>
              </Box>

              {/* Writing Analysis */}
              <Box>
                <Text fontSize="sm" color={textColor} mb={2}>
                  <Text as="span" fontSize="16px">• </Text>
                  <Text as="span" fontSize="18px">✍️ </Text>
                  <Text as="span" fontWeight="bold" color={textColor}>Writing: </Text>
                  Bạn <Text as="span" fontWeight="bold">chủ yếu sử dụng câu đơn, từ vựng còn bị lặp lại, cấu 
                  trúc ngữ pháp chưa đa dạng</Text>. Cần ôn tập <Text as="span" color="orange.500" fontWeight="bold">phần Overview của Task 1</Text> và 
                  <Text as="span" color="orange.500" fontWeight="bold"> luyện tiếp kết thúc luận điểm trong bài Task 2</Text>.
                </Text>
              </Box>

              {/* Speaking Analysis */}
              <Box>
                <Text fontSize="sm" color={textColor} mb={2}>
                  <Text as="span" fontSize="16px">• </Text>
                  <Text as="span" fontSize="18px">🗣️ </Text>
                  <Text as="span" fontWeight="bold" color={textColor}>Speaking: </Text>
                  Điểm số trung bình, cần cải thiện <Text as="span" fontWeight="bold">fluency và pronunciation</Text>. 
                  Thường gặp khó khăn ở <Text as="span" fontWeight="bold">Part 2</Text> và cần phát triển từ vựng chủ đề.
                </Text>
              </Box>
            </VStack>

            {/* Right Column - Suggestions */}
            <Box flex="1" minW="250px">
              <Text fontSize="lg" fontWeight="bold" color="green.500" mb={4}>
                ✨ LUMI gợi ý bạn những bài tập sau:
              </Text>
              
              <VStack align="start" gap={3}>
                <VStack align="start" gap={1}>
                  <HStack>
                    <Text color="black" fontSize="16px">•</Text>
                    <Text color="black" fontWeight="medium">Reading:</Text>
                    <Link color="blue.500" textDecoration="underline" fontSize="sm">
                      The Step Pyramid Of Djoser
                    </Link>
                    <Icon as={MdOpenInNew} color="blue.500" boxSize={4} />
                  </HStack>
                  <Text fontSize="sm" color={mutedColor} ml={6}>(Matching Headings, Note Completion)</Text>
                </VStack>

                <VStack align="start" gap={1}>
                  <HStack>
                    <Text color="black" fontSize="16px">•</Text>
                    <Text color="black" fontWeight="medium">Listening:</Text>
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
    </Box>
  )
}
