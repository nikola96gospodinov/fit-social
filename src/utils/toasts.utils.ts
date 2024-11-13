export const getToastType = (isError: boolean, isSuccess: boolean) => {
  if (isError) return "error";
  if (isSuccess) return "success";
  return "info";
};
