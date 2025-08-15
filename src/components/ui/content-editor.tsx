"use client"

import { Box, Text, Flex, VStack, HStack, Icon, Button, Input } from "@chakra-ui/react"
import { MdMenuBook, MdAdd, MdExpandMore, MdExpandLess, MdClose, MdFolder, MdFolderOpen, MdChevronRight, MdDescription, MdImage, MdHeadphones } from "react-icons/md"
import EditorToolbar from "./editor-toolbar"

interface Passage {
  id: string
  title: string
}

interface QuestionGroup {
  id: string
  title: string
  questions: string[]
}

interface ContentEditorProps {
  selectedSection: string
  selectedPassage: string
  setSelectedPassage: (value: string) => void
  selectedQuestionGroup: string
  setSelectedQuestionGroup: (value: string) => void
  expandedPassages: { [key: string]: boolean }
  togglePassage: (passageKey: string) => void
  questionGroups: { [key: string]: QuestionGroup[] }
  addQuestionGroup: (passageKey: string) => void
  deleteQuestionGroup: (passageKey: string, groupId: string) => void
  questionGroupTypes: { [key: string]: string }
  updateQuestionGroupType: (groupKey: string, questionType: string) => void
  getQuestionTypeDisplayName: (typeKey: string) => string
  passageTitle: string
  setPassageTitle: (value: string) => void
  passageContent: string
  setPassageContent: (value: string) => void
  expandedSections: { passageInfo: boolean; questionGroupInfo: boolean; questionDetails: boolean }
  toggleSection: (sectionKey: string) => void
  expandedQuestions: { [key: string]: boolean }
  toggleQuestion: (questionKey: string) => void
  addQuestion: (passageKey: string, groupId: string) => void
  deleteQuestion: (passageKey: string, groupId: string, questionIndex: number) => void
}

