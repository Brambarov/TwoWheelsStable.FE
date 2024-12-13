export const toString = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  else return String(value);
};

export const extractIdFromHref = (href: string): string => {
  const parts = href.split("/");
  return parts[parts.length - 1];
};
