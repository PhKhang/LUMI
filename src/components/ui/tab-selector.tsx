"use client"

import { Icon, Tabs, Box, Text } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import { FaPen } from "react-icons/fa"
import { FaBook } from "react-icons/fa6"

interface TabSelectorProps {
  activeTab: "note" | "lookup"
  onTabChange: (tab: "note" | "lookup") => void
}

export default function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  const activeBg = useColorModeValue("white", "gray.700")
  const inactiveBg = useColorModeValue("transparent", "gray.800")
  const activeColor = useColorModeValue("green.600", "green.500")
  const inactiveColor = useColorModeValue("gray.500", "gray.400")
  const borderBottomColor = useColorModeValue("green.600", "green.500")

  return (
    <Box>
      <Tabs.Root
        value={activeTab}
        onValueChange={(details) => onTabChange(details.value as "note" | "lookup")}
        variant="plain"
      >
        <Tabs.List gap={0}>
          <Tabs.Trigger 
            value="note"
            px={3}
            py={2}
            borderBottomRadius="none"
            borderTopRadius="lg"
            bg={activeTab === "note" ? activeBg : inactiveBg}
            color={activeTab === "note" ? activeColor : inactiveColor}
            borderBottom="2px solid transparent"
            borderBottomColor={activeTab === "note" ? borderBottomColor : "transparent"}
            _hover={{
              color: activeTab === "note" ? activeColor : inactiveColor
            }}
          >
            <Icon as={FaPen} mr={2} />
            <Text fontWeight="bold">
              Take notes mode
            </Text>
          </Tabs.Trigger>
          <Tabs.Trigger 
            value="lookup"
            px={3}
            py={2}
            borderBottomRadius="none"
            borderTopRadius="lg"
            bg={activeTab === "lookup" ? activeBg : inactiveBg}
            color={activeTab === "lookup" ? activeColor : inactiveColor}
            borderBottom="2px solid transparent"
            borderBottomColor={activeTab === "lookup" ? borderBottomColor : "transparent"}
            _hover={{
              color: activeTab === "lookup" ? activeColor : inactiveColor
            }}
          >
            <Icon as={FaBook} mr={2} />
            <Text fontWeight="bold">
              Dictionary mode
            </Text>
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </Box>
  )
}
