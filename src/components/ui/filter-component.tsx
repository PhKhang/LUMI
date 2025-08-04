"use client";

import { VStack, HStack, Text, Box, Icon } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { useState } from "react";
import { MdHeadphones, MdMenuBook, MdEdit, MdMic } from "react-icons/md";

interface FilterSection {
  id: string;
  label: string;
  icon: React.ElementType;
  options: {
    value: string;
    label: string;
  }[];
}

const filterSections: FilterSection[] = [
  {
    id: "listening",
    label: "Listening",
    icon: MdHeadphones,
    options: [
      { value: "single", label: "Single section" },
      { value: "full", label: "Full section" },
    ],
  },
  {
    id: "reading",
    label: "Reading",
    icon: MdMenuBook,
    options: [
      { value: "single", label: "Single section" },
      { value: "full", label: "Full section" },
    ],
  },
  {
    id: "writing",
    label: "Writing",
    icon: MdEdit,
    options: [
      { value: "single", label: "Single section" },
      { value: "full", label: "Full section" },
    ],
  },
  {
    id: "speaking",
    label: "Speaking",
    icon: MdMic,
    options: [
      { value: "single", label: "Single section" },
      { value: "full", label: "Full section" },
    ],
  },
];

interface FilterComponentProps {
  onFilterChange?: (filters: Record<string, string>) => void;
  defaultValues?: Record<string, string>;
}

export default function FilterComponent({
  onFilterChange,
  defaultValues = {},
}: FilterComponentProps) {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({
    listening: "",
    reading: "full", // Default to "Reading - Full section" as shown in image
    writing: "",
    speaking: "",
    ...defaultValues,
  });

  const handleFilterChange = (sectionId: string, value: string) => {
    const newFilters = {
      ...selectedFilters,
      [sectionId]: value,
    };
    setSelectedFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const getSectionBgColor = (sectionId: string) => {
    return selectedFilters[sectionId] ? "green.50" : "gray.50";
  };

  const getSectionBorderColor = (sectionId: string) => {
    return selectedFilters[sectionId] ? "green.300" : "gray.200";
  };

  return (
    <VStack gap={4} align="stretch" w="full" maxW="300px">
      {filterSections.map((section) => (
        <Box key={section.id}>
          {/* Section Header */}
          <Box
            p={3}
            bg={getSectionBgColor(section.id)}
            border="2px solid"
            borderColor={getSectionBorderColor(section.id)}
            borderRadius="full"
            mb={2}
          >
            <HStack gap={3}>
              <Icon
                as={section.icon}
                boxSize={5}
                color={selectedFilters[section.id] ? "green.500" : "gray.500"}
              />
              <Text
                fontWeight="medium"
                color={selectedFilters[section.id] ? "green.600" : "gray.600"}
              >
                {section.label}
              </Text>
            </HStack>
          </Box>

          {/* Section Options */}
          <RadioGroup
            value={selectedFilters[section.id]}
            onChange={(value: string) => handleFilterChange(section.id, value)}
          >
            <VStack align="start" gap={2} pl={4}>
              {section.options.map((option) => (
                <Radio
                  key={option.value}
                  value={option.value}
                  colorScheme="green"
                  size="md"
                >
                  <Text fontSize="sm" color="gray.600">
                    {option.label}
                  </Text>
                </Radio>
              ))}
            </VStack>
          </RadioGroup>
        </Box>
      ))}
    </VStack>
  );
}
