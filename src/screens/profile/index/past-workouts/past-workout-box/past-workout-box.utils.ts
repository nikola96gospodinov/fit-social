import { intervalToDuration } from "date-fns";

import { formatDistance } from "date-fns";

export const getWorkoutDistance = (started: string, ended: string) => {
  const distance = formatDistance(new Date(ended ?? started), new Date());

  return `${distance} ago`;
};

export const getWorkoutDuration = (started: string, ended: string) => {
  const duration = intervalToDuration({
    start: new Date(started),
    end: new Date(ended ?? started),
  });

  const time: string[] = [];

  if (duration.hours) {
    time.push(`${duration.hours}h`);
  }

  if (duration.minutes) {
    time.push(`${duration.minutes}m`);
  }

  return time.join(", ");
};
