import Image from "next/image";
import { Text, Button, Box, HStack, VStack, Flex } from "@chakra-ui/react";
import TestDialog from "./test-overlay";
import PracticeTestButtonMiniTest from "./practice-mini-test-button";

interface TestBlockProps {
  id: string;
  title: string;
  attempts: number;
  skills: string[];
  section: string;
  questions: string[];
  source: string;
  isCompleted: boolean;
  imageSrc: string;
}

export default function TestBlock({
  id,
  title,
  attempts,
  skills,
  section,
  questions,
  source,
  isCompleted,
  imageSrc,
}: TestBlockProps) {
  return (
    <Box
      h={"250px"}
      w={"260px"}
      shadow={"sm"}
      // overflow={"hidden"}
      rounded={"2xl"}
      _hover={{ shadow: "xs" }}
      transition={"all 0.2s ease-in-out"}
      position={"relative"}
      overflow={"hidden"}
    >
      <Box h={"130px"} position="relative">
        <Image
          src={imageSrc}
          alt="Test thumbnail"
          fill
          style={{ objectFit: "cover" }}
          className="h-full w-full"
        />

        <Box
          position={"absolute"}
          top={0}
          left={0}
          p={1}
          px={3}
          bg={"#3C3C4399"}
          roundedBottomRight={"md"}
        >
          <Text fontWeight={"bold"} fontSize={"sm"}>
            {attempts} attempts
          </Text>
        </Box>
        
        {section && (
          <Box
            position={"absolute"}
            bottom={0}
            left={0}
            p={1}
            px={3}
            roundedRight={"full"}
            bg={"orange"}
            maxW={"180px"}
          >
            <Text
              fontWeight={"bold"}
              fontSize={"sm"}
              color={"white"}
              maxLines={1}
              maxW={"160px"}
            >
              {section}
            </Text>
          </Box>
        )}
      </Box>

      <Box p={"2.5"} pt={1} h={"120px"}>
        <Flex flexDir={"column"} justify={"space-between"} h={"100%"}>
          <Box>
            <Text
              color={"text.primary"}
              fontWeight={"bold"}
              fontSize={"md"}
            >
              {`[${source}] - ${title}`}
            </Text>
            <Text color={"text.primary"} fontSize="xs" fontWeight={"light"}>
              {questions.join(", ")}
            </Text>
          </Box>

          <HStack align={"end"} justify={"end"} w={"100%"}>
            {/* <Button
              variant={"outline"}
              colorPalette={"green"}
              color={"green.400"}
              rounded={"full"}
              py={0}
              onClick={() => {
                TestDialog.open("a", {
                  title: "Dialog Title",
                  description: "Dialog Description",
                });
              }}
            >
              Practice test
            </Button> */}
            <PracticeTestButtonMiniTest/>
            <Button
              variant={"solid"}
              colorPalette={"yellow"}
              color={"text.primary"}
              rounded={"full"}
              py={0}
              size={"xs"}
            >
              <img src="/race-flag.svg" alt="mock test icon" width="16px" />
              Mock Test
            </Button>
          </HStack>
        </Flex>
      </Box>

      <TestDialog.Viewport />
    </Box>
  );
}
