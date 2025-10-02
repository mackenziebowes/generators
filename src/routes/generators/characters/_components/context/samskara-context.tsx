import { createSignal } from "solid-js";
import type { Signal } from ".";
import { Pattern } from "~/routes/generators/_utils/ayurvedic";
import {
  getWound,
  SamskaraCategoryOption,
} from "~/routes/generators/characters/_data/samskara";

export interface Samskara {
  current: Signal<Pattern>;
  mode: Signal<SamskaraCategoryOption>;
  locked: Signal<boolean>;
  rolled: Signal<boolean>;
  roll: () => void;
}

export const prepSamskaraTools = (): Samskara => {
  const [get_current, set_current] = createSignal<Pattern>(getWound("Any"));
  const [get_mode, set_mode] = createSignal<SamskaraCategoryOption>("Any");
  const [get_rolled, set_rolled] = createSignal<boolean>(false);
  const [get_locked, set_locked] = createSignal<boolean>(false);

  const rollTrigger = () => {
    if (get_locked()) return;
    set_rolled(false);
    set_current(getWound(get_mode()));
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
