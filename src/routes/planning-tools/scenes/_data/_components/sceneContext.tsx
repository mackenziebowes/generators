import { createSignal, createContext, useContext } from "solid-js";
import type { Accessor, Setter, JSX } from "solid-js";
import {
	LockedScene,
	DraftScene,
	lockedScene,
	lockedReactiveScene,
	draftReactiveScene,
	draftCombinationScene,
	draftScene,
	draftScenes,
	DraftReactiveScene,
	DraftProactiveScene,
	DraftCombinationScene,
} from "../scene_types";
import { draftProactiveScene, lockedScenes } from "../scene_types";
import * as z from "zod";
import {
	draftField,
	DraftField as DF,
} from "~/routes/planning-tools/_data/types";

export interface Signal<T> {
	get: Accessor<T>;
	set: Setter<T>;
}

interface DraftField<T> {
	options: Signal<T[]>;
	current: { index: Signal<number>; value: Signal<T> };
}

type SceneType = "REACTIVE" | "PROACTIVE" | "BOTH";

interface BasicActiveScene {
	pov_character: DraftField<string>;
	one_sentence_summary: DraftField<string>;
	crucible: DraftField<string>;
}

interface ReactiveActiveScene extends BasicActiveScene {
	reaction: DraftField<string>;
	dilemma: DraftField<string>;
	decision: DraftField<string>;
}

interface ProactiveActiveScene extends BasicActiveScene {
	goal: DraftField<string>;
	obstacle: DraftField<string>;
	setback: DraftField<string>;
}

interface CombinationActiveScene extends ProactiveActiveScene {
	reaction: DraftField<string>;
	dilemma: DraftField<string>;
	decision: DraftField<string>;
}

type CompleteActiveScene =
	| ProactiveActiveScene
	| ReactiveActiveScene
	| CombinationActiveScene;

type ActiveScene = {
	type: Signal<SceneType>;
	all: CompleteActiveScene;
};

interface Scenes {
	currentIndex: Signal<number>;
	all: Signal<DraftScene[]>;
	load: () => void;
	save: () => void;
}

interface SceneValue {
	scenes: Scenes;
	active: ActiveScene;
}

const prepStringDraftField = (): DraftField<string> => {
	const options = createSignal<string[]>([]);
	const currentIndex = createSignal<number>(0);
	const currentValue = createSignal<string>("");
	return {
		options: {
			get: options[0],
			set: options[1],
		},
		current: {
			index: { get: currentIndex[0], set: currentIndex[1] },
			value: { get: currentValue[0], set: currentValue[1] },
		},
	};
};

const initStringDraftField = (args: {
	options: string[];
	current: number;
	currentValue?: string;
}): DraftField<string> => {
	const options = createSignal<string[]>([...args.options]);
	const currentIndex = createSignal<number>(args.current ?? 0);
	const currentValue = createSignal<string>(
		args.currentValue ?? options[0]()[currentIndex[0]()] ?? ""
	);
	return {
		options: {
			get: options[0],
			set: options[1],
		},
		current: {
			index: { get: currentIndex[0], set: currentIndex[1] },
			value: { get: currentValue[0], set: currentValue[1] },
		},
	};
};

const prepActiveScene = (): ActiveScene => {
	const a = prepStringDraftField;
	const type = createSignal<SceneType>("BOTH");
	const pov_character = a();
	const one_sentence_summary = a();
	const crucible = a();
	const reaction = a();
	const dilemma = a();
	const decision = a();
	const goal = a();
	const obstacle = a();
	const setback = a();
	const all = {
		pov_character,
		one_sentence_summary,
		crucible,
		reaction,
		dilemma,
		decision,
		goal,
		obstacle,
		setback,
	};
	return {
		type: {
			get: type[0],
			set: type[1],
		},
		all,
	};
};

const initActiveReactiveScene = (
	scene: z.infer<typeof draftReactiveScene>
): ReactiveActiveScene => {
	const a = initStringDraftField;
	const returnValue: ReactiveActiveScene = {
		pov_character: a(scene.pov_character),
		crucible: a(scene.crucible),
		one_sentence_summary: a(scene.one_sentence_summary),
		reaction: a(scene.reaction),
		dilemma: a(scene.dilemma),
		decision: a(scene.decision),
	};
	return returnValue;
};

const initActiveProactiveScene = (
	scene: z.infer<typeof draftProactiveScene>
): ProactiveActiveScene => {
	const a = initStringDraftField;
	const returnValue: ProactiveActiveScene = {
		pov_character: a(scene.pov_character),
		crucible: a(scene.crucible),
		one_sentence_summary: a(scene.one_sentence_summary),
		goal: a(scene.goal),
		obstacle: a(scene.obstacle),
		setback: a(scene.setback),
	};
	return returnValue;
};

