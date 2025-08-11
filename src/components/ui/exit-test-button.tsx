"use client"
import { IconButton, Icon, Button, Text, useDisclosure, Box, Center, VStack } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import { useRouter } from "next/navigation"
import { MdClose } from "react-icons/md"
import { PiWarningFill } from "react-icons/pi";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/modal"


export default function ExitTestButton() {
  const { open, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  const modalBg = useColorModeValue('#FFF9F3', 'gray.800')
  const headerColor = useColorModeValue('orange.500', 'orange.300')
  const iconColor = useColorModeValue('yellow.500', 'yellow.300')
  const textColor = useColorModeValue('gray.800', 'gray.100')
  const subTextColor = useColorModeValue('gray.600', 'gray.400')
  const outlineBtnColor = useColorModeValue('gray', 'gray')

  return (
    <>
      <IconButton
        aria-label="Exit test"
        variant="outline"
        size="sm"
        rounded="full"
        onClick={onOpen}
      >
        <MdClose />
      </IconButton>
      <Modal isOpen={open} onClose={onClose} isCentered size="sm">
        <ModalOverlay 
          bg="rgba(0, 0, 0, 0.5)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        />
        <ModalContent
          height="100vh"
          width="100vw"
        >
          <VStack mx="auto" my="auto" borderRadius="lg" bg={modalBg} py={4} px={6}>
            <ModalHeader
              textAlign="center"
              bg={modalBg}
              w="100%"
            >
              <Text color={textColor} fontWeight="bold" fontSize="2xl">
                Exit Test
              </Text>
            </ModalHeader>
            <ModalBody bg={modalBg} mb={2}>
              <Center>
                <Icon as={PiWarningFill} boxSize={10} color={iconColor} mb={2}/>
              </Center>
              <Text textAlign="center" fontWeight="semibold" fontSize="lg" color={textColor}>
                Are you sure you want to exit this test?
              </Text>
              <Text textAlign="center" color={subTextColor} fontSize="sm">
                If you exit now, your progress will not be saved.
              </Text>
            </ModalBody>
            <ModalFooter display="flex" justifyContent="center" gap={10} bg={modalBg} w="100%" px={0}>
              <Button onClick={onClose} variant="outline" colorPalette="gray" borderRadius="full">
                Continue Test
              </Button>
              <Button onClick={() => router.push('/report')} variant="solid" colorPalette="black" borderRadius="full">
                Exit
              </Button>
            </ModalFooter>
          </VStack>
        </ModalContent>
      </Modal>
    </>
  )
}
