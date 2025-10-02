import {
  createContext,
  useContext,
  createSignal,
  JSX,
  Accessor,
  Setter,
  onMount,
} from "solid-js";
import { prepAncestryTools, Ancestry } from "./ancestry-context";
import { prepAttributeTools, Attributes } from "./attribute-context";
import { prepMagicTools, Magic } from "./magic-context";
import { prepGenderTools, Gender } from "./gender-context";
import { prepBackgroundTools, Background } from "./background-context";
import { prepOriginTools, Origin } from "./origin-context";
import { prepKleshaTools, Klesha } from "./klesha-context";
import { prepSamskaraTools, Samskara } from "./samskara-context";
import { prepDharmaTools, Dharma } from "./dharma-context";

export interface Signal<T> {
  get: Accessor<T>;
  set: Setter<T>;
}

interface ToolBag {
  ancestry: Ancestry;
  attributes: Attributes;
  magic: Magic;
  gender: Gender;
  background: Background;
  origin: Origin;
  klesha: Klesha;
  samskara: Samskara;
  dharma: Dharma;
}

export interface CharacterValue extends ToolBag {
  rollEverything: () => void;
  lockEverything: () => void;
}

export const CharacterContext = createContext<CharacterValue>();

interface ProviderProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export const CharacterProvider = (props: ProviderProps) => {
  let tools: ToolBag = {
    ancestry: prepAncestryTools(),
    attributes: prepAttributeTools(),
    magic: prepMagicTools(),
    gender: prepGenderTools(),
    background: prepBackgroundTools(),
    origin: prepOriginTools(),
    klesha: prepKleshaTools(),
    samskara: prepSamskaraTools(),
    dharma: prepDharmaTools(),
  };

  const rollEverything = () => {
    for (const item of Object.values(tools)) {
      item.roll();
    }
  };
  const lockEverything = () => {
    for (const item of Object.values(tools)) {
      item.locked.set(true);
    }
  };

  const output = {
    ...tools,
    rollEverything,
    lockEverything,
  };

  onMount(rollEverything);

  return (
    <CharacterContext.Provider value={output}>
      {props.children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacter must be used within a CharacterProvider");
  }
  return context;
};
