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
import { origins } from "~/routes/generators/characters/_data/origins";
import { randomFromArray } from "~/routes/generators/_utils";
import { GenerationCard } from "../../_components/GenerationCard";

export default function RollOrigin() {
  const [selectedOrigin, set_selectedOrigin] = createSignal<string>("");
  const [hasRolled, set_hasRolled] = createSignal<boolean>(false);

  const rollOrigin = () => {
    set_hasRolled(false);
    set_selectedOrigin(randomFromArray(origins()));
    set_hasRolled(true);
  };

  onMount(rollOrigin);

  return (
    <GenerationCard title="Origin" trigger={rollOrigin}>
      <Switch>
        <Match when={hasRolled()}>
          <OriginDisplay origin={selectedOrigin()} />
        </Match>
      </Switch>
    </GenerationCard>
  );
}

const OriginDisplay = ({ origin }: { origin: string }) => {
  return (
    <Heading
      as="h3"
      class="text-2xl sm:text-2xl md:text-2xl lg:text-2xl font-bold"
    >
      {origin}
    </Heading>
  );
};
