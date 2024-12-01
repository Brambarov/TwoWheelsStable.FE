export const toString = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  else return String(value);
};
