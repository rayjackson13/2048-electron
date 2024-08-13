export const lerp = (start: number, end: number, percentage: number): number => {
  const diff = end - start;

  return start + diff * percentage;
};
