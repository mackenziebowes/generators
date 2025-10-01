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
  rolled: Signal<boolean>;
  roll: () => void;
}

export const prepAncestryTools = () => {
  const [selectedAncestry, set_selectedAncestry] = createSignal<string>("");
  const [ancestryMode, set_ancestryMode] =
    createSignal<AncestrySetSelection>("Core");
  const [hasRolled, set_hasRolled] = createSignal<boolean>(false);
  const getAncestryPool = () => {
    switch (ancestryMode()) {
      case "Core":
        return W_core_ancestries;
      case "Extended":
        return [...W_core_ancestries, ...W_extended_ancestries];
      case "Beastman":
        return Basic_Animal_hybrid_ancestries;
    }
  };
  const rollAncestry = () => {
    set_hasRolled(false);
    const pool = getAncestryPool();
    set_selectedAncestry(randomFromArray(pool));
    set_hasRolled(true);
  };

  const ancestry = {
    current: {
      get: selectedAncestry,
      set: set_selectedAncestry,
    },
    mode: {
      get: ancestryMode,
      set: set_ancestryMode,
    },
    rolled: {
      get: hasRolled,
      set: set_hasRolled,
    },
    roll: rollAncestry,
  };
  return ancestry;
};
