import { JSX, splitProps } from "solid-js";
import { cn } from "~/devano/utils";

interface FlexSeparatorProps extends JSX.HTMLAttributes<HTMLDivElement> {
	direction?: "horizontal" | "vertical";
	label?: string;
}

export function FlexSeparator(props: FlexSeparatorProps) {
	const [l, rest] = splitProps(props, [
		"direction",
		"label",
		"class",
		"aria-hidden",
	]);
	const dir = l?.direction ?? "horizontal";
	const hasLabel = l?.label !== undefined;

	const containerCn = cn([
		"flex items-center flex-grow justify-center select-none",
		{
			"flex-col h-[100%]": dir === "vertical",
			"w-[100%]": dir === "horizontal",
			"gap-[12px]": hasLabel,
		},
	]);

	// The separator bar inherits width/height from parent
	const decoratorCn = cn([
		{
			// Inherit width or height depending on direction
			"h-full w-[2px]": dir === "vertical",
			"w-full h-[2px]": dir === "horizontal",
			// If label, shrink the bar a bit (optional, can be omitted)
			"h-[16px]": hasLabel && dir === "vertical",
			"w-[16px]": hasLabel && dir === "horizontal",
		},
		"bg-(--fg-e)",
		l.class?.includes("text-")
			? l.class
					.split(" ")
					.map((cls) =>
						cls.startsWith("text-") ? cls.replace("text-", "bg-") : cls
					)
					.join(" ")
			: l.class,
	]);

	return (
		<div
			class={containerCn}
			{...rest}
			aria-hidden
		>
			<div class={decoratorCn} />
			{hasLabel && l.label}
			<div class={decoratorCn} />
		</div>
	);
}
