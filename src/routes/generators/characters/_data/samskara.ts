import { createPattern, Pattern } from "~/routes/generators/_utils/ayurvedic";
import { randomFromArray } from "../../_utils";

const trustWounds = () => {
  return [
    createPattern("The Broken Vow").addDescription(
      "A solemn promise made to them was shattered by someone they deeply trusted.",
    ),
    createPattern("The Scapegoat").addDescription(
      "They were unfairly blamed for a major failure or crime and punished for it.",
    ),
    createPattern("The Sold Out").addDescription(
      "They were betrayed for personal gain (money, power, status) by a friend, family member, or ally.",
    ),
    createPattern("The Abandoned").addDescription(
      "A primary caregiver or core member of their community left them, physically or emotionally.",
    ),
    createPattern("The Stolen Legacy").addDescription(
      "Something rightfully theirs (an inheritance, a title, a birthright) was taken by a deceitful rival.",
    ),
  ];
};

const abilityWounds = () => {
  return [
    createPattern("The Catastrophic Failure").addDescription(
      "A single moment of mistake, hesitation, or lack of skill led to a terrible, irreversible consequence.",
    ),
    createPattern("The Proved Worthless").addDescription(
      `They were publicly humiliated, shamed, or told they were "not enough" in a domain they valued.`,
    ),
    createPattern("The Powerless Witness").addDescription(
      "They were forced to stand by and watch something horrible happen, utterly unable to intervene.",
    ),
    createPattern("The Inherited Standard").addDescription(
      `They live in the shadow of a "legend" (a parent, sibling, predecessor) and could never measure up.`,
    ),
    createPattern("The Flawed Victory").addDescription(
      "They achieved their goal, but through immoral means or at a terrible, unforeseen cost, tainting the success.",
    ),
  ];
};

const safetyWounds = () => {
  return [
    createPattern("The Home, Defiled").addDescription(
      "Their safe place (home, village, sanctuary) was violently destroyed or invaded.",
    ),
    createPattern("The Unjust Law").addDescription(
      "An authority figure or system they believed in used its power to inflict a deep, personal injustice upon them.",
    ),
    createPattern("The Random Tragedy").addDescription(
      "They were a victim of a random, senseless accident or act of nature that took everything.",
    ),
    createPattern("The Possession Lost").addDescription(
      "Something they cherished not for its value, but for its sentimental significance (a person, an object, a place) was taken from them.",
    ),
  ];
};

const identityWounds = () => {
  return [
    createPattern("The Rejected Nature").addDescription(
      "A core part of their identity (their magic, their heritage, a secret, their true feelings) was exposed and met with revulsion and exile.",
    ),
    createPattern("The Unwelcome Truth").addDescription(
      "They discovered a fundamental truth about their origin (e.g., adopted, a pawn, a clone) that shattered their sense of self.",
    ),
    createPattern("The Failed Ascension").addDescription(
      "They were on the cusp of entering a coveted group, rank, or society and were rejected at the final moment.",
    ),
    createPattern("The Double Life").addDescription(
      "They were forced from a young age to hide their true self to survive, never knowing what authenticity feels like.",
    ),
    createPattern("The Tool, Not a Person").addDescription(
      "They were raised or treated as a means to an end (a weapon, a political marriage, a vessel), not as an individual.",
    ),
  ];
};

const truthWounds = () => {
  return [
    createPattern("The Shattered Illusion").addDescription(
      "A fundamental belief (in a god, a cause, a person's goodness) was proven to be a lie.",
    ),
    createPattern("The Unwitting Pawn").addDescription(
      `They discovered that their entire life's path, including their "choices," was meticulously engineered by a hidden force.`,
    ),
    createPattern("The Moral Labyrinth").addDescription(
      "They were forced into a no-win scenario (a trolley problem) where every choice was evil, and they had to live with the one they made.",
    ),
    createPattern("The Lost History").addDescription(
      "They uncovered a truth that their entire culture, family, or order is built upon a foundational lie.",
    ),
  ];
};

export type SamskaraCategoryOption =
  | "trust"
  | "ability"
  | "safety"
  | "identity"
  | "truth"
  | "any";

const getTrustWound = () => {
  return randomFromArray(trustWounds());
};

const getAbilityWound = () => {
  return randomFromArray(abilityWounds());
};

const getSafetyWound = () => {
  return randomFromArray(safetyWounds());
};

const getIdentityWound = () => {
  return randomFromArray(identityWounds());
};

const getTruthWound = () => {
  return randomFromArray(truthWounds());
};

export const getWound = (type: SamskaraCategoryOption) => {
  switch (type) {
    case "trust":
      return getTrustWound();
    case "ability":
      return getAbilityWound();
    case "safety":
      return getSafetyWound();
    case "identity":
      return getIdentityWound();
    case "truth":
      return getTruthWound();
    case "any":
      return randomFromArray(
        [
          trustWounds(),
          abilityWounds(),
          safetyWounds(),
          identityWounds(),
          truthWounds(),
        ].flat(),
      );
  }
};
