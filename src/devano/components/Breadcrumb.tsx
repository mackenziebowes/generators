/**
 * Breadcrumb components should display the route away from the root as links
 */

import {
	createContext,
	createMemo,
	JSX,
	splitProps,
	useContext,
} from "solid-js";
import { useLocation } from "@solidjs/router";
import { Anchor } from "~/devano/atoms";
import { cn } from "../utils/cn";

interface BreadcrumbContextValue {
	path: () => string[]; // memoized
	count: () => number; // memoized
}

const BreadCrumbContext = createContext<BreadcrumbContextValue>();

interface BreadcrumbProps extends JSX.HTMLAttributes<HTMLDivElement> {
	// we don't need anything extra, this is the combination Context container / menu.
	// `class` and `children` are already included in div...
	// but we might need something custom later, I'd rather have this ready if that hapepns.
}

export const Breadcrumb = (props: BreadcrumbProps) => {
	const location = useLocation();
	const pathName = createMemo(() => location.pathname.split("/"));
	const [l, rest] = splitProps(props, ["class", "children"]);
	const navCn = cn([l.class]);
	return (
		<BreadCrumbContext.Provider
			value={{ path: () => pathName(), count: () => pathName().length }}
		>
			<nav class={navCn}>{l.children}</nav>
		</BreadCrumbContext.Provider>
	);
};

/**
 * I fuckin do not understand how to pass children here.
 * We want something like:
 * <Breadcrumb>
 *   <BreadcrumbItem>Wassap</Breadcrumb>
 * </Breadcrumb>
 * Bc that's what ShadCN has.
 * I think... ShadCN uses these components inside a Array.map() for dynamic breadcrumbing, maybe I rewrite this to be the DynBreadcrumb?
 * Maybe I add Atomic breadcrumbs!
 */
