import { intervalToDuration, format } from "date-fns";

export const getFormattedTimeFromMilliseconds = (milliseconds: number) => {
  const { hours, minutes, seconds } = intervalToDuration({
    start: 0,
    end: milliseconds,
  });

  const zeroPad = (num?: number) => {
    if (!num) return "00";
    return String(num).padStart(2, "0");
  };

  const formatted = [hours].filter(Boolean);
  formatted.push(minutes);
  formatted.push(seconds);

  return formatted.map(zeroPad).join(":");
};

export const getFormattedDate = (date?: string | Date) => {
  if (!date) return "No Date";
  return format(new Date(date), "dd MMM yyyy");
};

export const getDurationInHoursAndMinutes = (
  started: string,
  ended: string,
) => {
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

  if (time.length === 0) {
    return "<1m";
  }

  return time.join(" ");
};
