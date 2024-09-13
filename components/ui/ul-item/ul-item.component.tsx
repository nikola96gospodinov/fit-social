import { Flex } from "../layout/flex/flex.component";
import { ThemedText } from "../themed-text/themed-text.component";

type Props = {
  text: string;
};

export const ULItem = ({ text }: Props) => {
  return (
    <Flex direction="row" gap={2}>
      <ThemedText
        style={{
          fontWeight: "bold",
          marginTop: -3,
        }}>{`\u2022`}</ThemedText>

      <ThemedText type="small">{text}</ThemedText>
    </Flex>
  );
};
