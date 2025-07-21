"use client"

import { Box, Container, Flex, VStack, HStack, Text, Link } from "@chakra-ui/react"
import { useColorModeValue } from "@chakra-ui/color-mode"
import { Icon } from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";
import { HoldPhoneIcon } from "hugeicons-react";

interface FooterProps {
  currentLanguage: string
}

export default function Footer({ currentLanguage }: FooterProps) {
  const bgColor = useColorModeValue("white", "gray.800")
  const textColor = useColorModeValue("gray.600", "gray.300")
  const headingColor = useColorModeValue("gray.800", "white")

  const footerContent = {
    vi: {
      navigation: "Thanh điều hướng",
      help: "Trợ giúp",
      contact: "Liên hệ",
      homepage: "Trang chủ",
      fullTestPractice: "Luyện tập - Full Test",
      miniTestPractice: "Luyện tập - Mini Test",
      tutorialGuide: "Sổ Tư Vựng",
      studyReport: "Báo cáo học tập",
      supportKnowledge: "Support & Knowledge Base",
      community: "LUMI Community",
      talkToSales: "Talk to Sales",
      mediaKit: "Media Kit",
      privacyTerms: "Privacy & Terms",
      status: "Status",
    },
    en: {
      navigation: "Navigation",
      help: "Help",
      contact: "Contact",
      homepage: "Homepage",
      fullTestPractice: "Practice - Full Test",
      miniTestPractice: "Practice - Mini Test",
      tutorialGuide: "Vocabulary Guide",
      studyReport: "Study Report",
      supportKnowledge: "Support & Knowledge Base",
      community: "LUMI Community",
      talkToSales: "Talk to Sales",
      mediaKit: "Media Kit",
      privacyTerms: "Privacy & Terms",
      status: "Status",
    },
  }

  const content = footerContent[currentLanguage as keyof typeof footerContent]

  return (
    <Box bg={bgColor} py={10} mt={16} borderTop="1px" borderColor="gray.200">
      <Container maxW="1200px">
        <Flex justify="space-between" align="start" wrap="wrap" gap={8}>
          <VStack align="start" gap={4}>
            <HStack>
              <Box
                w={10}
                h={10}
                bg="#FFD700"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontWeight="bold" fontSize="sm">
                  LUMI
                </Text>
              </Box>
            </HStack>
          </VStack>

          <VStack align="start" gap={3}>
            <Text fontWeight="bold" color={headingColor}>
              {content.navigation}
            </Text>
            <Link color={textColor} _hover={{ color: "blue.500" }}>
              {content.homepage}
            </Link>
            <Link color={textColor} _hover={{ color: "blue.500" }}>
              {content.fullTestPractice}
            </Link>
            <Link color={textColor} _hover={{ color: "blue.500" }}>
              {content.miniTestPractice}
            </Link>
            <Link color={textColor} _hover={{ color: "blue.500" }}>
              {content.tutorialGuide}
            </Link>
            <Link color={textColor} _hover={{ color: "blue.500" }}>
              {content.studyReport}
            </Link>
          </VStack>

          <VStack align="start" gap={3}>
            <Text fontWeight="bold" color={headingColor}>
              {content.help}
            </Text>
            <Link color={textColor} _hover={{ color: "blue.500" }}>
              {content.supportKnowledge}
            </Link>
            <Link color={textColor} _hover={{ color: "blue.500" }}>
              {content.community}
            </Link>
            <Link color={textColor} _hover={{ color: "blue.500" }}>
              {content.talkToSales}
            </Link>
            <Link color={textColor} _hover={{ color: "blue.500" }}>
              {content.mediaKit}
            </Link>
            <Link color={textColor} _hover={{ color: "blue.500" }}>
              {content.privacyTerms}
            </Link>
            <Link color={textColor} _hover={{ color: "blue.500" }}>
              {content.status}
            </Link>
          </VStack>

          <VStack align="start" gap={3}>
            <Text fontWeight="bold" color={headingColor}>
              {content.contact}
            </Text>
            <HStack>
              <Icon as={HoldPhoneIcon} color={textColor} />
              <Text color={textColor}>(+84) 123456789</Text>
            </HStack>
            <HStack>
              <Icon as={MdEmail} color={textColor} />
              <Text color={textColor}>contact@lumi.com.vn</Text>
            </HStack>
          </VStack>
        </Flex>
      </Container>
    </Box>
  )
}
