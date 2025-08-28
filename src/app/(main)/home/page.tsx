"use client";

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

export default function HomePage() {
  return (
    <>
      <Box w={"full"} position={"relative"} px={4}>
        <Image
          src="/left-bg.svg"
          alt="Left background gradient"
          width={1000}
          height={200}
          className="absolute left-0"
        />
        <Image
          src="/right-bg.svg"
          alt="Left background gradient"
          width={1000}
          height={200}
          className="absolute right-0"
        />

        <Box maxWidth={"80rem"} mx={"auto"}>
          <div className="relative z-10 flex justify-between gap-4">
            <Box>
              <Text
                color={"green.700"}
                fontSize={"5xl"}
                fontWeight={"bold"}
                mt={"16"}
              >
                Free IELTS test preparation
                <br />
                anytime, anywhere
              </Text>
              <Text color={"text.primary"} fontWeight={"medium"}>
                Join LUMI today to start your IELTS journey!
              </Text>
              <Button
                variant={"solid"}
                colorPalette={"yellow"}
                color={"text.primary"}
                rounded={"full"}
                mt={"6"}
                size={"xl"}
              >
                <Text>Sign up now</Text>
              </Button>
            </Box>

            <Text color={"text.primary"} fontSize={"2xl"} mt={"20"}>
              Learn, Upgrade and Master the IELTS exam
            </Text>
          </div>
        </Box>
      </Box>
    </>
  );
}
