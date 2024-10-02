import { ThemedActivityIndicator } from "../themed-activity-indicator/themed-activity-indicator.component";
import { FullScreenCenteredView } from "../layout/full-screen-centered-view/full-screen-centered-view.component";

export const FullScreenLoader = () => {
  return (
    <FullScreenCenteredView>
      <ThemedActivityIndicator size="large" />
    </FullScreenCenteredView>
  );
};
