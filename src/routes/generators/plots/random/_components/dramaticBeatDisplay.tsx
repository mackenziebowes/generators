import { JSX, Switch, Match, For, JSXElement, splitProps } from "solid-js";
import type { DramaticBeat, Operation } from "../_data/dramatic_beats";
import { Heading } from "~/devano/atoms";
import { Stakes, Valence } from "../_data/shared_types";

interface BeatDisplayProps extends JSX.HTMLAttributes<HTMLDivElement> {
  beat: DramaticBeat;
}

const operationGrammaer = (operation: Operation, valence: Valence) => {
  switch (operation) {
    case "Develop":
      if (valence == "Negative") return "weakened their";
      if (valence == "Positive") return "strengenthed their";
    case "Transform":
      if (valence == "Negative") return "destroyed";
      if (valence == "Positive") return "earned";
  }
};

const stakesGrammer = (stakes: Stakes) => {
  switch (stakes) {
    case "Lowest":
      return "with a passing stranger";
    case "Lower":
      return "with a familiar face";
    case "Higher":
      return "with a friend";
    case "Highest":
      return "with a respected community leader";
  }
};

// transform / develop
const DisplayTransformBeat = (props: BeatDisplayProps): JSXElement => {
  return (
    <>
      <Heading as="h4">Relationship Transformation!</Heading>
      <p>
        A character{" "}
        {operationGrammaer(props.beat.operation, props.beat.valence)}{" "}
        {props.beat.noun.toLowerCase()} {stakesGrammer(props.beat.stakes)}.
      </p>
    </>
  );
};

const DisplayDevelopBeat = (props: BeatDisplayProps): JSXElement => {
  return (
    <>
      <Heading as="h4">Relationship Development!</Heading>
      <p>
        A character{" "}
        {operationGrammaer(props.beat.operation, props.beat.valence)}{" "}
        {props.beat.noun.toLowerCase()} {stakesGrammer(props.beat.stakes)}.
      </p>
    </>
  );
};

export const DisplayDramaticBeat = (props: BeatDisplayProps): JSXElement => {
  const { beat } = props;
  return (
    <>
      <div class="flex flex-col gap-[12px] border-b-2 p-[24px] bg-red-300/25 w-full">
        <Switch>
          <Match when={beat.operation == "Transform"}>
            <DisplayTransformBeat beat={beat} />
          </Match>
          <Match when={beat.operation == "Develop"}>
            <DisplayDevelopBeat beat={beat} />
          </Match>
        </Switch>
      </div>
    </>
  );
};
