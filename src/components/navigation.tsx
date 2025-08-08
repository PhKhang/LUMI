"use client"

import {
  Box,
  Flex,
  HStack,
  Text,
  Button,
  Icon,
  Avatar,
  AvatarGroup
} from "@chakra-ui/react"
import { MenuButton, MenuList, Menu, MenuItem } from "@chakra-ui/menu"
import { Dispatch, SetStateAction } from "react"
import { BiDownArrow } from "react-icons/bi"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NAVIGATION_ITEMS } from "@/lib/routes"

interface NavigationProps {
  currentLanguage: "en" | "vi"
  onLanguageChange: Dispatch<SetStateAction<"en" | "vi">>
}

const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"]

const pickPalette = (name: string) => {
  const index = name.charCodeAt(0) % colorPalette.length
  return colorPalette[index]
}

export default function Navigation({ currentLanguage, onLanguageChange }: NavigationProps) {
  const navigationItems = NAVIGATION_ITEMS.MAIN
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/home") return pathname === "/" || pathname === "/home"
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <Box bg="primary" px={5} py={1}>
      <Flex justify="space-between" align="center" mx="auto">
        <Link href="/home">
          <Box cursor="pointer">
            <img src="/lumi-simple-logo.svg" alt="LUMI Logo" style={{ height: "18px" }} />
          </Box>
        </Link>

        <HStack gap={8}>
          {navigationItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link key={item.href} href={item.href}>
                <Box
                  paddingY={1}  
                  paddingX={4}
                  color={active ? "black" : "text.secondary"}
                  bg={active ? "yellow.300" : "transparent"}
                  _hover={{ 
                    bg: active ? "yellow.300" : "hover_background_yellow",
                    color: active ? "black" : "text.primary"
                  }}
                  borderRadius="full"
                  fontSize={"sm"}
                  fontWeight={active ? "bold" : "semibold"}
                  cursor="pointer"
                  transition="all 0.2s ease-in-out"
                  _focus={{
                    boxShadow: "none",
                  }}
                  _focusVisible={{
                    outline: "2px solid",
                    outlineColor: "accent",
                    outlineOffset: "2px",
                  }}
                >
                  {item.label}
                </Box>
              </Link>
            )
          })}

            {/* <Menu>
                <MenuButton
                as={Button}
                variant="ghost"
                color="text"
                _hover={{ bg: "yellow.600" }}
                borderRadius={"full"}
                fontWeight="medium"
                >
                {currentLanguage === "vi" ? "VI" : "EN"} <Icon as={BiDownArrow} ml={2} />
                </MenuButton>
                <MenuList>
                <MenuItem onClick={() => onLanguageChange("vi")}>Tiếng Việt</MenuItem>
                <MenuItem onClick={() => onLanguageChange("en")}>English</MenuItem>
                </MenuList>
            </Menu> */}
            <Avatar.Root colorPalette="yellow" size="sm" variant="solid">
                <Avatar.Fallback name="Uyển Nhi" />
            </Avatar.Root>
        </HStack>
      </Flex>
    </Box>
  )
}
