import {
  Box,
  createOverlay,
  Drawer,
  HStack,
  Portal,
  Span,
  Icon,
  Text,
  VStack,
  Button,
  Separator,
} from "@chakra-ui/react";
import {
  MdThumbDown,
  MdThumbUp,
  MdClose,
  MdAdd,
  MdCheck,
  MdExpandMore,
  MdExpandLess
} from "react-icons/md";
import { BiLike, BiDislike } from "react-icons/bi";
import { useState } from "react";
import { useColorModeValue } from "@/components/ui/color-mode"
import { FaVolumeUp } from "react-icons/fa"
import {   
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuGroup,
  MenuItem,
} from "@chakra-ui/menu";
import { IcoIcon } from "hugeicons-react";

export interface DialogProps {
  title: string;
  description?: string;
  content?: React.ReactNode;
  placement?: Drawer.RootProps["placement"];
  containerRef: React.RefObject<HTMLElement | null>;
}

export const drawer = createOverlay<DialogProps>((props) => {
  const { title, description, content, containerRef, ...rest } = props;
  const [likeStatus, setLikeStatus] = useState<'liked' | 'disliked' | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [language, setLanguage] = useState<'vietnamese' | 'english'>('vietnamese');

  const handleLike = () => {
    setLikeStatus(likeStatus === 'liked' ? null : 'liked');
  };

  const handleDislike = () => {
    setLikeStatus(likeStatus === 'disliked' ? null : 'disliked');
  };

  const topics = ["environment", "traffic", "Topic 3", "Topic 4"];

  return (
    <Drawer.Root {...rest} size={"sm"}>
      <Portal container={containerRef}>
        {/* <Drawer.Backdrop pos="absolute" boxSize="full"/> */}
        <Drawer.Positioner pos="absolute" boxSize="full">
          <Drawer.Content>
            {title && (
              <Drawer.Header py={0} px={3} gap={0}>
                <Drawer.Title>
                  <VStack align={"start"}>
                    <Box w={"full"} pt={2}>
                      <HStack justify={"space-between"} gap={0}>
                        <HStack>
                          <Icon
                            color={"text.muted"}
                            cursor="pointer"
                            transition="color 0.15s, transform 0.1s"
                            _hover={{ color: "gray.500", transform: "scale(1.15)" }}
                            _active={{ color: "blue.600", transform: "scale(0.95)" }}
                            tabIndex={0}
                            aria-label="Play pronunciation"
                            _focus={{ boxShadow: "none", outline: "none" }}
                            onClick={() => {
                              const audio = new Audio("/pronunciation_en_fossil.mp3");
                              audio.play();
                            }}
                          >
                            <FaVolumeUp />
                          </Icon>
                          <Span fontWeight={"bold"} color={useColorModeValue("gray.900", "white")} fontSize={"md"}>
                            Fossil{" "}
                          </Span>
                          <Span
                            color={useColorModeValue("gray.600", "gray.300")}
                            fontWeight={"normal"}
                            fontFamily={"fonts.ipa"}
                            fontSize={"md"}
                          >
                            /ˈfɒsɪl/
                          </Span>
                          <Span
                            color={useColorModeValue("gray.500", "gray.400")}
                            fontWeight={"light"}
                            fontStyle={"italic"}
                            fontSize={"md"}
                          >
                            (noun)
                          </Span>
                        </HStack>

                        {/* Country selector and close icon */}
                        <HStack gap={4}>
                          {/* Country Selector */}
                          <Menu>
                            <MenuButton
                              as={Box}
                              border="1px solid"
                              borderColor={useColorModeValue("gray.300", "gray.600")}
                              borderRadius="md"
                              px={1}
                              py={0}
                              display="flex"
                              alignItems="center"
                              gap={0}
                              bg={useColorModeValue("white", "gray.800")}
                              mr={6}
                            >
                              <HStack gap={0}>
                                <Box boxSize="24px" borderRadius="md" overflow="hidden">
                                  <img 
                                    src={language === 'vietnamese' ? "/vietnam-flag.svg" : "/english-us-flag.svg"} 
                                    alt={language === 'vietnamese' ? "Vietnam" : "US"} 
                                    style={{ width: 24, objectFit: 'cover'}} 
                                  />
                                </Box>
                                <Icon
                                  color={"text.secondary"}
                                  cursor={"pointer"}
                                  transition="color 0.15s, transform 0.1s"
                                  _hover={{ color: "gray.100", transform: "scale(1.15)" }}
                                  _active={{ color: "gray.200", transform: "scale(0.95)" }}
                                  tabIndex={0}
                                  aria-label="Expand"
                                  _focus={{ boxShadow: "none", outline: "none" }}>
                                     <MdExpandMore />
                                  </Icon>
                              </HStack>
                            </MenuButton>
                            <MenuList bg={useColorModeValue("#FFF", "#27272A")} borderColor={useColorModeValue("#d4d4d8", "#52525b")} borderWidth={"1px"} borderRadius="5px" px="12px" py="8px" color="black" zIndex={1}>
                              <MenuItem onClick={() => setLanguage('vietnamese')}>
                                <HStack>
                                  <Box boxSize="24px" borderRadius="md" overflow="hidden">
                                    <img src="/vietnam-flag.svg" alt="Vietnam" style={{ width: 24, objectFit: 'cover'}} />
                                  </Box>
                                  <Text fontSize={"md"} color={useColorModeValue("gray.800", "gray.200")}>Tiếng Việt</Text>
                                </HStack>
                              </MenuItem>
                              <MenuItem onClick={() => setLanguage('english')}>
                                <HStack>
                                  <Box boxSize="24px" borderRadius="md" overflow="hidden">
                                    <img src="/english-us-flag.svg" alt="US" style={{ width: 24, objectFit: 'cover'}} />
                                  </Box>
                                  <Text fontSize={"md"} color={useColorModeValue("gray.800", "gray.200")}>English (US)</Text>
                                </HStack>
                              </MenuItem>
                            </MenuList>
                          </Menu>
                          {/* Close Icon */}
                          <Drawer.CloseTrigger asChild>
                            <Icon
                              color={"text.secondary"}
                              cursor={"pointer"}
                              transition="color 0.15s, transform 0.1s"
                              _hover={{ color: "red.500", transform: "scale(1.15)" }}
                              _active={{ color: "red.600", transform: "scale(0.95)" }}
                              tabIndex={0}
                              aria-label="Close"
                              _focus={{ boxShadow: "none", outline: "none" }}
                            >
                              <MdClose />
                            </Icon>
                          </Drawer.CloseTrigger>
                        </HStack>
                      </HStack>
                    </Box>

                    <Box w={"full"} py={0}>
                      <HStack justify={"space-between"} wrap={"nowrap"} alignItems={"flex-start"}>
                        <Text color={useColorModeValue("green.700", "green.300") } fontSize={"md"} fontWeight={"bold"}>
                          {language === 'vietnamese' ? 'hóa thạch' : 'the shape of animal that has been preserved in rock for a very long periods'}
                        </Text>

                        <HStack color={"text.secondary"}>
                          <Icon
                            cursor="pointer"
                            onClick={handleLike}
                            color={likeStatus === 'liked' ? 'green.500' : 'text.secondary'}
                            transition="all 0.2s"
                            _hover={{
                              color: likeStatus === 'liked' ? 'green.600' : 'green.400',
                              transform: 'scale(1.1)'
                            }}
                          >
                            {likeStatus === 'liked' ? <MdThumbUp /> : <BiLike />}
                          </Icon>
                          <Icon
                            cursor="pointer"
                            onClick={handleDislike}
                            color={likeStatus === 'disliked' ? 'red.500' : 'text.secondary'}
                            transition="all 0.2s"
                            _hover={{
                              color: likeStatus === 'disliked' ? 'red.600' : 'red.400',
                              transform: 'scale(1.1)'
                            }}
                          >
                            {likeStatus === 'disliked' ? <MdThumbDown /> : <BiDislike />}
                          </Icon>
                          <Menu placement="bottom-end" strategy="fixed">
                            <MenuButton
                              as={Button}
                              size="xs"
                              variant="outline"
                              colorPalette={"green"}
                              rounded={"full"}
                              px={2}
                              pr={4}
                            >
                                <HStack>
                                  <Icon as={selectedTopics.length > 0 ? MdCheck : MdAdd} />
                                  <Text>{selectedTopics.length > 0 ? "Saved" : "Save word"}</Text>
                                </HStack>
                            </MenuButton>
                            <MenuList background='#F0FDF4' borderColor="#BBF7D0" borderWidth={"1px"} borderRadius="5px" px="24px" py="12px" color="black">
                              <MenuGroup title="Choose topic" fontWeight={"bold"}>
                                <MenuOptionGroup
                                  type="radio"
                                  value={selectedTopics[0] || ""}
                                  onChange={(value) => setSelectedTopics([value as string])}
                                  mb="5px"
                                >
                                  {topics.map((topic) => (
                                    <MenuItemOption key={topic} value={topic}>
                                      {topic}
                                    </MenuItemOption>
                                  ))}
                                </MenuOptionGroup>
                              </MenuGroup>
                            </MenuList>
                          </Menu>
                        </HStack>
                      </HStack>
                    </Box>
                    <Separator color={"text.primary"} w={"full"} />
                  </VStack>
                </Drawer.Title>
              </Drawer.Header>
            )}
            <Drawer.Body spaceY="4" overflowY={"auto"} h={"50rem"} p={0}>
              <Box
                overflowY={"auto"}
                h="10rem"
                color={useColorModeValue("gray.900", "gray.100")}
                fontSize={"md"}
                p={3}
              >
                <Text fontWeight="bold" mb={2}>
                  {language === 'vietnamese' ? 'Giải thích nghĩa:' : 'Explanation:'}
                  <Text as="span" fontWeight="normal">
                    {" "}
                    {language === 'vietnamese' 
                      ? 'Trong đoạn văn, "fossil" được sử dụng để chỉ phần còn lại hoặc dấu vết của động vật hoặc thực vật được bảo tồn từ thời xa xưa.'
                      : 'In the passage, "fossil" refers to the remains or traces of animals or plants preserved from ancient times.'}
                  </Text>
                </Text>

                <Text fontWeight="bold" mt={4} mb={1}>
                  {language === 'vietnamese' ? 'Ví dụ:' : 'Examples:'}
                </Text>
                <Text>
                  Fossil records give us clues about what dinosaurs looked like.{" "}
                  {language === 'vietnamese' && (
                    <Text as="span" color={useColorModeValue("gray.600", "gray.300")} fontStyle="italic">
                      (Hồ sơ hóa thạch cho chúng ta manh mối về loài khủng long trông như thế nào.)
                    </Text>
                  )}
                </Text>
                <Text mt={2}>
                  Fossil fuels found in the Earth are a finite resource.{" "}
                  {language === 'vietnamese' && (
                    <Text as="span" color={useColorModeValue("gray.600", "gray.300")} fontStyle="italic">
                      (Nhiên liệu hóa thạch được tìm thấy trong Trái đất là một nguồn tài nguyên hữu hạn.)
                    </Text>
                  )}
                </Text>

                <Text mt={4} color={useColorModeValue("blue.600", "blue.300")} fontWeight="bold">
                  {language === 'vietnamese' 
                    ? 'Hồ sơ hóa thạch cho thấy sinh vật này có niên đại từ 450 triệu năm trước và nó hầu như không thay đổi nhiều theo thời gian.'
                    : 'Fossil records indicate this creature dates back 450 million years, and it has changed very little over time.'}
                </Text>

                {language === 'english' && (
                  <Text mt={2} fontStyle="italic" color={useColorModeValue("gray.700", "gray.300") }>
                    Fossil records indicate this creature dates back 450 million years, and it has changed very little over time.
                  </Text>
                )}

                <Text fontWeight="bold" mt={4}>
                  {language === 'vietnamese' ? 'Giải thích dễ hiểu:' : 'Simple Explanation:'}
                  <Text as="span" fontWeight="normal">
                    {" "}
                    {language === 'vietnamese' 
                      ? 'Câu này nói về việc dựa vào các bằng chứng hóa thạch, loài cua móng ngựa đã tồn tại từ 450 triệu năm trước. Điều đáng chú ý là hình dạng và cấu tạo của chúng gần như không có nhiều thay đổi trong suốt quãng thời gian dài đó.'
                      : 'This sentence states that based on fossil evidence, the horseshoe crab has existed for 450 million years. Notably, their shape and structure have changed very little over that long period.'}
                  </Text>
                </Text>

                <Text fontWeight="bold" mt={4}>
                  {language === 'vietnamese' ? 'Liên kết:' : 'Connection:'}
                  <Text as="span" fontWeight="normal">
                    {" "}
                    {language === 'vietnamese' 
                      ? '"this creature" trong câu này đề cập đến "horseshoe crab" (cua móng ngựa) đã được nhắc đến ở câu trước đó trong đoạn văn. "it" cũng đề cập đến loài cua móng ngựa này.'
                      : '"this creature" in this sentence refers to the "horseshoe crab" mentioned in the previous sentence in the passage. "it" also refers to this horseshoe crab species.'}
                  </Text>
                </Text>
              </Box>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
});
