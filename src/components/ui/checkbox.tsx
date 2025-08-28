import { Checkbox, HStack, Text, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function CheckBox({
  options,
  subtext,
  onChange,
  textColor = "gray.600",
  clearTrigger,
}: {
  options: string[];
  subtext?: string[];
  onChange?: (selectedOptions: string[]) => void;
  textColor?: string;
  clearTrigger?: number;
}) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Clear selections when clearTrigger changes
  useEffect(() => {
    if (clearTrigger !== undefined) {
      setSelectedOptions([]);
    }
  }, [clearTrigger]);

  const handleCheckboxChange = (option: string, checked: boolean) => {
    let newSelectedOptions;
    if (checked) {
      newSelectedOptions = [...selectedOptions, option];
    } else {
      newSelectedOptions = selectedOptions.filter(item => item !== option);
    }
    setSelectedOptions(newSelectedOptions);
    onChange?.(newSelectedOptions);
  };

  return (
    <VStack align="flex-start" gap={2}>
      {options.map((option, index) => (
        <Checkbox.Root 
          key={option} 
          colorPalette={"green"}
          checked={selectedOptions.includes(option)}
          onCheckedChange={(details) => handleCheckboxChange(option, !!details.checked)}
          w={"full"}
          cursor={"pointer"}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control rounded={"md"}>
            <Checkbox.Indicator/>
          </Checkbox.Control>
          <Checkbox.Label>
            <HStack>
              <Text 
                color={textColor} 
                fontWeight={"bold"}
                transition="color 0.2s ease-in-out"
                _hover={{
                  color: "text.primary",
                }}
              >
                {option}
              </Text>
              {subtext && (
                <Text 
                  color={"gray.500"} 
                  fontSize={"sm"}
                  transition="color 0.2s ease-in-out"
                  _hover={{
                    color: "gray.800",
                  }}
                >
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