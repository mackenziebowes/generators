import { randomFromArray } from "../../_utils";

export const W_Urban_Backgrounds = [
  "Gambler",
  "Failed Merchant",
  "Merchant",
  "Longshoreman",
  "Aristocrat",
  "Agent",
  "Refugee",
  "Acolyte",
  "Musician",
  "Writer",
  "Craft Guild Member",
  "Urchin",
  "Soldier",
  "Guard",
  "Student",
  "Researcher",
  "Church Orphan",
  "House Slave",
  "PoW",
  "Gladiator",
  "Athlete",
];

export const W_Traveller_Backgrounds = [
  "Gambler",
  "Smuggler",
  "Adventurer",
  "Sailor",
  "Caravaneer",
  "Solder",
  "Researcher",
  "Drifter",
  "Tax Collector",
  "Mendicant Acolyte",
];

export const W_Outpost_Backgrounds = [
  "Miner",
  "Fisher",
  "Church Orphan",
  "Cook",
  "Butcher",
  "Hunter",
  "Guard",
  "Farmer",
  "Rancher",
  "Logger",
  "Herbalist",
  "Minor Noble",
  "Marquess",
  "Preacher",
];

export const W_Solitary_Backgrounds = [
  "Hermit",
  "Outlander",
  "Lookout",
  "Exile",
  "Anchorite",
  "Cave Researcher",
  "Dungeon Researcher",
  "Animal Researcher",
  "Biologist",
  "Bounty Hunter",
  "Trapper",
  "Wandering Sage",
];

export const W_Noble_Backgrounds = [
  "Monarch",
  "Royal Family",
  "Exiled Monarch",
  "Exiled Royal Family",
  "Royal Bastard",
  "Duke",
  "Ducal Family",
  "Exiled Duke",
  "Exiled Ducal Family",
  "Ducal Bastard",
  "Marquess",
  "Marquesal Family",
  "Exiled Marquess",
  "Exiled Marquesal Family",
  "Marquesal Bastard",
  "Earl",
  "Earled Family",
  "Exiled Earl",
  "Exiled Earled Family",
  "Earled Bastard",
  "Viscount",
  "Viscomital Family",
  "Exiled Viscount",
  "Exiled Viscomital Family",
  "Viscomital Bastard",
  "Baron",
  "Baron's Family",
  "Exiled Baron",
  "Exiled Baron's Family",
  "Baron's Bastard",
  "Titled Knight",
  "Titled Knight's Family",
  "Titled Knight's Bastard",
];

export type BackgroundTypeOptions =
  | "Urban"
  | "Traveller"
  | "Outpost"
  | "Solitary"
  | "Noble";

export const getBackground = (type: BackgroundTypeOptions) => {
  switch (type) {
    case "Urban":
      return randomFromArray(W_Urban_Backgrounds);
    case "Outpost":
      return randomFromArray(W_Outpost_Backgrounds);
    case "Solitary":
      return randomFromArray(W_Solitary_Backgrounds);
    case "Traveller":
      return randomFromArray(W_Traveller_Backgrounds);
    case "Noble":
      return randomFromArray(W_Noble_Backgrounds);
  }
};
