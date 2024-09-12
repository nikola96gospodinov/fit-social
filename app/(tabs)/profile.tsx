import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { SafeAreaView, StyleSheet } from "react-native";

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ThemedText>Your profile</ThemedText>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
