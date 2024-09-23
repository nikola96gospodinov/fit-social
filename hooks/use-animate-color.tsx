import { useRef } from "react";
import { Animated } from "react-native";

type Props = {
  duration: number;
  colors: string[];
  inputRange: number[];
};

export const useAnimateColor = ({ duration, colors, inputRange }: Props) => {
  const animation = useRef(new Animated.Value(0)).current;

  const animate = (toValue: number) => {
    Animated.timing(animation, {
      toValue,
      duration,
      useNativeDriver: false,
    }).start();
  };

  const color = animation.interpolate({
    inputRange,
    outputRange: colors,
  });

  return { animate, color };
};
