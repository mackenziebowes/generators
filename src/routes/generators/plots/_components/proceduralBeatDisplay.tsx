import { JSX, Switch, Match, For, JSXElement, splitProps } from "solid-js";
import type { ProceduralBeat } from "../_data/procedural_beats";
import { Heading } from "~/devano/atoms";

interface BeatDisplayProps extends JSX.HTMLAttributes<HTMLDivElement> {
  beat: ProceduralBeat;
}

// discovery gain loss
const DisplayDiscoveryBeat = (props: BeatDisplayProps): JSXElement => {
  return (
    <>
      <Heading as="h4">Discovery!</Heading>
      <p>
        A character {props.beat.operation} {props.beat.noun}, adding{" "}
        {props.beat.stakes.toLowerCase()} {props.beat.valence.toLowerCase()}{" "}
        stakes.
      </p>
    </>
  );
};

const DisplayGainBeat = (props: BeatDisplayProps): JSXElement => {
  return (
    <>
      <Heading as="h4">Gain!</Heading>
      <p>
        A character {props.beat.operation} {props.beat.noun}, adding{" "}
        {props.beat.stakes.toLowerCase()} {props.beat.valence.toLowerCase()}{" "}
        stakes.
      </p>
    </>
  );
};

const DisplayLossBeat = (props: BeatDisplayProps): JSXElement => {
  return (
    <>
      <Heading as="h4">Loss!</Heading>
      <p>
        A character {props.beat.operation} {props.beat.noun}, adding{" "}
        {props.beat.valence.toLowerCase()} {props.beat.stakes.toLowerCase()}{" "}
        stakes.
      </p>
    </>
  );
};

export const DisplayProceduralBeat = (props: BeatDisplayProps): JSXElement => {
  const { beat } = props;
  return (
    <>
      <div class="flex flex-col gap-[12px] border-b-2 p-[24px] w-full bg-green-500/25">
        <Switch>
          <Match when={beat.operation == "discovered"}>
            <DisplayDiscoveryBeat beat={beat} />
          </Match>
          <Match when={beat.operation == "gained"}>
            <DisplayGainBeat beat={beat} />
          </Match>
          <Match when={beat.operation == "lost"}>
            <DisplayLossBeat beat={beat} />
          </Match>
        </Switch>
      </div>
    </>
  );
};
