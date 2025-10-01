import {
  createContext,
  useContext,
  createSignal,
  JSX,
  Accessor,
  Setter,
  onMount,
} from "solid-js";
import { prepAncestryTools, Ancestry } from "./ancestry";

export interface Signal<T> {
  get: Accessor<T>;
  set: Setter<T>;
}

interface CharacterValue {
  ancestry: Ancestry;
}

export const CharacterContext = createContext<CharacterValue>();

interface ProviderProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export const CharacterProvider = (props: ProviderProps) => {
  const ancestry = prepAncestryTools();

  onMount(() => {
    ancestry.roll();
  });

  return (
    <CharacterContext.Provider value={{ ancestry }}>
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
