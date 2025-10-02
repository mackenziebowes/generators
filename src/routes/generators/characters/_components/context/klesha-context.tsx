import { createSignal } from "solid-js";
import type { Signal } from ".";
import {
  generateKleshaProfile,
  KleshaTypeSelection,
  KleshaProfile,
} from "../../_data/kleshas";

export interface Klesha {
  current: Signal<KleshaProfile>;
  mode: Signal<KleshaTypeSelection>;
  locked: Signal<boolean>;
  rolled: Signal<boolean>;
  roll: () => void;
}

export const prepKleshaTools = (): Klesha => {
  const [get_current, set_current] = createSignal<KleshaProfile>(
    generateKleshaProfile("Simple"),
  );
  const [get_mode, set_mode] = createSignal<KleshaTypeSelection>("Simple");
  const [get_rolled, set_rolled] = createSignal<boolean>(false);
  const [get_locked, set_locked] = createSignal<boolean>(false);

  const rollTrigger = () => {
    if (get_locked()) return;
    set_rolled(false);
    set_current(generateKleshaProfile(get_mode()));
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
