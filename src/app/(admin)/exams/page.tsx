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
  Container
} from "@chakra-ui/react"
import { Field } from "@chakra-ui/react"
import { MdLightbulb, MdArrowForward, MdArrowBack, MdCheck, MdHeadphones, MdMenuBook, MdEdit, MdMic, MdAdd, MdExpandLess, MdFolder, MdFolderOpen, MdImage, MdChevronRight, MdDescription } from "react-icons/md"
import { useState } from "react"

export default function ExamsPage() {
  const [currentStep, setCurrentStep] = useState(3)
  const [testName, setTestName] = useState("")
  const [testType, setTestType] = useState("mini")
  const [selectedSkill, setSelectedSkill] = useState("reading")
  const [selectedSection, setSelectedSection] = useState("")
  const [selectedPassage, setSelectedPassage] = useState("passage1")
  const [selectedQuestionGroup, setSelectedQuestionGroup] = useState("question1-3")
  const [passageTitle, setPassageTitle] = useState("The Horseshoe Crab")
  const [passageContent, setPassageContent] = useState("A. One of the world's oldest animal species, the horseshoe crab, is found along the east coast of the United States and Mexico. Fossil records indicate this creature dates back 450 million years, and it has changed very little over time. This is because its anatomy has been so successful. In fact, the horseshoe crab is more closely related to spiders, scorpions and ticks than it is to true crabs and other crustaceans.\n\nB. The soft body of the horseshoe crab is protected by a large oval shell with jagged, point spines. The two-part body consists of a head and an abdominal region. The head region contains a brain, heart, mouth, nervous system and six pairs of legs. What is significant is that horseshoe crabs possess the rare ability to regrow lost limbs. They also use crawling as their primary means of movement, and commonly bury themselves under the surface of the sand. However, in the water, they will occasionally turn onto their backs and swim upside-down. The mouth of the horseshoe crab is located between the twelve legs. They can only eat when crawling, as the motion allows them to open and close their mouths. Their diet consists mainly of worms and clams.")
  const [expandedPassages, setExpandedPassages] = useState({
    passage1: true,
    passage2: true,
    passage3: false
  })

  const togglePassage = (passageKey: string) => {
    setExpandedPassages(prev => ({
      ...prev,
      [passageKey]: !prev[passageKey as keyof typeof prev]
    }))
  }

  const steps = [
    { number: 1, title: "Thông tin bài", description: "Tên và loại bài Test" },
    { number: 2, title: "Chọn kỹ năng", description: "Lựa chọn kỹ năng muốn cho bài Test" },
    { number: 3, title: "Tạo câu hỏi", description: "Xây dựng nội dung và câu hỏi" },
    { number: 4, title: "Phân loại bài", description: "Nguyên cấu hỏi và loại câu hỏi" },
    { number: 5, title: "Xem lại", description: "Kiểm tra lần cuối và đăng bài thi" }
  ]

  return (
    <Box bg="background.primary" minH="100vh" p={0}>
      <Container maxW="6xl" py={6}>
        {/* Header */}
        <Text fontSize="2xl" fontWeight="bold" color="text.primary" mb={8}>
          Tạo Bài Test Mới
        </Text>

        {/* Progress Steps */}
        <Box mb={8}>
          <Text fontSize="sm" color="text.muted" mb={4}>
            Bước {currentStep} trên 5
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
          boxShadow="md" 
          p={8}
          borderWidth="1px"
          borderColor="border.primary"
        >
          {/* Step 1 Content */}
          {currentStep === 1 && (
            <VStack align="start" gap={6}>
              <Box>
                <Text fontSize="xl" fontWeight="bold" color="text.primary" mb={2}>
                  Chi tiết & Hình thức bài thi
                </Text>
                <Text fontSize="sm" color="text.muted">
                  Cung cấp thông tin cơ bản và chọn định dạng bài thi
                </Text>
              </Box>

              {/* Test Name Input */}
              <Box w="full">
                <Field.Root>
                  <Field.Label fontSize="sm" fontWeight="medium" color="text.primary" mb={2}>
                    Tên bài thi
                  </Field.Label>
                  <Input
                    placeholder="ví dụ: [Cambridge 19] Reading Test 1"
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
                  Dạng bài
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
                          Bài thi IELTS hoàn chỉnh với đầy đủ 4 kỹ năng
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
                          Bài thi IELTS nhỏ với 1 kỹ năng
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
                      Lưu ý
                    </Text>
                    <Text fontSize="sm" color="text.secondary">
                      Mini Test có thể bao gồm tất cả section của một kỹ năng hoặc chỉ một phần section trong kỹ năng đó.
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
                  Chọn Nội dung
                </Text>
                <Text fontSize="sm" color="text.muted">
                  Chọn nội dung cho bài Mini Test
                </Text>
              </Box>

              {/* Skill Selection */}
              <Box w="full">
                <Text fontSize="sm" fontWeight="medium" color="text.primary" mb={4}>
                  Chọn kỹ năng
                </Text>
                
                <VStack align="start" gap={3}>
                  {/* Row 1: Listening and Reading */}
                  <HStack w="full" gap={4}>
                    {[
                      { key: "listening", label: "Listening", description: "Bài thi IELTS hoàn chỉnh với đầy đủ 4 kỹ năng", icon: MdHeadphones },
                      { key: "reading", label: "Reading", description: "Bài thi IELTS hoàn chỉnh với đầy đủ 4 kỹ năng", icon: MdMenuBook }
                    ].map((skill) => (
                      <Box 
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
                      </Box>
                    ))}
                  </HStack>

                  {/* Row 2: Writing and Speaking */}
                  <HStack w="full" gap={4}>
                    {[
                      { key: "writing", label: "Writing", description: "Bài thi IELTS nhỏ với 1 kỹ năng", icon: MdEdit },
                      { key: "speaking", label: "Speaking", description: "Bài thi IELTS nhỏ với 1 kỹ năng", icon: MdMic }
                    ].map((skill) => (
                      <Box 
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
                      </Box>
                    ))}
                  </HStack>
                </VStack>
              </Box>

              {/* Section Selection - Show based on selected skill */}
              {selectedSkill && (
                <Box w="full">
                  <Text fontSize="sm" fontWeight="medium" color="text.primary" mb={4}>
                    {selectedSkill === "reading" ? "Chọn Section" : 
                     selectedSkill === "listening" ? "Chọn Part" :
                     selectedSkill === "writing" ? "Chọn Task" :
                     "Chọn Part"}
                  </Text>
                  
                  <HStack w="full" gap={3}>
                    {/* Reading Sections */}
                    {selectedSkill === "reading" && [
                      { key: "full", label: "Full Section", description: "Bao gồm tất cả các phần" },
                      { key: "passage1", label: "Passage 1", description: "Chỉ tạo cho section này" },
                      { key: "passage2", label: "Passage 2", description: "Chỉ tạo cho section này" },
                      { key: "passage3", label: "Passage 3", description: "Chỉ tạo cho section này" }
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
                      { key: "full", label: "Full Part", description: "Bao gồm tất cả các phần" },
                      { key: "part1", label: "Part 1", description: "Chỉ tạo cho part này" },
                      { key: "part2", label: "Part 2", description: "Chỉ tạo cho part này" },
                      { key: "part3", label: "Part 3", description: "Chỉ tạo cho part này" }
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
                      { key: "full", label: "Full Writing", description: "Bao gồm tất cả task" },
                      { key: "task1", label: "Task 1", description: "Chỉ tạo task 1" },
                      { key: "task2", label: "Task 2", description: "Chỉ tạo task 2" }
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
                      { key: "full", label: "Full Speaking", description: "Bao gồm tất cả part" },
                      { key: "part1", label: "Part 1", description: "Chỉ tạo part 1" },
                      { key: "part2", label: "Part 2", description: "Chỉ tạo part 2" },
                      { key: "part3", label: "Part 3", description: "Chỉ tạo part 3" }
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
            <VStack align="start" gap={6}>
              <Box>
                <Text fontSize="xl" fontWeight="bold" color="text.primary" mb={2}>
                  Tạo câu hỏi
                </Text>
                <Text fontSize="sm" color="text.muted">
                  Nhấn chọn vào các nhóm câu hỏi để xem và chỉnh sửa các câu hỏi bên trong
                </Text>
              </Box>

              {/* Main Content Area */}
              <Flex align="start" gap={6} w="full" minH="600px">
                {/* Left Navigation Panel */}
                <Box 
                  w="350px" 
                  bg="white" 
                  borderRadius="lg" 
                  p={4}
                  minH="600px"
                  overflow="auto"
                >
                  {/* Skill Badge */}
                  <Box 
                    w="full"
                    bg="white" 
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
                    borderWidth="1px"
                    borderColor="#E0E0E0"
                  >
                    <HStack gap={2}>
                      <Icon as={MdMenuBook} boxSize={4} color="black" />
                      <Text color="black">Reading</Text>
                    </HStack>
                  </Box>

                  {/* Passage Structure */}
                  <VStack align="start" gap={0} w="full">
                    {/* Passage 1 - Container only */}
                    <Box w="full" bg="white" borderBottomWidth="1px" borderBottomColor="#E0E0E0" p={3} mb={2}>
                      <HStack justify="space-between" w="full" mb={2}>
                        <HStack gap={2}>
                          <Icon as={MdMenuBook} color="#4CAF50" boxSize={6} />
                          <Text fontSize="lg" fontWeight="bold" color="black">
                            Passage 1
                          </Text>
                        </HStack>
                        <Icon as={MdAdd} color="black" boxSize={6} cursor="pointer" />
                      </HStack>
                      
                      <VStack align="start" gap={2} ml={6}>
                        {/* Question Group 1-3 (Selected with green background) */}
                        <Box 
                          w="full" 
                          p={3} 
                          borderRadius="md" 
                          bg={selectedQuestionGroup === "question1-3" ? "#E6F9E6" : "white"}
                          borderColor={selectedQuestionGroup === "question1-3" ? "#4CAF50" : "#E0E0E0"}
                          borderWidth="1px"
                          cursor="pointer"
                          onClick={() => setSelectedQuestionGroup("question1-3")}
                        >
                          <HStack gap={2}>
                            <Icon as={selectedQuestionGroup === "question1-3" ? MdExpandLess : MdChevronRight} color="black" boxSize={5} />
                            <Icon as={MdFolderOpen} color="black" boxSize={5} />
                            <Text fontSize="lg" fontWeight="bold" color="black">
                              Question 1-3
                            </Text>
                          </HStack>
                          {selectedQuestionGroup === "question1-3" && (
                            <VStack align="start" gap={3} ml={8} mt={3}>
                              <HStack gap={3}>
                                <Icon as={MdDescription} color="black" boxSize={5} />
                                <Text fontSize="md" fontWeight="semibold" color="black">Question 1</Text>
                              </HStack>
                              <HStack gap={3}>
                                <Icon as={MdDescription} color="black" boxSize={5} />
                                <Text fontSize="md" fontWeight="semibold" color="black">Question 2</Text>
                              </HStack>
                              <HStack gap={3}>
                                <Icon as={MdDescription} color="black" boxSize={5} />
                                <Text fontSize="md" fontWeight="semibold" color="black">Question 3</Text>
                              </HStack>
                            </VStack>
                          )}
                        </Box>

                        {/* Question Group 4-7 (Not selected) */}
                        <Box 
                          w="full" 
                          p={3} 
                          borderRadius="md" 
                          cursor="pointer"
                          bg={selectedQuestionGroup === "question4-7" ? "#E6F9E6" : "white"}
                          borderWidth="1px"
                          borderColor={selectedQuestionGroup === "question4-7" ? "#4CAF50" : "#E0E0E0"}
                          _hover={{ bg: "#F5F5F5" }}
                          onClick={() => setSelectedQuestionGroup("question4-7")}
                        >
                          <HStack gap={2}>
                            <Icon as={selectedQuestionGroup === "question4-7" ? MdExpandLess : MdChevronRight} color="black" boxSize={5} />
                            <Icon as={MdFolderOpen} color="black" boxSize={5} />
                            <Text fontSize="lg" fontWeight="bold" color="black">
                              Question 4-7
                            </Text>
                          </HStack>
                          {selectedQuestionGroup === "question4-7" && (
                            <VStack align="start" gap={3} ml={8} mt={3}>
                              <HStack gap={3}>
                                <Icon as={MdDescription} color="black" boxSize={5} />
                                <Text fontSize="md" fontWeight="semibold" color="black">Question 4</Text>
                              </HStack>
                              <HStack gap={3}>
                                <Icon as={MdDescription} color="black" boxSize={5} />
                                <Text fontSize="md" fontWeight="semibold" color="black">Question 5</Text>
                              </HStack>
                              <HStack gap={3}>
                                <Icon as={MdDescription} color="black" boxSize={5} />
                                <Text fontSize="md" fontWeight="semibold" color="black">Question 6</Text>
                              </HStack>
                              <HStack gap={3}>
                                <Icon as={MdDescription} color="black" boxSize={5} />
                                <Text fontSize="md" fontWeight="semibold" color="black">Question 7</Text>
                              </HStack>
                            </VStack>
                          )}
                        </Box>
                      </VStack>
                    </Box>

                    {/* Passage 2 */}
                    <Box w="full" bg="white" borderBottomWidth="1px" borderBottomColor="#E0E0E0" p={3} mb={2}>
                      <HStack justify="space-between" w="full" mb={2}>
                        <HStack gap={2}>
                          <Icon as={MdMenuBook} color="#4CAF50" boxSize={6} />
                          <Text fontSize="lg" fontWeight="bold" color="black">
                            Passage 2
                          </Text>
                        </HStack>
                        <Icon as={MdAdd} color="black" boxSize={6} cursor="pointer" />
                      </HStack>
                      
                      <VStack align="start" gap={2} ml={6}>
                        {/* Question Group 1-5 */}
                        <Box 
                          w="full" 
                          p={3} 
                          borderRadius="md" 
                          cursor="pointer"
                          bg={selectedQuestionGroup === "question1-5" ? "#E6F9E6" : "white"}
                          borderWidth="1px"
                          borderColor={selectedQuestionGroup === "question1-5" ? "#4CAF50" : "#E0E0E0"}
                          _hover={{ bg: selectedQuestionGroup === "question1-5" ? "#E6F9E6" : "#F5F5F5" }}
                          onClick={() => setSelectedQuestionGroup("question1-5")}
                        >
                          <HStack gap={2}>
                            <Icon as={selectedQuestionGroup === "question1-5" ? MdExpandLess : MdChevronRight} color="black" boxSize={5} />
                            <Icon as={MdFolderOpen} color="black" boxSize={5} />
                            <Text fontSize="lg" fontWeight="bold" color="black">
                              Question 1-5
                            </Text>
                          </HStack>
                          {selectedQuestionGroup === "question1-5" && (
                            <VStack align="start" gap={3} ml={8} mt={3}>
                              <HStack gap={3}>
                                <Icon as={MdDescription} color="black" boxSize={5} />
                                <Text fontSize="md" fontWeight="semibold" color="black">Question 1</Text>
                              </HStack>
                              <HStack gap={3}>
                                <Icon as={MdDescription} color="black" boxSize={5} />
                                <Text fontSize="md" fontWeight="semibold" color="black">Question 2</Text>
                              </HStack>
                              <HStack gap={3}>
                                <Icon as={MdDescription} color="black" boxSize={5} />
                                <Text fontSize="md" fontWeight="semibold" color="black">Question 3</Text>
                              </HStack>
                              <HStack gap={3}>
                                <Icon as={MdDescription} color="black" boxSize={5} />
                                <Text fontSize="md" fontWeight="semibold" color="black">Question 4</Text>
                              </HStack>
                              <HStack gap={3}>
                                <Icon as={MdDescription} color="black" boxSize={5} />
                                <Text fontSize="md" fontWeight="semibold" color="black">Question 5</Text>
                              </HStack>
                            </VStack>
                          )}
                        </Box>
                      </VStack>
                    </Box>

                    {/* Passage 3 */}
                    <Box w="full" bg="white" borderBottomWidth="1px" borderBottomColor="#E0E0E0" p={3} mb={2}>
                      <HStack justify="space-between" w="full" mb={2}>
                        <HStack gap={2}>
                          <Icon as={MdMenuBook} color="#4CAF50" boxSize={6} />
                          <Text fontSize="lg" fontWeight="bold" color="black">
                            Passage 3
                          </Text>
                        </HStack>
                        <Icon as={MdAdd} color="black" boxSize={6} cursor="pointer" />
                      </HStack>
                      
                      <VStack align="start" gap={2} ml={6}>
                        {/* Question Groups for Passage 3 would go here */}
                        <Box 
                          w="full" 
                          p={3} 
                          borderRadius="md" 
                          cursor="pointer"
                          bg={selectedQuestionGroup === "question1-6" ? "#E6F9E6" : "white"}
                          borderWidth="1px"
                          borderColor={selectedQuestionGroup === "question1-6" ? "#4CAF50" : "#E0E0E0"}
                          _hover={{ bg: selectedQuestionGroup === "question1-6" ? "#E6F9E6" : "#F5F5F5" }}
                          onClick={() => setSelectedQuestionGroup("question1-6")}
                        >
                          <HStack gap={2}>
                            <Icon as={selectedQuestionGroup === "question1-6" ? MdExpandLess : MdChevronRight} color="black" boxSize={5} />
                            <Icon as={MdFolderOpen} color="black" boxSize={5} />
                            <Text fontSize="lg" fontWeight="bold" color="black">
                              Question 1-6
                            </Text>
                          </HStack>
                          {selectedQuestionGroup === "question1-6" && (
                            <VStack align="start" gap={3} ml={8} mt={3}>
                              <HStack gap={3}>
                                <Icon as={MdDescription} color="black" boxSize={5} />
                                <Text fontSize="md" fontWeight="semibold" color="black">Question 1</Text>
                              </HStack>
                              <HStack gap={3}>
                                <Icon as={MdDescription} color="black" boxSize={5} />
                                <Text fontSize="md" fontWeight="semibold" color="black">Question 2</Text>
                              </HStack>
                              <HStack gap={3}>
                                <Icon as={MdDescription} color="black" boxSize={5} />
                                <Text fontSize="md" fontWeight="semibold" color="black">Question 3</Text>
                              </HStack>
                              <HStack gap={3}>
                                <Icon as={MdDescription} color="black" boxSize={5} />
                                <Text fontSize="md" fontWeight="semibold" color="black">Question 4</Text>
                              </HStack>
                              <HStack gap={3}>
                                <Icon as={MdDescription} color="black" boxSize={5} />
                                <Text fontSize="md" fontWeight="semibold" color="black">Question 5</Text>
                              </HStack>
                              <HStack gap={3}>
                                <Icon as={MdDescription} color="black" boxSize={5} />
                                <Text fontSize="md" fontWeight="semibold" color="black">Question 6</Text>
                              </HStack>
                            </VStack>
                          )}
                        </Box>
                      </VStack>
                    </Box>

                    {/* Add New Section */}
                    <Box 
                      w="full" 
                      p={4} 
                      borderWidth="1px" 
                      borderStyle="dashed" 
                      borderColor="#B0B0B0" 
                      borderRadius="lg" 
                      cursor="pointer"
                      bg="#F5F5F5"
                      _hover={{ borderColor: "#4CAF50" }}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      mt={4}
                    >
                      <Icon as={MdAdd} color="black" boxSize={6} />
                    </Box>
                  </VStack>
                </Box>

                {/* Right Content Editor */}
                <Box flex="1" bg="background.primary" borderRadius="lg" p={6} borderWidth="1px" borderColor="border.primary" h="full">
                  {/* Passage Header */}
                  <HStack justify="space-between" mb={6}>
                    <Text fontSize="2xl" fontWeight="bold" color="text.primary">
                      Passage 1
                    </Text>
                    <Icon as={MdExpandLess} color="text.muted" boxSize={6} cursor="pointer" />
                  </HStack>

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
                      Chưa có ảnh minh họa nào
                    </Text>
                    <HStack color="accent" fontSize="sm">
                      <Icon as={MdAdd} boxSize={4} />
                      <Text>Tải ảnh lên</Text>
                    </HStack>
                  </Box>

                  {/* Title Input */}
                  <Box mb={4}>
                    <Text fontSize="sm" fontWeight="medium" color="text.primary" mb={2}>
                      Tiêu đề
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
                      Nội dung
                    </Text>
                    
                    {/* Editor Toolbar */}
                    <HStack gap={2} mb={3} p={2} bg="background.secondary" borderRadius="md" borderWidth="1px" borderColor="border.primary">
                      <Button size="sm" variant="ghost" fontWeight="bold">B</Button>
                      <Button size="sm" variant="ghost" fontStyle="italic">I</Button>
                      <Button size="sm" variant="ghost" textDecoration="underline">U</Button>
                      <Button size="sm" variant="ghost" textDecoration="line-through">S</Button>
                      <Text color="border.secondary">|</Text>
                      <Button size="sm" variant="ghost">≡</Button>
                      <Button size="sm" variant="ghost">::</Button>
                      <Button size="sm" variant="ghost">⚏</Button>
                      <Text color="border.secondary">|</Text>
                      <Button size="sm" variant="ghost">🔗</Button>
                      <Button size="sm" variant="ghost">T</Button>
                      <Text color="border.secondary">|</Text>
                      <Button size="sm" variant="ghost">↶</Button>
                      <Button size="sm" variant="ghost">↷</Button>
                    </HStack>

                    {/* Content Textarea */}
                    <Box
                      w="full"
                      minH="300px"
                      p={4}
                      borderWidth="1px"
                      borderColor="border.primary"
                      borderRadius="md"
                      bg="background.primary"
                      _focus={{ borderColor: "accent", boxShadow: "0 0 0 1px var(--chakra-colors-accent)" }}
                    >
                      <Text fontSize="sm" color="text.primary" whiteSpace="pre-wrap">
                        {passageContent}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Flex>
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
                <Text>Quay lại</Text>
              </HStack>
            </Button>
          )}

          {/* Next Button */}
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
              <Text>Tiếp theo</Text>
              <Icon as={MdArrowForward} />
            </HStack>
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}
