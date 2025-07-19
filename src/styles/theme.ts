import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
theme: {
tokens: {
    colors: {
        primary: { value: "#FACC15" },
        secondary: { value: "#4ADE80" },
        accent: { value: "#16A34A" },
        text: { value: "#242424" },
        background: { value: "#FFFFFF" },
    },
    fonts: {
        body: { value: "var(--font-nunito)" },
    },
},
},
})



export const system = createSystem(defaultConfig, config)