export default function ContentEditor({
  selectedSection,
  selectedPassage,
  setSelectedPassage,
  selectedQuestionGroup,
  setSelectedQuestionGroup,
  expandedPassages,
  togglePassage,
  questionGroups,
  addQuestionGroup,
  deleteQuestionGroup,
  questionGroupTypes,
  updateQuestionGroupType,
  getQuestionTypeDisplayName,
  passageTitle,
  setPassageTitle,
  passageContent,
  setPassageContent,
  expandedSections,
  toggleSection,
  expandedQuestions,
  toggleQuestion,
  addQuestion,
  deleteQuestion
}: ContentEditorProps) {
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
    <VStack align="start" gap={6}>
      <Box>
        <Text fontSize="xl" fontWeight="bold" color="text.primary" mb={2}>
          Create question
        </Text>
        <Text fontSize="sm" color="text.muted">
          Create test content
        </Text>
      </Box>
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
      >
        <HStack gap={3}>
          <Icon as={MdMenuBook} boxSize={6} color="#4CAF50" />
          <Text color="#4CAF50">Reading</Text>
        </HStack>
      </Box>
      <Flex gap={6} w="full">
        <Box w="320px" bg="background.secondary" borderRadius="lg" p={4} borderWidth="1px" borderColor="border.primary">
          <VStack align="start" gap={4}>
            {passages.map((passage) => (
              <Box key={passage.id} w="full">
                <HStack 
                  justify="space-between" 
                  cursor="pointer" 
                  onClick={() => {
                    togglePassage(passage.id)
                    setSelectedPassage(passage.id)
                    setSelectedQuestionGroup("")
                  }}
                  p={2}
                  borderRadius="md"
                  bg={selectedPassage === passage.id ? "background.accent" : "transparent"}
                  _hover={{ bg: "background.accent" }}
                >
                  <HStack gap={2}>
                    <Icon 
                      as={expandedPassages[passage.id] ? MdFolderOpen : MdFolder} 
                      color={selectedPassage === passage.id ? "accent" : "text.muted"} 
                      boxSize={5} 
                    />
                    <Text fontSize="md" fontWeight="medium" color="text.primary">
                      {passage.title}
                    </Text>
                  </HStack>
                  <Icon 
                    as={expandedPassages[passage.id] ? MdExpandLess : MdExpandMore} 
                    color="text.muted" 
                    boxSize={5} 
                  />
                </HStack>
                {expandedPassages[passage.id] && (
                  <VStack align="start" gap={2} pl={6} mt={2}>
                    {questionGroups[passage.id]?.map((group) => (
                      <HStack 
                        key={group.id}
                        justify="space-between" 
                        w="full" 
                        p={2}
                        borderRadius="md"
                        bg={selectedQuestionGroup === `${passage.id}_${group.id}` ? "background.primary" : "transparent"}
                        _hover={{ bg: "background.primary" }}
                        cursor="pointer"
                        onClick={() => setSelectedQuestionGroup(`${passage.id}_${group.id}`)}
                      >
                        <HStack gap={2}>
                          <Icon as={MdChevronRight} color="text.muted" boxSize={4} />
                          <Text fontSize="sm" color="text.primary">
                            {group.title}
                          </Text>
                        </HStack>
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
                    ))}
                    <Button 
                      variant="ghost" 
                      color="accent" 
                      fontSize="sm" 
                      onClick={() => addQuestionGroup(passage.id)}
                      p={2}
                      justifyContent="flex-start"
                      w="full"
                      _hover={{ bg: "background.accent" }}
                    >
                      <MdAdd />
                      Add question group
                    </Button>
                  </VStack>
                )}
              </Box>
            ))}
          </VStack>
        </Box>
        <Box flex="1" bg="background.secondary" borderRadius="lg" p={6} borderWidth="1px" borderColor="border.primary">
          {selectedQuestionGroup ? (
            <VStack align="start" gap={6} w="full">
              <Box w="full">
                <HStack justify="space-between" align="center" mb={4}>
                  <Text fontSize="lg" fontWeight="bold" color="text.primary">
                    Passage Information
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
                    <Box mb={4}>
                      <Text fontSize="sm" fontWeight="medium" color="text.primary" mb={2}>
                        Passage Title
                      </Text>
                      <Input
                        value={passageTitle}
                        onChange={(e) => setPassageTitle(e.target.value)}
                        placeholder="Enter passage title"
                        size="md"
                        bg="background.primary"
                        borderColor="border.primary"
                        color="text.primary"
                        _focus={{ borderColor: "accent", boxShadow: "0 0 0 1px var(--chakra-colors-accent)" }}
                      />
                    </Box>
                    <Box mb={4}>
                      <HStack justify="space-between" align="center" mb={2}>
                        <Text fontSize="sm" fontWeight="medium" color="text.primary">
                          Passage Content
                        </Text>
                        <HStack gap={2}>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            borderColor="#4CAF50" 
                            color="#4CAF50"
                            _hover={{ bg: "#4CAF50", color: "white" }}
                          >
                            <HStack gap={2}>
                              <Icon as={MdDescription} boxSize={4} />
                              <Text>Text</Text>
                            </HStack>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            borderColor="border.primary" 
                            color="text.primary"
                            _hover={{ bg: "background.accent" }}
                          >
                            <HStack gap={2}>
                              <Icon as={MdImage} boxSize={4} />
                              <Text>Image</Text>
                            </HStack>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            borderColor="border.primary" 
                            color="text.primary"
                            _hover={{ bg: "background.accent" }}
                          >
                            <HStack gap={2}>
                              <Icon as={MdHeadphones} boxSize={4} />
                              <Text>Audio</Text>
                            </HStack>
                          </Button>
                        </HStack>
                      </HStack>
                      <EditorToolbar />
                      <Box
                        as="textarea"
                        w="full"
                        minH="200px"
                        p={3}
                        borderWidth="1px"
                        borderColor="border.primary"
                        borderRadius="md"
                        bg="background.primary"
                        color="text.primary"
                        fontSize="sm"
                        resize="none"
                        overflow="hidden"
                        value={passageContent}
                        onChange={(e) => setPassageContent(e.target.value)}
                        onInput={(e: any) => {
                          e.target.style.height = 'auto'
                          e.target.style.height = e.target.scrollHeight + 'px'
                        }}
                        _focus={{ borderColor: "accent", boxShadow: "0 0 0 1px var(--chakra-colors-accent)" }}
                      />
                    </Box>
                  </>
                )}
              </Box>
              <Box w="full">
                <HStack justify="space-between" align="center" mb={4}>
                  <Text fontSize="lg" fontWeight="bold" color="text.primary">
                    Question Group Information
                  </Text>
                  <HStack gap={2}>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      borderColor="#4CAF50" 
                      color="#4CAF50"
                      _hover={{ bg: "#4CAF50", color: "white" }}
                      onClick={() => {
                        const [passageId, groupId] = selectedQuestionGroup.split('_')
                        addQuestion(passageId, groupId)
                      }}
                    >
                      <HStack gap={2}>
                        <Icon as={MdAdd} boxSize={4} />
                        <Text>Add question</Text>
                      </HStack>
                    </Button>
                    <Icon 
                      as={expandedSections.questionGroupInfo ? MdExpandLess : MdExpandMore} 
                      color="text.muted" 
                      boxSize={6} 
                      cursor="pointer"
                      onClick={() => toggleSection('questionGroupInfo')}
                      _hover={{ color: "text.primary" }}
                    />
                  </HStack>
                </HStack>
                {expandedSections.questionGroupInfo && (
                  <Box mb={4}>
                    <Text fontSize="sm" fontWeight="medium" color="text.primary" mb={2}>
                      Question Type
                    </Text>
                    <Box position="relative">
                      <select 
                        value={questionGroupTypes[selectedQuestionGroup] || ""}
                        onChange={(e) => updateQuestionGroupType(selectedQuestionGroup, e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '6px',
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
                        <option value="">Select question type</option>
                        <option value="true-false-not-given">True/False/Not Given</option>
                        <option value="multiple-choice">Multiple Choice (One Answer)</option>
                        <option value="fill-in-blanks">Fill in the Blanks</option>
                        <option value="matching-headings">Matching Headings</option>
                        <option value="matching-information">Matching Information</option>
                        <option value="gap-filling">Gap Filling</option>
                        <option value="summary-completion">Summary Completion</option>
                      </select>
                    </Box>
                  </Box>
                )}
              </Box>
              <Box w="full">
                <HStack justify="space-between" align="center" mb={4}>
                  <Text fontSize="lg" fontWeight="bold" color="text.primary">
                    Question Details
                  </Text>
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
                                onClick={() => deleteQuestion(passageId, groupId, index)}
                              />
                            </HStack>
                          </HStack>
                          {expandedQuestions[`${selectedQuestionGroup}_${index}`] && (
                            <>
                              <Box mb={4}>
                                <Text fontSize="sm" fontWeight="medium" color="text.primary" mb={2}>
                                  Question
                                </Text>
                                <EditorToolbar />
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
                              <Box mb={4}>
                                <Text fontSize="sm" fontWeight="medium" color="text.primary" mb={2}>
                                  Explain Answer
                                </Text>
                                <EditorToolbar />
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
                )}
              </Box>
            </VStack>
          ) : (
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
  )
}