"use client"

import { Icon, Tabs } from "@chakra-ui/react"
import { FaPen } from "react-icons/fa"
import { FaBook } from "react-icons/fa6"

interface TabSelectorProps {
  activeTab: "note" | "lookup"
  onTabChange: (tab: "note" | "lookup") => void
}

export default function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={(details) => onTabChange(details.value as "note" | "lookup")}
      variant="line"
      colorPalette="green"
    >
      <Tabs.List>
        <Tabs.Trigger value="note">
          <Icon as={FaPen} />
          Take notes mode
        </Tabs.Trigger>
        <Tabs.Trigger value="lookup">
          <Icon as={FaBook} />
          Dictionary mode
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  )
}
