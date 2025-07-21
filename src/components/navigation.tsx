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

interface NavigationItem {
  key: string
  en: string
  vi: string
}

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
  const navigationItems: NavigationItem[] = [
    { key: "home", en: "Home", vi: "Trang chủ" },
    { key: "fullTest", en: "Full Test", vi: "Bài thi Đầy đủ" },
    { key: "miniTest", en: "Mini Test", vi: "Bài thi Ngắn" },
    { key: "wordNote", en: "Word Note", vi: "Sổ Từ vựng" },
  ]

  const getNavText = (item: NavigationItem) => {
    return currentLanguage === "vi" ? item.vi : item.en
  }

  return (
    <Box bg="primary" px={5} py={2}>
      <Flex justify="space-between" align="center" mx="auto">
        <Box>
          <img src="/lumi-simple-logo.svg" alt="LUMI Logo" style={{ height: "18px" }} />
        </Box>

        <HStack gap={8}>
          {navigationItems.map((item) => (
            <Box
              paddingY={5}  
              paddingX={3}
              key={item.key}
              color="text"
              _hover={{ bg: "hover_background_yellow" }} 
              borderRadius="full"
              fontSize={"md"}
              className="font-semibold"
              py={0}
            >
              {getNavText(item)}
            </Box>
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
