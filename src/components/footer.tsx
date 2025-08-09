"use client"

import { Box, Container, Flex, VStack, HStack, Text, Link } from "@chakra-ui/react"
import { useColorModeValue } from "@chakra-ui/color-mode"
import { Icon } from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";
import { HoldPhoneIcon } from "hugeicons-react";
import { BiPhoneCall } from "react-icons/bi";
import NextLink from "next/link"
interface FooterProps {
  currentLanguage: string
}

export default function Footer({ currentLanguage }: FooterProps) {

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
      testResult: "Kết quả bài làm",
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
      fullTestPractice: "Full Test",
      miniTestPractice: "Mini Test",
      tutorialGuide: "Vocabulary Guide",
      studyReport: "Study Report",
      testResult: "Test Result",
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
    <Box bg="background.accent" py={10} mt={16} borderTop="1px" borderColor="border.primary">
      <Container maxW="1200px">
        <Flex justify="space-between" align="start" wrap="wrap" gap={8}>
          <VStack align="start" gap={4}>
            <HStack>
              <img src="/full-logo.svg" alt="LUMI" width="80" />
            </HStack>
          </VStack>

          <VStack align="start" gap={3}>
            <Text fontWeight="bold" color="text.primary">
              {content.navigation}
            </Text>
            <Link color="text.secondary" _hover={{ color: "link.hover" }}>
              {content.homepage}
            </Link>
            <Link color="text.secondary" _hover={{ color: "link.hover" }}>
              {content.fullTestPractice}
            </Link>
            <Link color="text.secondary" _hover={{ color: "link.hover" }}>
              {content.miniTestPractice}
            </Link>
            <Link color="text.secondary" _hover={{ color: "link.hover" }}>
              {content.tutorialGuide}
            </Link>
            <Link color="text.secondary" _hover={{ color: "link.hover" }}>
              {content.studyReport}
            </Link>
            <Link as={NextLink} href="/test-result" _hover={{ color: "blue.500" }}>
              {content.testResult}
            </Link>
          </VStack>

          <VStack align="start" gap={3}>
            <Text fontWeight="bold" color="text.primary">
              {content.help}
            </Text>
            <Link color="text.secondary" _hover={{ color: "link.hover" }}>
              {content.supportKnowledge}
            </Link>
            <Link color="text.secondary" _hover={{ color: "link.hover" }}>
              {content.community}
            </Link>
            <Link color="text.secondary" _hover={{ color: "link.hover" }}>
              {content.talkToSales}
            </Link>
            <Link color="text.secondary" _hover={{ color: "link.hover" }}>
              {content.mediaKit}
            </Link>
            <Link color="text.secondary" _hover={{ color: "link.hover" }}>
              {content.privacyTerms}
            </Link>
            <Link color="text.secondary" _hover={{ color: "link.hover" }}>
              {content.status}
            </Link>
          </VStack>

          <VStack align="start" gap={3}>
            <Text fontWeight="bold" color="text.primary">
              {content.contact}
            </Text>
            <Link href="tel:+84123456789" _hover={{ color: "link.hover" }}>
              <HStack cursor="pointer">
                <Icon as={BiPhoneCall} color="text.secondary" />
                <Text color="text.secondary">(+84) 123456789</Text>
              </HStack>
            </Link>
            <Link href="mailto:contact@lumi.com.vn" _hover={{ color: "link.hover" }}>
              <HStack cursor="pointer">
                <Icon as={MdEmail} color="text.secondary" />
                <Text color="text.secondary">contact@lumi.com.vn</Text>
              </HStack>
            </Link>
          </VStack>
        </Flex>
      </Container>
    </Box>
  )
}
