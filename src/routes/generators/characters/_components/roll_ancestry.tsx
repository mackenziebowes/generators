import { JSX, Accessor, Setter, Switch, Match } from "solid-js";
import { Stack, Heading } from "~/devano/atoms";
import { ExclusiveButton } from "~/devano/components";
import { AncestrySetSelection } from "../_data/ancestry";
import { GenerationCard } from "../../_components/GenerationCard";
import { useCharacter } from "./context";

export default function RollAncestry() {
  const { ancestry } = useCharacter();
  const { current, mode, rolled, roll } = ancestry;

  return (
    <GenerationCard title="Ancestry" trigger={roll}>
      <p>
        This tab describes what type of creature this character is - The
        "Half-*" from the extended tab and all Beastman are half-human.
      </p>
      <Switch>
        <Match when={rolled.get()}>
          <AncestryDisplay ancestry={current.get()} />
        </Match>
      </Switch>
      <AncestrySourceSelector get={mode.get} set={mode.set} />
    </GenerationCard>
  );
}

const AncestryDisplay = ({ ancestry }: { ancestry: string }) => {
  return (
    <Heading
      as="h3"
      class="text-2xl sm:text-2xl md:text-2xl lg:text-2xl font-bold"
    >
      {ancestry}
    </Heading>
  );
};

interface AncestrySelector extends JSX.HTMLAttributes<HTMLDivElement> {
  get: Accessor<AncestrySetSelection>;
  set: Setter<AncestrySetSelection>;
}

const AncestrySourceSelector = (props: AncestrySelector) => {
  return (
    <Stack class="w-full flex-wrap">
      <ExclusiveButton
        condition={props.get() == "Core"}
        trigger={() => props.set("Core")}
        label="Core"
      />
      <ExclusiveButton
        condition={props.get() == "Extended"}
        trigger={() => props.set("Extended")}
        label="Extended"
      />
      <ExclusiveButton
        condition={props.get() == "Beastman"}
        trigger={() => props.set("Beastman")}
        label="Beastman"
      />
    </Stack>
  );
};
