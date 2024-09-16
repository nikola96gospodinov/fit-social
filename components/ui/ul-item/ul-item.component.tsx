import { Flex } from "../layout/flex/flex.component";
import { ThemedText } from "../themed-text/themed-text.component";
import { StyleSheet } from "react-native";

type Props = {
  text: string;
};

export const ULItem = ({ text }: Props) => {
  return (
    <Flex direction="row" gap={2}>
      <ThemedText style={styles.text}>{`\u2022`}</ThemedText>

      <ThemedText type="small">{text}</ThemedText>
    </Flex>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    marginTop: -3,
  },
});
