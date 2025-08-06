import Image from "next/image";
import { Text, Button, Box, HStack } from "@chakra-ui/react";

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
    <div className="w-[250px] h-[250px] flex flex-col justify-between shadow-lg hover:shadow-2xl transition rounded-2xl overflow-hidden">
      <div className="w-[250px] h-[130px] bg-amber-400 relative">
        <Image
          src={imageSrc}
          alt="Test thumbnail"
          fill
          style={{ objectFit: "cover" }}
          className="h-full w-full"
        />
      </div>

      <Box p={3}>
        <Text
          color={"text.primary"}
          fontWeight={"bold"}
        >{`${source} - ${title}`}</Text>
        
        <Text color={"text.secondary"} fontSize="sm" mt={1}>
          {questions.join(", ")}  
        </Text>
        
        <HStack justify={"end"} w={"100%"}>
          <Button
            variant={"outline"}
            colorPalette={"yellow"}
            color={"yellow.400"}
          >
            Mock Test
          </Button>
        </HStack>
      </Box>
    </div>
  );
}
