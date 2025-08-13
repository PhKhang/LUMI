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
} from "react-icons/md";
import { BiLike, BiDislike } from "react-icons/bi";
import { useState } from "react";
import { useColorModeValue } from "@/components/ui/color-mode"
import { FaVolumeUp } from "react-icons/fa"

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

  const handleLike = () => {
    setLikeStatus(likeStatus === 'liked' ? null : 'liked');
  };

  const handleDislike = () => {
    setLikeStatus(likeStatus === 'disliked' ? null : 'disliked');
  };

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
                          <Span fontWeight={"bold"} color={"text.primary"} fontSize={"md"}>
                            Fossil{" "}
                          </Span>
                          <Span
                            color={"text.secondary"}
                            fontWeight={"normal"}
                            fontFamily={"fonts.ipa"}
                            fontSize={"md"}
                          >
                            /ˈfɒsɪl/
                          </Span>
                          <Span
                            color={"text.secondary"}
                            fontWeight={"light"}
                            fontStyle={"italic"}
                            fontSize={"md"}
                          >
                            (noun)
                          </Span>
                        </HStack>

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
                    </Box>

                    <Box w={"full"} py={0}>
                      <HStack justify={"space-between"} wrap={"nowrap"} alignItems={"flex-start"}>
                        <Text color="accent" fontSize={"md"} fontWeight={"bold"}>hóa thạch</Text>

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
                          <Button size="xs" variant="outline" colorPalette={"green"} rounded={"full"} px={2} pr={4}>
                            <Icon as={MdAdd} />
                            <Text>Save word</Text>
                          </Button>
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
                color={"text.primary"}
                fontSize={"md"}
                p={3}
              >
                <Text fontWeight="bold" mb={2}>
                  Giải thích nghĩa:
                  <Text as="span" fontWeight="normal">
                    {" "}
                    Trong đoạn văn, "fossil" được sử dụng để chỉ phần còn lại
                    hoặc dấu vết của động vật hoặc thực vật được bảo tồn từ thời
                    xa xưa.
                  </Text>
                </Text>

                <Text fontWeight="bold" mt={4} mb={1}>
                  Ví dụ:
                </Text>
                <Text>
                  Fossil records give us clues about what dinosaurs looked like.{" "}
                  <Text as="span" color="gray.600" fontStyle="italic">
                    (Hồ sơ hóa thạch cho chúng ta manh mối về loài khủng long
                    trông như thế nào.)
                  </Text>
                </Text>
                <Text mt={2}>
                  Fossil fuels found in the Earth are a finite resource.{" "}
                  <Text as="span" color="gray.600" fontStyle="italic">
                    (Nhiên liệu hóa thạch được tìm thấy trong Trái đất là một
                    nguồn tài nguyên hữu hạn.)
                  </Text>
                </Text>

                <Text mt={4} color="blue.500" fontWeight="bold">
                  Hồ sơ hóa thạch cho thấy sinh vật này có niên đại từ 450 triệu
                  năm trước và nó hầu như không thay đổi nhiều theo thời gian.
                </Text>

                <Text mt={2} fontStyle="italic" color="gray.700">
                  Fossil records indicate this creature dates back 450 million
                  years, and it has changed very little over time.
                </Text>

                <Text fontWeight="bold" mt={4}>
                  Giải thích dễ hiểu:
                  <Text as="span" fontWeight="normal">
                    {" "}
                    Câu này nói về việc dựa vào các bằng chứng hóa thạch, loài
                    cua móng ngựa đã tồn tại từ 450 triệu năm trước. Điều đáng
                    chú ý là hình dạng và cấu tạo của chúng gần như không có
                    nhiều thay đổi trong suốt quãng thời gian dài đó.
                  </Text>
                </Text>

                <Text fontWeight="bold" mt={4}>
                  Liên kết:
                  <Text as="span" fontWeight="normal">
                    {" "}
                    "this creature" trong câu này đề cập đến "horseshoe crab"
                    (cua móng ngựa) đã được nhắc đến ở câu trước đó trong đoạn
                    văn. "it" cũng đề cập đến loài cua móng ngựa này.
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
