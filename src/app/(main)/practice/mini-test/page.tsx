"use client";

import CheckBox from "@/components/ui/checkbox";
import FilterOptions from "@/components/ui/filter-component";
import FilterTest from "@/components/ui/filter-test";
import TestBlock from "@/components/ui/test-block";
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
} from "@chakra-ui/react";
import { useState } from "react";
// import Link from "next/link";

export default function FullTestPage() {
  const [tests, setTests] = useState([
    {
      id: "reading-cam-01-p1",
      title: "Academic Reading Test 1",
      attempts: 123,
      skills: ["Reading"],
      section: "Passage 1",
      questions: [
        "Matching Headings",
        "True/False/Not Given",
        "Summary Completion",
      ],
      source: "Cambridge",
      isCompleted: false,
      imageSrc: "/test-thumbnail.png",
    },
    {
      id: "reading-cam-01-p2",
      title: "Academic Reading Test 1",
      attempts: 123,
      skills: ["Reading"],
      section: "Passage 2",
      questions: ["Multiple Choice", "Short Answer", "Flow Chart"],
      source: "Cambridge",
      isCompleted: true,
      imageSrc: "/test-thumbnail.png",
    },
    {
      id: "reading-cam-01-p3",
      title: "Academic Reading Test 1",
      attempts: 123,
      skills: ["Reading"],
      section: "Passage 3",
      questions: [
        "Matching Information",
        "Diagram Labeling",
        "Sentence Completion",
      ],
      source: "Cambridge",
      isCompleted: false,
      imageSrc: "/test-thumbnail.png",
    },
    {
      id: "writing-cam-02-t1",
      title: "General Writing Test 2",
      attempts: 123,
      skills: ["Writing"],
      section: "Task 1",
      questions: ["Letter Writing", "Graph Description"],
      source: "Cambridge",
      isCompleted: true,
      imageSrc: "/test-thumbnail.png",
    },
    {
      id: "writing-cam-02-t2",
      title: "General Writing Test 2",
      attempts: 123,
      skills: ["Writing"],
      section: "Task 2",
      questions: ["Opinion Essay", "Discussion Essay"],
      source: "Cambridge",
      isCompleted: false,
      imageSrc: "/test-thumbnail.png",
    },
    {
      id: "listening-cam-03-s1",
      title: "Listening Test 3",
      attempts: 123,
      skills: ["Listening"],
      section: "Section 1",
      questions: ["Form Completion", "Short Answer"],
      source: "Cambridge",
      isCompleted: false,
      imageSrc: "/test-thumbnail.png",
    },
    {
      id: "listening-cam-03-s2",
      title: "Listening Test 3",
      attempts: 123,
      skills: ["Listening"],
      section: "Section 2",
      questions: ["Map Labeling", "Matching"],
      source: "Cambridge",
      isCompleted: true,
      imageSrc: "/test-thumbnail.png",
    },
    {
      id: "speaking-cam-04-p1",
      title: "Speaking Test 4",
      attempts: 123,
      skills: ["Speaking"],
      section: "Part 1",
      questions: ["Intro Questions", "Personal Info"],
      source: "Cambridge",
      isCompleted: true,
      imageSrc: "/test-thumbnail.png",
    },
    {
      id: "speaking-cam-04-p2",
      title: "Speaking Test 4",
      attempts: 123,
      skills: ["Speaking"],
      section: "Part 2",
      questions: ["Cue Card", "2-minute Talk"],
      source: "Cambridge",
      isCompleted: false,
      imageSrc: "/test-thumbnail.png",
    },
    {
      id: "speaking-cam-04-p3",
      title: "Speaking Test 4",
      attempts: 123,
      skills: ["Speaking"],
      section: "Part 3",
      questions: ["Discussion Questions", "Follow-ups"],
      source: "Cambridge",
      isCompleted: false,
      imageSrc: "/test-thumbnail.png",
    },
  ]);

  const [sourceList, setSourceList] = useState([
    "Cambridge",
    "British Council",
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
      <Text fontSize="lg" fontWeight={"bold"} color="text.primary">
        Practice
      </Text>
      <Text fontSize="lg" fontWeight={"bold"} color="orange.500">
        Mini Test
      </Text>

      <div className="flex">
        <VStack
          className="filter-bar w-[40rem]"
          m={2}
          alignItems={"flex-start"}
        >
          <Text fontSize="md" fontWeight="bolder" color="text.primary" mb={2}>
            Tìm kiếm
          </Text>
          <Input
            id="search"
            placeholder="Enter to search..."
            border={"0"}
            bg={"gray.100"}
            outline={"bottom"}
            borderBottom="2px solid"
            color={"text.primary"}
          ></Input>

          <Text
            fontSize="md"
            fontWeight="bolder"
            color="text.primary"
            mb={2}
            mt={4}
          >
            Bộ lọc
          </Text>
          {/* <FilterOptions /> */}
          <FilterTest />

          <Text
            fontSize="md"
            fontWeight="bolder"
            color="text.primary"
            mb={2}
            mt={4}
          >
            Nguồn tài liệu
          </Text>
          <CheckBox options={sourceList} />

          <Text
            fontSize="md"
            fontWeight="bolder"
            color="text.primary"
            mb={2}
            mt={4}
          >
            Section
          </Text>
          <CheckBox options={sectionList} />

          <Text
            fontSize="md"
            fontWeight="bolder"
            color="text.primary"
            mb={2}
            mt={4}
          >
            Dạng bài
          </Text>
          <CheckBox options={typeList} />
        </VStack>

        <Box w="full">
          <Flex wrap={"wrap"} align={"flex-end"} gap={4}>
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
      </div>
    </>
  );
}
