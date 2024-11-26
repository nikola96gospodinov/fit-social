import { colors } from "@/src/constants/colors.constants";
import { useGetProfilePic } from "@/src/services/profile/get-profile-pic.service";
import FontAwesome from "@expo/vector-icons/build/FontAwesome";
import { useColorScheme } from "react-native";
import { Image } from "react-native";

type Props = {
  size: number;
  handle?: string | null;
  avatarUrl?: string | null;
};

export const Avatar = ({ size, handle, avatarUrl }: Props) => {
  const theme = useColorScheme() ?? "light";

  const { data: profilePic } = useGetProfilePic(handle, avatarUrl);

  if (!profilePic) {
    return (
      <FontAwesome name="user-circle" size={size} color={colors[theme].icon} />
    );
  }

  return (
    <Image
      source={{
        uri: profilePic,
      }}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
      }}
    />
  );
};
