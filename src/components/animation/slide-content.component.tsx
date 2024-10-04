import { PropsWithChildren, useEffect } from "react";
import { LayoutAnimation, View } from "react-native";

type Props = PropsWithChildren<{
  isVisible: boolean;
  isFullWidth?: boolean;
}>;

export const SlideContent = ({ children, isVisible, isFullWidth }: Props) => {
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <View style={{ width: isFullWidth ? "100%" : "auto" }}>{children}</View>
      )}
    </>
  );
};
