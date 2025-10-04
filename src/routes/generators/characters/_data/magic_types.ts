import {
	randomFromArray,
	uniqueFromRandom,
	weightedRandom,
} from "../../../_utils/randomFrom";

// For Eastern-inspired characters
export const E_Elemental_Affinities = [
	"Earth",
	"Wind",
	"Water",
	"Fire",
	"Light",
	"Dark",
];

// For Western-inspired characters
export const W_Magic_Schools = [
	"Abjuration",
	"Conjuration",
	"Divination",
	"Enchantment",
	"Evocation",
	"Illusion",
	"Necromancy",
	"Transmutation",
];

// Or hybridize:
export const Hybrid_Magic_Systems = [
	"Elemental Evocation", // Fireball, Lightning Bolt
	"Spiritual Conjuration", // Summoning, binding
	"Mental Enchantment", // Charm, fear, confusion
	"Vital Transmutation", // Healing, enhancement, polymorph
	"Perceptual Illusion", // Invisibility, phantasms
	"Cosmic Divination", // Fate, time, prophecy
];

export type MagicAptitudeOption = "Easy" | "Hard";

export type MagicAptitudeType = "Western" | "Eastern" | "Hybrid" | "Any";

export interface MagicSystem {
	tradition: MagicAptitudeType;
	elements: string[]; // or schools
	aptitude: MagicAptitudeOption;
	talents: string[]; // The affinities from assignElementalAffinities
	restrictions: string[]; // The inverse of talents for Hard mode
}

export const defaultMagicSystem = {
	tradition: "Any",
	elements: [
		...E_Elemental_Affinities,
		...W_Magic_Schools,
		...Hybrid_Magic_Systems,
	],
	aptitude: "Easy",
	talents: ["Cosmic Divination"],
	restrictions: [],
} as MagicSystem;

export function assignElementalAffinities(elements: string[]): string[] {
	const weights = elements.map((_, index) => 1 / (index + 1)); // Reciprocal weights [1, 0.5, 0.33, 0.25...]
	const selected: string[] = [];

	// First pass: primary element (always gets one)
	const primary = weightedRandom(elements, weights);
	selected.push(primary);

	// Subsequent passes: rolling for additional elements with scaling difficulty
	let rollThreshold = 0.3; // 30% chance for second element
	for (let i = 0; i < elements.length - 1; i++) {
		if (Math.random() < rollThreshold) {
			const remaining = elements.filter((el) => !selected.includes(el));
			const remainingWeights = weights.slice(0, remaining.length);
			const additional = weightedRandom(remaining, remainingWeights);
			selected.push(additional);
			rollThreshold *= 0.5; // Halve chance for each additional element
		} else {
			break;
		}
	}

	return selected;
}

function getElementsByTradition(tradition: MagicAptitudeType) {
	switch (tradition) {
		case "Western":
			return [...W_Magic_Schools];
		case "Eastern":
			return [...E_Elemental_Affinities];
		case "Hybrid":
			return [...Hybrid_Magic_Systems];
		case "Any":
			return [
				...W_Magic_Schools,
				...E_Elemental_Affinities,
				...Hybrid_Magic_Systems,
			];
	}
}

export function generateMagicSystem(
	aptitude: MagicAptitudeOption,
	tradition: MagicAptitudeType
): MagicSystem {
	let elements = getElementsByTradition(tradition);
	const talents = assignElementalAffinities(elements);

	let restrictions: string[] = [];

	switch (aptitude) {
		case "Easy":
			// Talents are bonuses - they get everything but specialize in talents
			return {
				tradition,
				elements: elements,
				aptitude,
				talents,
				restrictions: [], // No restrictions
			};
		case "Hard":
			// CAN ONLY use their talented elements
			restrictions = elements.filter((element) => !talents.includes(element));
			return {
				tradition,
				elements: talents, // Only the talented elements
				aptitude,
				talents: [],
				restrictions,
			};
	}
}
