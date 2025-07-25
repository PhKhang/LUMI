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

  return (
    <Box bg="primary" px={5} py={1}>
      <Flex justify="space-between" align="center" mx="auto">
        <Link href="/home">
          <Box cursor="pointer">
            <img src="/lumi-simple-logo.svg" alt="LUMI Logo" style={{ height: "18px" }} />
          </Box>
        </Link>

        <HStack gap={8}>
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Box
                paddingY={5}  
                paddingX={3}
                color="text.primary"
                _hover={{ bg: "hover_background_yellow" }} 
                borderRadius="full"
                fontSize={"md"}
                className="font-semibold"
                py={0}
                cursor="pointer"
              >
                {item.label}
              </Box>
            </Link>
          ))}

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
