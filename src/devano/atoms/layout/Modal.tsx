import { Portal, Show, Switch, Match } from "solid-js/web";
import { JSX, splitProps } from "solid-js";
import { Card } from "./Card";
import { cn } from "~/devano/utils";
interface ModalProps extends JSX.HTMLAttributes<HTMLDivElement> {
	when: () => boolean;
	close: Function;
	overlayClass?: string;
}

/**
 * @param props.when A function that returns a boolean - setting a signal inside that function makes this component reactive.
 * @param props.close The function to close the Modal instance - the thing that negates the function in props.when
 * @param props.class Applies to the internal card
 * @param props.overlayClass Applies to the "background" overlay - the shaded area users can click to quickly close the alert.
 * @returns A Portal inside a Switch
 */
export function Modal(props: ModalProps) {
	const [l, rest] = splitProps(props, ["when", "children", "close", "class"]);
	const cardCn = cn([
		"absolute left-[50%] top-[50%] bg-(--surface-500) text-(--marking-100) z-3",
		l.class,
	]);
	return (
		<Switch fallback={<></>}>
			<Match when={l.when()}>
				<Portal>
					<div
						onClick={() => l.close()}
						class="w-[100vw] h-[100vh] left-0 top-0 absolute bg-(--surface-800) opacity-25 z-2"
					/>
					<Card
						class={cardCn}
						style={{ transform: "translateX(-50%) translateY(-50%)" }}
					>
						{l?.children}
					</Card>
				</Portal>
			</Match>
		</Switch>
	);
}
