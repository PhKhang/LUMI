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
  Pagination,
  Image
} from "@chakra-ui/react"
import { MdShare, MdOpenInNew, MdCalendarToday, MdLaunch, MdHeadphones, MdMenuBook, MdEdit, MdRecordVoiceOver } from "react-icons/md"
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts'
import { TbTargetArrow, TbCalendarMonthFilled, TbPencilMinus, TbChartRadar } from "react-icons/tb"
import { useState, useEffect } from 'react'
import { FaHeadphones, FaBookOpen } from "react-icons/fa"
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { BiSolidPencil, BiSolidMicrophone } from "react-icons/bi"

export default function ReportPage() {
  const [selectedSkill, setSelectedSkill] = useState('Listening')
  const [selectedTab, setSelectedTab] = useState('Reading')
  const [currentPage, setCurrentPage] = useState(1)
  const [mounted, setMounted] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('By Time')
  const pageSize = 5

  useEffect(() => {
    setMounted(true)
  }, [])

  // Reset filter and page when tab changes
  useEffect(() => {
    if (selectedTab === 'Speaking') {
      setSelectedFilter('By Question')
    } else if (selectedTab === 'Writing') {
      setSelectedFilter('By Question Type')
    } else {
      setSelectedFilter('By Time')
    }
    setCurrentPage(1)
  }, [selectedTab])

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedFilter])
  
  // Using theme colors instead of color mode values
  const bgColor = "background.primary"
  const textColor = "text.primary"
  const mutedColor = "text.muted"
  const cardBgColor = "background.primary"
  const borderColor = "border.primary"
  const tableBorderColor = "gray.200"

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

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

  // Data for Reading
  const readingHistoryData = [
    {
      id: 1,
      "Tên bài": "Academic Reading - Passage 1",
      "Thời gian nộp bài": "05/07/25 01:11:23",
      "Thời gian làm bài": "00:18:32",
      "Tổng số câu": 13,
      "Đúng": 11,
      "Sai": 1,
      "Bỏ qua": 1,
      "Tỷ lệ đúng": 85.0
    },
    {
      id: 2,
      "Tên bài": "Cambridge 19 Reading Test 3",
      "Thời gian nộp bài": "04/07/25 20:23:16",
      "Thời gian làm bài": "00:15:45",
      "Tổng số câu": 14,
      "Đúng": 9,
      "Sai": 3,
      "Bỏ qua": 2,
      "Tỷ lệ đúng": 64.0
    },
    {
      id: 3,
      "Tên bài": "IELTS Reading Practice",
      "Thời gian nộp bài": "03/07/25 19:35:35",
      "Thời gian làm bài": "00:20:04",
      "Tổng số câu": 12,
      "Đúng": 8,
      "Sai": 4,
      "Bỏ qua": 0,
      "Tỷ lệ đúng": 67.0
    },
    {
      id: 4,
      "Tên bài": "Cambridge 18 Reading Test 1",
      "Thời gian nộp bài": "02/07/25 16:22:10",
      "Thời gian làm bài": "00:19:15",
      "Tổng số câu": 13,
      "Đúng": 10,
      "Sai": 2,
      "Bỏ qua": 1,
      "Tỷ lệ đúng": 77.0
    },
    {
      id: 5,
      "Tên bài": "General Reading - Social History",
      "Thời gian nộp bài": "01/07/25 14:18:45",
      "Thời gian làm bài": "00:22:30",
      "Tổng số câu": 15,
      "Đúng": 12,
      "Sai": 2,
      "Bỏ qua": 1,
      "Tỷ lệ đúng": 80.0
    },
    {
      id: 6,
      "Tên bài": "IELTS Reading Simulation Test",
      "Thời gian nộp bài": "30/06/25 11:30:20",
      "Thời gian làm bài": "00:17:45",
      "Tổng số câu": 11,
      "Đúng": 7,
      "Sai": 3,
      "Bỏ qua": 1,
      "Tỷ lệ đúng": 64.0
    },
    {
      id: 7,
      "Tên bài": "Academic Reading - Science Topic",
      "Thời gian nộp bài": "29/06/25 09:45:12",
      "Thời gian làm bài": "00:21:20",
      "Tổng số câu": 14,
      "Đúng": 11,
      "Sai": 2,
      "Bỏ qua": 1,
      "Tỷ lệ đúng": 79.0
    }
  ]

  // Data for Writing
  const writingHistoryData = [
    {
      id: 1,
      "Tên bài": "[Real Test] - Study challenges in higher education",
      "Task": "Task 2",
      "Dạng đề": "Two-Part Question",
      "Thời gian nộp bài": "05/07/25 01:11:23",
      "Thời gian làm bài": "35:12",
      "Kết quả": 6.0
    },
    {
      id: 2,
      "Tên bài": "[Forecast] Fruit and vegetable consumption",
      "Task": "Task 1",
      "Dạng đề": "Bar Chart",
      "Thời gian nộp bài": "04/07/25 01:11:23",
      "Thời gian làm bài": "16:10",
      "Kết quả": 7.0
    },
    {
      id: 3,
      "Tên bài": "[Real Test] Student spending abroad",
      "Task": "Task 1",
      "Dạng đề": "Mixed Charts",
      "Thời gian nộp bài": "03/07/25 01:11:23",
      "Thời gian làm bài": "16:10",
      "Kết quả": 6.5
    },
    {
      id: 4,
      "Tên bài": "[Forecast] Environmental protection measures",
      "Task": "Task 2",
      "Dạng đề": "Opinion Essay",
      "Thời gian nộp bài": "02/07/25 14:25:18",
      "Thời gian làm bài": "38:45",
      "Kết quả": 6.5
    },
    {
      id: 5,
      "Tên bài": "[Real Test] Population growth trends",
      "Task": "Task 1",
      "Dạng đề": "Line Graph",
      "Thời gian nộp bài": "01/07/25 16:30:42",
      "Thời gian làm bài": "18:20",
      "Kết quả": 7.5
    },
    {
      id: 6,
      "Tên bài": "[Forecast] Technology impact on education",
      "Task": "Task 2",
      "Dạng đề": "Discuss Both Views",
      "Thời gian nộp bài": "30/06/25 10:15:33",
      "Thời gian làm bài": "40:12",
      "Kết quả": 6.0
    },
    {
      id: 7,
      "Tên bài": "[Real Test] Housing costs comparison",
      "Task": "Task 1",
      "Dạng đề": "Table",
      "Thời gian nộp bài": "29/06/25 13:45:20",
      "Thời gian làm bài": "17:35",
      "Kết quả": 7.0
    }
  ]

  // Data for Speaking
  const speakingHistoryData = [
    {
      id: 1,
      "Topic": "Childhood memory",
      "Câu hỏi": "What did you enjoy doing as a child?",
      "Part": 1,
      "Thời gian nộp bài": "05/07/25 01:11:23",
      "Kết quả": 7.0
    },
    {
      id: 2,
      "Topic": "Laughing",
      "Câu hỏi": "When was the last time you laughed?",
      "Part": 3,
      "Thời gian nộp bài": "04/07/25 01:11:23",
      "Kết quả": 6.5
    },
    {
      id: 3,
      "Topic": "Famous Person",
      "Câu hỏi": "Describe a famous person that you admired",
      "Part": 2,
      "Thời gian nộp bài": "03/07/25 01:11:23",
      "Kết quả": 6.0
    },
    {
      id: 4,
      "Topic": "Hometown",
      "Câu hỏi": "What do you like most about your hometown?",
      "Part": 1,
      "Thời gian nộp bài": "02/07/25 15:22:45",
      "Kết quả": 6.5
    },
    {
      id: 5,
      "Topic": "Social Media",
      "Câu hỏi": "How has social media changed the way people communicate?",
      "Part": 3,
      "Thời gian nộp bài": "01/07/25 11:18:30",
      "Kết quả": 7.5
    },
    {
      id: 6,
      "Topic": "Special Event",
      "Câu hỏi": "Describe a special event in your life",
      "Part": 2,
      "Thời gian nộp bài": "30/06/25 14:35:12",
      "Kết quả": 6.0
    },
    {
      id: 7,
      "Topic": "Work",
      "Câu hỏi": "What kind of job would you like to do in the future?",
      "Part": 1,
      "Thời gian nộp bài": "29/06/25 16:40:25",
      "Kết quả": 7.0
    }
  ]

  // Get current page data based on selected tab
  const getCurrentData = () => {
    let data = []
    switch(selectedTab) {
      case 'Listening':
        data = allExamHistoryData
        break
      case 'Reading':
        data = readingHistoryData
        break
      case 'Writing':
        data = writingHistoryData
        break
      case 'Speaking':
        data = speakingHistoryData
        break
      default:
        data = allExamHistoryData
    }
    return data
  }

  // Sort the entire dataset based on selected filter and skill
  const getSortedData = () => {
    const currentData = getCurrentData()
    let sortedData = [...currentData]

    switch(selectedFilter) {
      case 'By Test Name':
        sortedData.sort((a: any, b: any) => {
          const nameA = a["Tên bài"] || ""
          const nameB = b["Tên bài"] || ""
          return nameA.localeCompare(nameB, 'vi', { sensitivity: 'base' })
        })
        break
        
      case 'By Time':
        // Sort by submission time (newest first)
        sortedData.sort((a: any, b: any) => {
          const timeA = a["Thời gian nộp bài"] || ""
          const timeB = b["Thời gian nộp bài"] || ""
          return timeB.localeCompare(timeA)
        })
        break
        
      case 'By Results':
        if (selectedTab === 'Listening' || selectedTab === 'Reading') {
          // Sort by accuracy percentage (highest first)
          sortedData.sort((a: any, b: any) => {
            const accuracyA = a["Tỷ lệ đúng"] || 0
            const accuracyB = b["Tỷ lệ đúng"] || 0
            return accuracyB - accuracyA
          })
        } else if (selectedTab === 'Writing' || selectedTab === 'Speaking') {
          // Sort by score (highest first)
          sortedData.sort((a: any, b: any) => {
            const scoreA = a["Kết quả"] || 0
            const scoreB = b["Kết quả"] || 0
            return scoreB - scoreA
          })
        }
        break
        
      case 'By Question Type':
        if (selectedTab === 'Writing') {
          // Sort by question type (Task 1 first, then Task 2)
          sortedData.sort((a: any, b: any) => {
            const taskA = a["Task"] || ""
            const taskB = b["Task"] || ""
            if (taskA !== taskB) {
              return taskA.localeCompare(taskB)
            }
            // If same task, sort by question type
            const typeA = a["Dạng đề"] || ""
            const typeB = b["Dạng đề"] || ""
            return typeA.localeCompare(typeB, 'vi', { sensitivity: 'base' })
          })
        } else if (selectedTab === 'Speaking') {
          // Sort by Part (1, 2, 3), then by topic
          sortedData.sort((a: any, b: any) => {
            const partA = a["Part"] || 0
            const partB = b["Part"] || 0
            if (partA !== partB) {
              return partA - partB
            }
            // If same part, sort by topic
            const topicA = a["Topic"] || ""
            const topicB = b["Topic"] || ""
            return topicA.localeCompare(topicB, 'vi', { sensitivity: 'base' })
          })
        } else {
          // For Listening/Reading, sort by test name
          sortedData.sort((a: any, b: any) => {
            const nameA = a["Tên bài"] || ""
            const nameB = b["Tên bài"] || ""
            return nameA.localeCompare(nameB, 'vi', { sensitivity: 'base' })
          })
        }
        break
        
      case 'By Section':
        if (selectedTab === 'Speaking') {
          // Sort by Part number
          sortedData.sort((a: any, b: any) => {
            const partA = a["Part"] || 0
            const partB = b["Part"] || 0
            return partA - partB
          })
        } else if (selectedTab === 'Writing') {
          // Sort by Task
          sortedData.sort((a: any, b: any) => {
            const taskA = a["Task"] || ""
            const taskB = b["Task"] || ""
            return taskA.localeCompare(taskB, 'vi', { sensitivity: 'base' })
          })
        } else {
          // For Listening/Reading, sort by test name (could be extended to sort by section if data available)
          sortedData.sort((a: any, b: any) => {
            const nameA = a["Tên bài"] || ""
            const nameB = b["Tên bài"] || ""
            return nameA.localeCompare(nameB, 'vi', { sensitivity: 'base' })
          })
        }
        break
        
      case 'By Question':
        if (selectedTab === 'Speaking') {
          // Sort by question text alphabetically
          sortedData.sort((a: any, b: any) => {
            const questionA = a["Câu hỏi"] || ""
            const questionB = b["Câu hỏi"] || ""
            return questionA.localeCompare(questionB, 'vi', { sensitivity: 'base' })
          })
        }
        break
        
      case 'By Difficulty':
        // Sort by difficulty based on accuracy/score
        if (selectedTab === 'Listening' || selectedTab === 'Reading') {
          // Lower accuracy = higher difficulty (show hardest first)
          sortedData.sort((a: any, b: any) => {
            const accuracyA = a["Tỷ lệ đúng"] || 0
            const accuracyB = b["Tỷ lệ đúng"] || 0
            return accuracyA - accuracyB
          })
        } else if (selectedTab === 'Writing' || selectedTab === 'Speaking') {
          // Lower score = higher difficulty (show hardest first)
          sortedData.sort((a: any, b: any) => {
            const scoreA = a["Kết quả"] || 0
            const scoreB = b["Kết quả"] || 0
            return scoreA - scoreB
          })
        }
        break
        
      default:
        break
    }

    return sortedData
  }

  const sortedData = getSortedData()
  const totalItems = sortedData.length
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const examHistoryData = sortedData.slice(startIndex, endIndex)

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
      currentScore: 6.0,
      target: 7.0,
    },
    {
      skill: 'Reading',
      currentScore: 5.5,
      target: 7.5,
    },
    {
      skill: 'Listening', 
      currentScore: 6.0,
      target: 7.5,
    },
    {
      skill: 'Writing',
      currentScore: 5.0,
      target: 6.5,
    },
    {
      skill: 'Speaking',
      currentScore: 5.5,
      target: 7.0,
    },
  ]

  return (
    <Box p={6} bg={bgColor} paddingX="50px">
      <Flex gap={8} mx="auto" direction={{ base: "column", lg: "row" }}>
        {/* Left Section - Your Score (30%) */}
        <Box 
          flex="0 0 30%" 
          minW="300px"
          bg={cardBgColor} 
          borderRadius="xl" 
          boxShadow="md" 
          borderWidth="1px"
          borderColor={borderColor}
        >
            <HStack justify="space-between" 
              py={2}
              px={6}>
              <HStack>
                <Icon as={TbChartRadar} color={"black"} boxSize={5}/>
                <Text fontSize="lg" fontWeight="bold" color={textColor}>
                  Your Score
                </Text>
              </HStack>
              <Icon 
                as={TbPencilMinus} 
                color={mutedColor} 
                boxSize={5} 
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ 
                  color: "black.500", 
                  transform: "scale(1.5)",
                  bg: "blue.50",
                  borderRadius: "md",
                  p: 1
                }}
                _active={{ 
                  transform: "scale(0.95)",
                  color: "black",
                  bg: "black.100"
                }}
                onClick={() => console.log("Edit Your Score clicked")}
              />
            </HStack>
            <Box height="1px" bg={borderColor}/>

            <Box height="300px"
              py={2}
              px={6}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <Tooltip 
                    formatter={(value, name) => {
                      const found = radarData.find(item => item.skill === name)
                      return `${value}\n ${found ? found.target : ''}`
                    }}
                    labelStyle={{ color: '#000', fontWeight: 'bold', fontSize: '14px', textAlign:'center' }}
                    itemStyle={{ fontWeight: 'bold', fontSize: '14px' }}
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <PolarGrid />
                  <PolarAngleAxis 
                    dataKey="skill" 
                    tick={{ 
                      fill: '#000000', 
                      fontSize: 10, 
                      fontWeight: 'normal',
                      style: { fontSize: '14px' }
                    }} 
                  />
                  <PolarRadiusAxis angle={90} domain={[0, 9]} tick={false} />
                  <Radar
                    name="Target"
                    dataKey="target"
                    stroke="#EAB308"
                    fill="#EAB308"
                    fillOpacity={0.3}
                    strokeWidth={3}
                  />
                  <Radar
                    name="Current"
                    dataKey="currentScore"
                    stroke="#48BB78"
                    fill="#16A34A"
                    fillOpacity={0.3}
                    strokeWidth={3}
                  />
                <Legend 
                  wrapperStyle={{ fontSize: '14px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* Right Section - LUMI Assistant (70%) */}
        <Box 
          flex="1"
          bg={cardBgColor} 
          borderRadius="xl" 
          borderWidth="1px"
          borderColor="transparent"
        >
          <HStack
          py={2}
              px={6}>
            <Image 
              src="/favicon.png" 
              alt="LUMI Logo" 
              width="45px" 
              height="25px"
            />
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              LUMI Assistant
            </Text>
          </HStack>
          <Box height="1px" bg={borderColor} mb={2} />

          <Text mb={1}
          px={6}>
            <Text 
              as="span"
              fontSize="xl"
              fontWeight="bold"
              background="linear-gradient(-90deg, var(--yellow-500, #EAB308) 0%, var(--green-500, #22C55E) 77.4%)"
              backgroundClip="text"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Hello Uyển Nhi
            </Text>
            <Text as="span" fontSize="lg" fontWeight="normal" color={textColor}>
              , here is your study report:
            </Text>
          </Text>

          <Flex px={6} gap={6} direction={{ base: "column", md: "row" }} align="start">
            {/* Left Column - Skills Analysis */}
            <VStack align="start" gap={1} flex="1">
              {/* Reading Analysis */}
              <Box>
                <Text fontSize="md" color={textColor}>
                  <Text as="span" fontSize="16px">• </Text>
                  <Text as="span" fontSize="18px">📖 </Text>
                  <Text as="span" fontWeight="bold" color={textColor}>Reading: </Text>
                  Your <Text as="span" fontWeight="bold" color="green.600">strongest skill</Text> with 82% accuracy, fewer errors 
                  in Passages 1 and 2, but <Text as="span" fontWeight="bold" >often lose points in Passage 3</Text>. Strong in 
                  <Text as="span" fontWeight="bold" color="green.600"> Multiple Choice</Text>, weak in <Text as="span" fontWeight="bold" >Matching Headings</Text> (52%).
                </Text>
              </Box>

              {/* Listening Analysis */}
              <Box>
                <Text fontSize="md" color={textColor}>
                  <Text as="span" fontSize="16px">• </Text>
                  <Text as="span" fontSize="18px">🎧 </Text>
                  <Text as="span" fontWeight="bold" color={textColor}>Listening: </Text>
                  Stable results with average score of 7.0/9.0, you often 
                  struggle with <Text as="span" fontWeight="bold" >Part 2, Part 4</Text>, and <Text as="span" fontWeight="bold" >Map/Diagram Labelling</Text> questions.
                </Text>
              </Box>

              {/* Writing Analysis */}
              <Box>
                <Text fontSize="md" color={textColor}>
                  <Text as="span" fontSize="16px">• </Text>
                  <Text as="span" fontSize="18px">✍️ </Text>
                  <Text as="span" fontWeight="bold" color={textColor}>Writing: </Text>
                  You <Text as="span" fontWeight="bold" >mainly use simple sentences, repetitive vocabulary, and limited 
                  grammatical structures</Text>. Need to practice <Text as="span" color="orange.500" fontWeight="bold">Task 1 Overview section</Text> and 
                  <Text as="span" color="orange.500" fontWeight="bold"> conclusion arguments in Task 2</Text>.
                </Text>
              </Box>

              {/* Speaking Analysis */}
              <Box>
                <Text fontSize="md" color={textColor}>
                  <Text as="span" fontSize="16px">• </Text>
                  <Text as="span" fontSize="18px">🗣️ </Text>
                  <Text as="span" fontWeight="bold" color={textColor}>Speaking: </Text>
                  Average score, need to improve <Text as="span" fontWeight="bold" >fluency and pronunciation</Text>. 
                  Often struggle with <Text as="span" fontWeight="bold" >Part 2</Text>
                </Text>
              </Box>
            </VStack>

            {/* Right Column - Suggestions */}
            <Box>
              <HStack mb={1}>
                <Text fontSize="lg" fontWeight="bold">
                  ✨
                </Text>
                <Text fontSize="lg" fontWeight="bold" 
                  background="linear-gradient(-90deg, var(--yellow-500, #EAB308) 0%, var(--green-500, #22C55E) 100%)"
                  backgroundClip="text"
                  style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}>
                  LUMI suggests you following exercises:
                </Text>
              </HStack>

              
              <VStack align="start" gap={1}>
                <VStack align="start" gap={0}>
                  <HStack>
                    <Text color={textColor} fontSize="md">•</Text>
                    <Text color={textColor} fontWeight="medium" fontSize="md">Reading:</Text>
                    <Link color="blue.500" fontSize="md">
                      The Step Pyramid Of Djoser
                      <Icon as={MdOpenInNew} color="blue.500" boxSize={4} />
                    </Link>
                  </HStack>
                  <Text fontSize="md" color={mutedColor}>(Matching Headings, Note Completion)</Text>
                </VStack>

                <VStack align="start" gap={0}>
                  <HStack>
                    <Text color={textColor} fontSize="md">•</Text>
                    <Text color={textColor} fontSize="md" fontWeight="medium">Listening:</Text>
                    <Link color="blue.500" fontSize="md">
                      The New Housing
                      <Icon as={MdOpenInNew} color="blue.500" boxSize={4} />
                    </Link>
                  </HStack>
                  <Text fontSize="md" color={mutedColor}>(Multiple Choice, Map Labeling)</Text>
                </VStack>
              </VStack>
            </Box>
          </Flex>
        </Box>
      </Flex>

      {/* Bottom Section - Exam Schedule and Learning Stats */}
      <Flex gap={8} mx="auto" mt={8} direction={{ base: "column", lg: "row" }}>
        {/* Left - Exam Schedule (30%) */}
        <Box 
          flex="0 0 30%" 
          minW="300px"
          bg={cardBgColor} 
          borderRadius="xl" 
          boxShadow="md" 
          borderWidth="1px"
          borderColor={borderColor}
          display="flex"
          flexDirection="column"
        >
          <HStack justify="space-between" 
              py={2}
              px={6}>
            <HStack>
              <Icon as={TbCalendarMonthFilled} color="black" boxSize={5} />
              <Text fontSize="lg" fontWeight="bold" color={textColor}>
                Exam Schedule
              </Text>
            </HStack>
            <Icon 
              as={TbPencilMinus} 
              color={mutedColor} 
              boxSize={5} 
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ 
                color: "black.500", 
                transform: "scale(1.5)",
                bg: "blue.50",
                borderRadius: "md",
                p: 1
              }}
              _active={{ 
                transform: "scale(0.95)",
                color: "black",
                bg: "black.100"
              }}
              onClick={() => console.log("Edit Your Score clicked")}
            />
          </HStack>
          <Box height="1px" bg={borderColor} />

          <SimpleGrid 
            columns={2} 
            gap={3} 
            paddingY={3}
            alignItems="center"
            paddingX="12px"
            flex="1"
          >
            <Box 
              p={4} 
              bg={cardBgColor} 
              borderRadius="md" 
              borderWidth="2px" 
              borderColor={borderColor}
              textAlign="center"
              height="full"
            >
              <Text fontSize="sm" color={mutedColor}>Exam Date</Text>
              <Text fontSize="xl" fontWeight="bold" color={textColor}>01/01/2026</Text>
            </Box>
            
            <Box 
              p={4} 
              bg={cardBgColor} 
              borderRadius="md" 
              borderWidth="2px" 
              borderColor={borderColor}
              textAlign="center"
              height="full"
            >
              <Text fontSize="sm" color={mutedColor}>Days Remaining</Text>
              <Text fontSize="xl" fontWeight="bold" color={textColor}>183 days</Text>
            </Box>
          </SimpleGrid>
        </Box>

        {/* Right - Learning Performance Statistics (70%) */}
        <Box 
          flex="1"
          bg={cardBgColor}
          borderRadius="xl" 
          boxShadow="md"
          borderWidth="1px"
          borderColor={borderColor}
          
        >
          <HStack px={6}
            py={2}>
            <Icon as={TbTargetArrow} color={"black"} boxSize={5}/>
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              Learning Performance
            </Text>
          </HStack>
          
          <Box height="1px" bg={borderColor} />
          <HStack gap={0}>
            {/* Skill Selector - Separate Section */}
              <Box marginLeft="12px" py={0}>
                <Box 
                  maxW="300px"
                  bg={cardBgColor} 
                  borderRadius="md"
                >
                  <SimpleGrid columns={2} gap={0} h="full">
                    {['Reading', 'Listening', 'Writing', 'Speaking'].map((skill, index) => (
                      <Box
                        key={skill}
                        p={2}
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
                          py={0}
                          bg={selectedSkill === skill ? "yellow.400" : "transparent"}
                          color={selectedSkill === skill ? "black" : textColor}
                          borderRadius="full"
                          transition="all 0.2s"
                          fontWeight="medium"
                          fontSize="sm"
                          minW="70px"
                          _hover={{
                            bg: selectedSkill === skill ? "yellow.300" : "gray.200"
                          }}
                        >
                          {skill}
                        </Box>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>
              </Box>

              {/* Performance Metrics */}
              <Flex 
                flex="1"
                gap={3}             
                paddingY={3}
                alignItems="stretch"
                paddingX="12px"
                justify="space-between"
                h="120px">
                
                {/* Tests Completed - Always shown */}
                <Box 
                  flex="1"
                  minW="120px"
                  h="full"
                  p={2} 
                  bg={cardBgColor} 
                  borderRadius="md" 
                  borderWidth="2px" 
                  borderColor={borderColor}
                  textAlign="center"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Text fontSize="xs" color={mutedColor} mb={2}>Tests Completed</Text>
                  <Text fontSize="md" fontWeight="bold" color={textColor}>
                    {selectedSkill === 'Speaking' ? '40' : selectedSkill === 'Writing' ? '4' : '9'}
                  </Text>
                </Box>
                
                {/* Second metric - varies by skill */}
                <Box 
                  flex="1"
                  minW="120px"
                  h="full"
                  p={2} 
                  bg={cardBgColor} 
                  borderRadius="md" 
                  borderWidth="2px" 
                  borderColor={borderColor}
                  textAlign="center"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Text fontSize="xs" color={mutedColor} mb={2}>
                    {selectedSkill === 'Listening' ? 'Accuracy' : 
                     selectedSkill === 'Reading' ? 'Accuracy' : 
                     selectedSkill === 'Speaking' ? 'Total time spent' : 
                     selectedSkill === 'Writing' ? 'Average time spent on Task 1' : 'Accuracy'}
                  </Text>
                  <Text fontSize="md" fontWeight="bold" color={textColor}>
                    {selectedSkill === 'Listening' ? '75%' : 
                     selectedSkill === 'Reading' ? '75%' : 
                     selectedSkill === 'Speaking' ? '128 min' : 
                     selectedSkill === 'Writing' ? '20 min' : '75%'}
                  </Text>
                </Box>
                
                {/* Third metric - varies by skill */}
                <Box 
                  flex="1"
                  h="full"
                  p={2} 
                  bg={cardBgColor} 
                  borderRadius="md" 
                  borderWidth="2px" 
                  borderColor={borderColor}
                  textAlign="center"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Text fontSize="xs" color={mutedColor} mb={2}>
                    {selectedSkill === 'Listening' ? 'Avg. Rewind Count' : 
                     selectedSkill === 'Reading' ? 'Avg. Test Duration' : 
                     selectedSkill === 'Speaking' ? 'Average score' : 
                     selectedSkill === 'Writing' ? 'Average time spent on Task 2' : 'Avg. Rewind Count'}
                  </Text>
                  <Text fontSize="md" fontWeight="bold" color={textColor}>
                    {selectedSkill === 'Listening' ? '2.7 times' : 
                     selectedSkill === 'Reading' ? '2.7 times' : 
                     selectedSkill === 'Speaking' ? '6.0 /9.0' : 
                     selectedSkill === 'Writing' ? '36 min' : '2.7 times'}
                  </Text>
                </Box>
                
                {/* Fourth metric - varies by skill */}
                <Box 
                  flex="1"
                  minW="120px"
                  h="full"
                  p={2} 
                  bg={cardBgColor} 
                  borderRadius="md" 
                  borderWidth="2px" 
                  borderColor={borderColor}
                  textAlign="center"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Text fontSize="xs" color={mutedColor} mb={2}>
                    {selectedSkill === 'Speaking' ? 'Sentences Accuracy' : 'Average Score'}
                  </Text>
                  <Text fontSize="md" fontWeight="bold" color={textColor}>
                    {selectedSkill === 'Listening' ? '7.0/9.0' : 
                     selectedSkill === 'Reading' ? '7.0/9.0' : 
                     selectedSkill === 'Speaking' ? '67%' : 
                     selectedSkill === 'Writing' ? '7.0 /9.0' : '7.0/9.0'}
                  </Text>
                </Box>
                
                {/* Fifth metric - Always Highest Score */}
                <Box 
                  flex="1"
                  minW="120px"
                  h="full"
                  p={2} 
                  bg={cardBgColor} 
                  borderRadius="md" 
                  borderWidth="2px" 
                  borderColor={borderColor}
                  textAlign="center"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Text fontSize="xs" color={mutedColor} mb={2}>Highest Score</Text>
                  <Text fontSize="md" fontWeight="bold" color={textColor}>
                    {selectedSkill === 'Listening' ? '8.0/9.0' : 
                     selectedSkill === 'Reading' ? '8.0/9.0' : 
                     selectedSkill === 'Speaking' ? '7.0/9.0' : 
                     selectedSkill === 'Writing' ? '7.5/9.0' : '8.0/9.0'}
                  </Text>
                </Box>
              </Flex>
          </HStack>
          
        </Box>
      </Flex>

      <Text fontSize="xl" fontWeight="bold" color={textColor} mt={6}>
        Your Practice Journey
      </Text>

      {/* Lịch sử làm bài Section */}
      <Box mt={2}>
        <Box 
          bg={cardBgColor} 
          borderRadius="xl" 
          boxShadow="md" 
          borderWidth="1px"
          borderColor={borderColor}
        >

          {/* Skill Tabs */}
          <HStack gap={2} p="18px">
            {[
              { name: 'Listening', icon: FaHeadphones },
              { name: 'Reading', icon: FaBookOpen },
              { name: 'Writing', icon: BiSolidPencil },
              { name: 'Speaking', icon: BiSolidMicrophone }
            ].map((skill) => (
              <Box
                key={skill.name}
                px={4}
                py={2}
                cursor="pointer"
                bg={selectedTab === skill.name ? "yellow.400" : "transparent"}
                color={selectedTab === skill.name ? "black" : mutedColor}
                fontWeight="bold"
                borderRadius="full"
                onClick={() => setSelectedTab(skill.name)}
                transition="all 0.2s"
                _hover={{ 
                  bg: selectedTab === skill.name ? "yellow.300" : "gray.100",
                  color: selectedTab === skill.name ? "black" : "gray.700"
                }}
              >
                <HStack gap={2}>
                  <Icon as={skill.icon} boxSize={5} />
                  <Text fontSize="md">{skill.name}</Text>
                </HStack>
              </Box>
            ))}
          </HStack>

          {/* Filter Tabs */}
          <HStack gap={6} paddingX="18px">
            {selectedTab === 'Listening' || selectedTab === 'Reading' ? (
              ['By Time', 'By Test Name', 'By Results', 'By Difficulty'].map((filter, index) => (
                <Box key={filter} position="relative">
                  <Text
                    fontSize="sm"
                    color={selectedFilter === filter ? "green.500" : mutedColor}
                    fontWeight="bold"
                    pb={2}
                    cursor="pointer"
                    onClick={() => setSelectedFilter(filter)}
                    _hover={{ color: "green.500" }}
                  >
                    {filter}
                  </Text>
                  {selectedFilter === filter && (
                    <Box
                      position="absolute"
                      bottom="0"
                      left="0"
                      right="0"
                      height="4px"
                      bg="green.500"
                      borderRadius="full"
                    />
                  )}
                </Box>
              ))
            ) : selectedTab === 'Writing' ? (
              ['By Question Type', 'By Time', 'By Section', 'By Results'].map((filter, index) => (
                <Box key={filter} position="relative">
                  <Text
                    fontSize="sm"
                    color={selectedFilter === filter ? "green.500" : mutedColor}
                    fontWeight="bold"
                    pb={2}
                    cursor="pointer"
                    onClick={() => setSelectedFilter(filter)}
                    _hover={{ color: "green.500" }}
                  >
                    {filter}
                  </Text>
                  {selectedFilter === filter && (
                    <Box
                      position="absolute"
                      bottom="0"
                      left="0"
                      right="0"
                      height="4px"
                      bg="green.500"
                      borderRadius="full"
                    />
                  )}
                </Box>
              ))
            ) : selectedTab === 'Speaking' ? (
              ['By Question', 'By Section', 'By Time', 'By Results'].map((filter, index) => (
                <Box key={filter} position="relative">
                  <Text
                    fontSize="sm"
                    color={selectedFilter === filter ? "green.500" : mutedColor}
                    fontWeight="bold"
                    pb={2}
                    cursor="pointer"
                    onClick={() => setSelectedFilter(filter)}
                    _hover={{ color: "green.500" }}
                  >
                    {filter}
                  </Text>
                  {selectedFilter === filter && (
                    <Box
                      position="absolute"
                      bottom="0"
                      left="0"
                      right="0"
                      height="4px"
                      bg="green.500"
                      borderRadius="full"
                    />
                  )}
                </Box>
              ))
            ) : null}
          </HStack>

          {/* Table Container using HTML table */}
          <Box 
            borderXWidth="0" 
            borderYWidth="0"
            borderColor={tableBorderColor}
            overflow="hidden"
          >
            <Box as="table" w="full" borderCollapse="collapse">
              {/* Table Header */}
              <Box as="thead">
                <Box as="tr" bg="background.accent">
                  {selectedTab === 'Listening' || selectedTab === 'Reading' ? (
                    <>
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
                        color="text.primary"
                        w="25%"
                      >
                        Test Name
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
                        color="text.primary"
                        w="12%"
                      >
                        Submission Time
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
                        color="text.primary"
                        w="10%"
                      >
                        Test Duration
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
                        color="text.primary"
                        w="8%"
                      >
                        Total Questions
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
                        color="text.primary"
                        bg="green.100"
                        w="6%"
                      >
                        Correct
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
                        color="text.primary"
                        bg="red.100"
                        w="6%"
                      >
                        Incorrect
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
                        color="text.primary"
                        bg="gray.100"
                        w="6%"
                      >
                        Skipped
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
                        color="text.primary"
                        w="12%"
                      >
                        Accuracy Rate
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
                        color="text.primary"
                        w="7.5%"
                      >
                        Retake
                      </Box>
                      <Box 
                        as="th" 
                        p={4}
                        borderBottomWidth="1px"
                        borderBottomColor={tableBorderColor}
                        textAlign="center"
                        fontWeight="bold"
                        fontSize="sm"
                        color="text.primary"
                        w="7.5%"
                      >
                        Review
                      </Box>
                    </>
                  ) : selectedTab === 'Writing' ? (
                    <>
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
                        color="text.primary"
                        w="35%"
                      >
                        Test Name
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
                        color="text.primary"
                        w="10%"
                      >
                        Task
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
                        color="text.primary"
                        w="15%"
                      >
                        Question Type
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
                        color="text.primary"
                        w="12%"
                      >
                        Submission Time
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
                        color="text.primary"
                        w="10%"
                      >
                        Test Duration
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
                        color="text.primary"
                        bg="green.100"
                        w="8%"
                      >
                        Result
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
                        color="text.primary"
                        w="5%"
                      >
                        Retake
                      </Box>
                      <Box 
                        as="th" 
                        p={4}
                        borderBottomWidth="1px"
                        borderBottomColor={tableBorderColor}
                        textAlign="center"
                        fontWeight="bold"
                        fontSize="sm"
                        color="text.primary"
                        w="5%"
                      >
                        Review
                      </Box>
                    </>
                  ) : selectedTab === 'Speaking' ? (
                    <>
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
                        color="text.primary"
                        w="15%"
                      >
                        Topic
                      </Box>
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
                        color="text.primary"
                        w="45%"
                      >
                        Question
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
                        color="text.primary"
                        w="8%"
                      >
                        Part
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
                        color="text.primary"
                        w="12%"
                      >
                        Submission Time
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
                        color="text.primary"
                        bg="green.100"
                        w="10%"
                      >
                        Result
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
                        color="text.primary"
                        w="5%"
                      >
                        Retake
                      </Box>
                      <Box 
                        as="th" 
                        p={4}
                        borderBottomWidth="1px"
                        borderBottomColor={tableBorderColor}
                        textAlign="center"
                        fontWeight="bold"
                        fontSize="sm"
                        color="text.primary"
                        w="5%"
                      >
                        Review
                      </Box>
                    </>
                  ) : null}
                </Box>
              </Box>

              {/* Table Body */}
              <Box as="tbody">
                {examHistoryData.map((exam: any, index) => {
                  const { date, time } = formatDate(exam["Thời gian nộp bài"])
                  
                  return (
                    <Box 
                      as="tr" 
                      key={exam.id}
                      _hover={{ bg: "background.secondary" }}
                    >
                      {selectedTab === 'Listening' || selectedTab === 'Reading' ? (
                        <>
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

                          {/* Retake */}
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
                            <Link 
                              color="blue.500" 
                              fontSize="sm" 
                              fontWeight="medium"
                              href={`http://localhost:3000/practice/${selectedTab.toLowerCase()}/1`}
                            >
                              Retake
                            </Link>
                          </Box>

                          {/* Review */}
                          <Box 
                            as="td" 
                            p={4}
                            borderBottomWidth={index === examHistoryData.length - 1 ? "0" : "1px"}
                            borderBottomColor={tableBorderColor}
                            textAlign="center"
                            verticalAlign="middle"
                          >
                            <Link 
                              color="blue.500" 
                              fontSize="sm" 
                              fontWeight="medium"
                              href={`http://localhost:3000/result/${selectedTab.toLowerCase()}/1`}
                            >
                              Review
                            </Link>
                          </Box>
                        </>
                      ) : selectedTab === 'Writing' ? (
                        <>
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

                          {/* Task */}
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
                              {exam["Task"]}
                            </Text>
                          </Box>

                          {/* Dạng đề */}
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
                              {exam["Dạng đề"]}
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

                          {/* Kết quả */}
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
                            <Text fontSize="sm" fontWeight="bold" color={exam["Kết quả"] >= 7 ? "green.600" : exam["Kết quả"] >= 6 ? "orange.500" : "red.600"}>
                              {exam["Kết quả"]}
                            </Text>
                          </Box>

                          {/* Retake */}
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
                            <Link 
                              color="blue.500" 
                              fontSize="sm" 
                              fontWeight="medium"
                              href={`http://localhost:3000/practice/${selectedTab.toLowerCase()}/1`}
                            >
                              Retake
                            </Link>
                          </Box>

                          {/* Review */}
                          <Box 
                            as="td" 
                            p={4}
                            borderBottomWidth={index === examHistoryData.length - 1 ? "0" : "1px"}
                            borderBottomColor={tableBorderColor}
                            textAlign="center"
                            verticalAlign="middle"
                          >
                            <Link 
                              color="blue.500" 
                              fontSize="sm" 
                              fontWeight="medium"
                              href={`http://localhost:3000/result/${selectedTab.toLowerCase()}/1`}
                            >
                              Review
                            </Link>
                          </Box>
                        </>
                      ) : selectedTab === 'Speaking' ? (
                        <>
                          {/* Topic */}
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
                              {exam["Topic"]}
                            </Text>
                          </Box>

                          {/* Câu hỏi */}
                          <Box 
                            as="td" 
                            p={4} 
                            borderRightWidth="1px" 
                            borderRightColor={tableBorderColor}
                            borderBottomWidth={index === examHistoryData.length - 1 ? "0" : "1px"}
                            borderBottomColor={tableBorderColor}
                            verticalAlign="middle"
                          >
                            <Text fontSize="sm" color={textColor}>
                              {exam["Câu hỏi"]}
                            </Text>
                          </Box>

                          {/* Part */}
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
                              {exam["Part"]}
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

                          {/* Kết quả */}
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
                            <Text fontSize="sm" fontWeight="bold" color={exam["Kết quả"] >= 7 ? "green.600" : exam["Kết quả"] >= 6 ? "orange.500" : "red.600"}>
                              {exam["Kết quả"]}
                            </Text>
                          </Box>

                          {/* Retake */}
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
                            <Link 
                              color="blue.500" 
                              fontSize="sm" 
                              fontWeight="medium"
                              href={`http://localhost:3000/practice/${selectedTab.toLowerCase()}/1`}
                            >
                              Retake
                            </Link>
                          </Box>

                          {/* Review */}
                          <Box 
                            as="td" 
                            p={4}
                            borderBottomWidth={index === examHistoryData.length - 1 ? "0" : "1px"}
                            borderBottomColor={tableBorderColor}
                            textAlign="center"
                            verticalAlign="middle"
                          >
                            <Link 
                              color="blue.500" 
                              fontSize="sm" 
                              fontWeight="medium"
                              href={`http://localhost:3000/result/${selectedTab.toLowerCase()}/1`}
                            >
                              Review
                            </Link>
                          </Box>
                        </>
                      ) : null}
                    </Box>
                  )
                })}
              </Box>
            </Box>
          </Box>
          {/* Results info below and to the right */}
          <Flex justify="flex-end" w="full" paddingTop={2} paddingRight={4}>
            <Text fontSize="sm" color={mutedColor}>
              Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} results
            </Text>
          </Flex>

          {/* Pagination */}
          <VStack gap={2} mb={4}>
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
                    <Button variant="ghost" size="sm">
                      <Icon as={MdChevronLeft} />
                    </Button>
                  </Pagination.PrevTrigger>
                  
                  <Pagination.Context>
                    {({ pages }) =>
                      pages.map((page, index) =>
                        page.type === "page" ? (
                          <Pagination.Item key={index} {...page} asChild>
                            <Button 
                              variant={page.value === currentPage ? "outline" : "ghost"} 
                              size="sm"
                              color={page.value === currentPage ? "black" : "gray"}
                              bgColor={page.value === currentPage ? "yellow.400" : "transparent"}
                              _hover={{
                                bgColor: page.value === currentPage ? "yellow.300" : "blue.50",
                                color: page.value === currentPage ? "black" : "gray.700",
                                scale: 0.9
                              }}
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
                    <Button variant="ghost" size="sm">
                      <Icon as={MdChevronRight} />
                    </Button>
                  </Pagination.NextTrigger>
                </HStack>
              </Pagination.Root>
            </Flex>
          </VStack>
        </Box>
      </Box>
    </Box>
  )
}
