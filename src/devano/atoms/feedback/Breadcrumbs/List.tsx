import { JSX, splitProps } from "solid-js";
import { cn } from "~/devano/utils/cn";

interface BreadcrumbNavProps extends JSX.HTMLAttributes<HTMLElement> {
	children: JSX.Element[];
}

export const BreadcrumbList = (props: BreadcrumbNavProps) => {
	const [l, rest] = splitProps(props, ["class", "children"]);
	const listCn = cn([
		"flex flex-row gap-[12px] items-center align-start text-(--marking-400)",
		l?.class,
	]);

	return (
		<nav
			class={listCn}
			{...rest}
		>
			{l.children}
		</nav>
	);
};
