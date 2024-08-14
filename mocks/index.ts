import "../lib/msw/msw.polyfills";
import { server } from "./server";

export const enableMocking = () => {
  if (!__DEV__) {
    return;
  }

  server.listen({ onUnhandledRequest: "bypass" });
};
