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
      <p>
        This tab is purely inspirational and used to intimate the various
        skin-colorings / cultural accoutrement. For Earth settings, the "Center"
        is the Mediterranean, but you can match these directions to your custom
        world or pick a new "Center" on Earth.
        <br />
        "Mid North" would be around The UK/Poland, "Mid South" would be around
        the Sahel.
      </p>
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
