export const proficiencyBonusByCr = (cr: number) => {
  if (cr < 0) return 2;
  if (cr <= 4) return 2;
  return Math.floor((cr - 1) / 4) + 2;
};

const addToDict = (
  dict: Record<number, number>,
  index: number,
  value: number,
) => {
  dict[index] = value;
  return dict;
};

const getXpByCrDict = () => {
  let dict: Record<number, number> = {};
  addToDict(dict, 2, 450);
  addToDict(dict, 3, 700);
  addToDict(dict, 4, 1100);
  addToDict(dict, 5, 1800);
  addToDict(dict, 6, 2300);
  addToDict(dict, 7, 2900);
  addToDict(dict, 8, 3900);
  addToDict(dict, 9, 5000);
  addToDict(dict, 10, 5900);
  addToDict(dict, 11, 7200);
  addToDict(dict, 12, 8400);
  addToDict(dict, 13, 10_000);
  addToDict(dict, 14, 11_500);
  addToDict(dict, 15, 13_000);
  addToDict(dict, 16, 15_000);
  addToDict(dict, 17, 18_000);
  addToDict(dict, 18, 20_000);
  addToDict(dict, 19, 22_000);
  addToDict(dict, 20, 25_000);
  addToDict(dict, 21, 33_000);
  addToDict(dict, 22, 41_000);
  addToDict(dict, 23, 50_000);
  addToDict(dict, 24, 75_000);
  addToDict(dict, 26, 90_000);
  return dict;
};

export const xpByCr = (cr: number) => {
  if (cr <= 0) return 0;
  if (cr <= 1) return cr * 200;
  if (cr <= 26) return getXpByCrDict()[cr];
  return 100_000;
};
