export const randomIndex = (length: number) => {
  return Math.floor(Math.random() * length);
};

export function randomFromArray<T>(input: T[]): T {
  return input[randomIndex(input.length)];
}

export const randomIntFromRange = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function uniqueFromRandom<T>(input: T[], count: number): T[] {
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
}

export function pullItemsFromBag<T>(source: T[], count: number) {
  let bag = [...source];
  let selected = [];
  for (const _ in Array.from({ length: Math.floor(count) })) {
    let selectedIndex = Math.floor(Math.random() * bag.length);
    let selectedItem = bag[selectedIndex];
    selected.push(selectedItem);
    bag.splice(selectedIndex, 1);
  }
  return [...selected, ...bag];
}

export function weightedRandom(items: string[], weights: number[]): string {
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) return items[i];
  }
  return items[items.length - 1];
}
