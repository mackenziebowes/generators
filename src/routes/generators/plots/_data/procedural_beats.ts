import { randomFromArray } from "../../_utils";

import { Valence, Stakes, ValenceOptions, StakesOptions } from "./shared_types";

type DiscoveryOperation = "discovered";
type LossOperation = "lost";
type GainOperation = "gained";
type Operation = DiscoveryOperation | LossOperation | GainOperation;

const OperationOptions: Operation[] = ["discovered", "gained", "lost"];

type DiscoveryNouns =
  | "a new place"
  | "new information"
  | "a new agent"
  | "a new item";
const DiscoveryNounOptions: DiscoveryNouns[] = [
  "a new place",
  "new information",
  "a new agent",
  "a new item",
];
type LossNouns = "a place" | "an agent" | "an item" | "status";
const LossNounOptions: LossNouns[] = [
  "a place",
  "an agent",
  "an item",
  "status",
];

type GainNouns =
  | "access to a new place"
  | "new information"
  | "a relationship with a new agent"
  | "a new item"
  | "status";
const GainNounOptions: GainNouns[] = [
  "access to a new place",
  "new information",
  "a relationship with a new agent",
  "a new item",
  "status",
];

type GenericProceduralBeat = {
  valence: Valence;
  stakes: Stakes;
};

type GenericProceduralBeatArgs = Partial<GenericProceduralBeat>;

function GenerateGenericProceduralBeat(args: GenericProceduralBeatArgs) {
  return {
    valence: args.valence ?? randomFromArray(ValenceOptions),
    stakes: args.stakes ?? randomFromArray(StakesOptions),
  };
}

type DiscoveryBeat = GenericProceduralBeat & {
  operation: DiscoveryOperation;
  noun: DiscoveryNouns;
};

function GenerateDiscoveryBeat(args: Partial<DiscoveryBeat>): DiscoveryBeat {
  const { noun, operation, ...rest } = args;
  let { valence, stakes } = GenerateGenericProceduralBeat(rest);
  return {
    valence,
    stakes,
    operation: operation ?? "discovered",
    noun: noun ?? randomFromArray(DiscoveryNounOptions),
  };
}

type LossBeat = GenericProceduralBeat & {
  operation: LossOperation;
  noun: LossNouns;
};

function GenerateLossBeat(args: Partial<LossBeat>): LossBeat {
  const { noun, operation, ...rest } = args;
  let { valence, stakes } = GenerateGenericProceduralBeat(rest);
  return {
    valence,
    stakes,
    operation: operation ?? "lost",
    noun: noun ?? randomFromArray(LossNounOptions),
  };
}

type GainBeat = GenericProceduralBeat & {
  operation: GainOperation;
  noun: GainNouns;
};

function GenerateGainBeat(args: Partial<GainBeat>): GainBeat {
  const { noun, operation, ...rest } = args;
  let { valence, stakes } = GenerateGenericProceduralBeat(rest);
  return {
    valence,
    stakes,
    operation: operation ?? "gained",
    noun: noun ?? randomFromArray(GainNounOptions),
  };
}

export const beats = {
  discovery: (args: Partial<DiscoveryBeat>) => GenerateDiscoveryBeat(args),
  gain: (args: Partial<GainBeat>) => GenerateGainBeat(args),
  loss: (args: Partial<LossBeat>) => GenerateLossBeat(args),
};
