const multiplierToPercent = (multiplier: number) => {
  if (multiplier < 0) return "";
  const difference = multiplier - 1;
  if (difference == 0) return "";
  let raw = Math.round(difference * 100);
  if (raw > 0) return `(+${raw}%)`;
  if (raw < 0) return `(${raw}%)`;
  return `${Math.round(difference * 100)}%`;
};

export const MultiplierBadge = ({ multiplier }: { multiplier: number }) => {
  const percent = multiplierToPercent(multiplier);
  return percent ? <>{percent}</> : null;
};
