"use client";

import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Text,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { MdPlayArrow, MdBook, MdAssessment, MdGroup } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineArrowRight } from "react-icons/hi";

export default function HomePage() {
  const router = useRouter();
  return (
    <>
      <Box w={"full"} position={"relative"} px={4}>
        <Image
          src="/left-bg.svg"
          alt="Left background gradient"
          width={1095}
          height={200}
          className="absolute left-0"
        />
        <Image
          src="/right-bg.svg"
          alt="Left background gradient"
          width={1025}
          height={200}
          className="absolute right-0"
        />

        <Box maxWidth={"80rem"} mx={"auto"}>
          <HStack className="relative z-7" justify="space-between" width="full" align="center">
            <Box flex="1" minW={0}>
              <Text
                color={"green.700"}
                fontSize={"5xl"}
                fontWeight={"bold"}
                mt={"16"}
              >
                Free IELTS test preparation
              </Text>
              <Text
                color={"green.700"}
                fontSize={"5xl"}
                fontWeight={"bold"}
                mt="-5"
              >
                anytime, anywhere
              </Text>
              <Text color={"text.primary"} fontWeight={"medium"}>
                Join LUMI today to start your IELTS journey!
              </Text>
              <HStack gap={4} mt={"6"}>
                <Button
                  data-group
                  variant={"solid"}
                  colorPalette={"yellow"}
                  color={"text.primary"}
                  rounded={"full"}
                  size={"md"}
                  _hover={{}}
                  onClick={() => router.push("/practice/full-test")}
                >
                  <Text fontWeight={"bold"}>Full Test</Text>
                  <Icon
                    as={HiOutlineArrowRight}
                    transition="transform 1s"
                    _groupHover={{ transform: "translateX(6px)" }}
                  />
                </Button>
                <Button
                  data-group
                  variant={"solid"}
                  colorPalette={"yellow"}
                  color={"text.primary"}
                  rounded={"full"}
                  size={"md"}
                  _hover={{}}
                  onClick={() => router.push("/practice/mini-test")}
                >
                  <Text fontWeight={"bold"}>Mini Test</Text>
                  <Icon
                    as={HiOutlineArrowRight}
                    transition="transform 1s"
                    _groupHover={{ transform: "translateX(6px)" }}
                  />
                </Button>
              </HStack>
            </Box>
            <Box ml="auto" mt="16" width="fit-content">
              <img
                src="./home-image.png"
                alt="Home Image"
                style={{ maxWidth: "370px", width: "100%", height: "auto", display: "block" }}
              />
            </Box>
          </HStack>
        </Box>
      </Box>
    </>
  );
}
