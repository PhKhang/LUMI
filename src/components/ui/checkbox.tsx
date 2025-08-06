import { Checkbox, Text } from "@chakra-ui/react";

export default function CheckBox({
  options,
  onChange,
}: {
  options: string[];
  onChange?: (options: string[]) => void;
}) {
  return (
    <>
      {options.map((option) => (
        <Checkbox.Root key={option} colorPalette={"green"}>
          <Checkbox.HiddenInput />
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>
            <Text color={"gray.600"} fontWeight={"bold"}>
              {option}
            </Text>
          </Checkbox.Label>
        </Checkbox.Root>
      ))}
    </>
  );
}
