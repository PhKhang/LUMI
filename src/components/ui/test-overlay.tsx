"use client";

import { Button, Dialog, Portal, createOverlay } from "@chakra-ui/react";

interface DialogProps {
  title: string;
  description?: string;
  content?: React.ReactNode;
}

const TestDialog = createOverlay<DialogProps>((props) => {
  const { title, description, content, ...rest } = props;
  return (
    <Dialog.Root {...rest}>
      <Portal>
        {/* <Dialog.Backdrop bg={"rgba(1, 2, 3, .5)"}/> */}
        <Dialog.Positioner>
          <Dialog.Content bg={"white"} shadow={"none"}>
            {title && (
              <Dialog.Header>
                <Dialog.Title color={"text.primary"}>{title}</Dialog.Title>
              </Dialog.Header>
            )}
            <Dialog.Body spaceY="4">
              {description && (
                <Dialog.Description color={"text.secondary"}>{description}</Dialog.Description>
              )}
              {content}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});

export default TestDialog;

const Demo = () => {
  return (
    <>
      <Button
        onClick={() => {
          TestDialog.open("a", {
            title: "Dialog Title",
            description: "Dialog Description",
          });
        }}
      >
        Open Modal
      </Button>
      <TestDialog.Viewport />
    </>
  );
};
