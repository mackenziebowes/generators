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
import { GenerationCard } from "../../_components/GenerationCard";
import { useCharacter } from "./context";

export default function RollGender() {
  const { current, rolled, roll, locked } = useCharacter().gender;
  return (
    <GenerationCard
      title="Gender"
      trigger={roll}
      locked={locked}
      description={
        <p>
          This generator includes Agender and Intergender options at 10x the
          rate of census data, approximately 1%. Feel free to modify this value
          while transcribing.
        </p>
      }
    >
      <Switch>
        <Match when={rolled.get()}>
          <GenderDisplay gender={current.get()} />
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
