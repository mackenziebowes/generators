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
  E_basic_six,
  Full_JRPG,
  Simplified_JRPG,
  W_basic_six,
} from "../_data/attributes";
import { MultiplierBadge } from "~/routes/generators/_components/MultiplierBadge";

type AttributeWithBuff = {
  title: string;
  label: string;
  description: string;
  buff_name:
    | "Major Affinity"
    | "Minor Affinity"
    | "Minor Difficulty"
    | "Major Difficulty"
    | "Average Growth";
  multiplier: 1.25 | 1.1 | 1.0 | 0.9 | 0.75;
};

type HeritageOptions = "West" | "East" | "Simple J-ARPG" | "J-ARPG";

export default function RollAttributes() {
  const [buffMeta, set_buffMeta] = createSignal<AttributeWithBuff[]>([]);
  const [heritage, set_heritage] = createSignal<HeritageOptions>("West");
  const [hasRolled, set_hasRolled] = createSignal<boolean>(false);
  const rollBuffs = () => {
    set_hasRolled(false);
    set_buffMeta([]);
    let bag = [];
    let selectedSource = [];
    switch (heritage()) {
      case "West":
        bag = [...W_basic_six];
        break;
      case "East":
        bag = [...E_basic_six];
        break;
      case "Simple J-ARPG":
        bag = [...Simplified_JRPG];
        break;
      case "J-ARPG":
        bag = [...Full_JRPG];
        break;
    }
    let selected = [];
    selectedSource = [...bag];
    for (const _ in Array.from({ length: 4 })) {
      let selectedIndex = Math.floor(Math.random() * bag.length);
      let selectedItem = bag[selectedIndex];
      selected.push(selectedItem);
      bag.splice(selectedIndex, 1);
    }
    const ordered = [...selected, ...bag];
    let counter = 0;

    for (const _ in Array.from({ length: selectedSource.length })) {
      const attribute = selectedSource[counter];
      const matchIndex = ordered.findIndex(
        (item) => item.title == attribute.title,
      );
      switch (matchIndex) {
        case 0:
          set_buffMeta((prev) => {
            let meta: AttributeWithBuff = {
              ...attribute,
              buff_name: "Major Affinity",
              multiplier: 1.25,
            };
            prev.push(meta);
            return prev;
          });
          break;
        case 1:
          set_buffMeta((prev) => {
            let meta: AttributeWithBuff = {
              ...attribute,
              buff_name: "Minor Affinity",
              multiplier: 1.1,
            };
            prev.push(meta);
            return prev;
          });
          break;
        case 2:
          set_buffMeta((prev) => {
            let meta: AttributeWithBuff = {
              ...attribute,
              buff_name: "Minor Difficulty",
              multiplier: 0.9,
            };
            prev.push(meta);
            return prev;
          });
          break;
        case 3:
          set_buffMeta((prev) => {
            let meta: AttributeWithBuff = {
              ...attribute,
              buff_name: "Major Difficulty",
              multiplier: 0.75,
            };
            prev.push(meta);
            return prev;
          });
          break;
        default:
          set_buffMeta((prev) => {
            let meta: AttributeWithBuff = {
              ...attribute,
              buff_name: "Average Growth",
              multiplier: 1.0,
            };
            prev.push(meta);
            return prev;
          });
          break;
      }
      counter++;
    }

    set_hasRolled(true);
  };

  onMount(rollBuffs);
  return (
    <Stack direction="col" class="gap-[12px]">
      <Card>
        <Heading
          as="h2"
          class="text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-normal md:font-semibold"
        >
          Attributes
        </Heading>
        <Switch>
          <Match when={hasRolled()}>
            <AttributeDisplay attributes={buffMeta} />
          </Match>
        </Switch>
        <AttributeSourceSelect get={heritage} set={set_heritage} />
        <Button onclick={rollBuffs}>Roll</Button>
      </Card>
    </Stack>
  );
}

interface AttributeDisplayArgs extends JSX.HTMLAttributes<HTMLDivElement> {
  attributes: Accessor<AttributeWithBuff[]>;
}

const AttributeDisplay = (props: AttributeDisplayArgs) => {
  const attrMemo = () => props.attributes();
  return (
    <Stack
      direction="col"
      class="justify-start align-start gap-[12px] px-0 mx-0"
    >
      <For each={attrMemo()}>
        {(item) => (
          <div class="flex flex-col w-full max-w-[40ch] self-start">
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
    <Stack>
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
