import { createSignal } from "solid-js";
import type { Signal } from ".";
import { dN } from "~/routes/generators/_utils/dice";

type GenderOptions = "Male" | "Female" | "Agender" | "Intergender";

export interface Gender {
  current: Signal<GenderOptions>;
  rolled: Signal<boolean>;
  locked: Signal<boolean>;
  roll: () => void;
}

export const prepGenderTools = (): Gender => {
  const [get_current, set_current] = createSignal<GenderOptions>("Male");
  const [get_rolled, set_rolled] = createSignal<boolean>(false);
  const [get_locked, set_locked] = createSignal<boolean>(false);
  const rollTrigger = () => {
    if (get_locked()) return;
    set_rolled(false);
    const tens = dN(10);
    const ones = dN(10);
    const coin = dN(2);
    set_current(() => {
      if (tens == 9 && ones == 0) return "Agender";
      if (tens == 0 && ones == 9) return "Intergender";
      if (coin == 1) return "Male";
      return "Female";
    });
    set_rolled(true);
  };
  const output = {
    current: {
      get: get_current,
      set: set_current,
    },
    rolled: {
      get: get_rolled,
      set: set_rolled,
    },
    locked: {
      get: get_locked,
      set: set_locked,
    },
    roll: rollTrigger,
  };
  return output;
};
