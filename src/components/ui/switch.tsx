"use client"

import * as React from "react"
import { Switch as ChakraSwitch, Icon } from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa"

export interface SwitchProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  colorPalette?: string
  size?: "sm" | "md" | "lg"
  label?: string
}

export const LumiSwitch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ checked, onCheckedChange, colorPalette = "blue", size = "lg", label, ...props }, ref) => {
    return (
      <ChakraSwitch.Root 
        colorPalette={colorPalette} 
        size={size}
        checked={checked}
        onCheckedChange={details => onCheckedChange?.(details.checked)}
        {...props}
      >
        <ChakraSwitch.HiddenInput ref={ref} />
        <ChakraSwitch.Control>
          <ChakraSwitch.Thumb />
          <ChakraSwitch.Indicator fallback={<Icon as={FaSun} color="yellow.400" />}>
            <Icon as={FaMoon} color="gray.400" />
          </ChakraSwitch.Indicator>
        </ChakraSwitch.Control>
        {label && <ChakraSwitch.Label>{label}</ChakraSwitch.Label>}
      </ChakraSwitch.Root>
    )
  }
)

LumiSwitch.displayName = "LumiSwitch"