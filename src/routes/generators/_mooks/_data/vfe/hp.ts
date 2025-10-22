import type { SizeOptions } from "./size";
import { dN } from "~/routes/generators/_utils/dice";

const hitDie = (faces: number) => (count: number) => dN(faces) * count;

export const getHitDie = (size: SizeOptions) => {
  switch (size) {
    case "Tiny":
      return hitDie(4);
    case "Small":
      return hitDie(6);
    case "Medium":
      return hitDie(8);
    case "Large":
      return hitDie(10);
    case "Huge":
      return hitDie(12);
    case "Gargantuan":
      return hitDie(20);
  }
};
