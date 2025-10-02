import {
  uniqueFromRandom,
  pullItemsFromBag,
} from "~/routes/generators/_utils/randomFrom";

export const W_basic_six = [
  {
    title: "Strength",
    label: "STR",
    description: "Physical Power, Carrying Capacity",
  },
  {
    title: "Constitution",
    label: "CON",
    description: "Endurance, HP, Stamina",
  },
  {
    title: "Dexterity",
    label: "DEX",
    description: "Agility, Balance, Reflexes",
  },
  {
    title: "Intelligence",
    label: "INT",
    description: "Cognition, Knowledge, Memory",
  },
  {
    title: "Wisdom",
    label: "WIS",
    description: "Intuition, Restraint, Insight",
  },
  {
    title: "Charisma",
    label: "CHR",
    description: "Persuasiveness, Magnetism, Force of Personality",
  },
];

export const E_basic_six = [
  {
    title: "Might",
    label: "STR",
    description:
      "Physical power. Unlocks heavy weapons, armor, and crushing blows.",
  },
  {
    title: "Finesse",
    label: "DEX",
    description: "Speed and precision. Unlocks bows, daggers, dual-wielding.",
  },
  {
    title: "Resilience",
    label: "END",
    description:
      "Fortitude and health. Unlocks shields and survivability skills.",
  },
  {
    title: "Intellect",
    label: "INT",
    description:
      "Logical and analytical mind. Unlocks Black Magic, device hacking, traps.",
  },
  {
    title: "Spirit",
    label: "SPR",
    description:
      "Force of will and empathy. Unlocks White Magic, Summoning, persuasion.",
  },
  {
    title: "Charm",
    label: "CHA",
    description:
      "Social grace and presence. Unlocks Beast Taming, Bardic songs, merchant skills.",
  },
];

export const Simplified_JRPG = [
  {
    title: "Health Pool",
    label: "HP",
    description: "A resource pool drained by enemy attacks.",
  },
  {
    title: "Attack",
    label: "ATK",
    description: "Raw Damage Scaling.",
  },
  {
    title: "Defense",
    label: "DEF",
    description: "Raw Damage Reduction.",
  },
  {
    title: "Stamina Pool",
    label: "SP",
    description:
      "A resource pool drained by physical player actions including ranged attacks, sprinting, parries, and dodge rolls.",
  },
  {
    title: "Mana Pool",
    label: "MP",
    description:
      "A resource pool drained by magical player attacks including touch spells. Regen scales with pool size.",
  },
  {
    title: "Magic Affinity",
    label: "MGK",
    description:
      "Raw Spell Efficacy Scaling - applies to mana cost reduction + non-damaging spell values.",
  },
  {
    title: "Resistance",
    label: "RES",
    description:
      "Raw Spell Inefficacy Scaling - reduces debuff value + length.",
  },
];

export const Full_JRPG = [
  {
    title: "Health Pool",
    label: "HP",
    description: "A resource pool drained by enemy attacks.",
  },
  {
    title: "Attack",
    label: "ATK",
    description: "Raw Damage Scaling.",
  },
  {
    title: "Defense",
    label: "DEF",
    description: "Raw Damage Reduction.",
  },
  {
    title: "Stamina Pool",
    label: "SP",
    description:
      "A resource pool drained by physical player actions including ranged attacks, sprinting, parries, and dodge rolls.",
  },
  {
    title: "Mana Pool",
    label: "MP",
    description:
      "A resource pool drained by magical player attacks including touch spells. Regen scales with pool size.",
  },
  {
    title: "Magic Affinity",
    label: "MGK",
    description:
      "Raw Spell Efficacy Scaling - applies to mana cost reduction + non-damaging spell values.",
  },
  {
    title: "Resistance",
    label: "RES",
    description:
      "Raw Spell Inefficacy Scaling - reduces debuff value + length.",
  },
  {
    title: "Accuracy",
    label: "ACC",
    description: "Scales Hit + Crit Rates.",
  },
  {
    title: "Focus",
    label: "CRIT",
    description: "Scales all effect multipliers.",
  },
];

export type BaseAttribute = {
  title: string;
  label: string;
  description: string;
};

export type AttributeWithBuff = BaseAttribute & {
  buff_name:
    | "Major Affinity"
    | "Minor Affinity"
    | "Minor Difficulty"
    | "Major Difficulty"
    | "Average Growth";
  multiplier: 1.25 | 1.1 | 1.0 | 0.9 | 0.75;
};

export type HeritageOptions = "West" | "East" | "Simple J-ARPG" | "J-ARPG";

export function assignBuffs(
  set: BaseAttribute[],
  sorted: BaseAttribute[],
): AttributeWithBuff[] {
  let counter = 0;
  let output: AttributeWithBuff[] = [];
  for (const _ in Array.from({ length: set.length })) {
    const attribute = set[counter];
    const matchIndex = sorted.findIndex(
      (item) => item.title == attribute.title,
    );
    switch (matchIndex) {
      case 0:
        output.push({
          ...attribute,
          buff_name: "Major Affinity",
          multiplier: 1.25,
        });
        break;
      case 1:
        output.push({
          ...attribute,
          buff_name: "Minor Affinity",
          multiplier: 1.1,
        });
        break;
      case 2:
        output.push({
          ...attribute,
          buff_name: "Minor Difficulty",
          multiplier: 0.9,
        });
        break;
      case 3:
        output.push({
          ...attribute,
          buff_name: "Major Difficulty",
          multiplier: 0.75,
        });
        break;
      default:
        output.push({
          ...attribute,
          buff_name: "Average Growth",
          multiplier: 1.0,
        });
        break;
    }
    counter++;
  }
  return output;
}

export function rollBuffs(type: HeritageOptions): AttributeWithBuff[] {
  let sorted: BaseAttribute[] = [];
  switch (type) {
    case "West":
      sorted = pullItemsFromBag(W_basic_six, 4);
      return assignBuffs(W_basic_six, sorted);
    case "East":
      sorted = pullItemsFromBag(E_basic_six, 4);
      return assignBuffs(E_basic_six, sorted);
    case "Simple J-ARPG":
      sorted = pullItemsFromBag(Simplified_JRPG, 4);
      return assignBuffs(Simplified_JRPG, sorted);
    case "J-ARPG":
      sorted = pullItemsFromBag(Full_JRPG, 4);
      return assignBuffs(Full_JRPG, sorted);
  }
}
