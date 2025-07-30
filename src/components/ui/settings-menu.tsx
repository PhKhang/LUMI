"use client"

import { useState, useEffect } from "react"
import { HStack, Box, Flex, Text, Button, IconButton, Icon } from "@chakra-ui/react"
import { MenuButton, MenuList, Menu, MenuItem } from "@chakra-ui/menu"
import { useColorMode } from "@/components/ui/color-mode"
import { MdSettings, MdLightMode, MdDarkMode } from "react-icons/md"

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
          <Icon as={MdSettings} />
          Button 
        </Button>
      </HStack>
    )
  }

  const isDark = colorMode === "dark"

  return (
    <HStack>
      <Menu>
        <MenuButton as={Button} colorPalette="white" variant="surface" borderRadius={"full"} size="sm">
          <Icon as={MdSettings} mr={2}/>
          Settings
        </MenuButton>
        <MenuList
          bg={isDark ? "#292929" : "#FEFFEB"}
          borderColor={isDark ? "gray" : "green"}
          boxShadow="lg"
          zIndex={1000}
          borderWidth="1px"
          borderRadius="10px"
        >
          <MenuItem
            onClick={toggleColorMode}
            color={isDark ? "white" : "black"}
            _hover={{
              bg: "gray",
              borderRadius: "10px",
            }}
            borderRadius="md"
            px={8}
            py={8}
            fontSize="1rem"
          >
            <Icon as={colorMode === "light" ? MdDarkMode : MdLightMode} />
            {colorMode === "light" ? "Dark Mode" : "Light Mode"}
          </MenuItem>

          <Box px={3} py={2}>
            <Flex align="center" gap={3}>
              <Text fontSize="sm" color={isDark ? "white" : "black"} minW="70px">
                Font Size:
              </Text>
              <HStack gap={1}>
                <Button
                  size="xs"
                  variant={fontSize === "small" ? "solid" : "outline"}
                  colorScheme={fontSize === "small" ? "blue" : "gray"}
                  onClick={() => onFontSizeChange("small")}
                  borderRadius="md"
                  px={2}
                >
                  Small
                </Button>
                <Button
                  size="xs"
                  variant={fontSize === "medium" ? "solid" : "outline"}
                  colorScheme={fontSize === "medium" ? "blue" : "gray"}
                  onClick={() => onFontSizeChange("medium")}
                  borderRadius="md"
                  px={2}
                >
                  Medium
                </Button>
                <Button
                  size="xs"
                  variant={fontSize === "large" ? "solid" : "outline"}
                  colorScheme={fontSize === "large" ? "blue" : "gray"}
                  onClick={() => onFontSizeChange("large")}
                  borderRadius="md"
                  px={2}
                >
                  Large
                </Button>
              </HStack>
            </Flex>
          </Box>
        </MenuList>
      </Menu>
    </HStack>
  )
}
