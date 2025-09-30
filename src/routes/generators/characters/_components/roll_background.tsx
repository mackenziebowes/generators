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
  W_Urban_Backgrounds,
  W_Outpost_Backgrounds,
  W_Solitary_Backgrounds,
  W_Traveller_Backgrounds,
  W_Noble_Backgrounds,
} from "../_data/backgrounds";
import { randomFromArray } from "../../_utils";

type BackgroundSetSelection =
  | "Urban"
  | "Traveller"
  | "Outpost"
  | "Solitary"
  | "Noble";

export default function RollBackground() {
  const [selectedBackground, set_selectedBackground] = createSignal<string>("");
  const [backgroundMode, set_backgroundMode] =
    createSignal<BackgroundSetSelection>("Urban");
  const [hasRolled, set_hasRolled] = createSignal<boolean>(false);
  const getBackgroundPool = () => {
    switch (backgroundMode()) {
      case "Urban":
        return W_Urban_Backgrounds;
      case "Traveller":
        return W_Traveller_Backgrounds;
      case "Outpost":
        return W_Outpost_Backgrounds;
      case "Solitary":
        return W_Solitary_Backgrounds;
      case "Noble":
        return W_Noble_Backgrounds;
    }
  };

  const rollBackground = () => {
    set_hasRolled(false);
    const pool = getBackgroundPool();
    set_selectedBackground(randomFromArray(pool));
    set_hasRolled(true);
  };

  onMount(rollBackground);

  return (
    <Stack direction="col" class="gap-[12px] w-full">
      <Card class="w-full">
        <Heading
          as="h2"
          class="text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-normal md:font-semibold"
        >
          Background
        </Heading>
        <Switch>
          <Match when={hasRolled()}>
            <BackgroundDisplay background={selectedBackground()} />
          </Match>
        </Switch>
        <BackgroundSourceSelector
          get={backgroundMode}
          set={set_backgroundMode}
        />
        <Button onclick={rollBackground} class="w-fit">
          Roll
        </Button>
      </Card>
    </Stack>
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
  get: Accessor<BackgroundSetSelection>;
  set: Setter<BackgroundSetSelection>;
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
