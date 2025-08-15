"use client"

import { Box, Text, VStack, HStack, Icon } from "@chakra-ui/react"
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

interface CategorizeTestProps {
  selectedSource: string
  setSelectedSource: (value: string) => void
  passages: Passage[]
  questionGroups: { [key: string]: QuestionGroup[] }
  questionGroupTypes: { [key: string]: string }
  getQuestionTypeDisplayName: (typeKey: string) => string
}

export default function CategorizeTest({
  selectedSource,
  setSelectedSource,
  passages,
  questionGroups,
  questionGroupTypes,
  getQuestionTypeDisplayName
}: CategorizeTestProps) {
  return (
    <VStack align="start" gap={6}>
      <Box w="full">
        <Text fontSize="xl" fontWeight="bold" color="text.primary" mb={2}>
          Categorize Test
        </Text>
        <Text fontSize="sm" color="text.muted" mb={6}>
          Provide the source and question types for the test
        </Text>
      </Box>
      <Box 
        w="full" 
        borderWidth="1px" 
        borderColor="border.primary" 
        borderRadius="lg" 
        p={6}
        bg="background.primary"
      >
        <Box w="full" mb={6}>
          <Text fontSize="lg" fontWeight="bold" color="text.primary" mb={2}>
            Source
          </Text>
          <Text fontSize="sm" color="text.muted" mb={4}>
            Select the source for this test
          </Text>
          <Box position="relative" w="300px">
            <select 
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid var(--chakra-colors-border-primary)',
                backgroundColor: 'var(--chakra-colors-background-primary)',
                color: 'var(--chakra-colors-text-primary)',
                fontSize: '14px',
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'><path fill=\'%23666\' d=\'M6 8L2 4h8z\'/></svg>")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                paddingRight: '40px'
              }}
            >
              <option value="Cambridge">Cambridge</option>
              <option value="IELTS Official">IELTS Official</option>
              <option value="British Council">British Council</option>
              <option value="IDP Education">IDP Education</option>
            </select>
          </Box>
        </Box>
        <Box w="full">
          <Text fontSize="lg" fontWeight="bold" color="text.primary" mb={2}>
            Sections and Question Types
          </Text>
          <Text fontSize="sm" color="text.muted" mb={6}>
            Review the sections and question types you have created
          </Text>
          <Box 
            bg="background.primary" 
            color="#4CAF50" 
            px={6} 
            py={3} 
            borderRadius="lg" 
            fontSize="lg" 
            fontWeight="bold"
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            w="fit-content"
            mb={6}
          >
            <HStack gap={3}>
              <Icon as={MdMenuBook} boxSize={6} color="#4CAF50" />
              <Text color="#4CAF50">Reading</Text>
            </HStack>
          </Box>
          <VStack align="start" gap={4} w="full">
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
                <Box key={passage.id} w="full" bg="background.secondary" borderRadius="lg" p={4} borderWidth="1px" borderColor="border.primary">
                  <HStack justify="space-between" align="start" mb={3}>
                    <VStack align="start" gap={2}>
                      <HStack gap={2}>
                        <Icon as={MdMenuBook} color="#4CAF50" boxSize={6} />
                        <Text fontSize="lg" fontWeight="bold" color="text.primary">
                          {passage.title}
                        </Text>
                      </HStack>
                      <Text fontSize="sm" color="text.muted" mb={2}>
                        Question types:
                      </Text>
                      <HStack gap={2} flexWrap="wrap">
                        {questionTypes.length > 0 ? questionTypes.map((type, index) => (
                          <Box key={index} bg="gray.100" color="gray.700" px={3} py={1} borderRadius="md" fontSize="sm">
                            {type}
                          </Box>
                        )) : (
                          <Box bg="gray.100" color="gray.700" px={3} py={1} borderRadius="md" fontSize="sm">
                            No question type yet
                          </Box>
                        )}
                      </HStack>
                    </VStack>
                    <VStack align="end" gap={1}>
                      <Text fontSize="sm" fontWeight="bold" color="text.primary">{totalQuestions || 0} questions</Text>
                      <Text fontSize="sm" color="text.muted">{questionTypes.length} types</Text>
                    </VStack>
                  </HStack>
                </Box>
              )
            })}
          </VStack>
        </Box>
      </Box>
    </VStack>
  )
}