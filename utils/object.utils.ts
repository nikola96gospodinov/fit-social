import { omitBy, isUndefined, cloneDeepWith } from "lodash";

export const turnAllObjectValuesToString = (
  obj: Record<string, unknown>,
): Record<string, string> => {
  function replace(myObj: Record<string, unknown>) {
    Object.keys(myObj).forEach(function (key) {
      if (Array.isArray(myObj[key])) {
        myObj[key] = JSON.stringify(myObj[key]);
      }

      if (typeof myObj[key] === "object") {
        replace(myObj[key] as Record<string, unknown>);
      }

      myObj[key] = String(myObj[key]);
    });
  }

  return cloneDeepWith(obj, (value) => replace(value));
};

export const removeEmptyValues = (
  data: Record<string, unknown>,
): Record<string, unknown> | undefined => {
  return omitBy(data, (value) => isUndefined(value) || value === "");
};
