"use client"

import { useState, useRef } from "react"
import { Box, Flex, Text, HStack, VStack, Slider, Stack, Button, Spacer, Menu  } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import { MdOutlinePlayArrow  , MdPause, MdVolumeUp, MdReplay5, MdForward5   } from "react-icons/md"
import { useColorModeValue } from "@/components/ui/color-mode"

interface AudioPlayerProps {
  duration: string
  currentTime: string
}

export default function AudioPlayer({ duration, currentTime }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const bgColor = useColorModeValue("gray.50", "gray.700")
  const textColor = useColorModeValue("gray.800", "white")
  const [playSpeedValue, setPlaySpeedValue] = useState([1])
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    // Audio logic would go here
  }

  return (
    <Box bg={bgColor} borderRadius="lg" p={4} w="full">
       {/* Progress Bar */}
      <Slider.Root
            key="yellow"
            width="full"
            colorPalette="orange"
            defaultValue={[100]}
            size="sm"
          >
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumbs />
            </Slider.Control>
          </Slider.Root>
      <Flex align="center" justify="space-between" gap={6}>
        {/* Time Display */}
        <Text fontSize="sm" color={textColor} minW="80px" fontWeight="medium">
          {currentTime} / {duration}
        </Text>

        {/* Volume Icon */}
        <Icon as={MdVolumeUp} color={textColor} boxSize={5} />
        <Stack gap="4" align="flex-start">
        {/* Volume Slider */}
          <Slider.Root
            key="orange"
            width="70px"
            colorPalette="orange"
            defaultValue={[100]}
            size="sm"
          >
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumbs />
            </Slider.Control>
          </Slider.Root>

          </Stack>
        <VStack flex={1} align="center">
          <HStack justifyContent="start" w="full">
          {/* Skip Back 5 seconds */}
          <Spacer/>
          <Box
            w="40px"
            h="40px"
            bg="transparent"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            _hover={{ bg: "gray.300" }}
          >
            <Icon as={MdReplay5} boxSize={7} color="gray.700"  />
          
          </Box>

          {/* Play/Pause Button */}
          <Box
            w="50px"
            h="50px"
            bg="yellow.400"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onClick={togglePlay}
            _hover={{ bg: "yellow.500" }}
          >
            <Icon as={isPlaying ? MdPause : MdOutlinePlayArrow } color="white" boxSize={27}/>
          </Box>

          {/* Skip Forward 5 seconds */}
          <Box
            w="40px"
            h="40px"
            bg="transparent"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            _hover={{ bg: "gray.300" }}
          >
            <Icon as={MdForward5} boxSize={7} color="gray.700"  />
          </Box>
          <Spacer />
          {/* Playback Speed Button */}
          {/* <Button variant="ghost" size="sm" colorScheme="yellow">
            <Text fontSize="sm" color={textColor}>Tốc độ 1x</Text>
          </Button> */}
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm" minWidth={"120px"} rounded={"full"}>
          Tốc độ: 
          <Text> {playSpeedValue}x </Text>
        </Button>
      </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="speed"> 
            <Slider.Root width="100px" min={0.25} max={2} step={0.05} defaultValue={[1]} onValueChange={(e) => setPlaySpeedValue(e.value)}>
              <HStack>
              <Slider.Label> 0.25x</Slider.Label>
              <Spacer />
              <Slider.Label> 2x</Slider.Label>
              {/* <Slider.ValueText/>x */}
              </HStack>
              <Slider.Control>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumbs />
              </Slider.Control>
            </Slider.Root>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
    </Menu.Root>
          </HStack>
        </VStack>
      </Flex>
    </Box>
  )
}
