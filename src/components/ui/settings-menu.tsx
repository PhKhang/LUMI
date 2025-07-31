"use client"

import { useState, useEffect } from "react"
import { HStack, Box, Flex, Text, Button, Icon } from "@chakra-ui/react"
import { MenuButton, MenuList, Menu, MenuItem } from "@chakra-ui/menu"
import { useColorMode } from "@/components/ui/color-mode"
import { MdSettings } from "react-icons/md"
import { LumiSwitch } from "@/components/ui/switch"

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
          bg={isDark ? "#292929" : "#FEFFEB"}
          borderColor={isDark ? "gray" : "green"}
          boxShadow="lg"
          zIndex={1000}
          borderWidth="1px"
          borderRadius="10px"
        >
          <LumiSwitch
            colorPalette="yellow"
            size="lg"
            checked={colorMode === "dark"}
            onCheckedChange={toggleColorMode}
            label={colorMode === "dark" ? "Dark Mode" : "Light Mode"}
          />

          <Box px={3} py={2}>
            <Flex align="center" gap={3}>
              <Text fontSize="sm" color={isDark ? "white" : "black"} minW="70px">
                Font Size:
              </Text>
              <HStack gap={1}>
                <Button
                  size="sm"
                  variant={fontSize === "small" ? "solid" : "outline"}
                  colorScheme={fontSize === "small" ? "blue" : "gray"}
                  onClick={() => onFontSizeChange("small")}
                  borderRadius="full"
                  w={8}
                  h={8}
                >
                  S
                </Button>
                <Button
                  size="sm"
                  variant={fontSize === "medium" ? "solid" : "outline"}
                  colorScheme={fontSize === "medium" ? "blue" : "gray"}
                  onClick={() => onFontSizeChange("medium")}
                  borderRadius="full"
                  w={8}
                  h={8}
                >
                  M
                </Button>
                <Button
                  size="sm"
                  variant={fontSize === "large" ? "solid" : "outline"}
                  colorScheme={fontSize === "large" ? "blue" : "gray"}
                  onClick={() => onFontSizeChange("large")}
                  borderRadius="full"
                  w={8}
                  h={8}
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
