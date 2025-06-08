import { JSX, splitProps } from "solid-js";
import { cn } from "~/devano/utils/cn";
export function Page(props: JSX.HTMLAttributes<HTMLElement>) {
	const [l, rest] = splitProps(props, ["class"]);
	let pageCn = cn([
		"flex flex-col w-full min-h-[100vh] gap-[48px] items-center bg-(--bg-e) text-(--fg-e)",
		l?.class,
	]);
	return (
		<main
			class={pageCn}
			{...rest}
		/>
	);
}
