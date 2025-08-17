"use client"

import { Box, Text, Button, Flex, Container, VStack } from "@chakra-ui/react"
import { MdArrowForward, MdArrowBack } from "react-icons/md"
import { useState } from "react"
import StepProgress from "@/components/ui/step-progress"
import TestInfoForm from "@/components/ui/test-infor-form"
import SkillSelection from "@/components/ui/skill-selection"
import SectionSelection from "@/components/ui/section-selection"
import ContentEditor from "@/components/ui/content-editor"
import CategorizeTest from "@/components/ui/categorize-test"
import ReviewPublish from "@/components/ui/review-publish"

export default function ExamsPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [testName, setTestName] = useState("")
  const [testType, setTestType] = useState("mini")
  const [selectedSkill, setSelectedSkill] = useState("reading")
  const [selectedSection, setSelectedSection] = useState("")
  const [selectedPassage, setSelectedPassage] = useState("passage1")
  const [selectedQuestionGroup, setSelectedQuestionGroup] = useState("")
  const [passageTitle, setPassageTitle] = useState("The Horseshoe Crab")
  const [passageContent, setPassageContent] = useState("A. One of the world's oldest animal species, the horseshoe crab, is found along the east coast of the United States and Mexico. Fossil records indicate this creature dates back 450 million years, and it has changed very little over time. This is because its anatomy has been so successful. In fact, the horseshoe crab is more closely related to spiders, scorpions and ticks than it is to true crabs and other crustaceans.\n\n")
  const [selectedSource, setSelectedSource] = useState("Cambridge")
  const [expandedPassages, setExpandedPassages] = useState({
    passage1: true,
    passage2: true,
    passage3: false
  })
  const [expandedSections, setExpandedSections] = useState({
    passageInfo: true,
    questionGroupInfo: true,
    questionDetails: true
  })
  const [expandedQuestions, setExpandedQuestions] = useState<{[key: string]: boolean}>({})
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
  const [questionGroupTypes, setQuestionGroupTypes] = useState<{[key: string]: string}>({
    "passage1_question1-3": "true-false-not-given",
    "passage1_question4-7": "matching-headings", 
    "passage2_question1-5": "matching-information",
    "passage3_question1-6": "multiple-choice"
  })

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

  const toggleQuestion = (questionKey: string) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionKey]: !prev[questionKey]
    }))
  }

  const addQuestionGroup = (passageKey: string) => {
    const passageGroups = questionGroups[passageKey as keyof typeof questionGroups]
    const nextGroupNumber = passageGroups.length + 1
    const startQuestion = passageGroups.reduce((acc, group) => acc + group.questions.length, 0) + 1
    const endQuestion = startQuestion + 2
    
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
      
      if (selectedQuestionGroup && selectedQuestionGroup !== `${passageKey}_${groupId}`) {
        const selectedGroupIndex = currentGroups.findIndex(group => group.id === selectedQuestionGroup.split('_')[1])
        if (selectedGroupIndex > groupToDeleteIndex) {
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
      
      if (selectedQuestionGroup === `${passageKey}_${groupId}`) {
        const modifiedGroup = renumberedGroups.find(group => 
          currentGroups.findIndex(originalGroup => originalGroup.id === groupId) === 
          renumberedGroups.findIndex(newGroup => newGroup === group)
        )
        if (modifiedGroup) {
          setSelectedQuestionGroup(`${passageKey}_${modifiedGroup.id}`)
        }
      } else {
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
      
      if (selectedQuestionGroup === `${passageKey}_${groupId}`) {
        const modifiedGroup = renumberedGroups.find(group => 
          currentGroups.findIndex(originalGroup => originalGroup.id === groupId) === 
          renumberedGroups.findIndex(newGroup => newGroup === group)
        )
        if (modifiedGroup) {
          setSelectedQuestionGroup(`${passageKey}_${modifiedGroup.id}`)
        }
      } else {
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

  const updateQuestionGroupType = (groupKey: string, questionType: string) => {
    setQuestionGroupTypes(prev => ({
      ...prev,
      [groupKey]: questionType
    }))
  }

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
    return [
      { id: "passage1", title: "Passage 1" },
      { id: "passage2", title: "Passage 2" },
      { id: "passage3", title: "Passage 3" }
    ]
  }

  const passages = getPassages()

  return (
    <Box bg="background.primary" minH="100vh" p={0}>
      <Container py={6}>
        <Text fontSize="2xl" fontWeight="bold" color="text.primary" mb={8}>
          Create New Test
        </Text>
        <StepProgress currentStep={currentStep} steps={steps} />
        <Box 
          bg="background.primary" 
          borderRadius="lg" 
          shadow="md" 
          p={8}
          borderWidth="1px"
          borderColor="border.primary"
        >
          {currentStep === 1 && (
            <TestInfoForm 
              testName={testName}
              setTestName={setTestName}
              testType={testType}
              setTestType={setTestType}
            />
          )}
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
              <SkillSelection 
                selectedSkill={selectedSkill}
                setSelectedSkill={setSelectedSkill}
                setSelectedSection={setSelectedSection}
              />
              {selectedSkill && (
                <SectionSelection 
                  selectedSkill={selectedSkill}
                  selectedSection={selectedSection}
                  setSelectedSection={setSelectedSection}
                />
              )}
            </VStack>
          )}
          {currentStep === 3 && (
            <ContentEditor
              selectedSection={selectedSection}
              selectedPassage={selectedPassage}
              setSelectedPassage={setSelectedPassage}
              selectedQuestionGroup={selectedQuestionGroup}
              setSelectedQuestionGroup={setSelectedQuestionGroup}
              expandedPassages={expandedPassages}
              togglePassage={togglePassage}
              questionGroups={questionGroups}
              addQuestionGroup={addQuestionGroup}
              deleteQuestionGroup={deleteQuestionGroup}
              questionGroupTypes={questionGroupTypes}
              updateQuestionGroupType={updateQuestionGroupType}
              getQuestionTypeDisplayName={getQuestionTypeDisplayName}
              passageTitle={passageTitle}
              setPassageTitle={setPassageTitle}
              passageContent={passageContent}
              setPassageContent={setPassageContent}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
              expandedQuestions={expandedQuestions}
              toggleQuestion={toggleQuestion}
              addQuestion={addQuestion}
              deleteQuestion={deleteQuestion}
            />
          )}
          {currentStep === 4 && (
            <CategorizeTest
              selectedSource={selectedSource}
              setSelectedSource={setSelectedSource}
              passages={passages}
              questionGroups={questionGroups}
              questionGroupTypes={questionGroupTypes}
              getQuestionTypeDisplayName={getQuestionTypeDisplayName}
            />
          )}
          {currentStep === 5 && (
            <ReviewPublish
              testName={testName}
              testType={testType}
              selectedSection={selectedSection}
              selectedSkill={selectedSkill}
              selectedSource={selectedSource}
              passages={passages}
              questionGroups={questionGroups}
              questionGroupTypes={questionGroupTypes}
              getQuestionTypeDisplayName={getQuestionTypeDisplayName}
            />
          )}
        </Box>
        <Flex justify="space-between" mt={6}>
          {currentStep > 1 && (
            <Button
              variant="outline"
              size="md"
              onClick={() => setCurrentStep(Math.max(currentStep - 1, 1))}
              borderColor="border.primary"
              color="text.primary"
              _hover={{ borderColor: "secondary", bg: "background.secondary" }}
            >
              <Flex align="center" gap={2}>
                <MdArrowBack />
                <Text>Back</Text>
              </Flex>
            </Button>
          )}
          {currentStep < 5 && (
            <Button
              colorScheme="green"
              size="md"
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
              <Flex align="center" gap={2}>
                <Text>Next</Text>
                <MdArrowForward />
              </Flex>
            </Button>
          )}
        </Flex>
      </Container>
    </Box>
  )
}