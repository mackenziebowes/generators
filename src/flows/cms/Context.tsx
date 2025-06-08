import {
	createContext,
	useContext,
	JSX,
	createSignal,
	type Accessor,
	type Setter,
} from "solid-js";

import type { FormItemState } from "~/types/FormItem";

export enum CMSAdminViews {
	Id = "/admin/cms/edit/",
	NewType = "/admin/cms/new/type",
	NewByType = "/admin/cms/new/",
	Dash = "/admin/",
}

interface AdminState {
	view: FormItemState<CMSAdminViews>;
	err: FormItemState<string>;
	msg: FormItemState<string>;
}

type StringTransform = (x: string) => string;

interface AdminFunctions {
	edit: StringTransform;
	new: StringTransform;
}

interface CMSAdminContextValue {
	state: AdminState;
	fn: AdminFunctions;
}

export const CMSAdminContext = createContext<CMSAdminContextValue>();

export const useCMSAdmin = () => {
	const context = useContext(CMSAdminContext);
	if (!context) {
		throw new Error("useCMSAdmin must be used within a CMSAdminProvider");
	}
	return context;
};

interface ProviderProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function CMSAdminProvider(props: ProviderProps) {
	const v = createSignal<CMSAdminViews>(CMSAdminViews.Dash);
	const e = createSignal<string>("");
	const m = createSignal<string>("");

	const state: AdminState = {
		view: {
			get: v[0],
			set: v[1],
		},
		err: {
			get: e[0],
			set: e[1],
		},
		msg: {
			get: m[0],
			set: m[1],
		},
	};

	const getEditRoute: StringTransform = (id: string) => {
		return `${CMSAdminViews.Id}${id}`;
	};
	const getNewByTypeRoute: StringTransform = (type: string) => {
		return `${CMSAdminViews.NewByType}${type}`;
	};

	const fn: AdminFunctions = {
		edit: getEditRoute,
		new: getNewByTypeRoute,
	};

	return (
		<CMSAdminContext.Provider value={{ state, fn }}>
			{props.children}
		</CMSAdminContext.Provider>
	);
}
