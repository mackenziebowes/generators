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
import type { AttributeWithBuff, HeritageOptions } from "../_data/attributes";

export default function RollAttributes() {
  const { current, mode, rolled, locked, roll } = useCharacter().attributes;
  return (
    <GenerationCard
      title="Attributes"
      trigger={roll}
      locked={locked}
      description={
        <p>
          The growth aptitudes of this character - loosely intimates
          classes/jobs.
        </p>
      }
    >
      <AttributeSourceSelect get={mode.get} set={mode.set} />
      <Switch>
        <Match when={rolled.get()}>
          <AttributeDisplay attributes={current.get} />
        </Match>
      </Switch>
    </GenerationCard>
  );
}

interface AttributeDisplayArgs extends JSX.HTMLAttributes<HTMLDivElement> {
  attributes: Accessor<AttributeWithBuff[]>;
}

export const AttributeDisplay = (props: AttributeDisplayArgs) => {
  const attrMemo = () => props.attributes();
  return (
    <Stack
      direction="col"
      class="justify-start align-start gap-[12px] px-0 mx-0"
    >
      <For each={attrMemo()}>
        {(item) => (
          <div class="flex flex-col w-full self-start">
            <Heading
              as="h3"
              class="text-2xl sm:text-2xl md:text-2xl lg:text-2xl font-bold"
            >
              {item.title} <MultiplierBadge multiplier={item.multiplier} />
            </Heading>
            <p class="text-lg">{item.buff_name}</p>
            <p>{item.description}</p>
          </div>
        )}
      </For>
    </Stack>
  );
};

interface AttributeHeritageSelector extends JSX.HTMLAttributes<HTMLDivElement> {
  get: Accessor<HeritageOptions>;
  set: Setter<HeritageOptions>;
}

const AttributeSourceSelect = (props: AttributeHeritageSelector) => {
  return (
    <Stack class="flex-wrap">
      <ExclusiveButton
        condition={props.get() == "West"}
        trigger={() => props.set("West")}
        label="West"
      />
      <ExclusiveButton
        condition={props.get() == "East"}
        trigger={() => props.set("East")}
        label="East"
      />
      <ExclusiveButton
        condition={props.get() == "Simple J-ARPG"}
        trigger={() => props.set("Simple J-ARPG")}
        label="Simple J-ARPG"
      />
      <ExclusiveButton
        condition={props.get() == "J-ARPG"}
        trigger={() => props.set("J-ARPG")}
        label="J-ARPG"
      />
    </Stack>
  );
};
