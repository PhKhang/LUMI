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
        <ChakraSwitch.Control 
          bg="yellow.300"
          _checked={{ bg: "black" }}
        >
          <ChakraSwitch.Thumb 
            bg="white"
            _checked={{ bg: "white" }}
            border="2px solid"
            borderColor="gray.200"
          />
          <ChakraSwitch.Indicator fallback={<Icon as={FaSun} color="yellow.500" />}>
            <Icon as={FaMoon} color="gray.300" />
          </ChakraSwitch.Indicator>
        </ChakraSwitch.Control>
        {/* {label && <ChakraSwitch.Label>{label}</ChakraSwitch.Label>} */}
      </ChakraSwitch.Root>
    )
  }
)

LumiSwitch.displayName = "LumiSwitch"