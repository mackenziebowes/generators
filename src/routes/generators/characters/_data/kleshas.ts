import { createPattern, Pattern } from "~/routes/generators/_utils/ayurvedic";
import { uniqueFromRandom, randomIntFromRange } from "../../_utils/randomFrom";

export const kleshas = () => {
  return [
    createPattern("Aversion").addDescription(
      "The active pattern of hatred, repulsion, or avoidance toward the source of the wound or anything that reminds them of it.",
    ),
    createPattern("Terror").addDescription(
      "A pervasive state of anxiety and dread. The character is constantly bracing for the other shoe to drop.",
    ),
    createPattern("Shamelessness").addDescription(
      "A pattern of having no regard for social consequence or morality, often developed after being publicly shamed. 'If I am already seen as a monster, I will act like one.'",
    ),
    createPattern("Arrogance").addDescription(
      "An inflated sense of self built as a fortress to protect a deep-seated sense of worthlessness. They must constantly be the best, be right, be admired.",
    ),
    createPattern("Hostility").addDescription(
      "A readiness to react with anger and aggression. The world is a hostile place, and they must strike first.",
    ),
    createPattern("Attachment").addDescription(
      "An obsessive clinging to people, things, or status that they believe will prevent them from feeling the wound again.",
    ),
    createPattern("Envy").addDescription(
      "The burning resentment of others' successes or possessions, which are seen as threats to one's own security or worth.",
    ),
    createPattern("Intoxication").addDescription(
      "A pattern of losing oneself in pleasure, power, or substance to numb the pain of the wound.",
    ),
    createPattern("Clinging To Life").addDescription(
      "An extreme, irrational fear of death or change, leading to a refusal to take any risks, even necessary ones.",
    ),
    createPattern("Delusion").addDescription(
      `The core pattern of misperception. They believe their coping strategy is their true self. (e.g., "I am not scared, I am cautious.").`,
    ),
    createPattern("Egoism").addDescription(
      `The fierce identification with a false self—their role, their wound, their pattern. "I am the betrayed one. I am the failure."`,
    ),
    createPattern("Doubt").addDescription(
      `A paralyzing pattern of doubt, not in others, but in oneself, one's path, or the very possibility of goodness. It prevents any decisive action.`,
    ),
    createPattern("Apathy").addDescription(
      `A spiritual and emotional numbness. After the wound, the lights went out. They go through the motions without hope or passion.`,
    ),
    createPattern("Restlesness").addDescription(
      `A spiritual and emotional numbness. After the wound, the lights went out. They go through the motions without hope or passion.`,
    ),
  ];
};

export interface SimpleProfile {
  primary: Pattern;
  fallback: Pattern;
}

export interface Profile {
  primary: Pattern;
  fallback: Pattern;
  latent: Pattern[];
}

export type KleshaProfile = SimpleProfile | Profile;

export const generateSimpleKleshaProfila = () => {
  let [primary, fallback] = uniqueFromRandom(kleshas(), 2);
  return { primary, fallback };
};

export const generateFullKleshaProfile = () => {
  let [primary, fallback, ...latent] = uniqueFromRandom(
    kleshas(),
    randomIntFromRange(3, 5),
  );
  return {
    primary,
    fallback,
    latent,
  };
};

export type KleshaProfileOptions = "simple" | "full";

export const generateKleshaProfile = (type: KleshaProfileOptions) => {
  switch (type) {
    case "simple":
      return generateSimpleKleshaProfila();
    case "full":
      return generateFullKleshaProfile();
  }
};
