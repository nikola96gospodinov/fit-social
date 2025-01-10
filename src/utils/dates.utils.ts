import { intervalToDuration, format, formatDistance } from "date-fns";

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

export const getDistance = (started: string) => {
  return formatDistance(new Date(started), new Date(), {
    addSuffix: true,
  });
};

export const convertTimeToSeconds = (timeString: string): number => {
  const parts = timeString.split(":");

  if (parts.length === 3) {
    // HH:MM:SS format
    const [hours, minutes, seconds] = parts.map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  } else if (parts.length === 2) {
    // MM:SS format
    const [minutes, seconds] = parts.map(Number);
    return minutes * 60 + seconds;
  }

  return 0;
};
