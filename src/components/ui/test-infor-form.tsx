"use client"

import { Box, Text, VStack, HStack, Icon, Input, Button } from "@chakra-ui/react"
import { Field } from "@chakra-ui/react"
import { MdLightbulb } from "react-icons/md"

interface TestInfoFormProps {
  testName: string
  setTestName: (value: string) => void
  testType: string
  setTestType: (value: string) => void
}

export default function TestInfoForm({ testName, setTestName, testType, setTestType }: TestInfoFormProps) {
  return (
    <VStack align="start" gap={6}>
      <Box>
        <Text fontSize="xl" fontWeight="bold" color="text.primary" mb={2}>
          Test Information
        </Text>
        <Text fontSize="sm" color="text.muted">
          Provide basic information of the Test
        </Text>
      </Box>
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
      <Box w="full">
        <Text fontSize="sm" fontWeight="medium" color="text.primary" mb={4}>
          Test type
        </Text>
        <VStack align="start" gap={4}>
          {[
            { value: "full", label: "Full Test", description: "Complete IELTS test with all 4 skills" },
            { value: "mini", label: "Mini Test", description: "Small IELTS test with 1 skill only" }
          ].map((option) => (
            <Box 
              key={option.value}
              w="full"
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              cursor="pointer"
              borderColor={testType === option.value ? "accent" : "border.primary"}
              bg={testType === option.value ? "green.50" : "background.primary"}
              _hover={{ borderColor: "secondary" }}
              onClick={() => setTestType(option.value)}
            >
              <HStack align="start" gap={3}>
                <Box
                  w={4}
                  h={4}
                  borderRadius="full"
                  borderWidth="2px"
                  borderColor={testType === option.value ? "accent" : "border.secondary"}
                  bg={testType === option.value ? "accent" : "transparent"}
                  mt={0.5}
                  position="relative"
                >
                  {testType === option.value && (
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
                    {option.label}
                  </Text>
                  <Text fontSize="sm" color="text.muted">
                    {option.description}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </Box>
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
  )
}