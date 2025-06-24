import { JSX, splitProps } from "solid-js";
import { A } from "@solidjs/router";
import { cn } from "~/devano/utils/cn";

interface AnchorProps extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
	color?: "default" | "ara" | "ene" | "izi";
	href: string;
	activeClass?: string;
	inactiveClass?: string;
	end?: boolean;
}
/**
 * A link that looks like a link
 * @param props Accepts standard anchor props and optional custom props.
 * @param props.href Required! Can pass local/relative routes or whole domains.
 * @param props.color Optional, defaults to "default". Pass "ara" | "ene" | "izi" for themed colours.
 * @param props.activeClass Optional, override how the link looks when the link points to the current page.
 * @param props.inactiveClass Optional, override how the link looks when the link points elsewhere.
 * @param props.end Optional, a Solid utility for helping to figure out if activeClass or inactiveClass should be used.
 * @param props.class Optional, goes into a cn function so you can override default styles as needed.
 */
export function Anchor(props: AnchorProps) {
	const [l, rest] = splitProps(props, [
		"color",
		"class",
		"children",
		"href",
		"activeClass",
		"inactiveClass",
		"end",
	]);

	const color = l?.color ?? "default";
	const end = l?.end ?? true;

	let inactiveCn = cn([
		"select-none font-semibold hover:cursor-pointer focus:outline-none",
		{
			"text-(--fg-e) hover:text-(--fg-i) focus:text-(--c-a-e)":
				color == "default",
			"text-(--c-a-e) hover:text-(--c-a-i) focus:text-(--fg-i)": color == "ara",
			"text-(--c-e-e) hover:text-(--c-e-i) focus:text-(--fg-i)": color == "ene",
			"text-(--c-i-e) hover:text-(--c-i-i) focus:text-(--fg-i)": color == "izi",
		},
		l?.class,
		l?.inactiveClass,
	]);

	let activeCn = cn([
		"select-none font-semibold hover:cursor-pointer focus:outline-none",
		{
			"text-(--fg-a) hover:text-(--fg-e) focus:text-(--c-a-i)":
				color == "default",
			"text-(--c-a-a) hover:text-(--c-a-e) focus:text-(--fg-i)": color == "ara",
			"text-(--c-e-a) hover:text-(--c-e-e) focus:text-(--fg-i)": color == "ene",
			"text-(--c-i-a) hover:text-(--c-i-e) focus:text-(--fg-i)": color == "izi",
		},
		l?.class,
		l?.activeClass,
	]);

	return (
		<A
			href={l.href}
			inactiveClass={inactiveCn}
			activeClass={activeCn}
			{...rest}
			end={end}
		>
			{l?.children ?? ""}
		</A>
	);
}
