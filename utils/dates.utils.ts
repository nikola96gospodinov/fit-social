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

export const getFormattedDate = (date: string | Date) => {
  return format(new Date(date), "dd MMMM yyyy");
};
