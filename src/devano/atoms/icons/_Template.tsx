import { JSX, splitProps } from "solid-js";
import { cn } from "~/devano/utils/cn";

export function Template(props: JSX.SvgSVGAttributes<SVGSVGElement>) {
	const [l, rest] = splitProps(props, ["width", "height", "class"]);
	return (
		<svg
			width={l.width ?? "100"}
			height={l.height ?? "60"}
			viewBox="0 0 100 60"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class={cn(["fill-current h-auto", l?.class])} // fill-current consumes the parent's "text color" value, h-auto makes it easy to proportionally resize the art
			{...rest}
		>
			{/* SVG Guts go here */}
		</svg>
	);
}
