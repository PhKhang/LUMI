"use client"

import { Box, Text, SimpleGrid, HStack, VStack, Icon } from "@chakra-ui/react"
import { FaHeadphones, FaBookOpen, FaPen, FaMicrophone } from "react-icons/fa6"

interface SkillSelectionProps {
  selectedSkill: string
  setSelectedSkill: (value: string) => void
  setSelectedSection: (value: string) => void
}

export default function SkillSelection({ selectedSkill, setSelectedSkill, setSelectedSection }: SkillSelectionProps) {
  const skills = [
    { key: "listening", label: "Listening", description: "Section: Part 1, Part 2, Part 3, Part 4", icon: FaHeadphones, color: "#43A047" },
    { key: "reading", label: "Reading", description: "Section: Passage 1, Passage 2, Passage 3", icon: FaBookOpen, color: "#43A047" },
    { key: "writing", label: "Writing", description: "Section: Task 1, Task 2", icon: FaPen, color: "#43A047" },
    { key: "speaking", label: "Speaking", description: "Section: Part 1, Part 2, Part 3", icon: FaMicrophone, color: "#43A047" }
  ]

  return (
    <Box w="full">
      <Text fontSize="sm" fontWeight="medium" color="text.primary" mb={4}>
        Select skill
      </Text>
      <SimpleGrid columns={2} gap={4} w="full">
        {skills.map((skill) => (
          <HStack 
            key={skill.key}
            flex="1"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            cursor="pointer"
            borderColor={selectedSkill === skill.key ? "accent" : "border.primary"}
            bg={selectedSkill === skill.key ? "green.50" : "background.primary"}
            _hover={{ borderColor: "secondary" }}
            onClick={() => {
              setSelectedSkill(skill.key)
              setSelectedSection("")
            }}
            gap={4}
          >
            <HStack align="start" gap={3}>
              <Box
                w={4}
                h={4}
                borderRadius="full"
                borderWidth="2px"
                borderColor={selectedSkill === skill.key ? "accent" : "border.secondary"}
                bg={selectedSkill === skill.key ? "accent" : "transparent"}
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
              <Icon
                as={skill.icon} 
                boxSize={6}
                color={selectedSkill === skill.key ? skill.color : "gray.400"}
                alignSelf="start"
              />
            </HStack>
            <VStack align="start" gap={1} justifyContent={"start"}>
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
  )
}