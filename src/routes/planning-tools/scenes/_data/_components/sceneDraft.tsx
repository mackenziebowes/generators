import type { DraftScene } from "../scene_types";
import {
	draftScene,
	draftProactiveScene,
	draftCombinationScene,
	draftReactiveScene,
} from "../scene_types";
import * as z from "zod";
import { For, Switch, Match, createSignal } from "solid-js";
import type { JSX } from "solid-js";
import { Heading, Card, Button } from "~/devano/atoms";
import { draftField, DraftField } from "~/routes/planning-tools/_data/types";

type SceneDraftArgs = JSX.HTMLAttributes<HTMLDivElement> & {
	scene: DraftScene;
};

export function SceneDraftComponent(args: SceneDraftArgs) {
	const scene = draftScene.safeParse(args.scene);
	if (!scene.success) return <></>;
	const data = scene.data;
	return (
		<>
			<Switch>
				<Match when={data.type == "BOTH"}>
					<CombinationSceneComponent scene={data} />
				</Match>
				<Match when={data.type == "REACTIVE"}>
					<ReactiveSceneComponent scene={data} />
				</Match>
				<Match when={data.type == "PROACTIVE"}>
					<ProactiveSceneComponent scene={data} />
				</Match>
			</Switch>
		</>
	);
}

function StringDraftFieldComponent(args: {
	label: string;
	field: DraftField<string>;
}) {
	const field = draftField(z.string()).safeParse(args.field);
	if (!field.success) return <></>;
	const [options, set_options] = createSignal<string[]>(field.data.options);
	const [counter, set_counter] = createSignal<number>(field.data.current ?? 0);
	const [currentValue, set_currentValue] = createSignal<string>(
		options()[counter()] ?? ""
	);
	const controls = {
		next: () => {
			set_counter((v) => {
				if (v + 1 > options().length) return 0;
				return v + 1;
			});
			set_currentValue(options()[counter()]);
		},
		previous: () => {
			set_counter((v) => {
				if (v + 1 > options().length) return 0;
				return v + 1;
			});
			set_currentValue(options()[counter()]);
		},
		random: () => {
			let newVal = -1;
			while (options()[newVal] == undefined) {
				newVal = Math.floor(Math.random() * options().length);
			}
			set_counter(newVal);
			set_currentValue(options()[counter()]);
		},
	};
	return (
		<>
			<div class="flex flex-col gap-4">
				<p>
					<strong>{args.label}</strong>
				</p>
				<div class="flex flex-row gap-4">
					<Button
						label="<"
						onclick={controls.previous}
					/>
					<Button
						label="?"
						onclick={controls.random}
					/>
					<Button
						label=">"
						onclick={controls.previous}
					/>
				</div>
			</div>
		</>
	);
}

function CombinationSceneComponent(args: { scene: DraftScene }) {
	const scene = draftCombinationScene.safeParse(args.scene);
	if (!scene.success) return <></>;
	const data = scene.data;
	return (
		<Card>
			<StringDraftFieldComponent
				label="One Sentence Summary"
				field={data.one_sentence_summary}
			/>
			<StringDraftFieldComponent
				label="Character"
				field={data.pov_character}
			/>
			<StringDraftFieldComponent
				label="Crucible"
				field={data.crucible}
			/>
			<p>Procedural</p>
			<StringDraftFieldComponent
				label="Goal"
				field={data.goal}
			/>
			<StringDraftFieldComponent
				label="Obstacle"
				field={data.obstacle}
			/>
			<StringDraftFieldComponent
				label="Setback"
				field={data.setback}
			/>
			<p>Reactive</p>
			<StringDraftFieldComponent
				label="Reaction"
				field={data.reaction}
			/>
			<StringDraftFieldComponent
				label="Dilemma"
				field={data.dilemma}
			/>
			<StringDraftFieldComponent
				label="Decision"
				field={data.decision}
			/>
		</Card>
	);
}

function ProactiveSceneComponent(args: { scene: DraftScene }) {
	const scene = draftProactiveScene.safeParse(args.scene);
	if (!scene.success) return <></>;
	const data = scene.data;
	return (
		<Card>
			<StringDraftFieldComponent
				label="One Sentence Summary"
				field={data.one_sentence_summary}
			/>
			<StringDraftFieldComponent
				label="Character"
				field={data.pov_character}
			/>
			<p>Procedural</p>
			<StringDraftFieldComponent
				label="Goal"
				field={data.goal}
			/>
			<StringDraftFieldComponent
				label="Obstacle"
				field={data.obstacle}
			/>
			<StringDraftFieldComponent
				label="Setback"
				field={data.setback}
			/>
		</Card>
	);
}

function ReactiveSceneComponent(args: { scene: DraftScene }) {
	const scene = draftReactiveScene.safeParse(args.scene);
	if (!scene.success) return <></>;
	const data = scene.data;
	return (
		<Card>
			<StringDraftFieldComponent
				label="One Sentence Summary"
				field={data.one_sentence_summary}
			/>
			<StringDraftFieldComponent
				label="Character"
				field={data.pov_character}
			/>
			<p>Reactive</p>
			<StringDraftFieldComponent
				label="Reaction"
				field={data.reaction}
			/>
			<StringDraftFieldComponent
				label="Dilemma"
				field={data.dilemma}
			/>
			<StringDraftFieldComponent
				label="Decision"
				field={data.decision}
			/>
		</Card>
	);
}
