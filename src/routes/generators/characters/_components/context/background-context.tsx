import { createSignal } from "solid-js";
import { getBackground, BackgroundTypeOptions } from "../../_data/backgrounds";
import { randomFromArray } from "~/routes/generators/_utils";
import type { Signal } from ".";

export interface Background {
  current: Signal<string>;
  mode: Signal<BackgroundTypeOptions>;
  locked: Signal<boolean>;
  rolled: Signal<boolean>;
  roll: () => void;
}

export const prepBackgroundTools = (): Background => {
  const [get_current, set_current] = createSignal<string>("");
  const [get_mode, set_mode] = createSignal<BackgroundTypeOptions>("Urban");
  const [get_rolled, set_rolled] = createSignal<boolean>(false);
  const [get_locked, set_locked] = createSignal<boolean>(false);

  const rollTrigger = () => {
    if (get_locked()) return;
    set_rolled(false);
    set_current(getBackground(get_mode()));
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
