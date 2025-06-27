import { JSX, splitProps, For } from "solid-js";
import { cn } from "~/devano/utils";
interface ProgressDotsProps extends JSX.HTMLAttributes<HTMLDivElement> {
	length: number;
	index: number;
	direction?: "horizontal" | "vertical";
}

export function ProgressDots(props: ProgressDotsProps) {
	const [l, rest] = splitProps(props, [
		"length",
		"index",
		"direction",
		"class",
	]);
	let dir = l?.direction ?? "horizontal";
	let containerCn = cn([
		"flex align-center items-center gap-[12px] justify-center select-none w-full",
		{
			"flex-col": dir == "vertical",
		},
	]);
	let dotCn = cn([
		"w-[12px] h-[12px] rounded-[24px]",
		l.class?.includes("scale-")
			? l.class
					.split(" ")
					.filter((cls) => cls.startsWith("scale-"))
					.join("")
			: "",
	]);
	let filledCn = cn([
		dotCn,
		l.class?.includes("text-")
			? l.class
					.split(" ")
					.map((cls) =>
						cls.startsWith("text-") ? cls.replace("text-", "bg-") : cls
					)
					.join(" ")
			: "bg-(--color2)",
	]);
	let emptyCn = cn([
		dotCn,
		l.class?.includes("bg-")
			? l.class
					.split(" ")
					.map((cls) =>
						cls.startsWith("bg-") ? cls.replace("bg-", "bg-") : cls
					)
					.join(" ")
			: "bg-(--color8)",
	]);
	const index = () => l.index;
	return (
		<div
			class={containerCn}
			{...rest}
			aria-hidden
		>
			<For each={Array.from({ length: l.length })}>
				{(_, i) => {
					return <div class={i() == index() ? filledCn : emptyCn} />;
				}}
			</For>
		</div>
	);
}
