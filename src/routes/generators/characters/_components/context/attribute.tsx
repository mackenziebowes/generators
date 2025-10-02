import { createSignal } from "solid-js";
import type {
  AttributeWithBuff,
  HeritageOptions,
} from "~/routes/generators/characters/_data/attributes";
import { rollBuffs } from "~/routes/generators/characters/_data/attributes";
import type { Signal } from ".";

export interface Attributes {
  current: Signal<AttributeWithBuff[]>;
  mode: Signal<HeritageOptions>;
  rolled: Signal<boolean>;
  locked: Signal<boolean>;
  roll: () => void;
}

export const prepAttributeTools = (): Attributes => {
  const [get_current, set_current] = createSignal<AttributeWithBuff[]>([]);
  const [get_mode, set_mode] = createSignal<HeritageOptions>("West");
  const [get_rolled, set_rolled] = createSignal<boolean>(false);
  const [get_locked, set_locked] = createSignal<boolean>(false);
  const rollTrigger = () => {
    if (get_locked()) return;
    set_rolled(false);
    set_current(rollBuffs(get_mode()));
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
