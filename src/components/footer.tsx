"use client"

import { Box, Container, Flex, VStack, HStack, Text, Link } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";
import { BiPhoneCall } from "react-icons/bi";

interface FooterProps {
  currentLanguage: string
}

export default function Footer({ currentLanguage }: FooterProps) {

  const footerContent = {
    vi: {
      navigation: "Navigation",
      help: "Help",
      contact: "Contact",
      homepage: "Homepage",
      fullTestPractice: "Full Test",
      miniTestPractice: "Mini Test",
      tutorialGuide: "Vocabulary Guide",
      studyReport: "Study Report",
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
    <Box bg="primary" py={10} mt={16} borderTop="1px" borderColor="border.primary">
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
            <HStack>
              <Icon as={BiPhoneCall} color="text.secondary" />
              <Text color="text.secondary">(+84) 123456789</Text>
            </HStack>
            <HStack>
              <Icon as={MdEmail} color="text.secondary" />
              <Text color="text.secondary">contact@lumi.com.vn</Text>
            </HStack>
          </VStack>
        </Flex>
      </Container>
    </Box>
  )
}
