import { Switch, Match, For, JSX } from "solid-js";

interface ShowProps extends JSX.HTMLAttributes<HTMLDivElement> {
	content: {
		condition: () => boolean;
		content: JSX.Element;
	}[];
}

/**
 * Pass a memo to the condition prop in your content array for animating inner content based on your passed mapping function.
 * Or, declare a single object, pass a memo, and get stateful conditional rendering.
 */
export const Show = (props: ShowProps) => {
	const content = props.content;
	return (
		<Switch fallback={<></>}>
			<For each={content}>
				{(entry) => <Match when={entry.condition()}>{entry.content}</Match>}
			</For>
		</Switch>
	);
};
