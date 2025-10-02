import { createSignal } from "solid-js";
import type {
  MagicAptitudeOption,
  MagicAptitudeType,
  MagicSystem,
} from "~/routes/generators/characters/_data/magic_types";
import {
  defaultMagicSystem,
  generateMagicSystem,
} from "~/routes/generators/characters/_data/magic_types";

import type { Signal } from ".";

export interface Magic {
  current: Signal<MagicSystem>;
  mode: Signal<MagicAptitudeOption>;
  bag: Signal<MagicAptitudeType>;
  rolled: Signal<boolean>;
  locked: Signal<boolean>;
  roll: () => void;
}

// Problem:
// The resulting Magic List has two fundamental display modes:
// Easy - the entire dictionary is displayed, but the dictionary type is different.
// Hard - partial dictionary is displayed, but the dictionary type is the original.
// WAIT! Fact Check!
// That is false - the MagicSystem type is consumed by an EasyDetails / HardDetails that are conditionally rendered by a Switch/Match system. No problems here!
// I do need to create a default MagicSystem, though, for initializing the Signal.

export const prepMagicTools = (): Magic => {
  const [get_current, set_current] =
    createSignal<MagicSystem>(defaultMagicSystem);
  const [get_bag, set_bag] = createSignal<MagicAptitudeType>(
    defaultMagicSystem.tradition,
  );
  const [get_mode, set_mode] = createSignal<MagicAptitudeOption>(
    defaultMagicSystem.aptitude,
  );
  const [get_rolled, set_rolled] = createSignal<boolean>(false);
  const [get_locked, set_locked] = createSignal<boolean>(false);

  const rollTrigger = () => {
    if (get_locked()) return;
    set_rolled(false);
    set_current(generateMagicSystem(get_mode(), get_bag()));
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
    bag: {
      get: get_bag,
      set: set_bag,
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
