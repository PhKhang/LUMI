"use client"

import { Box, Text, HStack, VStack } from "@chakra-ui/react"

interface Section {
  key: string
  label: string
  description: string
}

interface SectionSelectionProps {
  selectedSkill: string
  selectedSection: string
  setSelectedSection: (value: string) => void
}

export default function SectionSelection({ selectedSkill, selectedSection, setSelectedSection }: SectionSelectionProps) {
  let sections: Section[] = []
  if (selectedSkill === "reading") {
    sections = [
      { key: "full", label: "Full Section", description: "All sections in this skill" },
      { key: "passage1", label: "Passage 1", description: "Only this section" },
      { key: "passage2", label: "Passage 2", description: "Only this section" },
      { key: "passage3", label: "Passage 3", description: "Only this section" }
    ]
  } else if (selectedSkill === "listening") {
    sections = [
      { key: "full", label: "Full Part", description: "Include all parts" },
      { key: "part1", label: "Part 1", description: "Create for this part only" },
      { key: "part2", label: "Part 2", description: "Create for this part only" },
      { key: "part3", label: "Part 3", description: "Create for this part only" }
    ]
  } else if (selectedSkill === "writing") {
    sections = [
      { key: "full", label: "Full Writing", description: "Include all tasks" },
      { key: "task1", label: "Task 1", description: "Create for this task only" },
      { key: "task2", label: "Task 2", description: "Create for this task only" }
    ]
  } else if (selectedSkill === "speaking") {
    sections = [
      { key: "full", label: "Full Speaking", description: "Include all parts" },
      { key: "part1", label: "Part 1", description: "Create for this part only" },
      { key: "part2", label: "Part 2", description: "Create for this part only" },
      { key: "part3", label: "Part 3", description: "Create for this part only" }
    ]
  }

  return (
    <Box w="full">
      <Text fontSize="sm" fontWeight="medium" color="text.primary" mb={4}>
        Select Section
      </Text>
      <HStack w="full" gap={3}>
        {sections.map((section) => (
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
  )
}