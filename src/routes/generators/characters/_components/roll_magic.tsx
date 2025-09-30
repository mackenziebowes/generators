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
  E_Elemental_Affinities,
  W_Magic_Schools,
  Hybrid_Magic_Systems,
} from "../_data/magic_types";
import { MultiplierBadge } from "~/routes/generators/_components/MultiplierBadge";
import { GenerationCard } from "../../_components/GenerationCard";

function assignElementalAffinities(elements: string[]): string[] {
  const weights = elements.map((_, index) => 1 / (index + 1)); // Reciprocal weights [1, 0.5, 0.33, 0.25...]
  const selected: string[] = [];

  // First pass: primary element (always gets one)
  const primary = weightedRandom(elements, weights);
  selected.push(primary);

  // Subsequent passes: rolling for additional elements with scaling difficulty
  let rollThreshold = 0.3; // 30% chance for second element
  for (let i = 0; i < elements.length - 1; i++) {
    if (Math.random() < rollThreshold) {
      const remaining = elements.filter((el) => !selected.includes(el));
      const remainingWeights = weights.slice(0, remaining.length);
      const additional = weightedRandom(remaining, remainingWeights);
      selected.push(additional);
      rollThreshold *= 0.5; // Halve chance for each additional element
    } else {
      break;
    }
  }

  return selected;
}

function weightedRandom(items: string[], weights: number[]): string {
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) return items[i];
  }
  return items[items.length - 1];
}

type MagicAptitude = "Easy" | "Hard";
type TraditionOption = "Eastern" | "Western" | "Hybrid" | "Any";
interface MagicSystem {
  tradition: TraditionOption;
  elements: string[]; // or schools
  aptitude: MagicAptitude;
  talents: string[]; // The affinities from assignElementalAffinities
  restrictions: string[]; // The inverse of talents for Hard mode
}

function getElementsByTradition(tradition: TraditionOption) {
  switch (tradition) {
    case "Western":
      return [...W_Magic_Schools];
    case "Eastern":
      return [...E_Elemental_Affinities];
    case "Hybrid":
      return [...Hybrid_Magic_Systems];
    case "Any":
      return [
        ...W_Magic_Schools,
        ...E_Elemental_Affinities,
        ...Hybrid_Magic_Systems,
      ];
  }
}

function generateMagicSystem(
  aptitude: MagicAptitude,
  tradition: TraditionOption,
): MagicSystem {
  let elements = getElementsByTradition(tradition);
  const talents = assignElementalAffinities(elements);

  let restrictions: string[] = [];

  switch (aptitude) {
    case "Easy":
      // Talents are bonuses - they get everything but specialize in talents
      return {
        tradition,
        elements: elements,
        aptitude,
        talents,
        restrictions: [], // No restrictions
      };
    case "Hard":
      // CAN ONLY use their talented elements
      restrictions = elements.filter((element) => !talents.includes(element));
      return {
        tradition,
        elements: talents, // Only the talented elements
        aptitude,
        talents: [],
        restrictions,
      };
  }
}

interface ExclusiveSelectionArgs<T> extends JSX.HTMLAttributes<HTMLDivElement> {
  get: Accessor<T>;
  set: Setter<T>;
}

const SelectTradition = (props: ExclusiveSelectionArgs<TraditionOption>) => {
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

const SelectAptitude = (props: ExclusiveSelectionArgs<MagicAptitude>) => {
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
  const [tradition, set_tradition] = createSignal<TraditionOption>("Eastern");
  const [aptitude, set_aptitude] = createSignal<MagicAptitude>("Hard");
  const [magicSystem, set_magicSystem] = createSignal<MagicSystem>({
    tradition: "Eastern",
    elements: [...E_Elemental_Affinities],
    aptitude: "Hard",
    talents: [],
    restrictions: [],
  });
  const [hasRolled, set_hasRolled] = createSignal<boolean>(false);

  const rollMagic = () => {
    set_hasRolled(false);
    set_magicSystem(generateMagicSystem(aptitude(), tradition()));
    set_hasRolled(true);
  };

  onMount(rollMagic);

  return (
    <GenerationCard title="Magic" trigger={rollMagic}>
      <Switch>
        <Match when={hasRolled()}>
          <DisplayMagicDetails attributes={magicSystem} />
        </Match>
      </Switch>
      <SelectAptitude get={aptitude} set={set_aptitude} />
      <SelectTradition get={tradition} set={set_tradition} />
    </GenerationCard>
  );
}
