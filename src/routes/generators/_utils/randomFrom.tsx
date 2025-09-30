export const randomIndex = (length: number) => {
  return Math.floor(Math.random() * length);
};

export const randomFromArray = (input: any[]) => {
  return input[randomIndex(input.length)];
};

export const randomIntFromRange = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const uniqueFromRandom = (input: any[], count: number) => {
  let intCount = Math.floor(count);
  if (intCount <= 0) return [];
  let bag = [...input];
  let counter = 0;
  let output: any[] = [];
  while (counter !== count) {
    let index = randomIndex(bag.length);
    output.push(bag[index]);
    bag.splice(index, 1);
    counter++;
  }
  return output;
};
