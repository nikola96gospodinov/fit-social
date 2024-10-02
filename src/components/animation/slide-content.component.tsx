import { PropsWithChildren, useEffect } from "react";
import { LayoutAnimation, View } from "react-native";

type Props = PropsWithChildren<{
  isVisible: boolean;
}>;

export const SlideContent = ({ children, isVisible }: Props) => {
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [isVisible]);

  return <>{isVisible && <View>{children}</View>}</>;
};
