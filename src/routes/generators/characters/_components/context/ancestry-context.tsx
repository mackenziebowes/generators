import { createSignal } from "solid-js";
import {
  W_core_ancestries,
  W_extended_ancestries,
  Basic_Animal_hybrid_ancestries,
  AncestrySetSelection,
} from "~/routes/generators/characters/_data/ancestry";
import { randomFromArray } from "~/routes/generators/_utils";
import type { Signal } from ".";

export interface Ancestry {
  current: Signal<string>;
  mode: Signal<AncestrySetSelection>;
  locked: Signal<boolean>;
  rolled: Signal<boolean>;
  roll: () => void;
}

export const prepAncestryTools = (): Ancestry => {
  const [get_current, set_current] = createSignal<string>("");
  const [get_mode, set_mode] = createSignal<AncestrySetSelection>("Core");
  const [get_rolled, set_rolled] = createSignal<boolean>(false);
  const [get_locked, set_locked] = createSignal<boolean>(false);
  const getAncestryPool = () => {
    switch (get_mode()) {
      case "Core":
        return W_core_ancestries;
      case "Extended":
        return [...W_core_ancestries, ...W_extended_ancestries];
      case "Beastman":
        return Basic_Animal_hybrid_ancestries;
    }
  };
  const rollTrigger = () => {
    if (get_locked()) return;
    set_rolled(false);
    const pool = getAncestryPool();
    set_current(randomFromArray(pool));
    set_rolled(true);
  };

  const output = {
    current: {
      get: get_current,
      set: set_current,
    },
    mode: {
      get: get_mode,
      set: set_mode,
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
