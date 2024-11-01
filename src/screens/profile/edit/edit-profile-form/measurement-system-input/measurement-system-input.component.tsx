import { ThemedRadio } from "@/src/components/ui/form/themed-radio/themed-radio.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { spacing } from "@/src/constants/spacing.constants";
import { View, StyleSheet } from "react-native";
import { UseFormSetValue } from "react-hook-form";
import { EditProfileForm, IMPERIAL, METRIC } from "../edit-profile-form.schema";

type Props = {
  setValue: UseFormSetValue<EditProfileForm>;
  measurementSystem: EditProfileForm["measurement_system"];
};

export const MeasurementSystemInput = ({
  setValue,
  measurementSystem,
}: Props) => {
  return (
    <View>
      <ThemedText type="small" color="supporting">
        Measurement system
      </ThemedText>

      <VerticalSpacing size={2} />

      <View style={styles.container}>
        <ThemedRadio
          isSelected={measurementSystem === METRIC}
          onPress={() =>
            setValue("measurement_system", METRIC, { shouldDirty: true })
          }
          label="Metric"
        />

        <ThemedRadio
          isSelected={measurementSystem === IMPERIAL}
          onPress={() =>
            setValue("measurement_system", IMPERIAL, { shouldDirty: true })
          }
          label="Imperial"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing[8],
  },
});
