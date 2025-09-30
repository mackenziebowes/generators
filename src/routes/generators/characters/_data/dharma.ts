import { createPattern, Pattern } from "~/routes/generators/_utils/ayurvedic";
import {
  randomFromArray,
  uniqueFromRandom,
} from "~/routes/generators/_utils/randomFrom";
export const socialDharmas = (): Pattern[] => {
  let arr = [];

  // == Social & Familial Dharmas ==
  arr[0] = createPattern("The Protector").addDescription(
    `The duty to use one's strength, power, or position to shield the vulnerable from harm.`,
  );
  arr[1] = createPattern("The Provider").addDescription(
    `The duty to ensure the physical and emotional well-being of one's family, dependents, or community.`,
  );
  arr[2] = createPattern("The Healer").addDescription(
    "The duty to mend wounds, cure sickness, and alleviate suffering, whether physical, mental, or spiritual.",
  );
  arr[3] = createPattern("The Teacher").addDescription(
    "The duty to pass on knowledge, wisdom, and tradition to the next generation. To guide and enlighten.",
  );
  arr[4] = createPattern("The Leader").addDescription(
    "The duty to guide a group, make difficult decisions for the collective good, and bear the weight of command.",
  );
  arr[5] = createPattern("The Loyalist").addDescription(
    "The duty of unwavering fealty to a person, cause, or organization. To serve with faith and devotion.",
  );

  return arr;
};

export const personalDharmas = (): Pattern[] => {
  let arr = [];

  // == Personal & Spiritual Dharmas ==
  arr[0] = createPattern("The Seeker").addDescription(
    "The duty to pursue truth, knowledge, or enlightenment, no matter where it leads or the comfort it costs.",
  );
  arr[1] = createPattern("The Creator").addDescription(
    "The duty to bring beauty, art, or innovation into the world. To express an inner vision that demands form.",
  );
  arr[2] = createPattern("The Penitent").addDescription(
    "The duty to atone for a past sin or failure. The path is one of self-denial, sacrifice, and seeking redemption.",
  );
  arr[3] = createPattern("The Liberator").addDescription(
    "The duty to free oneself and others from oppression, whether it's tyranny, ignorance, or a corrupt system.",
  );
  arr[4] = createPattern("The Ascetic").addDescription(
    "The duty to renounce worldly attachments and desires to achieve a higher spiritual state or understanding.",
  );
  arr[5] = createPattern("The Guardian of Tradition").addDescription(
    "The duty to preserve the old ways, rituals, laws, and culture from being lost or corrupted by time.",
  );

  return arr;
};

export const primalDharmas = (): Pattern[] => {
  let arr = [];

  // == Cosmic & Primal Dharmas ==
  arr[0] = createPattern("The Arbiter of Balance").addDescription(
    `The duty to maintain the equilibrium between fundamental forces (order/chaos, light/dark, life/death). They are not on any "side," only on the side of balance.`,
  );
  arr[2] = createPattern("The Warden of the Sacred").addDescription(
    "The duty to protect a specific place, concept, or artifact of immense power or spiritual significance (e.g., a holy grove, the concept of hope, a primordial seal).",
  );
  arr[3] = createPattern("The Chronicler of Truth").addDescription(
    "The duty to observe and record history, especially its darkest moments, so that it is never forgotten or rewritten by the victors.",
  );
  arr[4] = createPattern("The Catalyst of Change").addDescription(
    "The duty to break stagnant systems and force evolution, progress, or revolution, even if it causes temporary chaos and suffering.",
  );
  arr[5] = createPattern("The Steward of Life").addDescription(
    "The duty to nurture, protect, and advocate for the natural world, its creatures, and the cycle of life itself.",
  );

  return arr;
};

export const forbiddenDharmas = (): Pattern[] => {
  let arr = [];

  // == Forbidden "Shadow" Dharmas ==
  arr[0] = createPattern("The Destroyer").addDescription(
    "The duty to cleanse through ruin. To tear down the rotten, the corrupt, and the outdated so that something new can be built.",
  );
  arr[1] = createPattern("The Judge").addDescription(
    "The duty to deliver absolute, merciless justice without compassion or mercy, as dictated by a strict, unwavering code.",
  );
  arr[2] = createPattern("The Keeper of Forbidden Lore").addDescription(
    "The duty to guard dangerous knowledge that could end the world, which requires understanding it enough to control it.",
  );
  arr[3] = createPattern("The Harbinger").addDescription(
    "The duty to serve a great, often apocalyptic, power or prophecy, acting as the instrument of a destined end.",
  );

  return arr;
};

export type DharmicConflict = {
  external: Pattern;
  internal: Pattern;
};

const getNormalMetropolitanConflict = (): DharmicConflict => {
  return {
    external: randomFromArray(socialDharmas()),
    internal: randomFromArray(personalDharmas()),
  };
};

const getNormalFrontierConflict = (): DharmicConflict => {
  const [external, internal] = uniqueFromRandom(socialDharmas(), 2);
  return {
    external,
    internal,
  };
};

const getHeroicConflict = (): DharmicConflict => {
  return {
    external: randomFromArray(socialDharmas()),
    internal: randomFromArray(primalDharmas()),
  };
};

const getForbiddenConflict = (): DharmicConflict => {
  return {
    external: randomFromArray(socialDharmas()),
    internal: randomFromArray(forbiddenDharmas()),
  };
};

export type DharmicProfile =
  | "metropolitan"
  | "frontier"
  | "heroic"
  | "forbidden";

export const getDharmas = (profile: DharmicProfile) => {
  switch (profile) {
    case "metropolitan":
      return getNormalMetropolitanConflict();
    case "frontier":
      return getNormalFrontierConflict();
    case "heroic":
      return getHeroicConflict();
    case "forbidden":
      return getForbiddenConflict();
  }
};
