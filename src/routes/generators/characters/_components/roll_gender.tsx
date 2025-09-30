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

export default function RollGender() {
  const [selectedGender, set_selectedGender] = createSignal<string>("");

  const [hasRolled, set_hasRolled] = createSignal<boolean>(false);

  const rollGender = () => {
    set_hasRolled(false);
    set_selectedGender(randomFromArray(["Male", "Female"]));
    if (Math.random() > 0.99) {
      set_selectedGender("Agender");
    }
    set_hasRolled(true);
  };

  onMount(rollGender);

  return (
    <GenerationCard title="Gender" trigger={rollGender}>
      <Switch>
        <Match when={hasRolled()}>
          <GenderDisplay gender={selectedGender()} />
        </Match>
      </Switch>
    </GenerationCard>
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
