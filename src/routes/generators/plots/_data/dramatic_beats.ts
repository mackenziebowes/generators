import { randomFromArray } from "../../_utils";

type Valence = "Positive" | "Negative";
type Operation = "Transform" | "Develop";
type Stakes = "Lowest" | "Lower" | "Higher" | "Highest";

const ValenceOptions: Valence[] = ["Positive", "Negative"];
const OperationOptions: Operation[] = ["Transform", "Develop"];
const StakesOptions: Stakes[] = ["Lowest", "Lower", "Higher", "Highest"];

type GenericDramaticBeat = {
	valence: Valence;
	operation: Operation;
	stakes: Stakes;
};

type DramaticBeat = GenericDramaticBeat & {};

function GenerateDramaticBeatStats() {
	return {
		valence: randomFromArray(ValenceOptions),
		operation: randomFromArray(OperationOptions),
		stakes: randomFromArray(StakesOptions),
	};
}

export function GenerateDramaticBeat() {}
