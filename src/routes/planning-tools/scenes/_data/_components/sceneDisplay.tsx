import type {
	LockedScene,
	LockedReactiveScene,
	LockedProactiveScene,
	LockedCombinationScene,
} from "../scene_types";
import {
	lockedScene,
	lockedCombinationScene,
	lockedProactiveScene,
	lockedReactiveScene,
} from "../scene_types";
import * as z from "zod";
import { For, Switch, Match } from "solid-js";
import type { JSX } from "solid-js";
import { Heading, Card } from "~/devano/atoms";

type SceneDisplayArgs = JSX.HTMLAttributes<HTMLDivElement> & {
	scene: LockedScene;
};

export function SceneDisplayComponent(args: SceneDisplayArgs) {
	const scene = lockedScene.safeParse(args.scene);
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

function SceneComponentLabel(args: { label: string; value: string }) {
	return (
		<p>
			<strong>{args.label}: </strong>
			{args.value}
		</p>
	);
}

function CombinationSceneComponent(args: { scene: LockedScene }) {
	const scene = lockedCombinationScene.safeParse(args.scene);
	if (!scene.success) return <></>;
	const data = scene.data;
	return (
		<Card>
			<p>{data.one_sentence_summary}</p>
			<SceneComponentLabel
				label="Character"
				value={data.pov_character}
			/>
			<SceneComponentLabel
				label="Crucible"
				value={data.crucible}
			/>
			<p>Procedural</p>
			<SceneComponentLabel
				label="Goal"
				value={data.goal}
			/>
			<SceneComponentLabel
				label="Obstacle"
				value={data.obstacle}
			/>
			<SceneComponentLabel
				label="Setback"
				value={data.setback}
			/>
			<p>Reactive</p>
			<SceneComponentLabel
				label="Reaction"
				value={data.reaction}
			/>
			<SceneComponentLabel
				label="Dilemma"
				value={data.dilemma}
			/>
			<SceneComponentLabel
				label="Decision"
				value={data.decision}
			/>
		</Card>
	);
}

function ProactiveSceneComponent(args: { scene: LockedScene }) {
	const scene = lockedProactiveScene.safeParse(args.scene);
	if (!scene.success) return <></>;
	const data = scene.data;
	return (
		<Card>
			<p>{data.one_sentence_summary}</p>
			<SceneComponentLabel
				label="Character"
				value={data.pov_character}
			/>
			<SceneComponentLabel
				label="Crucible"
				value={data.crucible}
			/>
			<p>Proactive</p>
			<SceneComponentLabel
				label="Goal"
				value={data.goal}
			/>
			<SceneComponentLabel
				label="Obstacle"
				value={data.obstacle}
			/>
			<SceneComponentLabel
				label="Setback"
				value={data.setback}
			/>
		</Card>
	);
}

function ReactiveSceneComponent(args: { scene: LockedScene }) {
	const scene = lockedReactiveScene.safeParse(args.scene);
	if (!scene.success) return <></>;
	const data = scene.data;
	return (
		<Card>
			<p>{data.one_sentence_summary}</p>
			<SceneComponentLabel
				label="Character"
				value={data.pov_character}
			/>
			<SceneComponentLabel
				label="Crucible"
				value={data.crucible}
			/>
			<p>Reactive</p>
			<SceneComponentLabel
				label="Reaction"
				value={data.reaction}
			/>
			<SceneComponentLabel
				label="Dilemma"
				value={data.dilemma}
			/>
			<SceneComponentLabel
				label="Decision"
				value={data.decision}
			/>
		</Card>
	);
}
