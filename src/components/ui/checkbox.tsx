import { Checkbox, HStack, Text, VStack } from "@chakra-ui/react";

export default function CheckBox({
  options,
  subtext,
  onChange,
  textColor = "gray.600",
}: {
  options: string[];
  subtext?: string[];
  onChange?: (options: string[]) => void;
  textColor?: string;
}) {
  return (
    <VStack align="flex-start" gap={2}>
      {options.map((option, index) => (
        <Checkbox.Root key={option} colorPalette={"green"}>
          <Checkbox.HiddenInput />
          <Checkbox.Control rounded={"md"}>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>
            <HStack>
              <Text color={textColor} fontWeight={"bold"}>
                {option}
              </Text>
              {subtext && (
                <Text color={"gray.500"} fontSize={"sm"}>
                  {subtext[index]}
                </Text>
              )}
            </HStack>
          </Checkbox.Label>
        </Checkbox.Root>
      ))}
    </VStack>
  );
}