"use client";

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
} from "@chakra-ui/react";
import { useState } from "react";
// import Link from "next/link";

export default function FullTestPage() {
  const [tests, setTests] = useState([
    {
      id: "reading-cam-01-p1",
      title: "[Cambridge] - Academic Reading Test 1",
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
      title: "[Cambridge] - Academic Reading Test 1",
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
      title: "[Cambridge] - Academic Reading Test 1",
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
      title: "[Cambridge] - General Writing Test 2",
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
      title: "[Cambridge] - General Writing Test 2",
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
      title: "[Cambridge] - Listening Test 3",
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
      title: "[Cambridge] - Listening Test 3",
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
      title: "[Cambridge] - Speaking Test 4",
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
      title: "[Cambridge] - Speaking Test 4",
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
      title: "[Cambridge] - Speaking Test 4",
      attempts: 123,
      skills: ["Speaking"],
      section: "Part 3",
      questions: ["Discussion Questions", "Follow-ups"],
      source: "Cambridge",
      isCompleted: false,
      imageSrc: "/test-thumbnail.png",
    },
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
        <div className="filter-bar"></div>
        <div className="tests flex flex-wrap gap-4">
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
        </div>
      </div>
    </>
  );
}
