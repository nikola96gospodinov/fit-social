import { Divider } from "../ui/divider/divider.component";
import { Box } from "../ui/layout/box/box.component";
import { Flex } from "../ui/layout/flex/flex.component";
import {
  ThemedText,
  ThemedTextProps,
} from "../ui/themed-text/themed-text.component";

type Props = {
  textType?: ThemedTextProps["type"];
};

export const OrSeparator = ({ textType = "default" }: Props) => {
  return (
    <Box marginHorizontal={12}>
      <Flex direction="row" gap={4} align="center" style={{ width: "100%" }}>
        <Divider />

        <ThemedText type={textType}>Or</ThemedText>

        <Divider />
      </Flex>
    </Box>
  );
};
