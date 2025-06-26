import { JSX, splitProps } from "solid-js";
import { cn } from "~/devano/utils/cn";

interface BreadcrumbSeparatorProps extends JSX.HTMLAttributes<HTMLSpanElement> {
	symbol?: JSX.Element;
}

export const BreadcrumbSeparator = (props: BreadcrumbSeparatorProps) => {
	const [l, rest] = splitProps(props, ["symbol", "class", "children"]);
	const child = l?.children ?? l.symbol ?? "/";
	const separatorCn = cn(["text-inherit/50", l?.class]);
	return (
		<span
			class={separatorCn}
			{...rest}
		>
			{child}
		</span>
	);
};
