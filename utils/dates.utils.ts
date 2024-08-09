import { intervalToDuration } from "date-fns";

export const getFormattedTimeFromMilliseconds = (milliseconds: number) => {
  const seconds = milliseconds / 1000;
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

  const zeroPad = (num?: number) => {
    if (!num) return "00";
    return String(num).padStart(2, "0");
  };

  const formatted = [duration.hours, duration.minutes].filter(Boolean);
  formatted.push(duration.seconds);

  return formatted.map(zeroPad).join(":");
};
