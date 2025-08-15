import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const colorModeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const config = defineConfig({
  ...colorModeConfig,
  theme: {
    tokens: {
      colors: {
        primary: { value: "#FACC15" },
        secondary: { value: "#4ADE80" },
        accent: { value: "#16A34A" },
        highlightGreen: { value: "rgba(22, 163, 74, 0.2)" },
        text: {
          primary: { value: "#242424" },
          secondary: { value: "#4A5568" },
          muted: { value: "#718096" },
        },
        background: {
          primary: { value: "#FFFFFF" },
          secondary: { value: "#F7FAFC" },
          accent: { value: "#EDF2F7" },
          selected: { value: "#E6F9E6" },
        },
        border: {
          primary: { value: "#E2E8F0" },
          secondary: { value: "#CBD5E0" },
        },
        hover_background_yellow: { value: "rgba(254, 249, 195, 0.4)" },
        link: {
          default: { value: "#4A5568" },
          hover: { value: "#3182CE" },
        },
      },
      fonts: {
        body: { value: "var(--font-nunito), arial" },
        ipa: { value: "arial" },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)