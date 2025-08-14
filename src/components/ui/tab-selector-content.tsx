"use client"

import { Icon, Tabs, Box, Text, HStack } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import type { IconType } from "react-icons"

interface TabOption {
  value: string
  label: string
  icon?: IconType
}

interface TabSelectorContentProps {
  activeTab: string
  onTabChange: (tab: string) => void
  tabs: TabOption[]
}

export default function TabSelectorContent({ activeTab, onTabChange, tabs }: TabSelectorContentProps) {
  const activeBg = useColorModeValue("white", "gray.800")
  const inactiveBg = useColorModeValue("transparent", "gray.800")
  const activeColor = useColorModeValue("green.600", "green.400")
  const inactiveColor = useColorModeValue("gray.500", "gray.100")
  const borderBottomColor = useColorModeValue("green.600", "green.500")
  const dividerColor = useColorModeValue("gray.300", "gray.600")

  return (
    <Box>
      <Tabs.Root value={activeTab} onValueChange={(details) => onTabChange(details.value)} variant="plain">
        <HStack gap={0} align="stretch">
          {tabs?.map((tab, idx) => (
            <Box key={tab.value} display="flex" alignItems="center">
              <Tabs.Trigger
                value={tab.value}
                px={3}
                borderBottomRadius="none"
                borderTopRadius="lg"
                bg={activeTab === tab.value ? activeBg : "transparent"}
                color={activeTab === tab.value ? activeColor : inactiveColor}
                borderBottom="2px solid transparent"
                borderBottomColor={activeTab === tab.value ? borderBottomColor : "transparent"}
                _hover={{
                  color: activeTab === tab.value ? activeColor : inactiveColor,
                }}
              >
                {tab.icon && <Icon as={tab.icon} mr={1} />}
                <Text fontSize={"xs"} fontWeight="bold" border={activeTab === tab.value ? "none" : "1px solid #EAB308"} borderRadius={"md"} p={0.5}>{tab.label}</Text>
              </Tabs.Trigger>
            </Box>
          ))}
        </HStack>
      </Tabs.Root>
    </Box>
  )
}
