/**
 * Styling individual components
 */

import { JSX, splitProps } from "solid-js";
import { cn } from "~/devano/utils";

interface BreadcrumbItemProps extends JSX.HTMLAttributes<HTMLDivElement> {
	children: JSX.Element; // can only have a single child
}

export const BreadcrumbItem = (props: BreadcrumbItemProps) => {
	const [l, rest] = splitProps(props, ["class", "children"]);
	const breadcrumbItemCn = cn(["opacity-80 px-sm", l?.class]);

	return (
		<div
			class={breadcrumbItemCn}
			{...rest}
		>
			{l.children}
		</div>
	);
};
