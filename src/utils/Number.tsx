export const toNumber = (value: string | undefined): number | null => {
  const num = Number(value);
  return isNaN(num) ? null : num;
};
