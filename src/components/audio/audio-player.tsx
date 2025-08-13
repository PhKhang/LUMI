"use client"
import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react"
import { Box, Flex, Text, HStack, VStack, Slider, Stack, Button, Spacer, Menu  } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa"
import { RiReplay5Line, RiForward5Line, RiSpeedMiniFill } from "react-icons/ri";
import { PiPlayFill, PiPauseFill } from "react-icons/pi";

interface AudioPlayerProps {
  audioSrc?: string // Make audioSrc optional with default
}

export type AudioPlayerRef = {
  seekTo: (timeInSeconds: number) => void
}

const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(
({ audioSrc = "/Test2 Part1.mp3" }, ref) => { // Default to your audio file
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const bgColor = useColorModeValue("gray.50", "gray.700")
  const textColor = useColorModeValue("gray.800", "white")
  const hoverBg = useColorModeValue("gray.300", "gray.600")
  const [playSpeedValue, setPlaySpeedValue] = useState([1])

  // Volume state
  const [volume, setVolume] = useState(100)
  const [prevVolume, setPrevVolume] = useState(100)
  const [isMuted, setIsMuted] = useState(false)

  // Format time helper
  const formatTime = (timeInSeconds: number): string => {
    if (isNaN(timeInSeconds)) return "0:00"
    
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load();
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [audioSrc]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      setProgress(0)
    }

    const handleLoadStart = () => {
      console.log("Audio loading started")
    }

    const handleError = (e: any) => {
      console.error("Audio error:", e)
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('error', handleError)

    // Set initial volume
    audio.volume = volume / 100

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('error', handleError)
    }
  }, [volume])

  // Update playback speed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playSpeedValue[0]
    }
  }, [playSpeedValue])

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        await audio.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.error("Error playing audio:", error)
    }
  }

  const handleProgressChange = (e: { value: number[] }) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const newProgress = e.value[0];
    const newTime = (newProgress / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(newProgress);
  };

  const handleVolumeChange = (e: { value: number[] }) => {
    const newVolume = e.value[0]
    setVolume(newVolume)
    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
      setPrevVolume(newVolume)
    }
  }

  const handleVolumeIconClick = () => {
    if (isMuted || volume === 0) {
      // Unmute: restore previous volume or set to 100 if prevVolume is 0
      const restore = prevVolume > 0 ? prevVolume : 100
      setVolume(restore)
      setIsMuted(false)
    } else {
      // Mute: store current volume, set to 0
      setPrevVolume(volume)
      setVolume(0)
      setIsMuted(true)
    }
  }

  const skipBackward = () => {
    const audio = audioRef.current
    if (!audio) return
    
    audio.currentTime = Math.max(0, audio.currentTime - 5)
  }

  const skipForward = () => {
    const audio = audioRef.current
    if (!audio) return
    
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 5)
  }
  
  const seekTo = (timeInSeconds: number) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const clampedTime = Math.max(0, Math.min(timeInSeconds, duration)) // đảm bảo không vượt giới hạn
    audio.currentTime = clampedTime
    setCurrentTime(clampedTime)
    setProgress((clampedTime / duration) * 100)
  }

  useImperativeHandle(ref, () => ({
    seekTo
  }))

  return (
    <Box bg={bgColor} borderRadius="lg" px={4} pb={4} w="full" position={"relative"}>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
      />

      {/* Progress Bar */}
      <Slider.Root
        key="progress"
        width="full"
        colorPalette="yellow"
        value={[progress]}
        onValueChange={handleProgressChange}
        size="sm"
        mb={4}
      >
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>

      <Flex align="center" position="relative" gap={6}>
        {/* Left group: Time + Volume */}
        <HStack alignItems="center" minW="220px" flexShrink={0}>
          <Text fontSize="sm" color={textColor} fontWeight="medium" minW="80px">
            {formatTime(currentTime)} / {formatTime(duration)}
          </Text>
          <Box as="button" onClick={handleVolumeIconClick} cursor="pointer">
            <Icon as={isMuted || volume === 0 ? FaVolumeMute : FaVolumeUp} color={textColor} boxSize={5} />
          </Box>
          <Stack gap="4" align="flex-start">
            <Slider.Root
              key="volume"
              width="70px"
              colorPalette="yellow"
              value={[volume]}
              onValueChange={handleVolumeChange}
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
        </HStack>

        {/* Center group: Control buttons */}
        <Box position="absolute" left="50%" top="50%" transform="translate(-50%, -50%)">
          <HStack>
            {/* Skip Back 5 seconds */}
            <Box
              w="40px"
              h="40px"
              bg="transparent"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              onClick={skipBackward}
              _hover={{ bg: hoverBg }}
            >
              <Icon as={RiReplay5Line} boxSize={7} color={textColor} />
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
              <Icon as={isPlaying ? PiPauseFill : PiPlayFill } color="white" boxSize={27}/>
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
              onClick={skipForward}
              _hover={{ bg: hoverBg }}
            >
              <Icon as={RiForward5Line} boxSize={7} color={textColor} />
            </Box>
          </HStack>
        </Box>

        {/* Right group: Speed button */}
        <Box ml="auto">
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button variant="outline" colorPalette="white" size="sm" minWidth={"120px"} rounded={"full"} fontWeight="bold" color={textColor}>
                <Icon as={RiSpeedMiniFill} boxSize={5}/>
                Speed: 
                <Text> {playSpeedValue[0].toFixed(2)}x </Text>
              </Button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="speed"> 
                <Slider.Root 
                  width="100px" 
                  min={0.25} 
                  max={2} 
                  step={0.05} 
                  value={playSpeedValue} 
                  onValueChange={(e) => setPlaySpeedValue(e.value)}
                >
                  <HStack>
                  <Slider.Label> 0.25x</Slider.Label>
                  <Spacer />
                  <Slider.Label> 2x</Slider.Label>
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
        </Box>
      </Flex>
    </Box>
  )
})

export default AudioPlayer