/**
 * Badges have two degrees of variation:
 * 1) Semantic (covers Destructive/Error, Success, Warning, Info)
 * 2) Priority (High, Medium, Low)
 */

import { JSX, splitProps } from "solid-js";
import { cn, min } from "~/devano/utils";

interface BadgeProps extends JSX.HTMLAttributes<HTMLDivElement> {
	label: string;
	type?: "destructive" | "error" | "success" | "warning" | "info" | "default";
	priority?: "high" | "med" | "low";
}

export const Badge = (props: BadgeProps) => {
	const [l, rest] = splitProps(props, ["label", "type", "priority", "class"]);
	const type = l?.type ?? "default";
	const priority = l?.priority ?? "med";
	const badgeCn = cn([
		"inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs border-[2px] w-fit h-fit leading-[0.9]",
		"md:text-md md:px-3 md:rounded-lg md:py-1", // from min.md("text-md px-3 rounded-lg py-1"),
		"lg:text-[14px] lg:py-[4px]", // from min.lg("text-[18px] py-[24px]"),
		{
			"bg-(--marking-100) text-(--surface-800) border-(--marking-100) font-bold":
				priority == "high" && type == "default",
			"bg-(--color1) text-(--color1-800) border-(--color1-500) font-bold":
				priority == "high" && (type == "destructive" || type == "error"),
			"bg-(--color2) text-(--color2-800) border-(--color2-500) font-bold":
				priority == "high" && type == "success",
			"bg-(--color3) text-(--color3-800) border-(--color3-500) font-bold":
				priority == "high" && type == "warning",
			"bg-(--color4) text-(--color4-800) border-(--color4-500) font-bold":
				priority == "high" && type == "info",
			"bg-(--marking-800)/90 text-(--marking-100) border-(--marking-800)/90":
				priority == "med" && type == "default",
			"bg-(--color1-700)/90 text-(--color1-100) border-(--color1-700)":
				priority == "med" && (type == "destructive" || type == "error"),
			"bg-(--color2-700)/90 text-(--color2-100) border-(--color2-700)":
				priority == "med" && type == "success",
			"bg-(--color3-700)/90 text-(--color3-100) border-(--color3-700)":
				priority == "med" && type == "warning",
			"bg-(--color4-700)/90 text-(--color4-100) border-(--color4-700)":
				priority == "med" && type == "info",
			"bg-(--surface-500)/25 text-(--marking-600)/80 border-(--marking-600)/80 font-bold":
				priority == "low" && type == "default",
			"bg-(--surface-500)/25 text-(--color1-600)/80 border-(--color1-600)/80 font-bold":
				priority == "low" && (type == "destructive" || type == "error"),
			"bg-(--surface-500)/25 text-(--color2-600)/80 border-(--color2-600)/80 font-bold":
				priority == "low" && type == "success",
			"bg-(--surface-500)/25 text-(--color3-600)/80 border-(--color3-600)/80 font-bold":
				priority == "low" && type == "warning",
			"bg-(--surface-500)/25 text-(--color4-600)/80 border-(--color4-600)/80 font-bold":
				priority == "low" && type == "info",
		},
		l?.class,
	]);
	return (
		<div
			class={badgeCn}
			{...rest}
		>
			{l.label}
		</div>
	);
};
