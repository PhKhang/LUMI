"use client"

import { 
  Box, 
  Text, 
  Button, 
  HStack, 
  Icon, 
  VStack,
  Input,
  Flex,
  Container,
  SimpleGrid
} from "@chakra-ui/react"
import { Field } from "@chakra-ui/react"
import { MdLightbulb, MdArrowForward, MdArrowBack, MdCheck, MdHeadphones, MdMenuBook, MdEdit, MdMic, MdAdd, MdExpandLess, MdExpandMore, MdFolder, MdFolderOpen, MdImage, MdChevronRight, MdDescription, MdClose } from "react-icons/md"
import { useState } from "react"

export default function ExamsPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [testName, setTestName] = useState("")
  const [testType, setTestType] = useState("mini")
  const [selectedSkill, setSelectedSkill] = useState("reading")
  const [selectedSection, setSelectedSection] = useState("")
  const [selectedPassage, setSelectedPassage] = useState("passage1")
  const [selectedQuestionGroup, setSelectedQuestionGroup] = useState("passage1_question1-3")
  const [passageTitle, setPassageTitle] = useState("The Horseshoe Crab")
  const [passageContent, setPassageContent] = useState("A. One of the world's oldest animal species, the horseshoe crab, is found along the east coast of the United States and Mexico. Fossil records indicate this creature dates back 450 million years, and it has changed very little over time. This is because its anatomy has been so successful. In fact, the horseshoe crab is more closely related to spiders, scorpions and ticks than it is to true crabs and other crustaceans.\n\n")
  const [selectedSource, setSelectedSource] = useState("Cambridge")
  const [expandedPassages, setExpandedPassages] = useState({
    passage1: true,
    passage2: true,
    passage3: false
  })
  
  // State for managing right panel section expansions
  const [expandedSections, setExpandedSections] = useState({
    passageInfo: true,
    questionGroupInfo: true,
    questionDetails: true
  })

  // State for managing individual question expansions
  const [expandedQuestions, setExpandedQuestions] = useState<{[key: string]: boolean}>({})

  const toggleQuestion = (questionKey: string) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionKey]: !prev[questionKey]
    }))
  }
  
  const [questionGroups, setQuestionGroups] = useState({
    passage1: [
      { id: "question1-3", title: "Question 1-3", questions: ["Question 1", "Question 2", "Question 3"] },
      { id: "question4-7", title: "Question 4-7", questions: ["Question 4", "Question 5", "Question 6", "Question 7"] }
    ],
    passage2: [
      { id: "question1-5", title: "Question 1-5", questions: ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"] }
    ],
    passage3: [
      { id: "question1-6", title: "Question 1-6", questions: ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5", "Question 6"] }
    ]
  })

  // State để lưu loại câu hỏi cho từng question group
  const [questionGroupTypes, setQuestionGroupTypes] = useState<{[key: string]: string}>({
    "passage1_question1-3": "true-false-not-given",
    "passage1_question4-7": "matching-headings", 
    "passage2_question1-5": "matching-information",
    "passage3_question1-6": "multiple-choice"
  })
  // Generate passages based on selected section
  const getPassages = () => {
    if (selectedSection === "full") {
      return [
        { id: "passage1", title: "Passage 1" },
        { id: "passage2", title: "Passage 2" },
        { id: "passage3", title: "Passage 3" }
      ]
    } else if (selectedSection === "passage1") {
      return [{ id: "passage1", title: "Passage 1" }]
    } else if (selectedSection === "passage2") {
      return [{ id: "passage2", title: "Passage 2" }]
    } else if (selectedSection === "passage3") {
      return [{ id: "passage3", title: "Passage 3" }]
    }
    // Default fallback
    return [
      { id: "passage1", title: "Passage 1" },
      { id: "passage2", title: "Passage 2" },
      { id: "passage3", title: "Passage 3" }
    ]
  }

  const passages = getPassages()

  const togglePassage = (passageKey: string) => {
    setExpandedPassages(prev => ({
      ...prev,
      [passageKey]: !prev[passageKey as keyof typeof prev]
    }))
  }

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey as keyof typeof prev]
    }))
  }

  const addQuestionGroup = (passageKey: string) => {
    const passageGroups = questionGroups[passageKey as keyof typeof questionGroups]
    const nextGroupNumber = passageGroups.length + 1
    const startQuestion = passageGroups.reduce((acc, group) => acc + group.questions.length, 0) + 1
    const endQuestion = startQuestion + 2 // Default to 3 questions
    
    const newGroup = {
      id: `question${startQuestion}-${endQuestion}`,
      title: `Question ${startQuestion}-${endQuestion}`,
      questions: Array.from({ length: 3 }, (_, i) => `Question ${startQuestion + i}`)
    }
    
    setQuestionGroups(prev => ({
      ...prev,
      [passageKey]: [...prev[passageKey as keyof typeof prev], newGroup]
    }))
  }

  const deleteQuestionGroup = (passageKey: string, groupId: string) => {
    setQuestionGroups(prev => {
      const currentGroups = prev[passageKey as keyof typeof prev]
      const groupToDeleteIndex = currentGroups.findIndex(group => group.id === groupId)
      const updatedGroups = currentGroups.filter(group => group.id !== groupId)
      
      // Renumber all groups and questions after deletion
      const renumberedGroups = updatedGroups.map((group, groupIndex) => {
        const startQuestion = groupIndex === 0 ? 1 : 
          updatedGroups.slice(0, groupIndex).reduce((acc, prevGroup) => acc + prevGroup.questions.length, 0) + 1
        const endQuestion = startQuestion + group.questions.length - 1
        
        return {
          ...group,
          id: `question${startQuestion}-${endQuestion}`,
          title: `Question ${startQuestion}-${endQuestion}`,
          questions: group.questions.map((_, questionIndex) => `Question ${startQuestion + questionIndex}`)
        }
      })
      
      // Update selected question group if it was affected by renumbering
      if (selectedQuestionGroup && selectedQuestionGroup !== `${passageKey}_${groupId}`) {
        const selectedGroupIndex = currentGroups.findIndex(group => group.id === selectedQuestionGroup.split('_')[1])
        if (selectedGroupIndex > groupToDeleteIndex) {
          // If selected group was after deleted group, update to new ID
          const newSelectedIndex = selectedGroupIndex - 1
          if (newSelectedIndex >= 0 && renumberedGroups[newSelectedIndex]) {
            setSelectedQuestionGroup(`${passageKey}_${renumberedGroups[newSelectedIndex].id}`)
          }
        }
      }
      
      return {
        ...prev,
        [passageKey]: renumberedGroups
      }
    })
    
    // Reset selection if deleted group was selected
    if (selectedQuestionGroup === `${passageKey}_${groupId}`) {
      setSelectedQuestionGroup("")
    }
  }

  const addQuestion = (passageKey: string, groupId: string) => {
    setQuestionGroups(prev => {
      const currentGroups = prev[passageKey as keyof typeof prev]
      const updatedGroupsWithAddition = currentGroups.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            questions: [...group.questions, `Temp Question`]
          }
        }
        return group
      })
      
      // Renumber all groups and questions after addition
      const renumberedGroups = updatedGroupsWithAddition.map((group, groupIndex) => {
        const startQuestion = groupIndex === 0 ? 1 : 
          updatedGroupsWithAddition.slice(0, groupIndex).reduce((acc, prevGroup) => acc + prevGroup.questions.length, 0) + 1
        const endQuestion = startQuestion + group.questions.length - 1
        
        return {
          ...group,
          id: `question${startQuestion}-${endQuestion}`,
          title: `Question ${startQuestion}-${endQuestion}`,
          questions: group.questions.map((_, questionIndex) => `Question ${startQuestion + questionIndex}`)
        }
      })
      
      // Update selected question group if it was the one being modified
      if (selectedQuestionGroup === `${passageKey}_${groupId}`) {
        const modifiedGroup = renumberedGroups.find(group => 
          currentGroups.findIndex(originalGroup => originalGroup.id === groupId) === 
          renumberedGroups.findIndex(newGroup => newGroup === group)
        )
        if (modifiedGroup) {
          setSelectedQuestionGroup(`${passageKey}_${modifiedGroup.id}`)
        }
      } else {
        // Update selection if other groups were renumbered
        const selectedGroupOriginalIndex = currentGroups.findIndex(group => group.id === selectedQuestionGroup.split('_')[1])
        if (selectedGroupOriginalIndex >= 0 && renumberedGroups[selectedGroupOriginalIndex]) {
          setSelectedQuestionGroup(`${passageKey}_${renumberedGroups[selectedGroupOriginalIndex].id}`)
        }
      }
      
      return {
        ...prev,
        [passageKey]: renumberedGroups
      }
    })
  }

  const deleteQuestion = (passageKey: string, groupId: string, questionIndex: number) => {
    setQuestionGroups(prev => {
      const currentGroups = prev[passageKey as keyof typeof prev]
      const updatedGroupsWithDeletion = currentGroups.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            questions: group.questions.filter((_, index) => index !== questionIndex)
          }
        }
        return group
      })
      
      // Renumber all groups and questions after deletion
      const renumberedGroups = updatedGroupsWithDeletion.map((group, groupIndex) => {
        const startQuestion = groupIndex === 0 ? 1 : 
          updatedGroupsWithDeletion.slice(0, groupIndex).reduce((acc, prevGroup) => acc + prevGroup.questions.length, 0) + 1
        const endQuestion = startQuestion + group.questions.length - 1
        
        return {
          ...group,
          id: `question${startQuestion}-${endQuestion}`,
          title: `Question ${startQuestion}-${endQuestion}`,
          questions: group.questions.map((_, questionIndex) => `Question ${startQuestion + questionIndex}`)
        }
      })
      
      // Update selected question group if it was the one being modified
      if (selectedQuestionGroup === `${passageKey}_${groupId}`) {
        const modifiedGroup = renumberedGroups.find(group => 
          currentGroups.findIndex(originalGroup => originalGroup.id === groupId) === 
          renumberedGroups.findIndex(newGroup => newGroup === group)
        )
        if (modifiedGroup) {
          setSelectedQuestionGroup(`${passageKey}_${modifiedGroup.id}`)
        }
      } else {
        // Update selection if other groups were renumbered
        const selectedGroupOriginalIndex = currentGroups.findIndex(group => group.id === selectedQuestionGroup.split('_')[1])
        if (selectedGroupOriginalIndex >= 0 && renumberedGroups[selectedGroupOriginalIndex]) {
          setSelectedQuestionGroup(`${passageKey}_${renumberedGroups[selectedGroupOriginalIndex].id}`)
        }
      }
      
      return {
        ...prev,
        [passageKey]: renumberedGroups
      }
    })
  }

  // Function để update loại câu hỏi cho question group
  const updateQuestionGroupType = (groupKey: string, questionType: string) => {
    setQuestionGroupTypes(prev => ({
      ...prev,
      [groupKey]: questionType
    }))
  }

  // Function để lấy tên hiển thị của loại câu hỏi
  const getQuestionTypeDisplayName = (typeKey: string) => {
    const typeMap: {[key: string]: string} = {
      "true-false-not-given": "True/False/Not Given",
      "multiple-choice": "Multiple Choice (One Answer)",
      "fill-in-blanks": "Fill in the Blanks", 
      "matching": "Matching Information",
      "matching-headings": "Matching Headings",
      "matching-information": "Matching Information",
      "gap-filling": "Gap Filling",
      "summary-completion": "Summary Completion"
    }
    return typeMap[typeKey] || typeKey
  }

  const steps = [
    { number: 1, title: "Information", description: "Name and Test type" },
    { number: 2, title: "Select content", description: "Select skills and sections for the Test" },
    { number: 3, title: "Create question", description: "Create test content" },
    { number: 4, title: "Categorize test", description: "Choose test source and question type" },
    { number: 5, title: "Review", description: "Final check and publish test" }
  ]

  return (
    <Box bg="background.primary" minH="100vh" p={0}>
      <Container py={6}>
        {/* Header */}
        <Text fontSize="2xl" fontWeight="bold" color="text.primary" mb={8}>
          Create New Test
        </Text>

        {/* Progress Steps */}
        <Box mb={8}>
          <Text fontSize="sm" color="text.muted" mb={4}>
            Step {currentStep} of 5
          </Text>
          
          <HStack gap={0} mb={6}>
            {steps.map((step, index) => (
              <Flex key={step.number} align="center" flex="1">
                {/* Step Circle */}
                <Flex
                  w={10}
                  h={10}
                  borderRadius="full"
                  bg={currentStep >= step.number ? "accent" : "border.secondary"}
                  color={currentStep >= step.number ? "white" : "text.muted"}
                  align="center"
                  justify="center"
                  fontWeight="bold"
                  fontSize="sm"
                >
                  {currentStep > step.number ? (
                    <Icon as={MdCheck} boxSize={5} />
                  ) : (
                    step.number
                  )}
                </Flex>
                
                {/* Step Info */}
                <VStack align="start" ml={3} flex="1">
                  <Text 
                    fontSize="sm" 
                    fontWeight="bold"
                    color={currentStep >= step.number ? "accent" : "text.muted"}
                  >
                    {step.title}
                  </Text>
                  <Text fontSize="xs" color="text.muted">
                    {step.description}
                  </Text>
                </VStack>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <Box
                    h="2px"
                    w="40px"
                    bg={currentStep > step.number ? "accent" : "border.secondary"}
                    mx={4}
                  />
                )}
              </Flex>
            ))}
          </HStack>
        </Box>

        {/* Main Content */}
        <Box 
          bg="background.primary" 
          borderRadius="lg" 
          shadow="md" 
          p={8}
          borderWidth="1px"
          borderColor="border.primary"
        >
          {/* Step 1 Content */}
          {currentStep === 1 && (
            <VStack align="start" gap={6}>
              <Box>
                <Text fontSize="xl" fontWeight="bold" color="text.primary" mb={2}>
                  Test Information
                </Text>
                <Text fontSize="sm" color="text.muted">
                  Provide basic information of the Test
                </Text>
              </Box>

              {/* Test Name Input */}
              <Box w="full">
                <Field.Root>
                  <Field.Label fontSize="sm" fontWeight="medium" color="text.primary" mb={2}>
                    Test name
                  </Field.Label>
                  <Input
                    placeholder="e.g: [Cambridge 19] Reading Test 1"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    size="md"
                    bg="background.primary"
                    borderColor="border.primary"
                    color="text.primary"
                    _focus={{ borderColor: "accent", boxShadow: "0 0 0 1px var(--chakra-colors-accent)" }}
                  />
                </Field.Root>
              </Box>

              {/* Test Type Selection */}
              <Box w="full">
                <Text fontSize="sm" fontWeight="medium" color="text.primary" mb={4}>
                  Test type
                </Text>
                <VStack align="start" gap={4}>
                  {/* Full Test Option */}
                  <Box 
                    w="full"
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    cursor="pointer"
                    borderColor={testType === "full" ? "accent" : "border.primary"}
                    bg={testType === "full" ? "background.accent" : "background.primary"}
                    _hover={{ borderColor: "secondary" }}
                    onClick={() => setTestType("full")}
                  >
                    <HStack align="start" gap={3}>
                      <Box
                        w={4}
                        h={4}
                        borderRadius="full"
                        borderWidth="2px"
                        borderColor={testType === "full" ? "accent" : "border.secondary"}
                        bg={testType === "full" ? "accent" : "transparent"}
                        mt={0.5}
                        position="relative"
                      >
                        {testType === "full" && (
                          <Box
                            w={2}
                            h={2}
                            borderRadius="full"
                            bg="background.primary"
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                          />
                        )}
                      </Box>
                      <VStack align="start" gap={1}>
                        <Text fontWeight="bold" color="text.primary">
                          Full Test
                        </Text>
                        <Text fontSize="sm" color="text.muted">
                          Complete IELTS test with all 4 skills
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>

                  {/* Mini Test Option */}
                  <Box 
                    w="full"
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    cursor="pointer"
                    borderColor={testType === "mini" ? "accent" : "border.primary"}
                    bg={testType === "mini" ? "background.accent" : "background.primary"}
                    _hover={{ borderColor: "secondary" }}
                    onClick={() => setTestType("mini")}
                  >
                    <HStack align="start" gap={3}>
                      <Box
                        w={4}
                        h={4}
                        borderRadius="full"
                        borderWidth="2px"
                        borderColor={testType === "mini" ? "accent" : "border.secondary"}
                        bg={testType === "mini" ? "accent" : "transparent"}
                        mt={0.5}
                        position="relative"
                      >
                        {testType === "mini" && (
                          <Box
                            w={2}
                            h={2}
                            borderRadius="full"
                            bg="background.primary"
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                          />
                        )}
                      </Box>
                      <VStack align="start" gap={1}>
                        <Text fontWeight="bold" color="text.primary">
                          Mini Test
                        </Text>
                        <Text fontSize="sm" color="text.muted">
                          Small IELTS test with 1 skill only
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </VStack>
              </Box>

              {/* Note Section */}
              <Box 
                bg="background.secondary" 
                borderColor="border.secondary" 
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                w="full"
              >
                <HStack align="start" gap={3}>
                  <Icon as={MdLightbulb} color="secondary" boxSize={5} mt={0.5} />
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color="text.primary" mb={1}>
                      Note
                    </Text>
                    <Text fontSize="sm" color="text.secondary">
                      A Mini Test can include all sections of a skill or only one section within that skill.
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </VStack>
          )}

          {/* Step 2 Content */}
          {currentStep === 2 && (
            <VStack align="start" gap={6}>
              <Box>
                <Text fontSize="xl" fontWeight="bold" color="text.primary" mb={2}>
                  Select content
                </Text>
                <Text fontSize="sm" color="text.muted">
                  Select content for Mini Test
                </Text>
              </Box>

              {/* Skill Selection */}
              <Box w="full">
                <Text fontSize="sm" fontWeight="medium" color="text.primary" mb={4}>
                  Select skill
                </Text>
                <SimpleGrid columns={2} gap={4} w="full">
                  {[
                    { key: "listening", label: "Listening", description: "Section: Part 1, Part 2, Part 3, Part 4", icon: MdHeadphones },
                    { key: "reading", label: "Reading", description: "Section: Passage 1, Passage 2, Passage 3", icon: MdMenuBook },
                    { key: "writing", label: "Writing", description: "Section: Task 1, Task 2", icon: MdEdit },
                    { key: "speaking", label: "Speaking", description: "Section: Part 1, Part 2, Part 3", icon: MdMic }
                  ].map((skill) => (
                    <HStack 
                      key={skill.key}
                      flex="1"
                      p={4}
                      borderWidth="1px"
                      borderRadius="lg"
                      cursor="pointer"
                      borderColor={selectedSkill === skill.key ? "accent" : "border.primary"}
                      bg={selectedSkill === skill.key ? "background.accent" : "background.primary"}
                      _hover={{ borderColor: "secondary" }}
                      onClick={() => {
                        setSelectedSkill(skill.key)
                        setSelectedSection("")
                      }}
                    >
                      <HStack align="start" gap={3}>
                        <Box
                          w={4}
                          h={4}
                          borderRadius="full"
                          borderWidth="2px"
                          borderColor={selectedSkill === skill.key ? "accent" : "border.secondary"}
                          bg={selectedSkill === skill.key ? "accent" : "transparent"}
                          mt={0.5}
                          position="relative"
                        >
                          {selectedSkill === skill.key && (
                            <Box
                              w={2}
                              h={2}
                              borderRadius="full"
                              bg="background.primary"
                              position="absolute"
                              top="50%"
                              left="50%"
                              transform="translate(-50%, -50%)"
                            />
                          )}
                        </Box>
                        <Box>
                          <Icon 
                            as={skill.icon} 
                            boxSize={6} 
                            color={selectedSkill === skill.key ? "accent" : "text.muted"} 
                            mb={1}
                          />
                        </Box>
                      </HStack>
                      <VStack align="start" gap={1} mt={2}>
                        <Text fontWeight="bold" color="text.primary">
                          {skill.label}
                        </Text>
                        <Text fontSize="sm" color="text.muted">
                          {skill.description}
                        </Text>
                      </VStack>
                    </HStack>
                  ))}
                </SimpleGrid>
              </Box>

              {/* Section Selection - Show based on selected skill */}
              {selectedSkill && (
                <Box w="full">
                  <Text fontSize="sm" fontWeight="medium" color="text.primary" mb={4}>
                    Select Section
                  </Text>
                  <HStack w="full" gap={3}>
                    {/* Reading Sections */}
                    {selectedSkill === "reading" && [
                      { key: "full", label: "Full Section", description: "All sections in this skill" },
                      { key: "passage1", label: "Passage 1", description: "Only this section" },
                      { key: "passage2", label: "Passage 2", description: "Only this section" },
                      { key: "passage3", label: "Passage 3", description: "Only this section" }
                    ].map((section) => (
                      <Box 
                        key={section.key}
                        flex="1"
                        p={3}
                        borderWidth="1px"
                        borderRadius="lg"
                        cursor="pointer"
                        borderColor={selectedSection === section.key ? "accent" : "border.primary"}
                        bg={selectedSection === section.key ? "background.accent" : "background.primary"}
                        _hover={{ borderColor: "secondary" }}
                        onClick={() => setSelectedSection(section.key)}
                        textAlign="center"
                      >
                        <VStack align="center" gap={2}>
                          <Box
                            w={4}
                            h={4}
                            borderRadius="full"
                            borderWidth="2px"
                            borderColor={selectedSection === section.key ? "accent" : "border.secondary"}
                            bg={selectedSection === section.key ? "accent" : "transparent"}
                            position="relative"
                            mx="auto"
                          >
                            {selectedSection === section.key && (
                              <Box
                                w={2}
                                h={2}
                                borderRadius="full"
                                bg="background.primary"
                                position="absolute"
                                top="50%"
                                left="50%"
                                transform="translate(-50%, -50%)"
                              />
                            )}
                          </Box>
                          <VStack gap={1}>
                            <Text fontWeight="bold" color="text.primary" fontSize="sm">
                              {section.label}
                            </Text>
                            <Text fontSize="xs" color="text.muted" textAlign="center">
                              {section.description}
                            </Text>
                          </VStack>
                        </VStack>
                      </Box>
                    ))}

                    {/* Listening Parts */}
                    {selectedSkill === "listening" && [
                      { key: "full", label: "Full Part", description: "Include all parts" },
                      { key: "part1", label: "Part 1", description: "Create for this part only" },
                      { key: "part2", label: "Part 2", description: "Create for this part only" },
                      { key: "part3", label: "Part 3", description: "Create for this part only" }
                    ].map((section) => (
                      <Box 
                        key={section.key}
                        flex="1"
                        p={3}
                        borderWidth="1px"
                        borderRadius="lg"
                        cursor="pointer"
                        borderColor={selectedSection === section.key ? "accent" : "border.primary"}
                        bg={selectedSection === section.key ? "background.accent" : "background.primary"}
                        _hover={{ borderColor: "secondary" }}
                        onClick={() => setSelectedSection(section.key)}
                        textAlign="center"
                      >
                        <VStack align="center" gap={2}>
                          <Box
                            w={4}
                            h={4}
                            borderRadius="full"
                            borderWidth="2px"
                            borderColor={selectedSection === section.key ? "accent" : "border.secondary"}
                            bg={selectedSection === section.key ? "accent" : "transparent"}
                            position="relative"
                            mx="auto"
                          >
                            {selectedSection === section.key && (
                              <Box
                                w={2}
                                h={2}
                                borderRadius="full"
                                bg="background.primary"
                                position="absolute"
                                top="50%"
                                left="50%"
                                transform="translate(-50%, -50%)"
                              />
                            )}
                          </Box>
                          <VStack gap={1}>
                            <Text fontWeight="bold" color="text.primary" fontSize="sm">
                              {section.label}
                            </Text>
                            <Text fontSize="xs" color="text.muted" textAlign="center">
                              {section.description}
                            </Text>
                          </VStack>
                        </VStack>
                      </Box>
                    ))}

                    {/* Writing Tasks */}
                    {selectedSkill === "writing" && [
                      { key: "full", label: "Full Writing", description: "Include all tasks" },
                      { key: "task1", label: "Task 1", description: "Create for this task only" },
                      { key: "task2", label: "Task 2", description: "Create for this task only" }
                    ].map((section) => (
                      <Box 
                        key={section.key}
                        flex="1"
                        p={3}
                        borderWidth="1px"
                        borderRadius="lg"
                        cursor="pointer"
                        borderColor={selectedSection === section.key ? "accent" : "border.primary"}
                        bg={selectedSection === section.key ? "background.accent" : "background.primary"}
                        _hover={{ borderColor: "secondary" }}
                        onClick={() => setSelectedSection(section.key)}
                        textAlign="center"
                      >
                        <VStack align="center" gap={2}>
                          <Box
                            w={4}
                            h={4}
                            borderRadius="full"
                            borderWidth="2px"
                            borderColor={selectedSection === section.key ? "accent" : "border.secondary"}
                            bg={selectedSection === section.key ? "accent" : "transparent"}
                            position="relative"
                            mx="auto"
                          >
                            {selectedSection === section.key && (
                              <Box
                                w={2}
                                h={2}
                                borderRadius="full"
                                bg="background.primary"
                                position="absolute"
                                top="50%"
                                left="50%"
                                transform="translate(-50%, -50%)"
                              />
                            )}
                          </Box>
                          <VStack gap={1}>
                            <Text fontWeight="bold" color="text.primary" fontSize="sm">
                              {section.label}
                            </Text>
                            <Text fontSize="xs" color="text.muted" textAlign="center">
                              {section.description}
                            </Text>
                          </VStack>
                        </VStack>
                      </Box>
                    ))}

                    {/* Speaking Parts */}
                    {selectedSkill === "speaking" && [
                      { key: "full", label: "Full Speaking", description: "Include all parts" },
                      { key: "part1", label: "Part 1", description: "Create for this part only" },
                      { key: "part2", label: "Part 2", description: "Create for this part only" },
                      { key: "part3", label: "Part 3", description: "Create for this part only" }
                    ].map((section) => (
                      <Box 
                        key={section.key}
                        flex="1"
                        p={3}
                        borderWidth="1px"
                        borderRadius="lg"
                        cursor="pointer"
                        borderColor={selectedSection === section.key ? "accent" : "border.primary"}
                        bg={selectedSection === section.key ? "background.accent" : "background.primary"}
                        _hover={{ borderColor: "secondary" }}
                        onClick={() => setSelectedSection(section.key)}
                        textAlign="center"
                      >
                        <VStack align="center" gap={2}>
                          <Box
                            w={4}
                            h={4}
                            borderRadius="full"
                            borderWidth="2px"
                            borderColor={selectedSection === section.key ? "accent" : "border.secondary"}
                            bg={selectedSection === section.key ? "accent" : "transparent"}
                            position="relative"
                            mx="auto"
                          >
                            {selectedSection === section.key && (
                              <Box
                                w={2}
                                h={2}
                                borderRadius="full"
                                bg="background.primary"
                                position="absolute"
                                top="50%"
                                left="50%"
                                transform="translate(-50%, -50%)"
                              />
                            )}
                          </Box>
                          <VStack gap={1}>
                            <Text fontWeight="bold" color="text.primary" fontSize="sm">
                              {section.label}
                            </Text>
                            <Text fontSize="xs" color="text.muted" textAlign="center">
                              {section.description}
                            </Text>
                          </VStack>
                        </VStack>
                      </Box>
                    ))}
                  </HStack>
                </Box>
              )}
            </VStack>
          )}

          {/* Step 3 Content */}
          {currentStep === 3 && (
            <VStack align="start" gap={4}>
              <Box w="full">
                <Text fontSize="xl" fontWeight="bold" color="text.primary" mb={2}>
                  Create Questions
                </Text>
                <Text fontSize="sm" color="text.muted" mb={3}>
                  Click on a question group to view and edit the questions inside
                </Text>
                {/* Divider line - stays within container */}
                <Box 
                  w="full" 
                  h="1px" 
                  bg="border.primary"
                />
              </Box>

              {/* Main Content Area */}
              <Flex align="start" gap={6} w="full" minH="600px">
                {/* Left Navigation Panel */}
                <Box 
                  w="350px" 
                  bg="background.primary" 
                  borderRadius="lg" 
                  p={4}
                  minH="600px"
                  overflow="auto"
                  mt="-4"
                >
                  {/* Skill Badge */}
                  <Box 
                    w="full"
                    bg="background.primary" 
                    color="black" 
                    px={3} 
                    py={2} 
                    borderRadius="md" 
                    fontSize="md" 
                    fontWeight="medium"
                    mb={4}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderWidth="2px"
                    borderColor="border.primary"
                  >
                    <HStack gap={2}>
                      <Icon as={MdMenuBook} boxSize={4} color="black" />
                      <Text color="black">Reading</Text>
                    </HStack>
                  </Box>

                  {/* Passage Structure */}
                  <VStack align="start" gap={2} w="full">
                    {/* Dynamic Passages */}
                    {passages.map((passage) => (
                      <Box key={passage.id} w="full" bg="background.secondary" borderRadius="md" p={3} mb={2}>
                        <HStack justify="space-between" w="full" mb={2}>
                          <HStack gap={2}>
                            <Icon as={MdMenuBook} color="#4CAF50" boxSize={6} />
                            <Text fontSize="lg" fontWeight="bold" color="black">
                              {passage.title}
                            </Text>
                          </HStack>
                          <HStack gap={2}>
                            <Icon 
                              as={MdAdd} 
                              color="#4CAF50" 
                              boxSize={6} 
                              cursor="pointer" 
                              _hover={{ color: "#45A049" }}
                              onClick={() => addQuestionGroup(passage.id)}
                            />
                            <Icon 
                              as={MdClose} 
                              color="#F44336" 
                              boxSize={5} 
                              cursor="pointer" 
                              _hover={{ color: "#D32F2F" }}
                            />
                          </HStack>
                        </HStack>
                        
                        <VStack align="start" gap={2} ml={6}>
                          {questionGroups[passage.id as keyof typeof questionGroups]?.map((group) => (
                            <Box 
                              key={group.id}
                              w="full" 
                              p={3} 
                              borderRadius="md" 
                              bg={selectedQuestionGroup === `${passage.id}_${group.id}` ? "green.100" : "background.secondary"}
                              color={selectedQuestionGroup === `${passage.id}_${group.id}` ? "black" : "black"}
                              cursor="pointer"
                              onClick={() => setSelectedQuestionGroup(`${passage.id}_${group.id}`)}
                            >
                              <HStack justify="space-between" w="full">
                                <HStack gap={2}>
                                  <Icon as={selectedQuestionGroup === `${passage.id}_${group.id}` ? MdExpandLess : MdChevronRight} color="black" boxSize={5} />
                                  <Icon as={MdFolderOpen} color="black" boxSize={5} />
                                  <Text fontSize="lg" fontWeight="bold" color="black">
                                    {group.title}
                                  </Text>
                                </HStack>
                                <HStack gap={2}>
                                  <Icon 
                                    as={MdAdd} 
                                    color="#4CAF50" 
                                    boxSize={4} 
                                    cursor="pointer" 
                                    _hover={{ color: "#45A049" }}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      addQuestion(passage.id, group.id)
                                    }}
                                  />
                                  <Icon 
                                    as={MdClose} 
                                    color="#F44336" 
                                    boxSize={4} 
                                    cursor="pointer" 
                                    _hover={{ color: "#D32F2F" }}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteQuestionGroup(passage.id, group.id)
                                    }}
                                  />
                                </HStack>
                              </HStack>
                              {selectedQuestionGroup === `${passage.id}_${group.id}` && (
                                <VStack align="start" gap={3} ml={8} mt={3}>
                                  {group.questions.map((question, index) => (
                                    <Box key={index} w="full">
                                      <HStack justify="space-between" w="full">
                                        <HStack gap={3}>
                                          <Icon as={MdDescription} color="black" boxSize={5} />
                                          <Text fontSize="md" fontWeight="semibold" color="black">{question}</Text>
                                        </HStack>
                                        <Icon 
                                          as={MdClose} 
                                          color="#F44336" 
                                          boxSize={4} 
                                          cursor="pointer" 
                                          _hover={{ color: "#D32F2F" }}
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            deleteQuestion(passage.id, group.id, index)
                                          }}
                                        />
                                      </HStack>
                                    </Box>
                                  ))}
                                </VStack>
                              )}
                            </Box>
                          ))}
                        </VStack>
                      </Box>
                    ))}
                  </VStack>
                </Box>

                {/* Right Content Editor */}
                <Box flex="1" bg="background.primary" borderRadius="lg" p={6} borderWidth="1px" borderColor="border.primary" h="full">
                  {selectedQuestionGroup ? (
                    // Question Group Editor
                    <VStack align="start" gap={6} w="full">
                      {/* Passage Information Section */}
                      <Box w="full" bg="background.secondary" borderRadius="lg" p={4} borderWidth="1px" borderColor="border.primary">
                        <HStack justify="space-between" align="center" mb={expandedSections.passageInfo ? 4 : 0}>
                          <Text fontSize="lg" fontWeight="bold" color="text.primary">
                            {(() => {
                              const [passageId] = selectedQuestionGroup.split('_')
                              const passageNumber = passageId.replace('passage', '')
                              return `Passage ${passageNumber}`
                            })()}
                          </Text>
                          <Icon 
                            as={expandedSections.passageInfo ? MdExpandLess : MdExpandMore} 
                            color="text.muted" 
                            boxSize={6} 
                            cursor="pointer"
                            onClick={() => toggleSection('passageInfo')}
                            _hover={{ color: "text.primary" }}
                          />
                        </HStack>

                        {expandedSections.passageInfo && (
                          <>
                            {/* Image Upload Area */}
                            <Box 
                                  w="full" 
                                  h="200px" 
                                  borderWidth="2px" 
                                  borderStyle="dashed" 
                                  borderColor="border.secondary" 
                                  borderRadius="lg" 
                                  display="flex" 
                                  flexDirection="column"
                                  justifyContent="center" 
                                  alignItems="center" 
                                  mb={6}
                                  cursor="pointer"
                                  _hover={{ borderColor: "accent" }}
                                >
                                  <Icon as={MdImage} color="text.muted" boxSize={12} mb={2} />
                                  <Text color="text.muted" fontSize="sm" mb={2}>
                                    No image yet
                                  </Text>
                                  <HStack color="#4CAF50" fontSize="sm">
                                    <Icon as={MdAdd} boxSize={4} />
                                    <Text>Upload image</Text>
                                  </HStack>
                                </Box>

                            {/* Title Input */}
                            <Box mb={4}>
                              <Text fontSize="sm" fontWeight="medium" color="text.primary" mb={2}>
                                Title
                              </Text>
                              <Input
                                value={passageTitle}
                                onChange={(e) => setPassageTitle(e.target.value)}
                                size="md"
                                bg="background.primary"
                                borderColor="border.primary"
                                color="text.primary"
                                _focus={{ borderColor: "accent", boxShadow: "0 0 0 1px var(--chakra-colors-accent)" }}
                              />
                            </Box>

                            {/* Content Editor */}
                            <Box>
                              <Text fontSize="sm" fontWeight="medium" color="text.primary" mb={2}>
                                Content
                              </Text>
                              
                              {/* Editor Toolbar */}
                              <HStack gap={2} mb={3} p={2} bg="background.primary" borderRadius="md" borderWidth="1px" borderColor="border.primary">
                                <Button size="sm" variant="ghost" fontWeight="bold" color="black" _hover={{ color: "gray.600" }}>B</Button>
                                <Button size="sm" variant="ghost" fontStyle="italic" color="black" _hover={{ color: "gray.600" }}>I</Button>
                                <Button size="sm" variant="ghost" textDecoration="underline" color="black" _hover={{ color: "gray.600" }}>U</Button>
                                <Button size="sm" variant="ghost" textDecoration="line-through" color="black" _hover={{ color: "gray.600" }}>S</Button>
                                <Text color="border.secondary">|</Text>
                                <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>≡</Button>
                                <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>::</Button>
                                <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>⚏</Button>
                                <Text color="border.secondary">|</Text>
                                <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>🔗</Button>
                                <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>T</Button>
                                <Text color="border.secondary">|</Text>
                                <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>↶</Button>
                                <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>↷</Button>
                              </HStack>

                              {/* Content Textarea */}
                              <Box
                                as="textarea"
                                w="full"
                                minH="200px"
                                p={4}
                                borderWidth="1px"
                                borderColor="border.primary"
                                borderRadius="md"
                                bg="background.primary"
                                color="text.primary"
                                fontSize="sm"
                                resize="none"
                                overflow="hidden"
                                defaultValue={passageContent}
                                _focus={{ borderColor: "accent", boxShadow: "0 0 0 1px var(--chakra-colors-accent)" }}
                                _placeholder={{ color: "text.muted" }}
                                onInput={(e: any) => {
                                  e.target.style.height = 'auto'
                                  e.target.style.height = e.target.scrollHeight + 'px'
                                }}
                              />
                            </Box>
                          </>
                        )}
                      </Box>

                      {/* Question Group Header */}
                      <Box w="full">
                        <Text fontSize="lg" fontWeight="bold" color="text.primary" mb={2}>
                          {(() => {
                            const [passageId, groupId] = selectedQuestionGroup.split('_')
                            const groups = questionGroups[passageId as keyof typeof questionGroups]
                            const group = groups?.find(g => g.id === groupId)
                            return group?.title || "Content Question Group 1-3"
                          })()}
                        </Text>
                      </Box>

                      {/* Question Group Information */}
                      <Box w="full" bg="background.secondary" borderRadius="lg" p={4} borderWidth="1px" borderColor="border.primary">
                        <HStack justify="space-between" align="center" mb={expandedSections.questionGroupInfo ? 4 : 0}>
                          <Box>
                            <Text fontSize="lg" fontWeight="bold" color="text.primary">
                              Question Group Information
                            </Text>
                            {expandedSections.questionGroupInfo && (
                              <Text fontSize="sm" color="text.muted">
                                Provide question type and instruction for this question group
                              </Text>
                            )}
                          </Box>
                          <Icon 
                            as={expandedSections.questionGroupInfo ? MdExpandLess : MdExpandMore} 
                            color="text.muted" 
                            boxSize={6} 
                            cursor="pointer"
                            onClick={() => toggleSection('questionGroupInfo')}
                            _hover={{ color: "text.primary" }}
                          />
                        </HStack>

                        {expandedSections.questionGroupInfo && (
                          <>
                            {/* Image Upload Area */}
                            <Box 
                              w="full" 
                              h="120px" 
                              borderWidth="2px" 
                              borderStyle="dashed" 
                              borderColor="border.secondary" 
                              borderRadius="lg" 
                              display="flex" 
                              flexDirection="column"
                              justifyContent="center" 
                              alignItems="center" 
                              mb={4}
                              cursor="pointer"
                              _hover={{ borderColor: "accent" }}
                            >
                              <Icon as={MdImage} color="text.muted" boxSize={8} mb={1} />
                              <Text color="text.muted" fontSize="sm" mb={1}>
                                No image yet
                              </Text>
                              <HStack color="#4CAF50" fontSize="sm">
                                <Icon as={MdAdd} boxSize={3} />
                                <Text>Upload image</Text>
                              </HStack>
                            </Box>

                            {/* Question Type Selection */}
                            <Box mb={4}>
                              <Text fontSize="sm" fontWeight="medium" color="text.primary" mb={2}>
                                Question type
                              </Text>
                              <Box position="relative">
                                <select 
                                  value={questionGroupTypes[selectedQuestionGroup] || "true-false-not-given"}
                                  onChange={(e) => updateQuestionGroupType(selectedQuestionGroup, e.target.value)}
                                  style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    borderRadius: '6px',
                                    border: '1px solid var(--chakra-colors-border-primary)',
                                    backgroundColor: 'var(--chakra-colors-background-primary)',
                                    color: 'var(--chakra-colors-text-primary)',
                                    fontSize: '14px'
                                  }}
                                >
                                  <option value="true-false-not-given">True/False/Not Given</option>
                                  <option value="multiple-choice">Multiple Choice (One Answer)</option>
                                  <option value="fill-in-blanks">Fill in the Blanks</option>
                                  <option value="matching-information">Matching Information</option>
                                  <option value="matching-headings">Matching Headings</option>
                                  <option value="gap-filling">Gap Filling</option>
                                  <option value="summary-completion">Summary Completion</option>
                                </select>
                              </Box>
                            </Box>

                            {/* Instructions */}
                            <Box>
                              <Text fontSize="sm" fontWeight="medium" color="text.primary" mb={2}>
                                Instruction
                              </Text>
                              
                              {/* Editor Toolbar */}
                              <HStack gap={2} mb={2} p={2} bg="background.primary" borderRadius="md" borderWidth="1px" borderColor="border.primary">
                                <Button size="sm" variant="ghost" fontWeight="bold" color="black" _hover={{ color: "gray.600" }}>B</Button>
                                <Button size="sm" variant="ghost" fontStyle="italic" color="black" _hover={{ color: "gray.600" }}>I</Button>
                                <Button size="sm" variant="ghost" textDecoration="underline" color="black" _hover={{ color: "gray.600" }}>U</Button>
                                <Button size="sm" variant="ghost" textDecoration="line-through" color="black" _hover={{ color: "gray.600" }}>S</Button>
                                <Text color="border.secondary">|</Text>
                                <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>≡</Button>
                                <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>::</Button>
                                <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>⚏</Button>
                                <Text color="border.secondary">|</Text>
                                <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>🔗</Button>
                                <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>T</Button>
                                <Text color="border.secondary">|</Text>
                                <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>↶</Button>
                                <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>↷</Button>
                              </HStack>

                              {/* Instructions Content */}
                              <Box
                                as="textarea"
                                w="full"
                                minH="80px"
                                p={3}
                                borderWidth="1px"
                                borderColor="border.primary"
                                borderRadius="md"
                                bg="background.primary"
                                color="text.primary"
                                fontSize="sm"
                                resize="none"
                                overflow="hidden"
                                defaultValue={`Do the following statements agree with the information given in Reading Passage 1?
Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information
and NOT GIVEN if there is no information on this`}
                                _focus={{ borderColor: "accent", boxShadow: "0 0 0 1px var(--chakra-colors-accent)" }}
                                _placeholder={{ color: "text.muted" }}
                                onInput={(e: any) => {
                                  e.target.style.height = 'auto'
                                  e.target.style.height = e.target.scrollHeight + 'px'
                                }}
                              />
                            </Box>
                          </>
                        )}
                      </Box>

                      {/* Question Details */}
                      <Box w="full" bg="background.secondary" borderRadius="lg" p={4} borderWidth="1px" borderColor="border.primary">
                        <HStack justify="space-between" align="center" mb={expandedSections.questionDetails ? 4 : 0}>
                          <Box>
                            <Text fontSize="lg" fontWeight="bold" color="text.primary">
                              Question Details
                            </Text>
                            {expandedSections.questionDetails && (
                              <Text fontSize="sm" color="text.muted">
                                Add questions' description and answer in this question group
                              </Text>
                            )}
                          </Box>
                          <Icon 
                            as={expandedSections.questionDetails ? MdExpandLess : MdExpandMore} 
                            color="text.muted" 
                            boxSize={6} 
                            cursor="pointer"
                            onClick={() => toggleSection('questionDetails')}
                            _hover={{ color: "text.primary" }}
                          />
                        </HStack>

                        {expandedSections.questionDetails && (
                          <>
                            {/* Individual Questions */}
                            <VStack align="start" gap={4} w="full">
                              {(() => {
                                const [passageId, groupId] = selectedQuestionGroup.split('_')
                                const groups = questionGroups[passageId as keyof typeof questionGroups]
                                const group = groups?.find(g => g.id === groupId)
                                return group?.questions.map((question, index) => (
                              <Box 
                                key={index}
                                w="full" 
                                bg="background.primary" 
                                borderRadius="lg" 
                                p={4} 
                                borderWidth="1px" 
                                borderColor="border.primary"
                              >
                                <HStack justify="space-between" align="center" mb={expandedQuestions[`${selectedQuestionGroup}_${index}`] ? 4 : 0}>
                                  <Text fontSize="md" fontWeight="bold" color="text.primary">
                                    Question {(() => {
                                      const [passageId, groupId] = selectedQuestionGroup.split('_')
                                      const groups = questionGroups[passageId as keyof typeof questionGroups]
                                      const groupIndex = groups?.findIndex(g => g.id === groupId) || 0
                                      const questionsBeforeGroup = groups?.slice(0, groupIndex).reduce((acc, g) => acc + g.questions.length, 0) || 0
                                      return questionsBeforeGroup + index + 1
                                    })()}
                                  </Text>
                                  <HStack gap={2}>
                                    <Icon 
                                      as={expandedQuestions[`${selectedQuestionGroup}_${index}`] ? MdExpandLess : MdExpandMore} 
                                      color="text.muted" 
                                      boxSize={5} 
                                      cursor="pointer"
                                      onClick={() => toggleQuestion(`${selectedQuestionGroup}_${index}`)}
                                      _hover={{ color: "text.primary" }}
                                    />
                                    <Icon 
                                      as={MdClose} 
                                      color="#F44336" 
                                      boxSize={4} 
                                      cursor="pointer" 
                                      _hover={{ color: "#D32F2F" }}
                                      onClick={() => {
                                        const [passageId, groupId] = selectedQuestionGroup.split('_')
                                        deleteQuestion(passageId, groupId, index)
                                      }}
                                    />
                                  </HStack>
                                </HStack>

                                {/* Question Content - Only show when expanded */}
                                {expandedQuestions[`${selectedQuestionGroup}_${index}`] && (
                                  <>
                                {/* Question Content */}
                                <Box mb={4}>
                                  <Text fontSize="sm" fontWeight="medium" color="text.primary" mb={2}>
                                    Question
                                  </Text>
                                  
                                  {/* Question Editor Toolbar */}
                                  <HStack gap={2} mb={2} p={2} bg="background.secondary" borderRadius="md" borderWidth="1px" borderColor="border.primary">
                                    <Button size="sm" variant="ghost" fontWeight="bold" color="black" _hover={{ color: "gray.600" }}>B</Button>
                                    <Button size="sm" variant="ghost" fontStyle="italic" color="black" _hover={{ color: "gray.600" }}>I</Button>
                                    <Button size="sm" variant="ghost" textDecoration="underline" color="black" _hover={{ color: "gray.600" }}>U</Button>
                                    <Button size="sm" variant="ghost" textDecoration="line-through" color="black" _hover={{ color: "gray.600" }}>S</Button>
                                    <Text color="border.secondary">|</Text>
                                    <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>≡</Button>
                                    <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>::</Button>
                                    <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>⚏</Button>
                                    <Text color="border.secondary">|</Text>
                                    <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>🔗</Button>
                                    <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>T</Button>
                                    <Text color="border.secondary">|</Text>
                                    <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>↶</Button>
                                    <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>↷</Button>
                                  </HStack>

                                  {/* Question Content Input */}
                                  <Box
                                    as="textarea"
                                    w="full"
                                    minH="60px"
                                    p={3}
                                    borderWidth="1px"
                                    borderColor="border.primary"
                                    borderRadius="md"
                                    bg="background.primary"
                                    color="text.primary"
                                    fontSize="sm"
                                    resize="none"
                                    overflow="hidden"
                                    defaultValue="A mention of the horseshoe crab's potential value in medical science"
                                    _focus={{ borderColor: "accent", boxShadow: "0 0 0 1px var(--chakra-colors-accent)" }}
                                    _placeholder={{ color: "text.muted" }}
                                    onInput={(e: any) => {
                                      e.target.style.height = 'auto'
                                      e.target.style.height = e.target.scrollHeight + 'px'
                                    }}
                                  />
                                </Box>

                                {/* Answer Selection */}
                                <Box mb={4}>
                                  <Text fontSize="sm" fontWeight="medium" color="text.primary" mb={2}>
                                    Correct Answer
                                  </Text>
                                  <Box position="relative">
                                    <select 
                                      style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        borderRadius: '6px',
                                        border: '1px solid var(--chakra-colors-border-primary)',
                                        backgroundColor: 'var(--chakra-colors-background-primary)',
                                        color: 'var(--chakra-colors-text-primary)',
                                        fontSize: '14px'
                                      }}
                                      defaultValue="true"
                                    >
                                      <option value="true">True</option>
                                      <option value="false">False</option>
                                      <option value="not-given">Not Given</option>
                                    </select>
                                  </Box>
                                </Box>

                                {/* Answer Explanation */}
                                <Box mb={4}>
                                  <Text fontSize="sm" fontWeight="medium" color="text.primary" mb={2}>
                                    Explain Answer
                                  </Text>
                                  
                                  {/* Explanation Editor Toolbar */}
                                  <HStack gap={2} mb={2} p={2} bg="background.secondary" borderRadius="md" borderWidth="1px" borderColor="border.primary">
                                    <Button size="sm" variant="ghost" fontWeight="bold" color="black" _hover={{ color: "gray.600" }}>B</Button>
                                    <Button size="sm" variant="ghost" fontStyle="italic" color="black" _hover={{ color: "gray.600" }}>I</Button>
                                    <Button size="sm" variant="ghost" textDecoration="underline" color="black" _hover={{ color: "gray.600" }}>U</Button>
                                    <Button size="sm" variant="ghost" textDecoration="line-through" color="black" _hover={{ color: "gray.600" }}>S</Button>
                                    <Text color="border.secondary">|</Text>
                                    <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>≡</Button>
                                    <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>::</Button>
                                    <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>⚏</Button>
                                    <Text color="border.secondary">|</Text>
                                    <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>🔗</Button>
                                    <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>T</Button>
                                    <Text color="border.secondary">|</Text>
                                    <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>↶</Button>
                                    <Button size="sm" variant="ghost" color="black" _hover={{ color: "gray.600" }}>↷</Button>
                                  </HStack>

                                  {/* Explanation Content */}
                                  <Box
                                    as="textarea"
                                    w="full"
                                    minH="100px"
                                    p={3}
                                    borderWidth="1px"
                                    borderColor="border.primary"
                                    borderRadius="md"
                                    bg="background.primary"
                                    color="text.primary"
                                    fontSize="sm"
                                    resize="none"
                                    overflow="hidden"
                                    defaultValue={`Step 1: Understand the question:
Describe the reproduction of horseshoe crabs.
Step 2: Identify the keywords that are paraphrased in the question.
Step 3: Compare and contrast with the passage.
Step 4: Choose the correct answer.`}
                                    _focus={{ borderColor: "accent", boxShadow: "0 0 0 1px var(--chakra-colors-accent)" }}
                                    _placeholder={{ color: "text.muted" }}
                                    onInput={(e: any) => {
                                      e.target.style.height = 'auto'
                                      e.target.style.height = e.target.scrollHeight + 'px'
                                    }}
                                  />
                                </Box>

                                {/* Answer Location */}
                                <Box>
                                  <HStack justify="space-between" align="center">
                                    <Text fontSize="sm" fontWeight="medium" color="text.primary">
                                      {}
                                    </Text>
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      borderColor="#4CAF50" 
                                      color="#4CAF50"
                                      _hover={{ bg: "#4CAF50", color: "white" }}
                                    >
                                      <HStack gap={2}>
                                        <Icon as={MdDescription} boxSize={4} />
                                        <Text>Locate</Text>
                                      </HStack>
                                    </Button>
                                  </HStack>
                                </Box>
                                  </>
                                )}
                              </Box>
                            )) || []
                          })()}
                            </VStack>
                          </>
                        )}
                      </Box>
                    </VStack>
                  ) : (
                    // No selection message
                    <VStack align="center" justify="center" w="full" h="full" minH="400px">
                      <Icon as={MdDescription} boxSize={16} color="text.muted" mb={4} />
                      <Text fontSize="lg" fontWeight="bold" color="text.primary" mb={2}>
                        No question group selected
                      </Text>
                      <Text fontSize="sm" color="text.muted" textAlign="center">
                        Please select a question group on the left to start editing content and questions
                      </Text>
                    </VStack>
                  )}
                </Box>
              </Flex>
            </VStack>
          )}
          
          {/* Step 4 Content - Categorize Test */}
          {currentStep === 4 && (
            <VStack align="start" gap={6}>
              <Box w="full">
                <Text fontSize="xl" fontWeight="bold" color="text.primary" mb={2}>
                  Categorize Test
                </Text>
                <Text fontSize="sm" color="text.muted" mb={6}>
                  Provide the source and question types for the test
                </Text>
              </Box>

              {/* Main Content Container with Border */}
              <Box 
                w="full" 
                borderWidth="1px" 
                borderColor="border.primary" 
                borderRadius="lg" 
                p={6}
                bg="background.primary"
              >
                {/* Source */}
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

                {/* Sections and Question Types */}
                <Box w="full">
                  <Text fontSize="lg" fontWeight="bold" color="text.primary" mb={2}>
                    Sections and Question Types
                  </Text>
                  <Text fontSize="sm" color="text.muted" mb={6}>
                    Review the sections and question types you have created
                  </Text>

                  {/* Reading Badge - Similar to Step 3 but with green text */}
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

                  {/* Passages List */}
                  <VStack align="start" gap={4} w="full">
                    {/* Dynamic Passages from Step 3 */}
                    {passages.map((passage) => {
                      const passageGroups = questionGroups[passage.id as keyof typeof questionGroups] || []
                      
                      // Calculate total questions
                      const totalQuestions = passageGroups.reduce((acc, group) => acc + group.questions.length, 0)
                      
                      // Get question types from actual data saved in step 3
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
          )}
          
          {/* Step 5 Content - Review & Publish */}
          {currentStep === 5 && (
            <VStack align="start" gap={6}>
              <Box w="full">
                <Text fontSize="xl" fontWeight="bold" color="text.primary" mb={2}>
                  Review & Publish
                </Text>
                <Text fontSize="sm" color="text.muted" mb={6}>
                  Review your test before publishing
                </Text>
              </Box>

              {/* Review Content */}
              <VStack align="start" gap={4} w="full">
                {/* Test Information */}
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

                {/* Includes */}
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
                    {/* Test Type Badge */}
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
                      {selectedSkill === "reading" && selectedSection === "full" && "Reading Full Test"}
                      {selectedSkill === "reading" && selectedSection === "passage1" && "Reading Passage 1"}
                      {selectedSkill === "reading" && selectedSection === "passage2" && "Reading Passage 2"}
                      {selectedSkill === "reading" && selectedSection === "passage3" && "Reading Passage 3"}
                      {selectedSkill === "listening" && selectedSection === "full" && "Listening Full Test"}
                      {selectedSkill === "listening" && selectedSection === "part1" && "Listening Part 1"}
                      {selectedSkill === "listening" && selectedSection === "part2" && "Listening Part 2"}
                      {selectedSkill === "listening" && selectedSection === "part3" && "Listening Part 3"}
                      {selectedSkill === "writing" && selectedSection === "full" && "Writing Full Test"}
                      {selectedSkill === "writing" && selectedSection === "task1" && "Writing Task 1"}
                      {selectedSkill === "writing" && selectedSection === "task2" && "Writing Task 2"}
                      {selectedSkill === "speaking" && selectedSection === "full" && "Speaking Full Test"}
                      {selectedSkill === "speaking" && selectedSection === "part1" && "Speaking Part 1"}
                      {selectedSkill === "speaking" && selectedSection === "part2" && "Speaking Part 2"}
                      {selectedSkill === "speaking" && selectedSection === "part3" && "Speaking Part 3"}
                      {!selectedSkill && "Reading Full Test"}
                    </Box>

                    {/* Source Information from Step 4 */}
                    <Box>
                      <Text fontSize="sm" color="text.muted" mb={2}>Source:</Text>
                      <Text fontSize="sm" fontWeight="medium" color="text.primary">
                        {selectedSource || "Cambridge"}
                      </Text>
                    </Box>

                    {/* Question Types from Step 3 */}
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

              {/* Action Buttons */}
              <HStack justify="flex-end" w="full" mt={8}>
                <Button
                  size="lg"
                  bg="#28A745"
                  color="white"
                  _hover={{ bg: "#218838" }}
                  px={12}
                >
                  Publish
                </Button>
              </HStack>
            </VStack>
          )}
        </Box>

        
                {/* Navigation Buttons */}
        <Flex justify="space-between" mt={6}>
          {/* Back Button - Show only on step 2+ */}
          {currentStep > 1 && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => setCurrentStep(Math.max(currentStep - 1, 1))}
              borderColor="border.primary"
              color="text.primary"
              _hover={{ borderColor: "secondary", bg: "background.secondary" }}
            >
              <HStack gap={2}>
                <Icon as={MdArrowBack} />
                <Text>Back</Text>
              </HStack>
            </Button>
          )}

          {/* Next Button - Hide on step 5 */}
          {currentStep < 5 && (
            <Button
              colorScheme="green"
              size="lg"
              onClick={() => setCurrentStep(Math.min(currentStep + 1, 5))}
              disabled={
                (currentStep === 1 && !testName.trim()) ||
                (currentStep === 2 && (!selectedSkill || !selectedSection))
              }
              bg="accent"
              color="white"
              _hover={{ bg: "secondary" }}
              ml={currentStep === 1 ? "auto" : 0}
            >
              <HStack gap={2}>
                <Text>Next</Text>
                <Icon as={MdArrowForward} />
              </HStack>
            </Button>
          )}
        </Flex>
      </Container>
    </Box>
  )
}
