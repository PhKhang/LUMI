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
      {
        value: "45-minutes",
        label: "45 minutes",
      },
      {
        value: "60-minutes",
        label: "60 minutes",
      },
      {
        value: "90-minutes",
        label: "90 minutes",
      },
    ],
  });

  return (
    <>
      <Button
        variant={"outline"}
        colorPalette={"green"}
        color={"green.400"}
        rounded={"full"}
        py={0}
        onClick={onOpen}
      >
        Practice test
      </Button>
      <Modal isOpen={open} onClose={onClose} isCentered size="xs" closeOnEsc>
        <ModalOverlay
          bg="rgba(0, 0, 0, 0.5)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        />
        <ModalContent height="100vh" width="100vw">
          <VStack
            mx="auto"
            my="auto"
            borderRadius="lg"
            bg={modalBg}
            py={4}
            px={6}
          >
            <ModalHeader textAlign="center" bg={modalBg} w="100%">
              <Text color={"accent"} fontWeight="bold" fontSize="2xl">
                Pratice Mode
              </Text>
            </ModalHeader>
            <ModalBody bg={modalBg} mb={2}>
              <Text
                textAlign="center"
                // fontWeight="semibold"
                // fontSize="lg"
                color={textColor}
              >
                Suitable for enhancing your accuracy and time spent on each
                part.
              </Text>
              <Box color={"accent"} fontWeight={"bold"} fontSize={"sm"}>
                1. Choose sections you want to practice:
                <VStack align={"start"}>
                  <CheckBox
                    options={["Full section"]}
                    subtext={["(3 passages - 40 questions)"]}
                  ></CheckBox>
                  <VStack ml={4}>
                    <CheckBox
                      options={["Passage 1", "Passage 2", "Passage 3"]}
                      subtext={[
                        "(14 questions)",
                        "(13 questions)",
                        "(13 questions)",
                      ]}
                    ></CheckBox>
                  </VStack>
                </VStack>
              </Box>
              <Text color={"accent"} fontWeight={"bold"} fontSize={"sm"}>
                2. Choose a time limit:
              </Text>

              <Select.Root
                collection={timeLimitOptions}
                size="sm"
                width="320px"
                defaultValue={[timeLimitOptions.items[0].value]}
                color={"black"}
              >
                <Select.HiddenSelect />
                {/* <Select.Label>Select framework</Select.Label> */}
                <Select.Control>
                  <Select.Trigger rounded={"xl"}>
                    <Select.ValueText
                      placeholder="Select framework"
                      color={"text.primary"}
                    />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content color={"text.secondary"} bg={modalBg}>
                      {timeLimitOptions.items.map((time) => (
                        <Select.Item item={time} key={time.value}>
                          <Text color={"text.primary"}>{time.label}</Text>
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </ModalBody>
            <ModalFooter
              display="flex"
              justifyContent="center"
              gap={10}
              bg={modalBg}
              w="100%"
              px={0}
            >
              <Box w={"full"}>
                <VStack>
                  <Separator w="full" />
                  <Button
                    onClick={onClose}
                    variant="solid"
                    colorPalette="green"
                    borderRadius="full"
                  >
                    Start Now
                  </Button>
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
