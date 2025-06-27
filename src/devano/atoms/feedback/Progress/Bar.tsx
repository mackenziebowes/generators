import { JSX, splitProps } from "solid-js";
import { cn } from "~/devano/utils";
interface ProgressBarProps extends JSX.HTMLAttributes<HTMLDivElement> {
	length: number;
	index: number;
	direction?: "horizontal" | "vertical";
}

export function ProgressBar(props: ProgressBarProps) {
	const [l, rest] = splitProps(props, [
		"length",
		"index",
		"direction",
		"class",
	]);
	let dir = l?.direction ?? "horizontal";
	let containerCn = cn([
		"flex align-center items-center justify-center select-none w-full",
		{
			"flex-col": dir == "vertical",
		},
	]);
	let decoratorCn = cn([
		{
			"w-[12px]": dir == "vertical",
			"h-[12px]": dir == "horizontal",
		},
	]);
	let filledCn = cn([
		decoratorCn,
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
		decoratorCn,
		l.class?.includes("bg-")
			? l.class
					.split(" ")
					.map((cls) =>
						cls.startsWith("bg-") ? cls.replace("bg-", "bg-") : cls
					)
					.join(" ")
			: "bg-(--color8)",
	]);
	return (
		<div
			class={containerCn}
			{...rest}
			aria-hidden
		>
			<div
				class={filledCn}
				style={{ width: `${((l.index + 1) / l.length) * 100}%` }}
			/>
			<div
				class={emptyCn}
				style={{ width: `${100 - ((l.index + 1) / l.length) * 100}%` }}
			/>
		</div>
	);
}
