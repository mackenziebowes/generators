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
import {
  W_core_ancestries,
  W_extended_ancestries,
  Basic_Animal_hybrid_ancestries,
} from "../_data/ancestry";
import { randomFromArray } from "../../_utils";
import { GenerationCard } from "../../_components/GenerationCard";

type AncestrySetSelection = "Core" | "Extended" | "Beastman";

export default function RollAncestry() {
  const [selectedAncestry, set_selectedAncestry] = createSignal<string>("");
  const [ancestryMode, set_ancestryMode] =
    createSignal<AncestrySetSelection>("Core");
  const [hasRolled, set_hasRolled] = createSignal<boolean>(false);
  const getAncestryPool = () => {
    switch (ancestryMode()) {
      case "Core":
        return W_core_ancestries;
      case "Extended":
        return [...W_core_ancestries, ...W_extended_ancestries];
      case "Beastman":
        return Basic_Animal_hybrid_ancestries;
    }
  };
  const rollAncestry = () => {
    set_hasRolled(false);
    const pool = getAncestryPool();
    set_selectedAncestry(randomFromArray(pool));
    set_hasRolled(true);
  };

  onMount(rollAncestry);

  return (
    <GenerationCard title="Ancestry" trigger={rollAncestry}>
      <Switch>
        <Match when={hasRolled()}>
          <AncestryDisplay ancestry={selectedAncestry()} />
        </Match>
      </Switch>
      <AncestrySourceSelector get={ancestryMode} set={set_ancestryMode} />
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
