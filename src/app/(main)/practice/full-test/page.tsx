"use client";

import CheckBox from "@/components/ui/checkbox";
import FilterOptions from "@/components/ui/filter-component";
import FilterTest from "@/components/ui/filter-test";
import TestBlock from "@/components/ui/test-block-full-test";
import {
  Box,
  Container,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Button,
  Badge,
  HStack,
  VStack,
  Input,
  Flex,
  Icon
} from "@chakra-ui/react";
import { useState } from "react";
import { BiChevronDown, BiChevronUp, BiFilterAlt } from "react-icons/bi";
import { RiSearchLine } from "react-icons/ri";
// import Link from "next/link";

export default function FullTestPage() {
  const [showSource, setShowSource] = useState(true);
  const [tests, setTests] = useState([
    {
      id: "reading-cam-01-p1",
      title: "Academic Test 1",
      attempts: 123,
      skills: ["Reading"],
      section: "",
      questions: [
      ],
      source: "Cambridge",
      isCompleted: false,
      imageSrc: "/test-thumbnail.png",
    },
    {
      id: "reading-cam-01-p2",
      title: "Academic Test 1",
      attempts: 123,
      skills: ["Reading"],
      section: "",
      questions: [],
      source: "Cambridge",
      isCompleted: true,
      imageSrc: "/test-thumbnail.png",
    },
    {
      id: "reading-cam-01-p3",
      title: "Academic Test 1",
      attempts: 123,
      skills: ["Reading"],
      section: "",
      questions: [
      ],
      source: "Cambridge",
      isCompleted: false,
      imageSrc: "/test-thumbnail.png",
    },
    {
      id: "writing-cam-02-t1",
      title: "General Test 2",
      attempts: 123,
      skills: ["Writing"],
      section: "",
      questions: [],
      source: "Cambridge",
      isCompleted: true,
      imageSrc: "/test-thumbnail.png",
    },
    {
      id: "writing-cam-02-t2",
      title: "General Test 2",
      attempts: 123,
      skills: ["Writing"],
      section: "",
      questions: [],
      source: "Cambridge",
      isCompleted: false,
      imageSrc: "/test-thumbnail.png",
    },
    {
      id: "listening-cam-03-s1",
      title: "Test 3",
      attempts: 123,
      skills: ["Listening"],
      section: "",
      questions: [],
      source: "Cambridge",
      isCompleted: false,
      imageSrc: "/test-thumbnail.png",
    },
    {
      id: "listening-cam-03-s2",
      title: "Test 3",
      attempts: 123,
      skills: ["Listening"],
      section: "",
      questions: [],
      source: "Cambridge",
      isCompleted: true,
      imageSrc: "/test-thumbnail.png",
    },
    {
      id: "speaking-cam-04-p1",
      title: "Test 4",
      attempts: 123,
      skills: ["Speaking"],
      section: "",
      questions: [],
      source: "Recent Actual",
      isCompleted: true,
      imageSrc: "/test-thumbnail.png",
    },
    {
      id: "speaking-cam-04-p2",
      title: "Test 4",
      attempts: 123,
      skills: ["Speaking"],
      section: "",
      questions: [],
      source: "Recent Actual",
      isCompleted: false,
      imageSrc: "/test-thumbnail.png",
    },
    {
      id: "speaking-cam-04-p3",
      title: "Academic Test 4",
      attempts: 123,
      skills: ["Speaking"],
      section: "",
      questions: [],
      source: "Cambridge",
      isCompleted: false,
      imageSrc: "/test-thumbnail.png",
    },
  ]);

  const [sourceList, setSourceList] = useState([
    "Cambridge",
    "British Council",
    "Forecast 2025",
    "Recent Actual Tests",
    "Trainer - Practice Tests",
  ]);

  const [sectionList, setSectionList] = useState([
    "Passage 1",
    "Passage 2",
    "Passage 3",
  ]);

  const [typeList, setTypeList] = useState([
    "Gap Filling",
    "Multiple Choice (One anwser)",
    "Multiple Choice (Many answers)",
    "True/False/Not Given",
    "Yes/No/Not Given",
    "Matching Names",
    "Matching Information",
    "Map, Plan, Diagram Label",
    "Other Types",
  ]);

  return (
    <>
      <VStack gap={0} py={2} px={10} alignItems="flex-start" borderBottom="0.8px solid" borderColor="#C7C7CC">
        <Text fontSize="lg" fontWeight={"bold"} color="text.primary" textAlign="left">
          Practice
        </Text>
        <Text fontSize="lg" fontWeight={"bold"} color="orange.500" textAlign="left">
          Full Test
        </Text>
      </VStack>

      <Box className="flex" pt={5} px={20}>
        <VStack
          className="filter-bar w-[18rem]"
          alignItems={"flex-start"}
          mr={5}
        >
          <HStack justify={"space-between"} w="100%" alignItems={"center"} mb={2}>
            <Text fontSize="md" fontWeight="bolder" color="text.primary">
              Search
            </Text>
            <Icon as={RiSearchLine} color="gray.400" boxSize={5}/>
          </HStack>
          <Input
            id="search"
            placeholder="Enter to search..."
            border={"0"}
            bg={"gray.100"}
            outline={"bottom"}
            borderBottom="2px solid"
            color={"text.primary"}
          ></Input>

          <HStack justify={"space-between"} w="100%" alignItems={"center"}
              mb={1}
              mt={4}>
            <Text
              fontSize="md"
              fontWeight="bolder"
              color="text.primary"

            >
              Filter
            </Text>
            <Icon as={BiFilterAlt} color="gray.400" boxSize={5}/>
          </HStack>

          {/* <FilterOptions /> */}
          {/* <FilterTest /> */}
          <VStack borderTop="1px solid" borderColor="#E5E5EA" pt={4} width="100%" justifyContent={"flex-start"} alignItems="flex-start">
            <HStack justifyContent={"space-between"} width="100%" cursor="pointer" onClick={() => setShowSource((v) => !v)}>
              <Text
                fontSize="md"
                fontWeight="bolder"
                color="text.primary"
                textAlign={"left"}
              >
                Source
              </Text>
              <Icon
                as={showSource ? BiChevronUp : BiChevronDown}
                boxSize={5}
                color="text.primary"
                transition="transform 0.2s ease-in-out"
              />
            </HStack>
            <Box 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                showSource ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`} 
              width="100%"
            >
              <Box mb={3} className={`transition-transform duration-300 ease-in-out ${showSource ? 'translate-y-0' : '-translate-y-2'}`}>
                <CheckBox options={sourceList} />
              </Box>
            </Box>
          </VStack>


        </VStack>

        <Box w="full" ml={2}>
          <Flex wrap={"wrap"} align={"flex-end"} gap={5}>
            {tests.map((test) => (
              <TestBlock
                key={test.id}
                id={test.id}
                title={test.title}
                attempts={test.attempts}
                skills={test.skills}
                section={test.section}
                questions={test.questions}
                source={test.source}
                isCompleted={test.isCompleted}
                imageSrc={test.imageSrc}
              />
            ))}
          </Flex>
        </Box>
      </Box>
    </>
  );
}
