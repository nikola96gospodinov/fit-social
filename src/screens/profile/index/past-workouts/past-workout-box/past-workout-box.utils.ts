import { formatDistance } from "date-fns";

export const getWorkoutDistance = (started: string, ended: string) => {
  const distance = formatDistance(new Date(ended ?? started), new Date());

  return `${distance} ago`;
};
