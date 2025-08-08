import Image from "next/image";
import { Text, Button, Box, HStack, VStack, Flex } from "@chakra-ui/react";

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
      h={"280px"}
      w={"250px"}
      shadow={"sm"}
      // overflow={"hidden"}
      rounded={"3xl"}
      _hover={{ shadow: "xs" }}
      transition={"all 0.2s ease-in-out"}
      position={"relative"}
      overflow={"hidden"}
    >
      {/* <div className="w-[250px] h-[250px] flex flex-col justify-between shadow-lg hover:shadow-2xl transition rounded-2xl overflow-hidden"> */}
      <Box h={"130px"} position="relative">
        {/* <div className="w-[250px] h-[130px] bg-amber-400 relative"> */}
        <Image
          src={imageSrc}
          alt="Test thumbnail"
          fill
          style={{ objectFit: "cover" }}
          className="h-full w-full"
        />
        {/* </div> */}
      </Box>

      <Box p={"2.5"} pt={1} h={"150px"}>
        {/* <VStack gap={0} justify={"space-between"}> */}
        <Flex flexDir={"column"} justify={"space-between"} h={"100%"}>
          <Box>
            <Text
              color={"text.primary"}
              fontWeight={"bold"}
              fontSize=""
            >{`${source} - ${title}`}</Text>
            <Text color={"text.secondary"} fontSize="xs">
              {questions.join(", ")}
            </Text>
          </Box>

          <HStack justify={"end"} w={"100%"}>
            <Button
              variant={"outline"}
              colorPalette={"yellow"}
              color={"yellow.400"}
              rounded={"full"}
              py={0}
            >
              Mock Test
            </Button>
          </HStack>
          {/* </VStack> */}
        </Flex>
      </Box>
      {/* </div> */}
    </Box>
  );
}
