import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { ThemedText } from "@/components/ui/themed-text.component";
import { SafeAreaView, StyleSheet } from "react-native";

const AddWorkout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ThemedText>Add a workout</ThemedText>
      <ThemedButton text="Click me" />
    </SafeAreaView>
  );
};

export default AddWorkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
