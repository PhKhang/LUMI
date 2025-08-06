import { Text, RadioGroup, VStack } from "@chakra-ui/react";

export default function FilterOptions() {
  const skills = [
    {
      skill: "Reading",
      options: ["Single section", "Full sections"],
    },
    {
      skill: "Listening",
      options: ["Single section", "Full sections"],
    },
    {
      skill: "Writing",
      options: ["Single section", "Full sections"],
    },
    {
      skill: "Speaking",
      options: ["Single section", "Full sections"],
    },
  ];

  return (
    <>
      <RadioGroup.Root
        defaultValue="1"
        colorPalette={"green"}
        w={"100%"}
      >
        <VStack align={"start"}>
          {skills.map((skill) => (
            <Radio
              keyValue={skill.skill}
              value={skill.skill}
              label={skill.skill}
              key={skill.skill}
              options={skill.options}
            />
          ))}
        </VStack>
      </RadioGroup.Root>
    </>
  );
}

const Radio = ({
  keyValue,
  value,
  label,
  options,
}: {
  keyValue: string;
  value: string;
  label: string;
  options: string[];
}) => (
  <div className="">
    <RadioGroup.Item
      key={keyValue}
      value={value}
      border={"2px solid"}
      borderColor={"gray.400"}
      borderRadius={"full"}
      p={2}
      w="100%"
    >
      <RadioGroup.ItemHiddenInput />
      <RadioGroup.ItemIndicator />
      <RadioGroup.ItemText>
        <Text color={"gray.600"} fontWeight={"bold"}>
          {label}
        </Text>
      </RadioGroup.ItemText>
    </RadioGroup.Item>
    
    <RadioGroup.Root value={"thing"}>
      <VStack align={"start"} mt={2}>
        {options.map((option) => (
          <RadioGroup.Item
            key={`${keyValue}-${option}`}
            value={`${keyValue}-${option}`}
            className="radio-option"
          >
            <RadioGroup.ItemIndicator />
            <Text color={"gray.500"}>{option}</Text>
          </RadioGroup.Item>
        ))}
      </VStack>
    </RadioGroup.Root>
  </div>
);
