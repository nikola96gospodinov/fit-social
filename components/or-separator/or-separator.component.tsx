import { Divider } from "../ui/divider/divider.component";
import { Box } from "../ui/layout/box/box.component";
import { Flex } from "../ui/layout/flex/flex.component";
import { ThemedText } from "../ui/themed-text/themed-text.component";

export const OrSeparator = () => {
  return (
    <Box marginHorizontal={12}>
      <Flex direction="row" gap={4} align="center" style={{ width: "100%" }}>
        <Divider />

        <ThemedText>Or</ThemedText>

        <Divider />
      </Flex>
    </Box>
  );
};
