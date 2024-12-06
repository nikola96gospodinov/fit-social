import { useGetSession } from "@/src/services/auth/get-session.service";
import { Href, usePathname } from "expo-router";

export const useGetProfileHref = (userId?: string) => {
  const { data: session } = useGetSession();

  const pathname = usePathname();
  const tab = (() => {
    if (pathname.includes("profile")) return "profile";
    if (pathname.includes("discover")) return "discover";
    return "(index)";
  })();

  const isOwnProfile = session?.user.id === userId;

  const href = (() => {
    if (isOwnProfile) {
      if (tab === "profile") return undefined;

      return "/profile";
    }

    return `/${tab}/other-profile/${userId}`;
  })();

  return href as Href;
};