const initActiveCombinationScene = (
	scene: z.infer<typeof draftCombinationScene>
): CombinationActiveScene => {
	const a = initStringDraftField;
	const returnValue: CombinationActiveScene = {
		pov_character: a(scene.pov_character),
		crucible: a(scene.crucible),
		one_sentence_summary: a(scene.one_sentence_summary),
		reaction: a(scene.reaction),
		dilemma: a(scene.dilemma),
		decision: a(scene.decision),
		goal: a(scene.goal),
		obstacle: a(scene.obstacle),
		setback: a(scene.setback),
	};
	return returnValue;
};

const initScene = (scene: DraftScene) => {
	const reactiveParse = draftReactiveScene.safeParse(scene);
	if (reactiveParse.success) {
		return initActiveReactiveScene(reactiveParse.data);
	}
	const proactiveParse = draftProactiveScene.safeParse(scene);
	if (proactiveParse.success) {
		return initActiveProactiveScene(proactiveParse.data);
	}
	const combinationParse = draftCombinationScene.safeParse(scene);
	if (combinationParse.success)
		return initActiveCombinationScene(combinationParse.data);
};

const prepScenes = () => {
	const [scenes, set_scenes] = createSignal<DraftScene[]>([]);
	const [currentIndex, set_currentIndex] = createSignal<number>(0);
	const load = () => {
		let storedScenes = localStorage.getItem("scenes.stored");
		let storedSceneIndex = localStorage.getItem("scenes.currentIndex");
		let safeParsedStoredScenes = draftScenes.safeParse(storedScenes);
		if (safeParsedStoredScenes.success) set_scenes(safeParsedStoredScenes.data);
		let safeParsedSceneIndex = z.number().safeParse(storedSceneIndex);
		if (safeParsedSceneIndex.success)
			set_currentIndex(safeParsedSceneIndex.data);
	};
	const save = () => {
		localStorage.setItem("scenes.stored", JSON.stringify(scenes()));
		localStorage.setItem("scenes.currentIndex", JSON.stringify(currentIndex()));
	};
	return {
		scenes: {
			get: scenes,
			set: set_scenes,
		},
		currentIndex: {
			get: currentIndex,
			set: set_currentIndex,
		},
		save,
		load,
	};
};

const prepFieldForSaving = (field: DraftField<string>): DF<string> => {
	return {
		options: field.options.get(),
		current: field.current.index.get(),
	};
};

const prepReactiveSceneForSaving = (
	scene: ReactiveActiveScene
): DraftReactiveScene => {
	const a = prepFieldForSaving;
	return {
		type: "REACTIVE",
		pov_character: a(scene.pov_character),
		one_sentence_summary: a(scene.one_sentence_summary),
		crucible: a(scene.crucible),
		reaction: a(scene.reaction),
		dilemma: a(scene.dilemma),
		decision: a(scene.decision),
	};
};

const prepProactiveSceneForSaving = (
	scene: ProactiveActiveScene
): DraftProactiveScene => {
	const a = prepFieldForSaving;
	return {
		type: "PROACTIVE",
		pov_character: a(scene.pov_character),
		one_sentence_summary: a(scene.one_sentence_summary),
		crucible: a(scene.crucible),
		goal: a(scene.goal),
		obstacle: a(scene.obstacle),
		setback: a(scene.setback),
	};
};

const prepCombinationSceneForSaving = (
	scene: CombinationActiveScene
): DraftCombinationScene => {
	const a = prepFieldForSaving;
	return {
		type: "BOTH",
		pov_character: a(scene.pov_character),
		one_sentence_summary: a(scene.one_sentence_summary),
		crucible: a(scene.crucible),
		goal: a(scene.goal),
		obstacle: a(scene.obstacle),
		setback: a(scene.setback),
		reaction: a(scene.reaction),
		dilemma: a(scene.dilemma),
		decision: a(scene.decision),
	};
};

const prepSceneForSaving = (scene: ActiveScene): DraftScene => {
	switch (scene.type.get()) {
		case "REACTIVE":
			return prepReactiveSceneForSaving(scene.all as ReactiveActiveScene);
		case "PROACTIVE":
			return prepProactiveSceneForSaving(scene.all as ProactiveActiveScene);
		default:
			return prepCombinationSceneForSaving(scene.all as CombinationActiveScene);
	}
};

export const SceneContext = createContext<SceneValue>();

interface ProviderProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export const SceneProvider = (props: ProviderProps) => {
	let scenes = prepScenes();
	const active = prepActiveScene();
	const save = () => {};
};
