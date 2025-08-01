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
import { MdLightbulb, MdArrowForward, MdArrowBack, MdCheck, MdHeadphones, MdMenuBook, MdEdit, MdMic } from "react-icons/md"
import { useState } from "react"

export default function ExamsPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [testName, setTestName] = useState("")
  const [testType, setTestType] = useState("mini")
  const [selectedSkill, setSelectedSkill] = useState("reading")
  const [selectedSection, setSelectedSection] = useState("")

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
