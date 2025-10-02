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
import { useCharacter } from "./context";
import type { BackgroundTypeOptions } from "../_data/backgrounds";
import { GenerationCard } from "../../_components/GenerationCard";

export default function RollBackground() {
  const { current, rolled, locked, roll, mode } = useCharacter().background;

  return (
    <GenerationCard
      title="Background"
      trigger={roll}
      locked={locked}
      description={
        <p>
          This tab describes what this character is doing <strong>now</strong> -
          before the inciting incident.
        </p>
      }
    >
      <Switch>
        <Match when={rolled.get()}>
          <BackgroundDisplay background={current.get()} />
        </Match>
      </Switch>
      <BackgroundSourceSelector get={mode.get} set={mode.set} />
    </GenerationCard>
  );
}

const BackgroundDisplay = ({ background }: { background: string }) => {
  return (
    <Heading
      as="h3"
      class="text-2xl sm:text-2xl md:text-2xl lg:text-2xl font-bold"
    >
      {background}
    </Heading>
  );
};

interface BackgroundSelector extends JSX.HTMLAttributes<HTMLDivElement> {
  get: Accessor<BackgroundTypeOptions>;
  set: Setter<BackgroundTypeOptions>;
}

const BackgroundSourceSelector = (props: BackgroundSelector) => {
  return (
    <Stack class="w-full flex-wrap">
      <ExclusiveButton
        condition={props.get() == "Urban"}
        trigger={() => props.set("Urban")}
        label="Urban"
      />
      <ExclusiveButton
        condition={props.get() == "Traveller"}
        trigger={() => props.set("Traveller")}
        label="Traveller"
      />
      <ExclusiveButton
        condition={props.get() == "Outpost"}
        trigger={() => props.set("Outpost")}
        label="Outpost"
      />
      <ExclusiveButton
        condition={props.get() == "Solitary"}
        trigger={() => props.set("Solitary")}
        label="Solitary"
      />
      <ExclusiveButton
        condition={props.get() == "Noble"}
        trigger={() => props.set("Noble")}
        label="Noble"
      />
    </Stack>
  );
};
