"use client"

import { Box, Text, VStack, HStack, Icon, Button } from "@chakra-ui/react"
import { MdMenuBook } from "react-icons/md"

interface Passage {
  id: string
  title: string
}

interface QuestionGroup {
  id: string
  title: string
  questions: string[]
}

interface ReviewPublishProps {
  testName: string
  testType: string
  selectedSection: string
  selectedSkill: string
  selectedSource: string
  passages: Passage[]
  questionGroups: { [key: string]: QuestionGroup[] }
  questionGroupTypes: { [key: string]: string }
  getQuestionTypeDisplayName: (typeKey: string) => string
}

export default function ReviewPublish({
  testName,
  testType,
  selectedSection,
  selectedSkill,
  selectedSource,
  passages,
  questionGroups,
  questionGroupTypes,
  getQuestionTypeDisplayName
}: ReviewPublishProps) {
  const getSkillBadge = () => {
    if (selectedSkill === "reading") {
      if (selectedSection === "full") return "Reading Full Test"
      if (selectedSection === "passage1") return "Reading Passage 1"
      if (selectedSection === "passage2") return "Reading Passage 2"
      if (selectedSection === "passage3") return "Reading Passage 3"
    } else if (selectedSkill === "listening") {
      if (selectedSection === "full") return "Listening Full Test"
      if (selectedSection === "part1") return "Listening Part 1"
      if (selectedSection === "part2") return "Listening Part 2"
      if (selectedSection === "part3") return "Listening Part 3"
    } else if (selectedSkill === "writing") {
      if (selectedSection === "full") return "Writing Full Test"
      if (selectedSection === "task1") return "Writing Task 1"
      if (selectedSection === "task2") return "Writing Task 2"
    } else if (selectedSkill === "speaking") {
      if (selectedSection === "full") return "Speaking Full Test"
      if (selectedSection === "part1") return "Speaking Part 1"
      if (selectedSection === "part2") return "Speaking Part 2"
      if (selectedSection === "part3") return "Speaking Part 3"
    }
    return "Reading Full Test"
  }

  return (
    <VStack align="start" gap={6}>
      <Box w="full">
        <Text fontSize="xl" fontWeight="bold" color="text.primary" mb={2}>
          Review & Publish
        </Text>
        <Text fontSize="sm" color="text.muted" mb={6}>
          Review your test before publishing
        </Text>
      </Box>
      <VStack align="start" gap={4} w="full">
        <Box 
          w="full" 
          bg="background.primary" 
          borderWidth="1px" 
          borderColor="border.primary" 
          borderRadius="lg" 
          p={4}
        >
          <Text fontSize="lg" fontWeight="bold" color="text.primary" mb={4}>
            Test Information
          </Text>
          <HStack justify="space-between" align="center" w="full">
            <VStack align="start" gap={2}>
              <HStack gap={8}>
                <Box>
                  <Text fontSize="sm" color="text.muted" mb={1}>Name:</Text>
                  <Text fontSize="sm" fontWeight="medium" color="text.primary">
                    {testName || "[Cambridge 18] Reading Test 1"}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="text.muted" mb={1}>Type:</Text>
                  <Text fontSize="sm" fontWeight="medium" color="text.primary">
                    {testType === "full" || selectedSection === "full" ? "Full Test" : "Mini Test"}
                  </Text>
                </Box>
              </HStack>
            </VStack>
          </HStack>
        </Box>
        <Box 
          w="full" 
          bg="background.primary" 
          borderWidth="1px" 
          borderColor="border.primary" 
          borderRadius="lg" 
          p={4}
        >
          <Text fontSize="lg" fontWeight="bold" color="text.primary" mb={4}>
            Includes
          </Text>
          <VStack align="start" gap={4} w="full">
            <Box
              bg="black"
              color="white"
              px={4}
              py={2}
              borderRadius="md"
              fontSize="sm"
              fontWeight="medium"
              w="fit-content"
            >
              {getSkillBadge()}
            </Box>
            <Box>
              <Text fontSize="sm" color="text.muted" mb={2}>Source:</Text>
              <Text fontSize="sm" fontWeight="medium" color="text.primary">
                {selectedSource || "Cambridge"}
              </Text>
            </Box>
            {passages.length > 0 && (
              <Box w="full">
                <Text fontSize="sm" color="text.muted" mb={2}>Question types:</Text>
                <VStack align="start" gap={2} w="full">
                  {passages.map((passage) => {
                    const passageGroups = questionGroups[passage.id as keyof typeof questionGroups] || []
                    const totalQuestions = passageGroups.reduce((acc, group) => acc + group.questions.length, 0)
                    const getActualQuestionTypes = (passageId: string) => {
                      const groups = questionGroups[passageId as keyof typeof questionGroups] || []
                      const types = new Set<string>()
                      groups.forEach(group => {
                        const groupKey = `${passageId}_${group.id}`
                        const questionType = questionGroupTypes[groupKey]
                        if (questionType) {
                          types.add(getQuestionTypeDisplayName(questionType))
                        }
                      })
                      return Array.from(types)
                    }
                    const questionTypes = getActualQuestionTypes(passage.id)
                    return (
                      <Box key={passage.id} w="full" p={3} bg="background.secondary" borderRadius="md">
                        <HStack justify="space-between" align="center" w="full">
                          <VStack align="start" gap={1}>
                            <Text fontSize="sm" fontWeight="bold" color="text.primary">
                              {passage.title}
                            </Text>
                            <HStack gap={2} flexWrap="wrap">
                              {questionTypes.length > 0 ? questionTypes.map((type, index) => (
                                <Box key={index} bg="gray.100" color="gray.700" px={2} py={1} borderRadius="sm" fontSize="xs">
                                  {type}
                                </Box>
                              )) : (
                                <Box bg="gray.100" color="gray.700" px={2} py={1} borderRadius="sm" fontSize="xs">
                                  No question type yet
                                </Box>
                              )}
                            </HStack>
                          </VStack>
                          <Text fontSize="xs" color="text.muted">{totalQuestions || 0} questions</Text>
                        </HStack>
                      </Box>
                    )
                  })}
                </VStack>
              </Box>
            )}
          </VStack>
        </Box>
      </VStack>
      <HStack justify="flex-end" w="full" mt={8}>
        <Button
          size="md"
          bg="#28A745"
          color="white"
          _hover={{ bg: "#218838" }}
        >
          Publish
        </Button>
      </HStack>
    </VStack>
  )
}