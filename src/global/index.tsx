import { AuthPortalProvider } from "./individual/Auth";
import { JSX } from "solid-js";
import { ScratchProvider } from "./individual/Scratch";
interface ProviderProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export default function Contexts(props: ProviderProps) {
	return (
		<ScratchProvider>
			<AuthPortalProvider>{props.children}</AuthPortalProvider>
		</ScratchProvider>
	);
}
