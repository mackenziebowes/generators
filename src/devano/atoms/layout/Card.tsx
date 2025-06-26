import { JSX, splitProps } from "solid-js";
import { cn } from "~/devano/utils/cn";

interface CardProps extends JSX.HTMLAttributes<HTMLDivElement> {
	title?: string;
}

export function Card(props: CardProps) {
	let [l, rest] = splitProps(props, ["class", "children", "title"]);

	let cardCN = cn([
		"flex flex-col min-w-[35ch] border-[4px] border-(--c-a-e) px-[24px] py-[12px] pb-[24px] rounded-[6px] gap-[24px]",
		l?.class,
	]);
	let titleCN = cn([
		"flex flex-grow bg-(--color13-700) text-(--text-200) py-2 px-4 -mt-3 -mx-[24px] rounded-ss-[6px] rounded-se-[6px] text-[24px]",
	]);

	return (
		<div
			class={cardCN}
			{...rest}
		>
			{l?.title && <div class={titleCN}>{l.title}</div>}
			{l.children}
		</div>
	);
}
