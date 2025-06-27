import {
	createSignal,
	JSX,
	onMount,
	splitProps,
	children,
	createContext,
	useContext,
	Switch,
	Match,
} from "solid-js";
import { createStore } from "solid-js/store";
import { cn } from "~/devano/utils";
import { Stack, Show, Heading, AnchorButton } from "~/devano/atoms";

interface AccordionContextValue {
	tools: {
		isOpen: (id: string) => boolean;
		open: (id: string) => void;
		close: (id?: string) => void;
	};
}

const AccordionContext = createContext<AccordionContextValue>();

interface AccordionProps extends JSX.HTMLAttributes<HTMLDivElement> {
	type?: "single" | "multi";
	collapsible?: boolean;
	defaultValue?: string;
}

export const Accordion = (props: AccordionProps) => {
	const [l, rest] = splitProps(props, [
		"type",
		"collapsible",
		"defaultValue",
		"children",
		"class",
	]);
	// -- Mutual Controls --
	const type = l?.type ?? "single";
	const collapsible = l?.collapsible ?? true;
	const [currentItem, set_currentItem] = createSignal<string>(
		l?.defaultValue ?? ""
	);
	const [currentItems, set_currentItems] = createStore<Record<string, boolean>>(
		{}
	);
	onMount(() => {
		if (l?.defaultValue) {
			let val = l?.defaultValue;
			set_currentItems({ [val]: true });
		}
	});
	const isOpen = (id: string): boolean => {
		if (type == "single") {
			return id == currentItem();
		} else {
			const items = { ...currentItems };
			return items[id] ? items[id] : false;
		}
	};
	const open = (id: string) => {
		if (type == "single") {
			set_currentItem(id);
		} else {
			set_currentItems({
				[id]: true,
			});
		}
	};
	const close = (id?: string) => {
		if (type == "multi") {
			if (!id) {
				set_currentItems({});
			} else {
				set_currentItems({ [id]: false });
			}
		}
		if (type == "single" && collapsible == true) {
			set_currentItem("");
		}
	};
	const tools = {
		isOpen,
		open,
		close,
	};
	return (
		<AccordionContext.Provider value={{ tools }}>
			<div {...rest}>{l.children}</div>
		</AccordionContext.Provider>
	);
};

interface AccordionItemProps extends JSX.HTMLAttributes<HTMLDivElement> {
	id: string;
	title: string;
	headingClass?: string;
}

export const AccordionItem = (props: AccordionItemProps) => {
	const ctx = useContext(AccordionContext);
	if (!ctx) throw new Error("AccordionItem must be used inside Accordion");
	const { tools } = ctx;
	const { isOpen, open, close } = tools;
	const [l, rest] = splitProps(props, [
		"id",
		"title",
		"children",
		"headingClass",
		"class",
	]);
	const openMemo = () => isOpen(l.id);
	const headingCn = () =>
		cn([
			"justify-start w-full py-[12px]",
			{ "border-b-[2px] border-b-(--color4)/10": !openMemo() },
			l?.headingClass,
		]);
	const openCn = () =>
		cn([
			l?.class,
			"justify-start items-start w-full py-[12px]",
			{
				"border-b-[2px] border-b-(--color4)/10": openMemo(),
			},
		]);
	return (
		<Switch fallback={<></>}>
			<Match when={!openMemo()}>
				<Stack
					direction="row"
					class={headingCn()}
					{...rest}
				>
					<AnchorButton onclick={() => open(l.id)}>{l.title}</AnchorButton>
				</Stack>
			</Match>
			<Match when={openMemo()}>
				<Stack
					direction="col"
					class={openCn()}
					{...rest}
				>
					<Stack
						direction="row"
						class={headingCn()}
						{...rest}
					>
						<AnchorButton onclick={() => close(l.id)}>{l.title}</AnchorButton>
					</Stack>
					{l.children}
				</Stack>
			</Match>
		</Switch>
	);
};
