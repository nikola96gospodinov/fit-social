import { useMutation } from "@tanstack/react-query";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";

const pickImage = async () => {
  const result = await launchImageLibraryAsync({
    mediaTypes: MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.2,
    base64: true,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }

  throw new Error("No image selected");
};

export const usePickImage = () => {
  return useMutation({
    mutationFn: pickImage,
  });
};
