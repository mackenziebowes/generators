/**
 * Breadcrumb components should display the route away from the root as links
 */

import { createMemo, For, JSX, splitProps } from "solid-js";
import { useLocation } from "@solidjs/router";
import {
	Anchor,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "~/devano/atoms";
import { cn } from "../utils/cn";

interface BreadcrumbProps extends JSX.HTMLAttributes<HTMLElement> {}

export const DynamicBreadcrumb = (props: BreadcrumbProps) => {
	const location = useLocation();
	const pathName = createMemo(() => location.pathname.split("/"));
	const [l, rest] = splitProps(props, ["class", "children"]);
	const navCn = cn([l.class]);
	return (
		<BreadcrumbList
			class={navCn}
			{...rest}
		>
			<BreadcrumbItem>
				<Anchor href={"/"}>home</Anchor>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<For each={pathName()}>
				{(name, index) => {
					if (index() == 0) return <></>;
					if (index() == pathName().length - 1) {
						return (
							<BreadcrumbItem>
								<Anchor href={pathName().join("/")}>{name}</Anchor>
							</BreadcrumbItem>
						);
					} else {
						return (
							<>
								<BreadcrumbItem>
									<Anchor href={pathName().join("/")}>{name}</Anchor>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
							</>
						);
					}
				}}
			</For>
		</BreadcrumbList>
	);
};
