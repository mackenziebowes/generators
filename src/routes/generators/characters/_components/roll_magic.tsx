import {
  createSignal,
  For,
  JSX,
  Accessor,
  Setter,
  Switch,
  Match,
  onMount,
} from "solid-js";
import { Stack, Button, Card, Heading } from "~/devano/atoms";
import { ExclusiveButton } from "~/devano/components";
import { MultiplierBadge } from "~/routes/generators/_components/MultiplierBadge";
import { GenerationCard } from "../../_components/GenerationCard";
import { useCharacter } from "./context";
import type {
  MagicAptitudeType,
  MagicAptitudeOption,
  MagicSystem,
} from "../_data/magic_types";

interface ExclusiveSelectionArgs<T> extends JSX.HTMLAttributes<HTMLDivElement> {
  get: Accessor<T>;
  set: Setter<T>;
}

const SelectTradition = (props: ExclusiveSelectionArgs<MagicAptitudeType>) => {
  return (
    <Stack>
      <ExclusiveButton
        condition={props.get() == "Western"}
        trigger={() => props.set("Western")}
        label="Western"
      />
      <ExclusiveButton
        condition={props.get() == "Eastern"}
        trigger={() => props.set("Eastern")}
        label="Eastern"
      />
      <ExclusiveButton
        condition={props.get() == "Hybrid"}
        trigger={() => props.set("Hybrid")}
        label="Hybrid"
      />
      <ExclusiveButton
        condition={props.get() == "Any"}
        trigger={() => props.set("Any")}
        label="Any"
      />
    </Stack>
  );
};

const SelectAptitude = (props: ExclusiveSelectionArgs<MagicAptitudeOption>) => {
  return (
    <Stack>
      <ExclusiveButton
        condition={props.get() == "Easy"}
        trigger={() => props.set("Easy")}
        label="Easy"
      />
      <ExclusiveButton
        condition={props.get() == "Hard"}
        trigger={() => props.set("Hard")}
        label="Hard"
      />
    </Stack>
  );
};

interface DisplayMagicDetailsArgs extends JSX.HTMLAttributes<HTMLDivElement> {
  attributes: Accessor<MagicSystem>;
}

const DisplayEasyDetails = (props: DisplayMagicDetailsArgs) => {
  // fold talents into elements
  let displayedElements = props.attributes().elements.map((element) => {
    return {
      title: element,
      multiplier: 1.0,
    };
  });
  const talentWeights = props
    .attributes()
    .talents.map((_, index) => 1 + 1 / (index + 2));
  props.attributes().talents.map((talent, index) => {
    const matchingIndex = displayedElements.findIndex(
      (element) => element.title == talent,
    );
    if (matchingIndex == -1) return;
    displayedElements[matchingIndex].multiplier = talentWeights[index];
  });

  return (
    <Stack
      direction="col"
      class="justify-start align-start gap-[12px] px-0 mx-0"
    >
      <For each={displayedElements}>
        {(element) => {
          return (
            <div class="flex flex-col w-full max-w-[40ch] self-start">
              <Heading
                as="h3"
                class="text-2xl sm:text-2xl md:text-2xl lg:text-2xl font-bold"
              >
                {element.title}{" "}
                <MultiplierBadge multiplier={element.multiplier} />
              </Heading>
            </div>
          );
        }}
      </For>
    </Stack>
  );
};

const DisplayHardDetails = (props: DisplayMagicDetailsArgs) => {
  return (
    <Stack
      direction="col"
      class="justify-start align-start gap-[12px] px-0 mx-0"
    >
      <For each={props.attributes().elements}>
        {(element) => {
          return (
            <div class="flex flex-col w-full max-w-[40ch] self-start">
              <Heading
                as="h3"
                class="text-2xl sm:text-2xl md:text-2xl lg:text-2xl font-bold"
              >
                {element}
              </Heading>
            </div>
          );
        }}
      </For>
    </Stack>
  );
};

const DisplayMagicDetails = (props: DisplayMagicDetailsArgs) => {
  const magicMemo = () => props.attributes();
  return (
    <Switch>
      <Match when={magicMemo().aptitude == "Easy"}>
        <DisplayEasyDetails attributes={props.attributes} />
      </Match>
      <Match when={magicMemo().aptitude == "Hard"}>
        <DisplayHardDetails attributes={props.attributes} />
      </Match>
    </Switch>
  );
};

export default function RollMagic() {
  const { roll, current, rolled, bag, locked, mode } = useCharacter().magic;

  return (
    <GenerationCard
      title="Magic"
      trigger={roll}
      locked={locked}
      description={
        <p>
          The magic aptitudes of this character - Easy mode describes which
          types the character grows faster with, Hard mode describes which types
          the character has access to.
        </p>
      }
    >
      <Switch>
        <Match when={rolled.get()}>
          <DisplayMagicDetails attributes={current.get} />
        </Match>
      </Switch>
      <SelectAptitude get={mode.get} set={mode.set} />
      <SelectTradition get={bag.get} set={bag.set} />
    </GenerationCard>
  );
}
