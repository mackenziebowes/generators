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
import { randomFrom } from "../../_utils";

type AncestrySetSelection = "Core" | "Extended" | "Beastman";

export default function RollAncestry() {
  const [selectedGender, set_selectedGender] = createSignal<string>("");

  const [hasRolled, set_hasRolled] = createSignal<boolean>(false);

  const rollGender = () => {
    set_hasRolled(false);
    set_selectedGender(randomFrom(["Male", "Female"]));
    if (Math.random() > 0.99) {
      set_selectedGender("Agender");
    }
    set_hasRolled(true);
  };

  onMount(rollGender);

  return (
    <Stack direction="col" class="gap-[12px] w-full">
      <Card class="w-full">
        <Heading
          as="h2"
          class="text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-normal md:font-semibold"
        >
          Gender
        </Heading>
        <Switch>
          <Match when={hasRolled()}>
            <GenderDisplay gender={selectedGender()} />
          </Match>
        </Switch>
        <Button onclick={rollGender}>Roll</Button>
      </Card>
    </Stack>
  );
}

const GenderDisplay = ({ gender }: { gender: string }) => {
  return (
    <Heading
      as="h3"
      class="text-2xl sm:text-2xl md:text-2xl lg:text-2xl font-bold"
    >
      {gender}
    </Heading>
  );
};

interface AncestrySelector extends JSX.HTMLAttributes<HTMLDivElement> {
  get: Accessor<AncestrySetSelection>;
  set: Setter<AncestrySetSelection>;
}
