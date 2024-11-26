import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { Tables } from "@/src/types/database.types";

type Props = {
  follow: Tables<"follows"> & { profiles: Tables<"profiles"> | null };
};

export const FollowBox = ({ follow }: Props) => {
  return <Flex></Flex>;
};
