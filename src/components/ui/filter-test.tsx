"use client";

import {
  Text,
  Icon,
  Box,
  Flex,
  HStack,
  Button,
  Center,
} from "@chakra-ui/react";

import { useState } from "react";
import { MdFilterAlt } from "react-icons/md";
import { FaHeadphones, FaBookOpen } from "react-icons/fa";
import { BiSolidPencil, BiSolidMicrophone } from "react-icons/bi";

type SkillType = "listening" | "reading" | "writing" | "speaking";
type SectionType = "single" | "full";

interface SkillState {
  selected: boolean;
  sectionType: SectionType;
}

export default function FilterTest() {
  const [skills, setSkills] = useState<Record<SkillType, SkillState>>({
    listening: { selected: true, sectionType: "single" },
    reading: { selected: false, sectionType: "single" },
    writing: { selected: false, sectionType: "single" },
    speaking: { selected: false, sectionType: "single" },
  });

  const toggleSkill = (skill: SkillType) => {
    setSkills((prev) => {
      // Nếu skill hiện tại đã được chọn, không làm gì (không được phép deselect)
      if (prev[skill].selected) {
        return prev;
      }

      // Nếu skill hiện tại chưa được chọn, bỏ chọn tất cả skill khác và chọn skill này
      const newSkills = { ...prev };
      Object.keys(newSkills).forEach((key) => {
        newSkills[key as SkillType].selected = false;
      });

      return {
        ...newSkills,
        [skill]: {
          ...prev[skill],
          selected: true,
        },
      };
    });
  };

  const setSectionType = (skill: SkillType, sectionType: SectionType) => {
    setSkills((prev) => {
      // Bỏ chọn tất cả skills khác và chọn skill hiện tại
      const newSkills = { ...prev };
      Object.keys(newSkills).forEach((key) => {
        newSkills[key as SkillType].selected = false;
      });

      return {
        ...newSkills,
        [skill]: {
          selected: true, // Tự động chọn skill khi chọn section type
          sectionType,
        },
      };
    });
  };

  const skillConfig = {
    listening: { icon: FaHeadphones, label: "Listening" },
    reading: { icon: FaBookOpen, label: "Reading" },
    writing: { icon: BiSolidPencil, label: "Writing" },
    speaking: { icon: BiSolidMicrophone, label: "Speaking" },
  };

  return (
    <div className="w-full max-w-sm">
      {/* Skills */}
      <div className="space-y-4">
        {(Object.keys(skillConfig) as SkillType[]).map((skill) => {
          const { icon: IconSymbol, label } = skillConfig[skill];
          const skillState = skills[skill];

          return (
            <div key={skill} className="space-y-1">
              {/* Skill Toggle Button */}
              <Box borderRadius={"full"}>
                <Button
                  onClick={() => toggleSkill(skill)}
                  w={"full"}
                  bg={skillState.selected ? "green.100" : ""}
                  justifyContent={"start"}
                  rounded={"full"}
                  border={"solid"}
                  borderWidth={"1.6px"}
                  borderColor={skillState.selected ? "green.600" : "gray.300"}
                  px={3}
                  py={2}
                >
                  <Box
                    // Cục tròn ở giữa
                    w={4}
                    h={4}
                    rounded={"full"}
                    border={"1.8px solid"}
                    borderWidth={"1.6px"}
                    borderColor={"green.600"}
                    bg={skillState.selected ? "green.600" : ""}
                    transition={"all"}
                  >
                    {skillState.selected && (
                      <Center h={"full"} w={"full"}>
                        <Box
                          w={"2"}
                          h={"2"}
                          bg={"white"}
                          rounded={"full"}
                          transition={"all"}
                        />
                      </Center>
                    )}
                  </Box>
                  <HStack>
                    <Icon
                      color={skillState.selected ? "green.600" : "gray.600"}
                    >
                      <IconSymbol className="w-5 h-5" />
                    </Icon>
                    <Text
                      color={skillState.selected ? "green.600" : "gray.600"}
                      fontWeight={"bold"}
                      fontSize={"sm"}
                    >
                      {label}
                    </Text>
                  </HStack>
                </Button>
              </Box>

              {/* Section Type Options */}
              <Box className="space-y-1 px-2 ml-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="section-type" // Tất cả radio buttons dùng chung một name
                    checked={
                      skillState.selected && skillState.sectionType === "single"
                    }
                    onChange={() => setSectionType(skill, "single")}
                    className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                  />
                  <Text
                    color={skillState.selected ? "text.primary" : "gray.400"}
                    fontSize={"sm"}
                    fontWeight={"bold"}
                  >
                    Single section
                  </Text>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="section-type" // Tất cả radio buttons dùng chung một name
                    checked={
                      skillState.selected && skillState.sectionType === "full"
                    }
                    onChange={() => setSectionType(skill, "full")}
                    className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                  />
                  <Text
                    color={skillState.selected ? "text.primary" : "gray.400"}
                    fontSize={"sm"}
                    fontWeight={"bold"}
                  >
                    Full section
                  </Text>
                </label>
              </Box>
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
