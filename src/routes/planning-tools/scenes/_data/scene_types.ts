import * as z from "zod";
import type { DraftField } from "~/routes/planning-tools/_data/types";
import { draftField } from "~/routes/planning-tools/_data/types";

type LockedReactiveSceneParts = {
  reaction: string;
  dilemma: string;
  decision: string;
};

type LockedProactiveSceneParts = {
  goal: string;
  obstacle: string;
  setback: string;
};

type LockedSceneParts = {
  pov_character: string;
  one_sentence_summary: string;
  crucible: string;
};

const lockedReactiveSceneParts = z.object({
  reaction: z.string(),
  dilemma: z.string(),
  decision: z.string(),
});

const lockedProactiveSceneParts = z.object({
  goal: z.string(),
  obstacle: z.string(),
  setback: z.string(),
});

const lockedSceneParts = z.object({
  pov_character: z.string(),
  one_sentence_summary: z.string(),
  crucible: z.string(),
});

export type LockedReactiveScene = LockedSceneParts & {
  type: "REACTIVE";
} & LockedReactiveSceneParts;

export const lockedReactiveScene = z.object({
  ...lockedSceneParts.shape,
  ...lockedReactiveSceneParts.shape,
  type: z.literal("REACTIVE"),
});

export type LockedProactiveScene = LockedSceneParts & {
  type: "PROACTIVE";
} & LockedProactiveSceneParts;

export const lockedProactiveScene = z.object({
  ...lockedSceneParts.shape,
  ...lockedProactiveSceneParts.shape,
  type: z.literal("PROACTIVE"),
});

export type LockedCombinationScene = LockedSceneParts & {
  type: "BOTH";
} & LockedReactiveSceneParts &
  LockedProactiveSceneParts;

export const lockedCombinationScene = z.object({
  ...lockedSceneParts.shape,
  ...lockedProactiveSceneParts.shape,
  ...lockedReactiveSceneParts.shape,
  type: z.literal("BOTH"),
});

export type LockedScene =
  | LockedReactiveScene
  | LockedProactiveScene
  | LockedCombinationScene;

export const lockedScene = z.union([
  lockedReactiveScene,
  lockedProactiveScene,
  lockedCombinationScene,
]);

type DraftSceneParts = {
  pov_character: DraftField<string>;
  one_sentence_summary: DraftField<string>;
  crucible: DraftField<string>;
};

type DraftReactiveSceneParts = {
  reaction: DraftField<string>;
  dilemma: DraftField<string>;
  decision: DraftField<string>;
};

type DraftProactiveSceneParts = {
  goal: DraftField<string>;
  obstacle: DraftField<string>;
  setback: DraftField<string>;
};

export const draftSceneParts = z.object({
  pov_character: draftField(z.string()),
  one_sentence_summary: draftField(z.string()),
  crucible: draftField(z.string()),
});

export const draftReactiveSceneParts = z.object({
  reaction: draftField(z.string()),
  dilemma: draftField(z.string()),
  decision: draftField(z.string()),
});

export const draftProactiveSceneParts = z.object({
  goal: draftField(z.string()),
  obstacle: draftField(z.string()),
  setback: draftField(z.string()),
});

export type DraftReactiveScene = DraftSceneParts & {
  type: "REACTIVE";
} & DraftReactiveSceneParts;

export const draftReactiveScene = z.object({
  ...draftSceneParts.shape,
  ...draftReactiveSceneParts.shape,
  type: z.literal("REACTIVE"),
});
export const draftProactiveScene = z.object({
  ...draftSceneParts.shape,
  ...draftProactiveSceneParts.shape,
  type: z.literal("PROACTIVE"),
});
export const draftCombinationScene = z.object({
  ...draftSceneParts.shape,
  ...draftReactiveSceneParts.shape,
  ...draftProactiveSceneParts.shape,
  type: z.literal("BOTH"),
});

export type DraftProactiveScene = DraftSceneParts & {
  type: "PROACTIVE";
} & DraftProactiveSceneParts;

export type DraftCombinationScene = DraftSceneParts & {
  type: "BOTH";
} & DraftReactiveSceneParts &
  DraftProactiveSceneParts;

export type DraftScene =
  | DraftCombinationScene
  | DraftProactiveScene
  | DraftReactiveScene;

export const draftScene = z.union([
  draftReactiveScene,
  draftProactiveScene,
  draftCombinationScene,
]);
