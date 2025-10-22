import { randomFromArray } from "../../_utils";

import { Valence, Stakes, ValenceOptions, StakesOptions } from "./shared_types";

type TransformativeOperation = "Transform";
type DevelopmentalOperation = "Develop";
export type Operation = TransformativeOperation | DevelopmentalOperation;
type TransformativeNouns = "Trust" | "Bond" | "Loyalty" | "Respect";
type DevelopmentalNouns =
  | "Understanding"
  | "Trust"
  | "Bond"
  | "Loyalty"
  | "Respect";
type DramaticNouns = TransformativeNouns | DevelopmentalNouns;

const OperationOptions: Operation[] = ["Transform", "Develop"];

const TransformativeNounOptions: TransformativeNouns[] = [
  "Trust",
  "Bond",
  "Loyalty",
  "Respect",
];
const DevelopmentalNounOptions: DevelopmentalNouns[] = [
  "Understanding",
  "Trust",
  "Bond",
  "Loyalty",
  "Respect",
];
const DramaticNounOptions: DramaticNouns[] = [
  ...TransformativeNounOptions,
  ...DevelopmentalNounOptions,
];

type GenericDramaticBeat = {
  valence: Valence;
  operation: Operation;
  stakes: Stakes;
};

type TransformativeDramaticBeat = GenericDramaticBeat & {
  operation: TransformativeOperation;
  noun: TransformativeNouns;
};

type TransformativeDramaticBeatArgs = Partial<GenericDramaticBeat> &
  Partial<TransformativeDramaticBeat>;

type DevelopmentalDramaticBeat = GenericDramaticBeat & {
  operation: DevelopmentalOperation;
  noun: DramaticNouns;
};

type DevelopmentalDramaticBeatArgs = Partial<GenericDramaticBeat> &
  Partial<DevelopmentalDramaticBeat>;

// For use in "Give me Anything" functions that are handled elsewhere
export type DramaticBeat =
  | TransformativeDramaticBeat
  | DevelopmentalDramaticBeat;

export type DramaticBeatArgs =
  | TransformativeDramaticBeatArgs
  | DevelopmentalDramaticBeatArgs;

// Makin Stuff
function GenerateGenericDramaticBeat(
  args: Partial<GenericDramaticBeat>,
): GenericDramaticBeat {
  let valence = args.valence ?? randomFromArray(ValenceOptions);
  let operation = args.operation ?? randomFromArray(OperationOptions);
  let stakes = args.stakes ?? randomFromArray(StakesOptions);
  return {
    valence,
    operation,
    stakes,
  };
}

function GenerateTransformativeBeat(
  args: TransformativeDramaticBeatArgs,
): TransformativeDramaticBeat {
  const { noun, operation, ...rest } = args;
  let { valence, stakes } = GenerateGenericDramaticBeat(rest);
  let base: TransformativeDramaticBeat = {
    operation: "Transform",
    valence,
    stakes,
    noun: noun ?? randomFromArray(TransformativeNounOptions),
  };
  return base;
}

function GenerateDevelopmentalDramaticBeat(
  args: DevelopmentalDramaticBeatArgs,
): DevelopmentalDramaticBeat {
  const { noun, ...rest } = args;
  let { valence, stakes } = GenerateGenericDramaticBeat(rest);
  let base: DevelopmentalDramaticBeat = {
    operation: "Develop",
    valence,
    stakes,
    noun: noun ?? randomFromArray(DevelopmentalNounOptions),
  };
  return base;
}

export const beats = {
  transform: (args: TransformativeDramaticBeatArgs) =>
    GenerateTransformativeBeat(args),
  develop: (args: DevelopmentalDramaticBeatArgs) =>
    GenerateDevelopmentalDramaticBeat(args),
};
