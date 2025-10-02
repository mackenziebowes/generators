import {
  createSignal,
  JSX,
  Accessor,
  Setter,
  Switch,
  Match,
  onMount,
} from "solid-js";
import { Stack, Button, Card, Heading } from "~/devano/atoms";
import { randomFromArray } from "../../_utils";
import { GenerationCard } from "../../_components/GenerationCard";
import {
  SamskaraCategoryOption,
  getWound,
} from "~/routes/generators/characters/_data/samskara";
import type { Pattern } from "../../_utils/ayurvedic";
import { ExclusiveButton } from "~/devano/components";
import { useCharacter } from "./context";
export default function RollSamskara() {
  const { current, mode, locked, rolled, roll } = useCharacter().samskara;

  return (
    <GenerationCard
      title="Core Wound"
      trigger={roll}
      locked={locked}
      description={
        <p>
          The Core Wound is an event that caused the Flaws in the next panel to
          occur - this character tried to protect themself from experiencing
          this wound again <em>by adopting</em> the Flaws.
        </p>
      }
    >
      <Switch>
        <Match when={rolled.get()}>
          <SamskaraDisplay samskara={current.get()} />
          <SamskaraSourceSelector get={mode.get} set={mode.set} />
        </Match>
      </Switch>
    </GenerationCard>
  );
}

const SamskaraDisplay = ({ samskara }: { samskara: Pattern }) => {
  return (
    <>
      <Heading
        as="h3"
        class="text-2xl sm:text-2xl md:text-2xl lg:text-2xl font-bold"
      >
        {samskara.title}
      </Heading>
      <p>{samskara.description}</p>
    </>
  );
};

interface SamskaraSelector extends JSX.HTMLAttributes<HTMLDivElement> {
  get: Accessor<SamskaraCategoryOption>;
  set: Setter<SamskaraCategoryOption>;
}

const SamskaraSourceSelector = (props: SamskaraSelector) => {
  return (
    <Stack class="w-full flex-wrap">
      <ExclusiveButton
        condition={props.get() == "Trust"}
        trigger={() => props.set("Trust")}
        label="Trust"
      />
      <ExclusiveButton
        condition={props.get() == "Ability"}
        trigger={() => props.set("Ability")}
        label="Ability"
      />
      <ExclusiveButton
        condition={props.get() == "Safety"}
        trigger={() => props.set("Safety")}
        label="Safety"
      />
      <ExclusiveButton
        condition={props.get() == "Identity"}
        trigger={() => props.set("Identity")}
        label="Identity"
      />
      <ExclusiveButton
        condition={props.get() == "Truth"}
        trigger={() => props.set("Truth")}
        label="Truth"
      />
      <ExclusiveButton
        condition={props.get() == "Any"}
        trigger={() => props.set("Any")}
        label="Any"
      />
    </Stack>
  );
};
