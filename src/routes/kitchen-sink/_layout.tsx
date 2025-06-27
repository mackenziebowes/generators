import { JSX } from "solid-js";
import * as Atoms from "~/devano/atoms";
import * as Comp from "~/devano/components";
import { min, max } from "~/devano/utils";

interface KitchenSinkLayoutProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export default function KitchenSinkLayout(props: KitchenSinkLayoutProps) {
	const baseSidebar = "hidden";
	const mdSidebar = "";
	const lgSidebar =
		"lg:flex lg:flex-col lg:gap-[12px] lg:bg-(--surface-400) lg:text-(--marking-100)";
	/* from min["lg"]("flex flex-col gap-[12px] bg-(--surface-400) text-(--marking-100)"); */
}
