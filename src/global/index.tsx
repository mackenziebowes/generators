import { AuthPortalProvider } from "./individual/Auth";
import { JSX } from "solid-js";
import { ScratchProvider } from "./individual/Scratch";
import { AlertProvider } from "~/devano/components";
interface ProviderProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export default function Contexts(props: ProviderProps) {
	return (
		<ScratchProvider>
			<AlertProvider>
				<AuthPortalProvider>{props.children}</AuthPortalProvider>
			</AlertProvider>
		</ScratchProvider>
	);
}
