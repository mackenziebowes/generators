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
import { ExclusiveButton } from "~/devano/components";
import {
  DharmicProfile,
  DharmicConflict,
  getDharmas,
} from "~/routes/generators/characters/_data/dharma";
import { Pattern } from "../../_utils/ayurvedic";
import { breakpoints } from "~/routes/_utils/responsive";
import { createBreakpoints } from "@solid-primitives/media";
import { useCharacter } from "./context";
export default function RollDharma() {
  const { current, mode, rolled, locked, roll } = useCharacter().dharma;

  return (
    <GenerationCard
      title="Duties in Conflict"
      trigger={roll}
      locked={locked}
      description={
        <p>
          This tab describes the central conflict of this character. Frontier
          types are simply overwhelmed, their environment is asking for many
          things and they struggle to meet the demands - both duties are
          external despite the label.
        </p>
      }
    >
      <Switch>
        <Match when={rolled.get()}>
          <DharmaDisplay dharma={current.get()} />
        </Match>
      </Switch>
      <DharmaSourceSelector get={mode.get} set={mode.set} />
    </GenerationCard>
  );
}

const ExternalDharmicDisplay = ({ pattern }: { pattern: Pattern }) => {
  return (
    <div class="flex flex-col gap-[12px]">
      <Heading
        as="h3"
        class="text-2xl sm:text-2xl md:text-2xl lg:text-2xl font-bold"
      >
        External Duty
      </Heading>
      <p>The demands of the character's culture/society/family.</p>
      <Heading
        as="h4"
        class="text-3xl sm:text-3xl md:text-3xl lg:text-3xl font-bold"
      >
        {pattern.title}
      </Heading>
      <p>{pattern.description}</p>
    </div>
  );
};
const InternalDharmicDisplay = ({ pattern }: { pattern: Pattern }) => {
  return (
    <div class="flex flex-col gap-[12px]">
      <Heading
        as="h3"
        class="text-2xl sm:text-2xl md:text-2xl lg:text-2xl font-bold"
      >
        Internal Duty
      </Heading>
      <p>
        This is what the character's <em>soul</em> feels called to do.
      </p>
      <Heading
        as="h4"
        class="text-3xl sm:text-3xl md:text-3xl lg:text-3xl font-bold"
      >
        {pattern.title}
      </Heading>
      <p>{pattern.description}</p>
    </div>
  );
};

const DharmaDisplay = ({ dharma }: { dharma: DharmicConflict }) => {
  const matches = createBreakpoints(breakpoints);
  return (
    <Switch>
      <Match when={matches.sm}>
        <div class="grid grid-cols-2 grid-rows-1 gap-[12px]">
          <ExternalDharmicDisplay pattern={dharma.external} />
          <InternalDharmicDisplay pattern={dharma.internal} />
        </div>
      </Match>
      <Match when={!matches.sm}>
        <ExternalDharmicDisplay pattern={dharma.external} />
        <InternalDharmicDisplay pattern={dharma.internal} />
      </Match>
    </Switch>
  );
};

interface DharmaSelector extends JSX.HTMLAttributes<HTMLDivElement> {
  get: Accessor<DharmicProfile>;
  set: Setter<DharmicProfile>;
}

const DharmaSourceSelector = (props: DharmaSelector) => {
  return (
    <Stack class="w-full flex-wrap">
      <ExclusiveButton
        condition={props.get() == "metropolitan"}
        trigger={() => props.set("metropolitan")}
        label="Metropolitan"
      />
      <ExclusiveButton
        condition={props.get() == "frontier"}
        trigger={() => props.set("frontier")}
        label="Frontier"
      />
      <ExclusiveButton
        condition={props.get() == "heroic"}
        trigger={() => props.set("heroic")}
        label="Heroic"
      />
      <ExclusiveButton
        condition={props.get() == "forbidden"}
        trigger={() => props.set("forbidden")}
        label="Villain"
      />
    </Stack>
  );
};
