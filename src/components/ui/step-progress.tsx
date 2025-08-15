"use client"

import { Flex, Box, VStack, Text, Icon, HStack } from "@chakra-ui/react"
import { MdCheck } from "react-icons/md"

interface Step {
  number: number
  title: string
  description: string
}

interface StepProgressProps {
  currentStep: number
  steps: Step[]
}

export default function StepProgress({ currentStep, steps }: StepProgressProps) {
  return (
    <Box mb={8}>
      <Text fontSize="sm" color="text.muted" mb={4}>
        Step {currentStep} of 5
      </Text>
      <HStack gap={0} mb={6}>
        {steps.map((step, index) => (
          <Flex key={step.number} align="center" flex="1">
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
  )
}