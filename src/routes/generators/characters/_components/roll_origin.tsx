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
export default function RollOrigin() {
  const { current, rolled, locked, roll } = useCharacter().origin;

  return (
    <GenerationCard
      title="Origin"
      trigger={roll}
      locked={locked}
      description={
        <p>
          This tab is purely inspirational and used to suggest the various
          skin-colorings / cultural accoutrement / settings for origin stories.
        </p>
      }
    >
      <Switch>
        <Match when={rolled.get()}>
          <OriginDisplay origin={current.get()} />
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
