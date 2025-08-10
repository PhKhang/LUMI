"use client"

import { Icon, Tabs, Box, Text} from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import type { IconType } from "react-icons"

interface TabOption {
  value: string
  label: string
  icon?: IconType
}

interface TabSelectorProps {
  activeTab: string
  onTabChange: (tab: string) => void
  tabs: TabOption[]
}

export default function TabSelector({ activeTab, onTabChange, tabs }: TabSelectorProps) {
  const activeBg = useColorModeValue("white", "gray.700")
  const inactiveBg = useColorModeValue("transparent", "gray.800")
  const activeColor = useColorModeValue("green.600", "green.500")
  const inactiveColor = useColorModeValue("gray.500", "gray.400")
  const borderBottomColor = useColorModeValue("green.600", "green.500")

  return (
    <Box>
      <Tabs.Root value={activeTab} onValueChange={(details) => onTabChange(details.value)} variant="plain">
        <Tabs.List gap={0}>
          {tabs?.map((tab) => (
            <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              px={3}
              py={2}
              borderBottomRadius="none"
              borderTopRadius="lg"
              bg={activeTab === tab.value ? activeBg : inactiveBg}
              color={activeTab === tab.value ? activeColor : inactiveColor}
              borderBottom="2px solid transparent"
              borderBottomColor={activeTab === tab.value ? borderBottomColor : "transparent"}
              _hover={{
                color: activeTab === tab.value ? activeColor : inactiveColor,
              }}
            >
              {tab.icon && <Icon as={tab.icon} mr={2} />}
              <Text fontWeight="bold">{tab.label}</Text>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </Box>
  )
}
