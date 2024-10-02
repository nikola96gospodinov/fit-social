import { useEffect, useState } from "react";

type Props<T> = {
  value: T;
  delay?: number;
};

export const useDebounce = <T,>({ value, delay = 500 }: Props<T>) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return debouncedValue;
};
