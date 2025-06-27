import {
	createContext,
	useContext,
	JSX,
	createSignal,
	type Accessor,
	type Setter,
} from "solid-js";
import { createStore } from "solid-js/store";
import { Modal } from "~/devano/atoms";

// getters, setters
import type { FormItemState } from "~/types/FormItem";

// err and msg are used for condition displays / toasts
interface ExportedState {
	alert: {
		current: Accessor<JSX.Element>;
		isOpen: Accessor<boolean>;
	};
	err: FormItemState<string>;
	msg: FormItemState<string>;
	warn: FormItemState<string>;
}

interface RegisterAlertArgs {
	id: string;
	element: JSX.Element;
}

interface ExportedTools {
	register: (args: RegisterAlertArgs) => void;
	open: (id: string) => void;
	close: Function;
}

// The actual things recovered from useAlertContext hook
interface AlertContextValue {
	state: ExportedState;
	tools: ExportedTools;
}

export const AlertContext = createContext<AlertContextValue>();

export const useAlertContext = () => {
	const context = useContext(AlertContext);
	if (!context) {
		throw new Error("useAlertContext must be used within an AlertProvider");
	}
	return context;
};

interface ProviderProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function AlertProvider(props: ProviderProps) {
	const [err, set_err] = createSignal<string>("");
	const [msg, set_msg] = createSignal<string>("");
	const [warn, set_warn] = createSignal<string>("");

	const setMessage = (
		type: "err" | "msg" | "warn",
		message: string,
		time: number = 3000
	) => {
		switch (type) {
			case "err": {
				set_err(message);
				setTimeout(() => {
					set_err("");
				}, time);
				break;
			}
			case "msg": {
				set_msg(message);
				setTimeout(() => {
					set_msg("");
				}, time);
				break;
			}
			case "warn": {
				set_warn(message);
				setTimeout(() => {
					set_warn("");
				}, time);
				break;
			}
		}
	};

	const [registeredAlerts, set_registeredAlerts] = createStore<
		Record<string, JSX.Element>
	>({});
	const [activeAlert, set_activeAlert] = createSignal<JSX.Element>(<></>);
	const [alertOpen, set_alertOpen] = createSignal<boolean>(false);

	const registerAlert = (args: RegisterAlertArgs) => {
		const { id, element } = args;
		const existing = { ...registeredAlerts };
		existing[id] = element;
		set_registeredAlerts(existing);
	};

	const triggerAlert = (id: string) => {
		// -- Try to find registered Alert --
		const alertJSX = registeredAlerts[id];
		if (!alertJSX) {
			setMessage("err", "Triggered Alert id not registered");
			return;
		}
		set_activeAlert(alertJSX);
		set_alertOpen(true);
	};

	const closeAlert = () => {
		set_activeAlert(<></>);
		set_alertOpen(false);
	};

	const tools = {
		register: registerAlert,
		open: triggerAlert,
		close: closeAlert,
	};

	const state: ExportedState = {
		alert: {
			current: activeAlert,
			isOpen: alertOpen,
		},
		err: {
			get: err,
			set: set_err,
		},
		msg: {
			get: msg,
			set: set_msg,
		},
		warn: {
			get: warn,
			set: set_warn,
		},
	};

	return (
		<AlertContext.Provider
			value={{
				state,
				tools,
			}}
		>
			{props.children}
			<AlertContainer />
		</AlertContext.Provider>
	);
}

export const AlertContainer = () => {
	const { tools, state } = useAlertContext();
	return (
		<Modal
			when={() => state.alert.isOpen()}
			close={tools.close}
		>
			{state.alert.current()}
		</Modal>
	);
};
