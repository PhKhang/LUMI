"use client";

import { Text, Icon, Box, Flex, HStack } from "@chakra-ui/react";

import { useState } from "react";
import {
  MdHeadphones,
  MdBook,
  MdEdit,
  MdMic,
  MdFilterAlt,
} from "react-icons/md";

type SkillType = "listening" | "reading" | "writing" | "speaking";
type SectionType = "single" | "full";

interface SkillState {
  selected: boolean;
  sectionType: SectionType;
}

export default function FilterTest() {
  const [skills, setSkills] = useState<Record<SkillType, SkillState>>({
    listening: { selected: true, sectionType: "single" },
    reading: { selected: true, sectionType: "full" },
    writing: { selected: false, sectionType: "single" },
    speaking: { selected: false, sectionType: "single" },
  });

  const toggleSkill = (skill: SkillType) => {
    setSkills((prev) => ({
      ...prev,
      [skill]: {
        ...prev[skill],
        selected: !prev[skill].selected,
      },
    }));
  };

  const setSectionType = (skill: SkillType, sectionType: SectionType) => {
    setSkills((prev) => ({
      ...prev,
      [skill]: {
        ...prev[skill],
        sectionType,
      },
    }));
  };

  const skillConfig = {
    listening: { icon: MdHeadphones, label: "Listening" },
    reading: { icon: MdBook, label: "Reading" },
    writing: { icon: MdEdit, label: "Writing" },
    speaking: { icon: MdMic, label: "Speaking" },
  };

  return (
    <div className="w-full max-w-sm">
      {/* Skills */}
      <div className="space-y-6">
        {(Object.keys(skillConfig) as SkillType[]).map((skill) => {
          const { icon: IconSymbol, label } = skillConfig[skill];
          const skillState = skills[skill];

          return (
            <div key={skill} className="space-y-3">
              {/* Skill Toggle Button */}
              <Box
                border={"2px solid"}
                borderColor={`${
                  skillState.selected ? "green.500" : "gray.400"
                }`}
                borderRadius={"full"}
                bg={`${skillState.selected ? "green.100" : "gray.50"}`}
                p={1}
                px={3}
                w={"full"}
              >
                <button
                  onClick={() => toggleSkill(skill)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-full border-2 transition-all ${
                    skillState.selected
                      ? "bg-green-100 border-green-300 text-green-800"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      skillState.selected
                        ? "border-green-500 bg-green-500"
                        : "border-gray-900"
                    }`}
                  >
                    {/* <Box rounded={"full"} w="2" h="2" bg={"red"} border={"2px solid blue"}>
                      <Flex justify={"center"} align="center"> */}
                        {skillState.selected && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      {/* </Flex>
                    </Box> */}
                  </div>

                  <HStack>
                    <Icon color={"gray.600"}>
                      <IconSymbol className="w-5 h-5" />
                    </Icon>
                    <Text color={"gray.600"} fontWeight={"bold"}>
                      {label}
                    </Text>
                  </HStack>
                </button>
              </Box>

              {/* Section Type Options */}
              <div className="ml-8 space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name={`${skill}-section`}
                    checked={skillState.sectionType === "single"}
                    onChange={() => setSectionType(skill, "single")}
                    className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                  />
                  <Text color={"gray.500"}>Single section</Text>
                  {/* <span className="text-gray-600">Single section</span> */}
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name={`${skill}-section`}
                    checked={skillState.sectionType === "full"}
                    onChange={() => setSectionType(skill, "full")}
                    className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                  />
                  {/* <span className="text-gray-600">Full section</span> */}
                  <Text color={"gray.500"}>Full section</Text>
                </label>
              </div>
            </div>
          );
        })}
      </div>

      {/* Debug Info (optional - remove in production) */}
      {/* <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm">
        <pre className="text-xs text-gray-600">
          {JSON.stringify(skills, null, 2)}
        </pre>
      </div> */}
    </div>
  );
}
