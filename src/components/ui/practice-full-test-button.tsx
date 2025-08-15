"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import {
  Box,
  Button,
  createListCollection,
  Icon,
  Portal,
  Select,
  Text,
  useDisclosure,
  VStack,
  HStack,
  Separator,
} from "@chakra-ui/react";
import { useColorModeValue } from "./color-mode";
import CheckBox from "./checkbox";

export default function PracticeTestButton() {
  const { open, onOpen, onClose } = useDisclosure();

  const modalBg = useColorModeValue("#FFF9F3", "gray.800");
  const headerColor = useColorModeValue("orange.500", "orange.300");
  const iconColor = useColorModeValue("yellow.500", "yellow.300");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const subTextColor = useColorModeValue("gray.600", "gray.400");

  const timeLimitOptions = createListCollection({
    items: [
      {
        value: "no-time-limit",
        label: "No time limit",
      },
      // Add 20 to 60 minutes, every 5 minutes
      ...Array.from({ length: 9 }, (_, i) => {
        const min = 20 + i * 5;
        return {
          value: `${min}-minutes`,
          label: `${min} minutes`,
        };
      }),
    ],
  });

  return (
    <>
      <Button
        variant={"outline"}
        colorPalette={"green"}
        color={"green.600"}
        rounded={"full"}
        py={0}
        onClick={onOpen}
        size={"xs"}
      >
        <img src="/weight-icon.svg" alt="weight icon" style={{ width: 18, height: 18, marginRight: 4 }} />
        Practice test
      </Button>
      <Modal isOpen={open} onClose={onClose} isCentered size="xs" closeOnEsc closeOnOverlayClick>
        <ModalOverlay
          bg="rgba(0, 0, 0, 0.5)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={onClose} 
        />
        <ModalContent height="100vh" width="100vw">
          <VStack
            mx="auto"
            my="auto"
            height="60vh"
            width="25vw"
            borderRadius="lg"
            bg={modalBg}
            py={4}
            px={6}
          >
            <ModalHeader textAlign="center" bg={modalBg}>
              <Text color={"accent"} fontWeight="bold" fontSize="2xl">
                Pratice Mode
              </Text>
            </ModalHeader>
            <ModalBody bg={modalBg}>
              <Text
                textAlign="left"
                fontWeight="light"
                fontSize="md"
                color={textColor}
              >
                Suitable for enhancing your accuracy and time spent on each part.
              </Text>
              <Box color={"accent"} fontWeight={"bold"} fontSize={"md"} mt={4}>
                Choose skills you want to practice:
                <VStack align={"start"}>
                  <CheckBox
                    options={["Full section"]}
                    subtext={["(4 skills)"]}
                    textColor={"text.primary"}
                  ></CheckBox>
                  <VStack ml={4}>
                    <CheckBox
                      options={["Reading", "Listening", "Writing", "Speaking"]}
                      subtext={[
                        "(3 passages)",
                        "(4 parts)",
                        "(2 tasks)",
                        "(3 parts)",
                      ]}
                      textColor={"text.primary"}
                    ></CheckBox>
                  </VStack>
                </VStack>
              </Box>
            </ModalBody>
            <ModalFooter
              display="flex"
              justifyContent="center"
              bg={modalBg}
              w="100%"
              px={0}
              mt="auto"
            >
              <Box w={"full"}>
                <VStack>
                  <Separator w="full" mb={1}/>
                  <HStack>
                    <Button
                      onClick={onClose}
                      variant="outline"
                      colorScheme="gray"
                      borderRadius="full"
                      mr={2}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={onClose}
                      variant="solid"
                      colorPalette="green"
                      borderRadius="full"
                    >
                      Start Now
                    </Button>
                  </HStack>
                </VStack>
              </Box>
              {/* <Button
                onClick={() => router.push("/report")}
                variant="solid"
                colorPalette="black"
                borderRadius="full"
              >
                Exit
              </Button> */}
            </ModalFooter>
          </VStack>
        </ModalContent>
      </Modal>
    </>
  );
}
