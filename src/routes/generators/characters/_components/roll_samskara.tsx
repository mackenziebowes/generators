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

export default function RollSamskara() {
  const [selectedSamskara, set_selectedSamskara] = createSignal<Pattern>(
    getWound("any"),
  );
  const [selectedSamskaraType, set_selectedSamskaraType] =
    createSignal<SamskaraCategoryOption>("any");
  const [hasRolled, set_hasRolled] = createSignal<boolean>(false);

  const rollSamskara = () => {
    set_hasRolled(false);
    set_selectedSamskara(getWound(selectedSamskaraType()));
    set_hasRolled(true);
  };

  onMount(rollSamskara);

  return (
    <GenerationCard title="Core Wound" trigger={rollSamskara}>
      <p>
        The Core Wound is an event that caused the Flaws in the next panel to
        occur - this character tried to protect themself from experiencing this
        wound again <em>by adopting</em> the Flaws.
      </p>
      <Switch>
        <Match when={hasRolled()}>
          <SamskaraDisplay samskara={selectedSamskara()} />
          <SamskaraSourceSelector
            get={selectedSamskaraType}
            set={set_selectedSamskaraType}
          />
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
        condition={props.get() == "trust"}
        trigger={() => props.set("trust")}
        label="Trust"
      />
      <ExclusiveButton
        condition={props.get() == "ability"}
        trigger={() => props.set("ability")}
        label="Ability"
      />
      <ExclusiveButton
        condition={props.get() == "safety"}
        trigger={() => props.set("safety")}
        label="Safety"
      />
      <ExclusiveButton
        condition={props.get() == "identity"}
        trigger={() => props.set("identity")}
        label="Identity"
      />
      <ExclusiveButton
        condition={props.get() == "truth"}
        trigger={() => props.set("truth")}
        label="Truth"
      />
      <ExclusiveButton
        condition={props.get() == "any"}
        trigger={() => props.set("any")}
        label="Any"
      />
    </Stack>
  );
};
