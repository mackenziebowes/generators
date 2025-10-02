import { createSignal } from "solid-js";
import type { Signal } from ".";
import { dN } from "~/routes/generators/_utils/dice";
import { rollOrigin } from "../../_data/origins";

export interface Origin {
  current: Signal<string>;
  rolled: Signal<boolean>;
  locked: Signal<boolean>;
  roll: () => void;
}

export const prepOriginTools = (): Origin => {
  const [get_current, set_current] = createSignal<string>("Center");
  const [get_rolled, set_rolled] = createSignal<boolean>(false);
  const [get_locked, set_locked] = createSignal<boolean>(false);
  const rollTrigger = () => {
    if (get_locked()) return;
    set_rolled(false);
    set_current(rollOrigin());
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
