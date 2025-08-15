"use client"

import { useState, useEffect } from "react"
import { HStack, Box, Flex, Text, Button, Icon } from "@chakra-ui/react"
import { MenuButton, MenuList, Menu, MenuItem } from "@chakra-ui/menu"
import { useColorMode } from "@/components/ui/color-mode"
import { MdSettings } from "react-icons/md"
import { LumiSwitch } from "@/components/ui/switch"
import { useColorModeValue } from "@/components/ui/color-mode"

interface SettingsMenuProps {
  fontSize: "small" | "medium" | "large"
  onFontSizeChange: (size: "small" | "medium" | "large") => void
}

export default function SettingsMenu({ fontSize, onFontSizeChange }: SettingsMenuProps) {
  const { colorMode, toggleColorMode } = useColorMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <HStack>
        <Button size="md" borderRadius="full" variant="outline">
          <Icon as={MdSettings} mr={2} />
          <Text fontWeight={"bold"}>Settings</Text>
        </Button>
      </HStack>
    )
  }

  const isDark = colorMode === "dark"

  return (
    <HStack>
      <Menu>
        <MenuButton as={Button} colorPalette="white" variant="surface" borderRadius={"full"} size="sm">
          <HStack gap={2}>
            <Icon as={MdSettings} />
            <Text fontWeight={"bold"}>Settings</Text>
          </HStack>
        </MenuButton>
        <MenuList
          bg={isDark ? "#292929" : "white"}
          borderColor={isDark ? "gray" : "#E5E7EB"}
          boxShadow="lg"
          zIndex={1000}
          borderWidth="1px"
          borderRadius="10px"
        >
          <Box px={3} py={2}>
            <Flex align="center" gap={3} justify="space-between">
              <Text fontWeight="medium" fontSize="sm" color={isDark ? "white" : "black"} minW="70px">
                Mode:
              </Text>
              <LumiSwitch
                colorPalette="yellow"
                size="lg"
                checked={colorMode === "dark"}
                onCheckedChange={toggleColorMode}
                label={colorMode === "dark" ? "Dark Mode" : "Light Mode"}
              />
            </Flex>
          </Box>

          <Box px={3} py={2}>
            <Flex align="center" gap={3}>
              <Text fontWeight="medium" fontSize="sm" color={isDark ? "white" : "black"} minW="70px">
                Font Size:
              </Text>
              <HStack gap={1}>
                <Button
                  size="sm"
                  variant={fontSize === "small" ? "solid" : "outline"}
                  bg={fontSize === "small" ? useColorModeValue("yellow.400", "white") : undefined}
                  color={fontSize === "small" ? useColorModeValue("yellow.700", "black") : undefined}
                  _hover={fontSize === "small" ? { bg: useColorModeValue("yellow.300", "gray.200") } : {}}
                  onClick={() => onFontSizeChange("small")}
                  borderRadius="full"
                  w={8}
                  h={8}
                  fontWeight={fontSize === "small" ? "bold" : "normal"}
                >
                  S
                </Button>
                <Button
                  size="sm"
                  variant={fontSize === "medium" ? "solid" : "outline"}
                  bg={fontSize === "medium" ? useColorModeValue("yellow.400", "white") : undefined}
                  color={fontSize === "medium" ? useColorModeValue("yellow.700", "black") : undefined}
                  _hover={fontSize === "medium" ? { bg: useColorModeValue("yellow.300", "gray.200") } : {}}
                  onClick={() => onFontSizeChange("medium")}
                  borderRadius="full"
                  w={8}
                  h={8}
                  fontWeight={fontSize === "medium" ? "bold" : "normal"}
                >
                  M
                </Button>
                <Button
                  size="sm"
                  variant={fontSize === "large" ? "solid" : "outline"}
                  bg={fontSize === "large" ? useColorModeValue("yellow.400", "white") : undefined}
                  color={fontSize === "large" ? useColorModeValue("yellow.700", "black") : undefined}
                  _hover={fontSize === "large" ? { bg: useColorModeValue("yellow.300", "gray.200") } : {}}
                  onClick={() => onFontSizeChange("large")}
                  borderRadius="full"
                  w={8}
                  h={8}
                  fontWeight={fontSize === "large" ? "bold" : "normal"}
                >
                  L
                </Button>
              </HStack>
            </Flex>
          </Box>
        </MenuList>
      </Menu>
    </HStack>
  )
}
