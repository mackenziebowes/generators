import { createContext, useContext, JSX, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

/**
 * Scratch is a variable length, variable key global store exported to wrap the entire app.
 * Use scratch for one-off temporary data that you want to persist between individual component renders without prop drilling or enumerating state requirements.
 * Great drafting tool for new features.
 * Prioritize refactoring away from Scratch towards individual feature stores as features become solidified.
 */

export interface ScratchState {
	[key: string]: any;
}

interface ScratchGlobalValues {
	scratch: ReturnType<typeof createStore<ScratchState>>;
}

export const ScratchContext = createContext<ScratchGlobalValues>();

export const useScratchContext = () => {
	const context = useContext(ScratchContext);
	if (!context) {
		throw new Error(
			"useScratchContext must be used within an OnboardingProvider"
		);
	}
	return context;
};

interface ProviderProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function ScratchProvider(props: ProviderProps) {
	const scratch = createStore<ScratchState>({});

	return (
		<ScratchContext.Provider
			value={{
				scratch,
			}}
		>
			{props.children}
		</ScratchContext.Provider>
	);
}
