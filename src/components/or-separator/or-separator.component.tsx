import { Divider } from "../ui/layout/divider/divider.component";
import { Flex } from "../ui/layout/flex/flex.component";
import {
  ThemedText,
  ThemedTextProps,
} from "../ui/themed-text/themed-text.component";
import { View } from "react-native";

type Props = {
  textType?: ThemedTextProps["type"];
};

export const OrSeparator = ({ textType = "default" }: Props) => {
  return (
    <View style={{ marginHorizontal: 12 }}>
      <Flex direction="row" gap={4} align="center" style={{ width: "100%" }}>
        <Divider />

        <ThemedText type={textType}>Or</ThemedText>

        <Divider />
      </Flex>
    </View>
  );
};
