import {
  Box,
  createOverlay,
  Drawer,
  HStack,
  Portal,
  Span,
  Icon,
} from "@chakra-ui/react";
import { MdVolumeUp } from "react-icons/md";

export interface DialogProps {
  title: string;
  description?: string;
  content?: React.ReactNode;
  placement?: Drawer.RootProps["placement"];
  containerRef: React.RefObject<HTMLElement | null>;
}

export const drawer = createOverlay<DialogProps>((props) => {
  const { title, description, content, containerRef, ...rest } = props;
  return (
    <Drawer.Root {...rest} preventScroll={true}>
      <Portal container={containerRef}>
        <Drawer.Backdrop pos="absolute" boxSize="full" />
        <Drawer.Positioner pos="absolute" boxSize="full">
          <Drawer.Content>
            {title && (
              <Drawer.Header>
                <Drawer.Title>
                  <HStack>
                    <Icon color={"text.muted"}>
                      <MdVolumeUp />
                    </Icon>
                    <Span fontWeight={"bold"} color={"text.primary"}>
                      Fossil{" "}
                    </Span>
                    <Span color={"text.secondary"} fontWeight={"normal"} fontFamily={"fonts.ipa"}>/ˈfɒsɪl/</Span>
                    <Span color={"text.secondary"} fontWeight={"light"} fontStyle={"italic"}>
                      (noun)
                    </Span>
                  </HStack>
                </Drawer.Title>
              </Drawer.Header>
            )}
            <Drawer.Body spaceY="4">
              
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
});
