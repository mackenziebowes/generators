import { JSX, splitProps } from "solid-js";
import { cn } from "~/devano/utils/cn";

interface CardProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Card(props: CardProps) {
	let [l, rest] = splitProps(props, ["class", "children"]);

	let cardCN = cn([
		"flex flex-col min-w-[35ch] border-[4px] border-(--c-a-e) px-[24px] py-[12px] pb-[24px] rounded-[6px] gap-[24px]",
		l?.class,
	]);

	return (
		<div
			class={cardCN}
			{...rest}
		>
			{l.children}
		</div>
	);
}
